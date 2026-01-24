import { AI_MODEL, OPENROUTER_API } from "./constants";

export const cleanText = (text: string) => {
    return text
        .replace(/```[\s\S]*?```/g, "") // remove fenced code blocks
        .replace(/`/g, "")              // remove inline backticks
        .trim();
};

export const buildCodeValidationPrompt = (code: string) => `
Is this FRONTEND UI code (HTML, JSX, CSS)?

Reply ONLY with:
VALID or INVALID

Input:
${code}
`;

export const buildImageValidationPrompt = () => `
Is this image a screenshot of a software UI?

Reply ONLY with:
VALID or INVALID
`;

export const buildCodeReviewPrompt = () => `
You are a senior frontend engineer performing a critical UI code review.
                        
Each field has a strict responsibility:

UI:
- Visual design and interaction improvements

Accessibility:
- Accessibility improvements only

Code:
- Architecture and maintainability suggestions

Rules:
- Do NOT describe what the code does
- Do NOT repeat the input
- Do not suggest improvements that already exist in the input code
- Avoid recommending semantic tags or attributes that already exist
- No markdown
- No code blocks
- Never leave fields empty
- Be concise and actionable

Return ONLY valid JSON:

{
    "ui": "string",
    "accessibility": "string",
    "code": "string"
}
`;

export const buildImageReviewPrompt = () => `
You are a senior UI/UX reviewer analyzing a screenshot of a user interface.
                        
Provide feedback in three categories:

UI:
- Visual design and layout improvements

Accessibility:
- Accessibility and usability issues visible in the UI

Code:
- Implementation suggestions inferred from the UI

Rules:
- Do not describe the image
- Do not repeat obvious elements
- Be concise and actionable
- No markdown
- No code blocks
- Never leave fields empty

Return ONLY valid JSON:

{
    "ui": "string",
    "accessibility": "string",
    "code": "string"
}
`;

export const callAI = async (payload: any) => {

    const res = await fetch(OPENROUTER_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://ai-ui-reviewer.vercel.app",
            "X-Title": "ReviewUI",
        },
        body: JSON.stringify({
            model: AI_MODEL,
            ...payload
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("OpenRouter RAW ERROR:", err);
        throw new Error("AI request failed");
    }

    return res.json();
};

export const validateInput = async (messages) => {
    const res = await callAI({ messages });
    const verdict = res.choices?.[0]?.message?.content
        ?.trim()
        .toUpperCase();

    return !verdict?.includes("INVALID");
};