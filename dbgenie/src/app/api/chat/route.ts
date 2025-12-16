import { groq } from "@/lib/grok";
import { streamText, UIMessage, convertToModelMessages, tool } from 'ai';
import { log } from "console";
import z from "zod";

//Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const SYSTEM_PROMPT = `You are an expert SQL assistant that helps users to query their database using natural language.
  You have access to following tools:
    1. schema tool - call this  tool to get the database schema   which will help you to write sql query.
    2. db tool - call this tool to query the database.
  
  
  Rules:
  - Generate ONLY SELECT queries( no INSERT, UPDATE, DELETE, DROP)
  - Return valid SQLite syntax
  
  Always respond in a helpful, conversational tone while being technically accurate.`;

  const result = streamText({
    model: groq("llama-3.1-8b-instant"),
    messages: convertToModelMessages(messages),
    system: SYSTEM_PROMPT,
    tools: {
      db: tool({
        description: 'Call this tool to query a database',
        inputSchema: z.object({
          query: z.string().describe('SQL QUERY to be ran'),
        }),
        execute: async ({ query }) => {
          console.log('Query', query);

          return ;
          
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}