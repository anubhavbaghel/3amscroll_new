"use server";

import { genAI, SIGNAL_FILTER_MODEL_CONFIG, SIGNAL_FILTER_SYSTEM_PROMPT } from "./config";

export async function filterSignals(query: string, mode: "trend" | "context" | "noise") {
    try {
        const model = genAI.getGenerativeModel({
            model: SIGNAL_FILTER_MODEL_CONFIG.model,
            systemInstruction: SIGNAL_FILTER_SYSTEM_PROMPT,
        });

        const chat = model.startChat(SIGNAL_FILTER_MODEL_CONFIG);

        let prompt = "";
        switch (mode) {
            case "trend":
                prompt = `Research EMERGING TRENDS for the following query: "${query}". Focus on detecting signals that are authentic and high-authority. Filter out generic SEO noise.`;
                break;
            case "context":
                prompt = `Provide DEEP CONTEXT and DATA POINTS for the following topic: "${query}". Find the "Signal" that makes this relevant for the Gen Z digital sanctuary.`;
                break;
            case "noise":
                prompt = `Analyze the following information/topics and identify the "NOISE": "${query}". Explain why these points are low-authority or purely commercial, and suggest the "SIGNAL alternative".`;
                break;
        }

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Signal Filter Error:", error);
        throw new Error("Failed to filter signals. The algorithm is currently noisy.");
    }
}
