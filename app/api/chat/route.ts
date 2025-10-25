import { createOpenAI } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

export const maxDuration = 30;

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
