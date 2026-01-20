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
