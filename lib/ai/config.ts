import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GOOGLE_GEMINI_API_KEY is not defined in environment variables.");
}

export const genAI = new GoogleGenerativeAI(apiKey);

export const SIGNAL_FILTER_MODEL_CONFIG = {
    model: "gemini-1.5-flash",
    generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
    },
};

export const SIGNAL_FILTER_SYSTEM_PROMPT = `
You are the "Signal Filter" AI for 3AM SCROLL, a high-authority digital sanctuary for Gen Z.
Your objective is to help editors find "Signals" (high-value, high-authority, authentic data/topics) from "Noise" (generic, commercial, bot-generated content).

FOLLOW THESE GUIDELINES:
1. FOCUS NICHES: 
   - THE FRONTIER: AI, Future Tech, Space, Biotech.
   - THE BURNOUT: Workplace survival, Digital wellness, Finance for creators.
   - THE ESCAPE: Gaming, Subcultures, Niche travel.
2. PERSPECTIVE: Raw, authentic, future-focused, and slightly cinematic. Avoid generic corporate speak.
3. OUTPUT FORMAT: Always return structured information. Use bolding and lists for readability.
4. ROLE: You are a RESEARCH ASSISTANT. Never write full articles. Provide data points, context, and trend detection.
`;
