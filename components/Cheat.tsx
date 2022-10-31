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
      className="flex items-center h-full w-full text-sm"
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
        disabled={disabled}
        placeholder="Type a number here"
        className="py-2 px-2 rounded-sm  border-b-2  font-mono border-gray-800 focus:border-none"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <BaseButton
        color="yellow"
        disabled={disabled}
        onClick={() => {
          onConfirm(parseInt(input));
        }}
      >
        Cheat
      </BaseButton>
    </div>
  );
};
