"use client";

import { memo, useEffect, useRef } from "react";
import { ChatEntry } from "~/app/_blueprints/chat";
import { getLocalTime } from "~/app/_lib/utilities";

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
  const currentTime = getLocalTime("en-US")

  return (
    <div className={`${position} max-w-[80%]`}>
      <div className="flex justify-center opacity-65 text-sm">{currentTime}</div>
      <div className={`border rounded-lg p-2 m-1`}>
        <div>
          <span className="flex justify-center text-xs font-semibold">{name}</span>
          <p>{message}</p>
        </div>
      </div>
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
          chatHistory.map((entry, i) => {
            return (
              <Entry
                key={`${i}. ${entry.message}`}
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
