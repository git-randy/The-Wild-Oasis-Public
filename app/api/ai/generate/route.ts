import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

const CONTEXT_CONTENT = `
  You help customers plan their stay at one of your cabins located in Stavanger,
  Norway. There are 11 cabins total. There are 3 cabins that can fit 2 guests, 4
  cabins that can fit 4 guests, 2 cabins that can fit 6 guests, 1 cabin that can
  fit 8 guests, and 1 cabin that can fit 10 guests. All cabins have bathrooms, a
  kitchen (with fridge, microwave, and stove), closet, internet connection (wifi and
  ethernet), ironing board, a safe to lock up personal belongings, and views of the
  fjords.`;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const googleAI = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const model = googleAI("gemini-2.5-flash-lite");

  try {
    const { text } = await generateText({
      model,
      messages: [
        { role: "system", content: CONTEXT_CONTENT },
        { role: "user", content: prompt },
      ],
    });

    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
