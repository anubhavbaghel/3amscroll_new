import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: NextRequest) {
    try {
        const { title, content } = await req.json();

        if (!title && !content) {
            return NextResponse.json({ error: "Title or content is required to generate SEO suggestions." }, { status: 400 });
        }

        const prompt = `
        You are an expert SEO specialist. Analyze the following article title and content.
        
        Title: ${title}
        Content (in HTML or plain text): ${content}
        
        Generate the following highly optimized SEO fields:
        1. A single 'focus_keyword' (1-3 words) that best represents the core topic and has good search intent.
        2. An engaging 'seo_title' under 60 characters. Do not include a brand suffix (e.g. "| 3AM SCROLL"), I will add that manually. Keep it intriguing but accurate.
        3. A precise 'seo_description' between 120 and 155 characters. It should summarize the article and compel the user to click.
        4. A short, descriptive 'cover_image_alt' text for accessibility and image search optimization (max 10 words).
        
        Return the response EXACTLY as a strict JSON object with these exact string keys: "focus_keyword", "seo_title", "seo_description", "cover_image_alt".
        Do not include any Markdown formatting, explanations, or codeblocks in your response. Just the JSON.
        `;

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();

        // Strip backticks if the model accidentally includes them
        if (text.startsWith("```json")) {
            text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        } else if (text.startsWith("```")) {
            text = text.replace(/^```\s*/, "").replace(/\s*```$/, "");
        }

        const data = JSON.parse(text);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Magic Fill API Error:", error);
        return NextResponse.json({ error: "Failed to generate SEO suggestions." }, { status: 500 });
    }
}
