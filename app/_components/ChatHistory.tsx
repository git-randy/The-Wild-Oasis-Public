"use client";

import { memo, useEffect, useRef } from "react";
import { ChatEntry } from "~/app/_blueprints/chat";

type ChatHistoryProps = {
  chatHistory: ChatEntry[];
};

const Entry = ({
  name,
  message,
}: {
  name: string;
  message: string;
}): JSX.Element => {
  const position = name === "Noah" ? "self-start" : "self-end";
  return (
    <div className={`${position} border rounded-lg p-2 m-1 max-w-[80%]`}>
      <span className="flex justify-center text-xs font-semibold">{name}</span>
      <p>{message}</p>
    </div>
  );
};

const ChatHistory = memo(({ chatHistory }: ChatHistoryProps) => {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    divRef.current?.scrollIntoView({behavior: "smooth"})
  }, [chatHistory])

  return (
    <>
      <div className="flex flex-col overflow-y-auto gap-6">
        {chatHistory.length === 0 ? (
          <p className="flex justify-center opacity-50">Hi! I&apos;m Noah. How can I help?</p>
        ) : (
          chatHistory.map((entry) => {
            return (
              <Entry
                key={entry.message}
                name={entry.name}
                message={entry.message}
              />
            );
          })
        )}
        <div className="w-0 h-0" ref={divRef}></div>
      </div>
    </>
  );
});

ChatHistory.displayName = "ChatHistory";
export default ChatHistory;
