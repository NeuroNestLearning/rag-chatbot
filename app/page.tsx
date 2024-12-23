import Link from 'next/link';
import {ArrowRight, Bot, Database, FileText, MessageSquare} from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="">
                    <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="text-center">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block">Welcome to</span>
                                    <span className="block text-emerald-500">NeuroNest</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                                    A sample RAG (Retrieval-Augmented Generation) application demonstrating the power of
                                    AI-driven document interactions
                                </p>
                            </div>

                            {/* Architecture Diagram */}
                            <div className="mt-16 flex justify-center">
                                <div className="w-full ">
                                    <div className="bg-white p-8 rounded-lg shadow-lg">
                                        <h2 className="text-2xl font-bold text-center mb-8">Architecture Overview</h2>
                                        <div className="flex flex-col items-center space-y-8">
                                            {/* User Layer */}
                                            <div className="flex items-center space-x-4">
                                                <div className="w-48 text-center p-4 bg-blue-100 rounded-lg">
                                                    <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600"/>
                                                    <span>Document Upload</span>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90"/>
                                            {/* Processing Layer */}
                                            <div className="flex items-center justify-center space-x-8">
                                                <div className="w-48 text-center p-4 bg-green-100 rounded-lg">
                                                    <Bot className="w-8 h-8 mx-auto mb-2 text-green-600"/>
                                                    <span>GPT-4-mini</span>
                                                </div>
                                                <div className="w-48 text-center p-4 bg-purple-100 rounded-lg">
                                                    <Database className="w-8 h-8 mx-auto mb-2 text-purple-600"/>
                                                    <span>Pinecone DB</span>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90"/>
                                            {/* Chat Interface */}
                                            <div className="w-48 text-center p-4 bg-yellow-100 rounded-lg">
                                                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-yellow-600"/>
                                                <span>Chat Interface</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="mt-16">
                                <h2 className="text-2xl font-bold text-center mb-8">Technology Stack</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="font-bold mb-2">Frontend</h3>
                                        <ul className="text-gray-600">
                                            <li>Next.js 14</li>
                                            <li>Tailwind CSS</li>
                                            <li>TypeScript</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="font-bold mb-2">AI/ML</h3>
                                        <ul className="text-gray-600">
                                            <li>OpenAI GPT-4-mini</li>
                                            <li>Text Embeddings</li>
                                            <li>RAG Implementation</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="font-bold mb-2">Backend</h3>
                                        <ul className="text-gray-600">
                                            <li>Pinecone Vector DB</li>
                                            <li>Next.js API Routes</li>
                                            <li>Streaming Responses</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Getting Started Steps */}
                            <div className="mt-16">
                                <h2 className="text-2xl font-bold text-center mb-8">Getting Started</h2>
                                <div className=" mx-auto bg-white p-8 rounded-lg shadow-md">
                                    <div className="prose">
                                        <h3 className="font-bold text-xl mb-4">Prerequisites</h3>
                                        <p className="text-gray-600 mb-4">
                                            Before using the app, make sure to:
                                        </p>
                                        <ul className="list-disc pl-6 text-gray-600 mb-8">
                                            <li>Read the README.md file for setup instructions</li>
                                            <li>Sign up for an OpenAI API account</li>
                                            <li>Create a Pinecone database account</li>
                                            <li>Set up necessary environment variables</li>
                                        </ul>

                                        <h3 className="font-bold text-xl mb-4">Usage Steps</h3>
                                        <ol className="list-decimal pl-6 text-gray-600">
                                            <li className="mb-4">
                                                <span className="font-semibold">Upload Your Document: Use the Sample.txt file in the root directory</span>
                                                <br/>
                                                Upload a text file (max 1-2MB) containing the information you want to
                                                chat about
                                            </li>
                                            <li className="mb-4">
                                                <span className="font-semibold">Start Chatting</span>
                                                <br/>
                                                Use the chat interface to ask questions about your document
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 text-center flex justify-center gap-10">
                                <Link
                                    href="/upload"
                                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
                                >
                                    Get Started
                                    <ArrowRight className="ml-2 w-5 h-5"/>
                                </Link>
                                <Link
                                    href="/chat"
                                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
                                >
                                    Start Chatting
                                    <ArrowRight className="ml-2 w-5 h-5"/>
                                </Link>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}