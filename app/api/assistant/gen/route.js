import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { createGenerationPrompt } from "../../../prompts/assistant";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req) {
    const { intent } = await req.json();
    const payload = createGenerationPrompt('swift', intent);

    console.debug(payload);

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: "codellama",
        stream: true,
        temperature: 0.0,
        messages: payload,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
