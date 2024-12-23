import {NextRequest} from 'next/server';
import {initPinecone} from '../../../lib/pinecone';
import openai from '../../../lib/openai';

function chunkText(text: string, maxChunkSize: number = 1000): string[] {
    const sentences = text.split(/(?<=[.!?])\s+/);
    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length > maxChunkSize && currentChunk) {
            chunks.push(currentChunk.trim());
            currentChunk = sentence;
        } else {
            currentChunk += (currentChunk ? ' ' : '') + sentence;
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}

function extractTextContent(text: string): string {
    // Remove any non-printable characters and weird formatting
    return text
        .replace(/[^\x20-\x7E\n]/g, '') // Remove non-printable characters
        .replace(/\s+/g, ' ')           // Normalize whitespace
        .trim();
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return Response.json(
                {error: 'No file provided'},
                {status: 400}
            );
        }

        // Read file content
        const rawText = await file.text();
        const cleanText = extractTextContent(rawText);
        console.log('Cleaned text preview:', cleanText.substring(0, 500));

        const chunks = chunkText(cleanText);
        console.log(`Created ${chunks.length} chunks from file: ${file.name}`);

        // Initialize Pinecone
        const pinecone = await initPinecone();
        const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

        // Process chunks in batches
        const batchSize = 5;
        let processedChunks = 0;

        for (let i = 0; i < chunks.length; i += batchSize) {
            const batch = chunks.slice(i, i + batchSize);

            try {
                // Generate embeddings
                const embeddingResponse = await openai.embeddings.create({
                    model: 'text-embedding-3-small',
                    input: batch,
                });

                // Prepare vectors with metadata
                const vectors = batch.map((text, idx) => ({
                    id: `${file.name}-${i + idx}`,
                    values: embeddingResponse.data[idx].embedding,
                    metadata: {
                        text: text,
                        source: file.name,
                        chunkIndex: i + idx
                    },
                }));

                // Log the first vector's metadata to verify content
                if (i === 0) {
                    console.log('First vector metadata:', {
                        id: vectors[0].id,
                        text: vectors[0].metadata.text.substring(0, 100) + '...',
                        source: vectors[0].metadata.source,
                    });
                }

                // Upsert to Pinecone
                await index.upsert(vectors);

                processedChunks += batch.length;
                console.log(`Processed ${processedChunks}/${chunks.length} chunks`);
            } catch (error) {
                console.error(`Error processing batch ${i}:`, error);
                throw error;
            }
        }

        return Response.json({
            success: true,
            message: `Processed ${chunks.length} chunks from ${file.name}`,
            details: {
                fileName: file.name,
                chunkCount: chunks.length,
                firstChunkPreview: chunks[0].substring(0, 100) + '...'
            }
        });

    } catch (error) {
        console.error('Error processing document:', error);
        return Response.json({
            error: 'Error processing document',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {status: 500});
    }
}