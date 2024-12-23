# NeuroNest RAG Chatbot

A sample RAG (Retrieval-Augmented Generation) application demonstrating AI-driven document interactions. This project combines OpenAI's language models with Pinecone's vector database to create a chatbot that can intelligently respond to questions about uploaded documents.

## Architecture Overview

- **Frontend**: Next.js 14, Tailwind CSS, TypeScript
- **AI/ML**: OpenAI GPT-4-mini, Text Embeddings, RAG Implementation
- **Backend**: Pinecone Vector DB, Next.js API Routes, Streaming Responses

## Prerequisites

Before setting up the project, you'll need:

1. Node.js v18 or higher installed
2. An OpenAI API account and API key
3. A Pinecone account and API key
4. Git installed on your system

## Account Setup

### OpenAI Account Setup
1. Visit [OpenAI's website](https://openai.com)
2. Create an account and navigate to the API section
3. Generate an API key and save it securely

### Pinecone Setup
1. Sign up at [Pinecone](https://pinecone.io)
2. Create a new index with the following specifications:
    - Dimension: 1536
    - Metric: cosine
    - Model: text-embedding-3-small
    - Cloud: AWS (us-east-1)
    - Type: Serverless
3. Save your API key and index name

## Project Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/NeuroNestLearning/rag-chatbot.git
   cd rag-chatbot
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Environment Configuration**
   Create a .env.local file in the root directory with the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PINECONE_API_KEY=your_pinecone_api_key_here
   PINECONE_INDEX_NAME=your_pinecone_index_name
    ```
4. **Run the Development Server**
    ```
   npm run dev  
   ```
5. **Access the Application**
   Open http://localhost:3000 in your browser
   ```
    1. Document Upload
        - Click the "Get Started" button on the homepage
        - Upload your text file (max 1-2MB)
        - Wait for confirmation of successful upload
    
    2. Chat Interface
        - Click "Start Chatting" to access the chat interface
        - Ask questions about your uploaded documents
        - The system will provide responses with source citations
    
    ## Sample Document
    A `sample.txt` file is provided in the root directory for testing. This file contains information about the AI skills gap and can be used to test the RAG functionality.
    ```

## Troubleshooting

### Common Issues and Solutions

- **Port 3000 in use**: Use `npm run dev -- -p 3001` to run on a different port
- **Environment Variables**: Ensure `.env.local` is properly configured and the server is restarted
- **Pinecone Connection**: Verify index name and API key if experiencing connection issues
- **Upload Issues**: Check file size and format if document upload fails
- **Vector Dimension Mismatch**: Ensure Pinecone index is configured with dimension 1536

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the language models
- Pinecone for vector database functionality
- Next.js team for the amazing framework

## Project Structure

```plaintext
rag-chatbot/
├── app/
│   ├── page.tsx              # Landing page
│   ├── upload/              # Document upload functionality
│   └── chat/               # Chat interface
├── components/             # Reusable React components
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
├── .env.local            # Environment variables (create this)
├── package.json          # Project dependencies
└── README.md            # Project documentation
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Pinecone Documentation](https://docs.pinecone.io)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)