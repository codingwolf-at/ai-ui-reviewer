import { NextResponse } from "next/server";
// types
import { AIResponse, ChatMessage } from "./types";
// helpers
import { buildCodeReviewPrompt, buildCodeValidationPrompt, buildImageReviewPrompt, buildImageValidationPrompt, callAI, cleanText, validateInput } from "./helpers";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, code, image } = body;

        if (type === "code" && !code) {
            return NextResponse.json(
                { error: "missing_code" },
                { status: 400 }
            );
        }

        if (type === "image" && !image) {
            return NextResponse.json(
                { error: "missing_image" },
                { status: 400 }
            );
        }

        if (type === "code") {
            const isValid = await validateInput([
                { role: "user", content: buildCodeValidationPrompt(code) }
            ])
            if (!isValid) {
                return NextResponse.json(
                    { error: "non_ui_code" },
                    { status: 400 }
                );
            }
        }
        
        if (type === "image") {
            const isValid = await validateInput([
                {
                    role: "user",
                    content: [
                        { type: "text", text: buildImageValidationPrompt() },
                        { type: "image_url", image_url: { url: image } }
                    ]
                }
            ])

            if (!isValid) {
                return NextResponse.json(
                    { error: "non_ui_image" },
                    { status: 400 }
                );
            }
        }

        const messages: ChatMessage[] =
            type === "image"
                ? [
                    { role: "system", content: buildImageReviewPrompt() },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "Review this UI screenshot" },
                            { type: "image_url", image_url: { url: image } }
                        ]
                    }
                ]
                : [
                    { role: "system", content: buildCodeReviewPrompt() },
                    { role: "user", content: `Review this UI code:\n${code}` }
                ];

        const reviewRes: AIResponse = await callAI({
            messages,
            temperature: 0.2,
            max_tokens: 500
        });

        const content = reviewRes.choices?.[0]?.message?.content ?? "{}";

        const start = content.indexOf("{");
        const end = content.lastIndexOf("}");

        if (start === -1 || end === -1) {
            throw new Error("Model did not return JSON");
        }

        const parsed = JSON.parse(content.slice(start, end + 1));

        const safeResult = {
            ui:
                typeof parsed.ui === "string"
                    ? parsed.ui
                    : JSON.stringify(parsed.ui),

            accessibility:
                typeof parsed.accessibility === "string"
                    ? parsed.accessibility
                    : JSON.stringify(parsed.accessibility),

            code:
                typeof parsed.code === "string"
                    ? parsed.code
                    : JSON.stringify(parsed.code),
        };

        const finalResult = {
            ui: cleanText(safeResult.ui) ||
                "No major UI issues detected. Consider improving spacing and visual hierarchy.",

            accessibility: cleanText(safeResult.accessibility) ||
                "No major accessibility issues detected. Consider adding ARIA labels where context is unclear.",

            code: cleanText(safeResult.code) ||
                "Code structure is simple and readable. Consider using reusable components and consistent naming conventions.",
        };

        return NextResponse.json(finalResult);
    } catch (error) {
        console.error("AI ERROR:", error);
        return NextResponse.json(
            { error: "ai_failed" },
            { status: 500 }
        );
    }
}
