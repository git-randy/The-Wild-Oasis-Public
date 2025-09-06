"use client"

import Image from "next/image";
import { useRef, useState } from "react";
import ChatModal from "~/app/_components/ChatModal";
import chatBubble from "~/public/chat_bubble.png";
import {openai} from "@ai-sdk/openai"

export type ChatEntry = {
  name: string;
  message: string;
}

function AISupportChat() {
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([])

  const model = useRef(openai("gpt-5"))

  console.log(model)

  return (
    <>
      {chatOpen ? (
        <ChatModal
          setChatOpen={setChatOpen}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}/>
      ) : (
        <Image
          src={chatBubble}
          alt="chat"
          height={64}
          width={64}
          className="fixed bottom-5 right-5 cursor-pointer"
          onClick={() => setChatOpen(prev => !prev)}
        />
      )}
    </>
  );
}

export default AISupportChat;
