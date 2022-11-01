import { FC, useEffect, useRef, useState } from "react";

type UsernameInputProps = {
  onConfirm: (name: string) => void;
};
export const UsernameInput: FC<UsernameInputProps> = ({ onConfirm }) => {
  const [input, setInput] = useState<string>("");

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onConfirm(input);
      }
    };
    // auto-complete
    // maybe there is a better way
    if (ref.current) {
      setInput(ref.current.value);
      ref.current.focus();
    }
    document.addEventListener("keydown", handleEnter);
    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, [input, onConfirm]);

  return (
    <div className="h-screen w-screen bg-slate-100 items-center  justify-center flex  flex-col  font-mono">
      <div
        className=" text-4xl flex flex-col h-2/3 justify-center items-baseline"
        tabIndex={0}
        onKeyDown={(e) => {}}
      >
        <label className="my-4 text-2xl" htmlFor="username">
          Type your username:
        </label>
        <input
          autoFocus
          autoComplete="off"
          ref={ref}
          className="p-2 rounded-md text-gray-700 focus:border focus:border-blue-500 bg-zinc-50"
          type="text"
          name="username"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(e, 1);
              onConfirm(input);
            }
          }}
        ></input>
      </div>
      <div className="h-1/3 w-full flex justify-center text-lg">
        {input?.trim()?.length > 0 && <p className=" animate-bounce">Press enter when ready.</p>}
      </div>
    </div>
  );
};
