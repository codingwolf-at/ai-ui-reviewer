import type { ReviewResult } from "@/types/review";

export const getAIResponse = async (code: string): Promise<ReviewResult | null> => {
    try {
        const res = await fetch("/api/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });

        if (!res.ok) {
            throw new Error("API failed");
        }

        return await res.json();
    } catch (error) {
        // TODO: toast, logger, sentry
        console.error("Review API error", error);
        return null;
    }
};
