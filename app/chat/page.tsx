import ChatInterface from '../../components/chat-interface';
import {ChevronLeft, Home} from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col mb-12 justify-center items-center text-black">
                    <div className="flex gap-4 items-center">
                        <Link className="flex items-center" href={"/"}
                        ><ChevronLeft/> <Home/></Link>
                        <h1 className="text-3xl font-bold text-gray-900">Chat with Your Document</h1></div>
                    <p className="mt-2 text-gray-600">
                        Ask questions about your uploaded document and get AI-powered responses
                    </p>
                    <p className="mt-2 text-black text-sm">
                        If you are using the 'Sample.txt' file try "what is the AI skills gap?"
                    </p>
                </div>

                <ChatInterface/>
            </div>
        </div>
    );
}