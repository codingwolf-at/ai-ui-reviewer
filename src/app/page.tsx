"use client"
import CodeInput from "@/components/CodeInput";
import { useState } from "react";

export default function Home() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInput = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }

    return (
        <main className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
            <header>
                <h1 className="text-3xl font-bold">
                    AI UI Reviewer
                </h1>
                <p className="text-gray-400 mt-2">
                    Paste your UI code and get instant feedback.
                </p>
            </header>

            {/* AI Input */}
            <section className="space-y-4">
                <CodeInput value={code} onChange={setCode} disabled={loading} />

                <button
                    disabled={!code.trim() || loading}
                    className={`px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-40 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={handleInput}
                >
                    {loading ? 'Reviewing…' : 'Review UI'}
                </button>
            </section>

            {/* AI Output */}
            <section className="rounded-md border border-gray-800 bg-gray-900 p-4">
                {code.trim().length > 0 ? (
                    <pre className="text-sm text-gray-100 whitespace-pre-wrap break-words font-mono">
                        {code}
                    </pre>
                ) : (
                    <p className="text-sm text-gray-500 italic">
                        No input yet
                    </p>
                )}
            </section>
        </main>
    );
}