import { FC, useEffect, useState } from "react";
import { BaseButton } from "./BaseButton";

export const Cheat: FC<{
  onConfirm: (number: number) => void;
  disabled?: boolean;
}> = ({ onConfirm, disabled = false }) => {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (disabled) {
      setInput("");
    }
  }, [disabled]);

  return (
    <div
      className="flex items-start h-full w-full text-sm"
      onKeyDown={(e) => {
        if (disabled) {
          return;
        }
        if (e.key === "Enter") {
          onConfirm(parseInt(input));
        }
      }}
    >
      <input
        type="number"
        pattern="[0-9]+"
        disabled={disabled}
        placeholder="Type a number..."
        className="py-0.5 mr-1 px-2 rounded-sm  border-b  font-mono border-gray-700 focus:border-none  invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 bg-zinc-100"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <BaseButton
        color="yellow"
        disabled={disabled || input.length === 0}
        onClick={() => {
          onConfirm(parseInt(input));
        }}
      >
        Cheat
      </BaseButton>
    </div>
  );
};
