"use client";

import { KeyboardEvent, memo, useRef, useState } from "react";
import { MinusSmallIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import chatBubble from "~/public/chat_bubble.png";
import ChatHistory from "~/app/_components/ChatHistory";
import { ChatEntry } from "~/app/_blueprints/chat";
import { useAuth } from "~/app/_context/AuthContext";

const AISupportChat = memo(() => {
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleInput = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const userInput = inputRef.current.value;
      inputRef.current.value = "";
      const username = user?.name || "Guest";

      setChatHistory((prev) => [
        ...prev,
        { name: username, message: userInput },
      ]);

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      const { text } = await res.json();

      setChatHistory((prev) => [...prev, { name: "Noah", message: text }]);
    }
  };

  if (!chatOpen) {
    return (
      <Image
        src={chatBubble}
        alt="chat"
        height={64}
        width={64}
        className="fixed bottom-5 right-5 cursor-pointer"
        onClick={() => {
          setChatOpen((prev) => !prev);
        }}
      />
    );
  } else {
    return (
      <div className="grid grid-rows-[2rem_3fr_2rem] fixed bottom-5 right-5 max-h-[520px] max-w-[520px] h-full w-full bg-gray-800">
        <div className="flex flex-row justify-between border-b-4 border-accent-700">
          <p>Cabin Support</p>
          <MinusSmallIcon
            className="size-8 cursor-pointer"
            onClick={() => setChatOpen((prev) => !prev)}
          />
        </div>
        <ChatHistory chatHistory={chatHistory} />
        <input
          ref={inputRef}
          name="message"
          type="text"
          placeholder="Ask your questions here..."
          className="bg-gray-800 w-full border-t-2 border-t-accent-600 outline-none"
          onKeyDown={(e) => handleInput(e)}
        />
      </div>
    );
  }
});

AISupportChat.displayName = "AISupportChat";
export default AISupportChat;
