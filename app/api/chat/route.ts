import {NextRequest} from 'next/server';
import {initPinecone} from '../../../lib/pinecone';
import openai from '../../../lib/openai';

export async function POST(req: NextRequest) {
    try {
        const {messages} = await req.json();
        const lastMessage = messages[messages.length - 1];

        const questionEmbedding = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: lastMessage.content,
        });

        // Query Pinecone
        const pinecone = await initPinecone();
        const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

        const queryResponse = await index.query({
            vector: questionEmbedding.data[0].embedding,
            topK: 10,
            includeMetadata: true,
            includeValues: false,
        });

        /*        console.log('Pinecone query response:', JSON.stringify({
                    matchCount: queryResponse.matches?.length || 0,
                    firstMatchScore: queryResponse.matches?.[0]?.score,
                    matches: queryResponse.matches?.map(m => ({
                        score: m.score,
                        metadata: m.metadata
                    }))
                }, null, 2));*/

        // Build context from matches
        let context = '';
        let hasRelevantContext = false;
        if (queryResponse.matches && queryResponse.matches.length > 0
            && queryResponse.matches[0].score && queryResponse.matches[0].score > 0.7) {
            const relevantContexts = queryResponse.matches
                .filter(match => match.metadata && typeof match.metadata === 'object')
                .map(match => {
                    const metadata = match.metadata as Record<string, any>;
                    return `[Source: ${metadata.source || 'Unknown'}]\n${metadata.text || ''}`;
                });
            context = relevantContexts.join('\n\n');
            hasRelevantContext = true;
        }

        let systemPrompt = '';
        if (hasRelevantContext) {
            systemPrompt = `You are a helpful AI assistant that answers questions based on the provided context.

IMPORTANT INSTRUCTIONS:
1. ONLY use information from the provided context to answer questions
2. If the context doesn't contain relevant information, say "I don't have enough information in the available documents to answer that question"
3. Always specify which source document you're using in your answer
4. Include relevant quotes from the context when appropriate

Available Context:
${context || 'No context available'}

Remember: If you can't find the answer in the context above, admit that you don't have the information rather than making assumptions.`;

        } else {
            systemPrompt = "You are a helpful assistant. Engage in natural conversation and provide helpful responses based on your knowledge. If asked about specific documents or information, let the user know you can search through uploaded documents to help answer their questions.";
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                ...messages
            ],
            stream: true,
            temperature: 0.1,
        });

        const encoder = new TextEncoder();
        const stream = new TransformStream();
        const writer = stream.writable.getWriter();

        (async () => {
            try {
                for await (const part of completion) {
                    const content = part.choices[0]?.delta?.content || '';
                    if (content) {
                        await writer.write(encoder.encode(content));
                    }
                }
            } catch (error) {
                console.error('Stream processing error:', error);
                await writer.write(encoder.encode('\nError: Failed to process the response stream.'));
            } finally {
                await writer.close();
            }
        })();

        return new Response(stream.readable, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8'
            }
        });

    } catch (error) {
        console.error('Error in chat route:', error);
        return new Response(
            JSON.stringify({
                error: 'An error occurred',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: {'Content-Type': 'application/json'}
            }
        );
    }
}