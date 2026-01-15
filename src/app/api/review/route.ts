import { NextResponse } from "next/server";

const cleanText = (text: string) => {
    return text
        .replace(/```[\s\S]*?```/g, "") // remove fenced code blocks
        .replace(/`/g, "")              // remove inline backticks
        .trim();
};

export async function POST(req: Request) {
    try {
        const { code } = await req.json();

        const res = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "google/gemma-2-2b-it",
                    messages: [
                        {
                            role: "system",
                            content: `
                            You are a senior frontend engineer performing a critical UI code review.
                            
                            Your job is NOT to describe the UI.
                            Your job IS to find improvement opportunities.
                            
                            Strict responsibilities:
                            
                            UI:
                            - Point out visual or interaction improvements
                            - Suggest better spacing, hierarchy, feedback states, or layout improvements
                            - Never summarize what exists
                            
                            Accessibility:
                            - Point out missing or improvable accessibility features
                            - Suggest specific improvements (ARIA, keyboard, contrast, semantics)
                            - Never praise or summarize existing behavior
                            
                            Code:
                            - Suggest maintainability, scalability, or structure improvements
                            - Focus on reusability, separation of concerns, naming, and patterns
                            - Never talk about visual design here
                            
                            Rules:
                            - Every field must contain at least one improvement suggestion
                            - Do NOT explain what the code does
                            - Do NOT repeat points across fields
                            - No markdown
                            - No code blocks
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
                            content: `
                      Review this UI code:
                      
                      ${code}
                      `,
                        },
                    ],
                    temperature: 0.2,
                    max_tokens: 300,
                }),
            }
        );

        if (!res.ok) {
            const err = await res.text();
            console.error("HF ERROR:", err);
            throw new Error("HF request failed");
        }

        const data = await res.json();

        const content = data.choices?.[0]?.message?.content ?? "";

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
