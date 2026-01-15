import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { code } = body;

    // fake delay to simulate AI
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(code);

    return NextResponse.json({
        ui: "The layout structure looks clean, but spacing could be more consistent.",
        accessibility: "Consider adding aria-labels to interactive elements.",
        code: "You can extract repeated styles into reusable components.",
        receivedLength: code.length,
    });
}
