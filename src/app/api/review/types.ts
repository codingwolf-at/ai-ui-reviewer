type TextMessage = {
    role: "system" | "user";
    content: string;
};

type ImageMessage = {
    role: "user";
    content: Array<
        | { type: "text"; text: string }
        | { type: "image_url"; image_url: { url: string } }
    >;
};

export type ChatMessage = TextMessage | ImageMessage;

export type AIResponse = {
    choices?: {
        message?: {
            content?: string;
        };
    }[];
};
