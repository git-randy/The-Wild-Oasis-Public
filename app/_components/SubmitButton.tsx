"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingText?: string;
  disabled?: boolean;
};

function SubmitButton({
  disabled = false,
  children,
  pendingText = "Updating...",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800
          font-semibold hover:bg-accent-600 transition-all
          disabled:cursor-not-allowed disabled:bg-gray-500
          disabled:text-gray-300"
      disabled={disabled || pending}
    >
      {pending ? pendingText : children}
    </button>
  );
}

export default SubmitButton;
