"use client";
import { useEffect, useMemo, useState } from "react";
// constants
import { INPUT_TABS, INPUT_TYPES } from "@/constants/ui";
// types
import { ReviewResult } from "@/types/review";
// helpers
import { reviewCode, reviewImage } from "@/lib/review";
import { enforceMinDelay, getCurrentInputKey } from "@/lib/ui";
// components
import Tabs from "@/components/Tabs";
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import CodeInput from "@/components/CodeInput";
import ReviewCard from "@/components/ReviewCard";
import ImageInput from "@/components/ImageInput";
import SkeletonCard from "@/components/SkeletonCard";

export default function Home() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ReviewResult | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [inputMode, setInputMode] = useState(INPUT_TABS[0].id);
    const [imageFile, setImageFile] = useState<File | null>(null);
    // for caching 
    const [lastReviewedKey, setLastReviewedKey] = useState<string | null>(null);
    
    const currentKey = useMemo(() => (
        getCurrentInputKey(inputMode, code, imageFile)
    ), [inputMode, code, imageFile]);
    
    const isReviewBtnDisabled = useMemo(() => {
        if (loading) return true;
        if (currentKey === lastReviewedKey) return true;
        if (inputMode === INPUT_TYPES.CODE) return !code.trim();
        if (inputMode === INPUT_TYPES.IMG) return !imageFile;
        return false;
    }, [code, inputMode, imageFile, loading, lastReviewedKey, currentKey]);
    
    const isClearBtnDisabled = useMemo(() => {
        if (loading) return true;
        if (inputMode === INPUT_TYPES.CODE) return !code.trim();
        if (inputMode === INPUT_TYPES.IMG) return !imageFile;
    }, [loading, code, inputMode, imageFile])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleShortcutSubmit = () => {
        if (isReviewBtnDisabled) return;
        handleInput();
    };

    useEffect(() => {
        if (inputMode !== INPUT_TYPES.IMG) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                console.log('inside if')
                e.preventDefault();
                handleShortcutSubmit();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [inputMode, handleShortcutSubmit, isReviewBtnDisabled]);

    const disabledTooltipText = useMemo(() => {
        if (currentKey === lastReviewedKey) {
            return 'No changes detected. Please update your input before reviewing again.'
        } return ""
    }, [lastReviewedKey, currentKey])

    const handleInput = async () => {
        const startTime = Date.now();

        setLoading(true);
        setError(false);
        setResult(null);

        try {
            const response =
                inputMode === INPUT_TYPES.IMG
                    ? await reviewImage(imageFile!)
                    : await reviewCode(code);

            await enforceMinDelay(startTime);
            setResult(response);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
        setLastReviewedKey(getCurrentInputKey(inputMode, code, imageFile));
    };

    const clearInput = () => {
        if (inputMode === INPUT_TYPES.CODE) {
            setCode("");
        } else {
            setImageFile(null);
        }
        setResult(null);
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

    // TODO: Add a short demo GIF or screenshot in README.
    // TODO: handle for cases if user paste's a snippet which is either not code, or not ui related
    // TODO: handle for case where user uploads a picture which is not UI related and incorrect
    // TODO: fine tune prompt, current it gives suggestions which are already in the code

    return (
        <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
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
                disabled={loading}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">

                {/* AI Input */}
                <section className="bg-(--panel-bg) rounded-xl p-5 flex flex-col gap-4">
                    {inputMode === "code" ? (
                        <CodeInput
                            value={code}
                            onChange={setCode}
                            disabled={loading}
                            onSubmitShortcut={handleShortcutSubmit}
                        />
                    ) : (
                        <ImageInput
                            selectedFile={imageFile}
                            onSelect={setImageFile}
                            disabled={loading}
                        />
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Tooltip content={disabledTooltipText}>
                            <Button
                                onClick={handleInput}
                                loading={loading}
                                loadingText="Reviewing"
                                disabled={isReviewBtnDisabled}
                                isFullWidth
                            >
                                Review UI
                            </Button>
                        </Tooltip>
                        <Button
                            onClick={clearInput}
                            disabled={isClearBtnDisabled}
                            variant="secondary"
                            isFullWidth
                        >
                            Clear Input
                        </Button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-center select-none">
                        Press ⌘ + Enter (or Ctrl + Enter) to review 
                    </p>
                </section>

                <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-white/5" />

                {/* AI Output */}
                <section className="bg-(--panel-bg) rounded-xl p-5 flex flex-col gap-4 lg:sticky lg:top-6 self-start min-h-full">
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

                    {!loading && !result && !error && (
                        <>
                            <p className="text-white font-medium">
                                Paste your UI code or upload a screenshot to get feedback.
                            </p>
                            <p className="text-gray-400 text-sm max-w-xs">
                                You’ll receive UI, accessibility and code quality insights instantly.
                            </p>
                        </>
                    )}

                    {error && (
                        <>
                            <p className="font-medium text-red-400">
                                Couldn’t analyze the UI. Please try again.
                            </p>
                            <p className="text-red-400 text-sm max-w-xs">
                                This usually happens if OpenRouter is temporarily unavailable or the credit balance has been exhausted.
                                If it’s a credit issue, please contact me via email, LinkedIn, or X to have the balance restored.
                            </p>
                        </>
                    )}
                </section>
            </div>
        </main>
    );
}