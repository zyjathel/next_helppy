import { FC, useEffect, useRef, useState } from "react";
import shallow from "zustand/shallow";
import { useAppStore, useGameStore } from "../store/store";

export const Landing: FC<{}> = () => {
  const username = useAppStore((state) => state.username);
  const [seed, updateSeed] = useGameStore((state) => [state.seed, state.updateSeed], shallow);
  //null means non-editable
  const [seedInput, setSeedInput] = useState<string | null>(null);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (seedInput) {
      ref.current?.focus();
    }
  }, [seedInput]);

  if (!username) {
    throw new Error("This should not happen.");
  }

  return (
    <div className="text-3xl tracking-wider border-b-2 border-gray-800 py-2">
      <h1>
        {username}
        's
        {seedInput === null ? (
          <span
            className="relative hover:bg-orange-500 hover:cursor-caret transition-colors hover:text-zinc-50 px-2 hover:py-1 text-orange-500 italic font-bold"
            onClick={() => {
              setSeedInput(seed);
            }}
          >
            {seed.toUpperCase()}
          </span>
        ) : (
          <input
            ref={ref}
            type="text"
            className="px-2 py-1 bg-orange-500 text-zinc-50 italic font-bold"
            onBlur={() => {
              updateSeed(seedInput.toUpperCase());
              setSeedInput(null);
            }}
            onChange={(e) => {
              setSeedInput(e.target.value);
            }}
            value={seedInput.toUpperCase()}
          />
        )}
        Game
      </h1>
    </div>
  );
};
