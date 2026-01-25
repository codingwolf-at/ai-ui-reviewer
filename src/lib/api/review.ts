import { ERROR_TYPES } from "@/constants/ui";
import type { ReviewApiResponse, ReviewRequest } from "@/types/review";

export const getAIReview = async (payload: ReviewRequest): Promise<ReviewApiResponse | null> => {
    try {
        const res = await fetch("/api/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
            return {
                success: false,
                error: data.error || ERROR_TYPES.API
            };
        }

        return {
            success: true,
            data
        };
    } catch (error) {
        console.error("Review API error", error);
        return null;
    }
};

