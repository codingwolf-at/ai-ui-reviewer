import { NextResponse } from "next/server";

const cleanText = (text: string) => {
    return text
        .replace(/```[\s\S]*?```/g, "") // remove fenced code blocks
        .replace(/`/g, "")              // remove inline backticks
        .trim();
};

// "mistralai/mistral-7b-instruct",
//  "nousresearch/hermes-2-pro",

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, code, image } = body;

        if (type === "code" && !code) {
            return NextResponse.json(
                { error: "Missing code input" },
                { status: 400 }
            );
        }

        if (type === "image" && !image) {
            return NextResponse.json(
                { error: "Missing image input" },
                { status: 400 }
            );
        }

        let messages;
        let model;

        if (type === "image") {
            model = "openai/gpt-4o-mini";
            messages = [
                {
                    role: "system",
                    content: `
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
                    `
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Review this UI screenshot" },
                        {
                            type: "image_url",
                            image_url: {
                                url: image
                            }
                        }
                    ]
                }
            ];
        } else {
            model = "mistralai/mistral-7b-instruct";
            messages = [
                {
                    role: "system",
                    content: `
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
                    `
                },
                {
                    role: "user",
                    content: `Review this UI code:\n${code}`
                }
            ];
        };

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                temperature: 0.2,
                max_tokens: 500
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error("HF ERROR:", err);
            throw new Error("HF request failed");
        }

        const data = await res.json();
        let content = data.choices?.[0]?.message?.content ?? "{}";
        content = content.replace(/```json|```/g, "").trim();

        // Extract JSON between first { and last }
        const jsonMatch = content.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("Model did not return JSON");
        }

        const parsed = JSON.parse(jsonMatch[0]);

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
            { error: "Failed to analyze UI" },
            { status: 500 }
        );
    }
}
