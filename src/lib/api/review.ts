import { INPUT_TYPES } from "@/constants/ui";
import type { ReviewResult } from "@/types/review";

export const getAIResponse = async (code: string): Promise<ReviewResult | null> => {
    try {
        const res = await fetch("/api/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: INPUT_TYPES.CODE,
                code
            }),
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

export const getAIImageResponse = async (base64Image: string) => {
    try {
        const res = await fetch("/api/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: INPUT_TYPES.IMG,
                image: base64Image
            }),
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
}
