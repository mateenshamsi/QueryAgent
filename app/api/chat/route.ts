import { createGroq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages, UIMessage, tool } from 'ai';
import {z} from 'zod'
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!, // your OpenRouter key
  });

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
 const SYSTEM_PROMPT = `You are an expert SQL Assistant that converts natural language into SQL.
Rules:
1. Generate only SELECT queries.
2. Only use tables and columns from the schema.
3. No INSERT, UPDATE, DELETE, DROP allowed.
4. Always return valid SQL.
5. Use JOINs, WHERE, GROUP BY, ORDER BY only if necessary.
6. Queries must never modify the database.

You have access to the following tools:
1. schema - Call this tool to get the database schema to help write queries.
2. db - Call this tool to execute the query and get results.`;

  const result = streamText({
    model: groq('llama-3.1-8b-instant') , 
    messages: convertToModelMessages(messages),
    system:SYSTEM_PROMPT,
    tools: {
      db: tool({
        description: "Call this tool to query a database",
        inputSchema: z.object({
          query: z.string().describe('The SQL query to execute')
        }),
        execute: async ({ query }: { query: string }) => {
          console.log(query);
          // TODO: run the query against your DB and return actual results
          return { rows: [] };
        }

      }),
    }
  });

  return result.toUIMessageStreamResponse();
}
