"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap mb-4">
          <div className="font-bold mb-2">
            {message.role === "user" ? (
              <span className="text-3xl">👨‍💻 :</span>
            ) : (
              <span className="text-3xl">🧞‍♀️:</span>
            )}
          </div>

          {message.parts.map((part, i) => {
            if (part.type === "text") {
              return (
                <div key={`${message.id}-${i}`} className="mb-2">
                  {part.text}
                </div>
              );
            }

            if (part.type === "tool-db") {
              return (
                <div
                  key={`${message.id}-${i}`}
                  className="my-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800"
                >
                  <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                    Database Query
                  </div>

                  {(part.input as any)?.query && (
                    <pre className="text-xs bg-white dark:bg-zinc-900 p-2 rounded mb-2 overflow-x-auto">
                      {(part.input as any).query}
                    </pre>
                  )}

                  {part.state === "output-available" && (
                    <div className="text-sm text-green-700 dark:text-green-300">
                      ☑️ Returned {(part.output as any)?.rows?.length ?? 0} rows
                    </div>
                  )}
                </div>
              );
            }

            if (part.type === "tool-schema") {
              return (
                <div
                  key={`${message.id}-${i}`}
                  className="my-2 p-3 bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800"
                >
                  <div className="font-semibold text-purple-700 dark:text-purple-300">
                    Schema Tool
                  </div>

                  {part.state === "output-available" && (
                    <div className="text-sm text-green-700 dark:text-green-300 py-2">
                      ☑️ Schema Loaded
                    </div>
                  )}
                </div>
              );
            }

            if (part.type === "step-start") {
              return (
                <div
                  key={`${message.id}-${i}`}
                  className="text-sm text-gray-500 dark:text-gray-400 my-4"
                >
                  🔄 Processing...
                </div>
              );
            }

            return null;
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
