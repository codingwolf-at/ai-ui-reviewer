import { fileToBase64 } from "./ui";
import { getAIReview } from "./api/review";

export const reviewCode = async (code: string) => {
    if (!code.trim()) {
        throw new Error("Empty code input");
    }

    const response = await getAIReview({
        type: "code",
        code,
    });

    if (!response) {
        throw new Error("Invalid API response");
    }

    return response;
};

export const reviewImage = async (file: File) => {
    if (!file) {
        throw new Error("No image file provided");
    }

    const base64Image = await fileToBase64(file);

    const response = await getAIReview({
        type: "image",
        image: base64Image,
    });

    if (!response) {
        throw new Error("Invalid API response");
    }

    return response;
};
