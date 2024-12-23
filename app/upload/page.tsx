'use client';

import {useState} from 'react';
import {ChevronLeft, Home, MessageSquare, Upload} from 'lucide-react';
import {useRouter} from 'next/navigation';
import Link from "next/link";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [progress, setProgress] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setStatus('processing');
        setProgress(0);
        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();
            setUploadComplete(true);
            setStatus('success');
            setProgress(100);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload file');
            setStatus('error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">
                {/* Header */}
                <div className="flex flex-col mb-12 justify-center items-center text-black">
                    <div className="flex gap-4 items-center">
                        <Link className="flex items-center" href={"/"}
                        ><ChevronLeft/> <Home/></Link>
                        <h1 className="text-3xl font-bold text-gray-900">Upload Your Document</h1></div>
                    <p className="mt-2 text-gray-600">
                        Upload a text file to start chatting with your data
                    </p>
                </div>

                {/* Upload Form */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-blue-500 transition-colors">
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="hidden"
                                id="file-upload"
                                accept=".txt"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
                                <div className="text-center">
                  <span className="mt-2 text-sm font-medium text-gray-900">
                    {file ? file.name : 'Drop your file here, or click to browse'}
                  </span>
                                    <p className="mt-1 text-xs text-gray-500">
                                        TXT up to 1MB
                                    </p>
                                </div>
                            </label>
                        </div>

                        {error && (
                            <div className="text-red-500 text-center">
                                {error}
                            </div>
                        )}

                        {status === 'processing' && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                                    style={{width: `${progress}%`}}
                                />
                            </div>
                        )}

                        <div className="flex flex-col items-center space-y-4">
                            <button
                                type="submit"
                                disabled={!file || uploading}
                                className={`w-full max-w-xs px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white 
                  ${!file || uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {uploading ? 'Uploading...' : 'Upload Document'}
                            </button>

                            {uploadComplete && (
                                <button
                                    onClick={() => router.push('/chat')}
                                    className="w-full max-w-xs flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                >
                                    <MessageSquare className="w-4 h-4 mr-2"/>
                                    Start Chatting
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Upload a text file containing the information you want to chat about</li>
                        <li>Maximum file size is 1MB</li>
                        <li>Currently supported format: TXT</li>
                        <li>After successful upload, click "Start Chatting" to begin asking questions about your
                            document
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}