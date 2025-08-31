import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

async function fetchSummary(text: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Summarize the following text: ${text}`,
        config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
        },
    });
    return response;
}

export async function POST(request: Request) {
    const { description } = await request.json();
    const { text } = await fetchSummary(description);
    if (!text) {
        return NextResponse.json({ error: 'Summary not found' }, { status: 404 });
    }
    return NextResponse.json(text);
}