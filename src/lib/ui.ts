
import { ERROR_TYPES, INPUT_TYPES, MIN_CODE_LENGTH } from "@/constants/ui";

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
    if (inputMode === INPUT_TYPES.IMG) {
        return `image:${imageFile?.name}-${imageFile?.size}`;
    }
    return null;
};

export const looksLikeUICode = (input: string) => {
    const text = input.trim();

    const patterns = [
        // HTML / JSX tags
        /<\/?[a-zA-Z][^>]*>/,

        // JSX component tags
        /<[A-Z][A-Za-z0-9]*\b/,

        // CSS blocks
        /[.#]?[a-zA-Z0-9_-]+\s*\{[^}]*:[^}]*\}/,

        // Common JSX / HTML attributes
        /\b(className|class|id|onClick|style|src|alt|href)=/,

        // CSS properties
        /\b(display|flex|grid|margin|padding|color|background|align-items)\s*:/
    ];

    return patterns.some(pattern => pattern.test(text));
};

export const validateCodeInput = (code: string): string | null => {
    const trimmed = code.trim();
    if (trimmed.length < MIN_CODE_LENGTH) {
        return ERROR_TYPES.SHORT_CODE;
    }
    if (!looksLikeUICode(code)) {
        return ERROR_TYPES.NON_UI_CODE;
    }
    return null;
};

export const validateImageInput = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
        if (file.size < 5000) {
            resolve(ERROR_TYPES.IMAGE_TOO_SMALL);
            return;
        }
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.src = url;
        img.onload = () => {
            URL.revokeObjectURL(url);

            if (img.width < 200 || img.height < 200) {
                resolve(ERROR_TYPES.IMAGE_DIMENSIONS_TOO_SMALL);
                return;
            }

            resolve(null);
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(ERROR_TYPES.NON_UI_IMAGE);
        };
    });
};