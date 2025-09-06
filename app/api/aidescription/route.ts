import {NextResponse} from 'next/server';
import { GoogleGenAI } from '@google/genai';

async function fetchAidDescription(title: string) {
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:`Generate a description for the following title: ${title}`,
        config: {
        thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
    });
    return response;
}

export async function POST(request: Request) {
    const { title } = await request.json();
    // Fetch the aid description based on the title
    const {text} = await fetchAidDescription(title);
    if (!text) {
        return NextResponse.json({ error: 'Aid description not found' }, { status: 404 });
    }
    return NextResponse.json(text);
}