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
  - Always use the schema provided by the schema tool
  - Return valid SQLite syntax
  
  Always respond in a helpful, conversational tone while being technically accurate.`;

  const result = streamText({
    model: groq("llama-3.1-8b-instant"),
    messages: convertToModelMessages(messages),
    system: SYSTEM_PROMPT,
    tools: {
      schema: tool({
        description: 'Call this tool to get database schema information.',
        inputSchema: z.object({ }),
        execute: async () => {
          return `CREATE TABLE products (
          	id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
          	name text NOT NULL,
          	category text NOT NULL,
          	price real NOT NULL,
          	stock integer DEFAULT 0 NOT NULL,
          	created_at text DEFAULT CURRENT_TIMESTAMP
         );
         --> statement-breakpoint
          CREATE TABLE sales (
          	id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
          	product_id integer NOT NULL,
          	quantity integer NOT NULL,
          	total_amount real NOT NULL,
          	sale_date text DEFAULT CURRENT_TIMESTAMP,
          	customer_name text NOT NULL,
          	region text NOT NULL,
          	FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE no action ON DELETE no action
          );
        `;
        },
      }),
      db: tool({
        description: 'Call this tool to query a database',
        inputSchema: z.object({
          query: z.string().describe('SQL QUERY to be ran'),
        }),
        execute: async ({ query }) => {
          console.log('Query', query);

          return query ;
          
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}