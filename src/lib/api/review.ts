import type { ReviewResult, ReviewRequest } from "@/types/review";

export const getAIReview = async (payload: ReviewRequest): Promise<ReviewResult | null> => {
    try {
        const res = await fetch("/api/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error("API failed");
        }

        return await res.json();
    } catch (error) {
        console.error("Review API error", error);
        return null;
    }
};

