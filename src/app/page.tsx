"use client";
import { useMemo, useState } from "react";
// constants
import { INPUT_TABS, INPUT_TYPES } from "@/constants/ui";
// types
import { ReviewResult } from "@/types/review";
// helpers
import { enforceMinDelay } from "@/lib/ui";
import { reviewCode, reviewImage } from "@/lib/review";
// components
import Tabs from "@/components/Tabs";
import CodeInput from "@/components/CodeInput";
import ReviewCard from "@/components/ReviewCard";
import ImageInput from "@/components/ImageInput";
import SkeletonCard from "@/components/SkeletonCard";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ReviewResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [inputMode, setInputMode] = useState(INPUT_TABS[0].id);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const isReviewBtnDisabled = useMemo(() => {
        if (loading) return true;
        if (inputMode === INPUT_TYPES.CODE) return !code.trim();
        if (inputMode === INPUT_TYPES.IMG) return !imageFile;
        return true;
    }, [code, inputMode, imageFile, loading]);

    const handleInput = async () => {
        const startTime = Date.now();

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response =
                inputMode === INPUT_TYPES.IMG
                    ? await reviewImage(imageFile!)
                    : await reviewCode(code);

            await enforceMinDelay(startTime);
            setResult(response);
        } catch {
            setError("Failed to analyze UI. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleTabs = (newTab: string) => {
        setResult(null);
        if (newTab === INPUT_TYPES.CODE) {
            setImageFile(null)
        } else {
            setCode("");
        }
        setInputMode(newTab);
    };

    // TODO: disable button if no change in code/image after API call or add api caching
    // TODO: add support for dark/light mode
    // TODO: Add a short demo GIF or screenshot in README.
    // TODO: add msg stating to contact you in case the api fails
    // TODO: handle for cases if user paste's a snippet which is either not code, or not ui related
    // TODO: handle for case where user uploads a picture which is not UI related and incorrect
    // TODO: fine tune prompt, current it gives suggestions which are already in the code
    // TODO: improve UI for change image button (add floating X button)

    return (
        <main className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
            <header>
                <h1 className="text-3xl font-bold">
                    ReviewUI — AI Powered UI Reviewer
                </h1>
                <p className="text-gray-400 mt-2">
                    Paste your UI code or upload a screenshot to get instant, actionable feedback on your interface.
                </p>
            </header>

            <Tabs
                tabs={INPUT_TABS}
                activeTab={inputMode}
                onChange={handleTabs}
            />

            {/* AI Input */}
            <section className="space-y-4">
                {inputMode === "code" ? (
                    <CodeInput
                        value={code}
                        onChange={setCode}
                        disabled={loading}
                    />
                ) : (
                    <ImageInput
                        selectedFile={imageFile}
                        onSelect={setImageFile}
                        disabled={loading}
                    />
                )}

                <PrimaryButton
                    onClick={handleInput}
                    loading={loading}
                    loadingText="Reviewing"
                    disabled={isReviewBtnDisabled}
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
                        <ReviewCard 
                            title="UI Review" 
                            content={result.ui} 
                        />
                        <ReviewCard 
                            title="Accessibility Review" 
                            content={result.accessibility} 
                        />
                        <ReviewCard
                            title={inputMode === INPUT_TYPES.IMG
                                ? "Implementation Suggestions"
                                : "Code Quality"}
                            content={result.code}
                        />
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