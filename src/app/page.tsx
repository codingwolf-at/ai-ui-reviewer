"use client";
import { useState } from "react";
import CodeInput from "@/components/CodeInput";
import { getAIResponse } from "@/lib/api/review";
import { ReviewResult } from "@/types/review";
import ReviewCard from "@/components/ReviewCard";
import SkeletonCard from "@/components/SkeletonCard";

export default function Home() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ReviewResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInput = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        const response = await getAIResponse(code);
        if (response) {
            setResult(response);
        } else {
            setError("Failed to analyze UI. Please try again.");
        }
        setLoading(false);
    };

    // TODO: disable button if no change in code after API call
    // TODO: add support for dark/light mode

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
            <section className="grid gap-4">
                {loading && (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                )}
                        <SkeletonCard />


                {!loading && result && (
                    <>
                        <ReviewCard title="UI Review" content={result.ui} />
                        <ReviewCard title="Accessibility Review" content={result.accessibility} />
                        <ReviewCard title="Code Review" content={result.code} />
                    </>
                )}

                {!loading && !result && (
                    <p className="text-sm text-gray-500 italic">
                        No review yet
                    </p>
                )}

                {error && (
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                )}
            </section>
        </main>
    );
}