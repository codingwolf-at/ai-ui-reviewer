
import { INPUT_TYPES } from "@/constants/ui";

export const enforceMinDelay = async (
    startTime: number,
    minDelay = 1500
) => {
    const elapsed = Date.now() - startTime;

    if (elapsed < minDelay) {
        await new Promise((resolve) =>
            setTimeout(resolve, minDelay - elapsed)
        );
    }
};

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;

            if (typeof result === "string") {
                resolve(result);
            } else {
                reject(new Error("FileReader result was not a string."));
            }
        };

        reader.onerror = () => {
            reject(new Error("Failed to read file."));
        };

        reader.readAsDataURL(file);
    });
};

export const getCurrentInputKey = (inputMode: string, code: string, imageFile: File | null) => {
    if (inputMode === INPUT_TYPES.CODE) {
        return `code:${code}`;
    }
    if (inputMode === INPUT_TYPES.IMG && imageFile) {
        return `image:${imageFile.name}-${imageFile.size}`;
    }
    return null;
};
