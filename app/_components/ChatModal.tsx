import { MinusSmallIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction } from "react";
import { ChatEntry } from "~/app/_components/AISupportChat";

type ChatModalProps = {
  setChatOpen: Dispatch<SetStateAction<boolean>>;
  chatHistory: ChatEntry[];
  setChatHistory: Dispatch<SetStateAction<ChatEntry[]>>;
};

const SAMPLE_CHAT = [
  "Hello", "How are you?", "I'm doing well, thanks", "How are the kids?"
]

function ChatModal({
  setChatOpen,
  chatHistory,
  setChatHistory,
}: ChatModalProps) {
  return (
    <div className="fixed bottom-5 right-5 h-96 w-96 bg-gray-800">
      <div className="flex flex-row justify-between border-b-4 border-accent-700">
        <p>Cabin Support</p>
        <MinusSmallIcon
          className="size-8 cursor-pointer"
          onClick={() => setChatOpen((prev) => !prev)}
        />
      </div>
      <form className="w-auto h-full">
        <input
          type="text"
          placeholder="Ask your questions here..."
          className="bg-gray-800 border-s-gray-400 w-full"
        />
      </form>
    </div>
  );
}

export default ChatModal;
