"use client";
import { useState } from "react";
import CodeInput from "@/components/CodeInput";
import { getAIResponse } from "@/lib/api/review";
import { ReviewResult } from "@/types/review";
import ReviewCard from "@/components/ReviewCard";
import SkeletonCard from "@/components/SkeletonCard";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ReviewResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInput = async () => {
        const startTime = Date.now();

        setLoading(true);
        setError(null);
        setResult(null);

        const response = await getAIResponse(code);

        const elapsed = Date.now() - startTime;
        const minDelay = 1500;

        if (elapsed < minDelay) {
            await new Promise((resolve) =>
                setTimeout(resolve, minDelay - elapsed)
            );
        }

        if (response) {
            setResult(response);
        } else {
            setError("Failed to analyze UI. Please try again.");
        }
        setLoading(false);
    };

    // TODO: disable button if no change in code after API call
    // TODO: add support for dark/light mode
    // TODO: Add a short demo GIF or screenshot in README.

    return (
        <main className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
            <header>
                <h1 className="text-3xl font-bold">
                    ReviewUI — AI Powered UI Reviewer
                </h1>
                <p className="text-gray-400 mt-2">
                    Paste your UI code and get instant feedback.
                </p>
            </header>

            {/* AI Input */}
            <section className="space-y-4">
                <CodeInput value={code} onChange={setCode} disabled={loading} />

                <PrimaryButton
                    onClick={handleInput}
                    loading={loading}
                    loadingText="Reviewing"
                    disabled={!code.trim()}
                >
                    Review UI
                </PrimaryButton>
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