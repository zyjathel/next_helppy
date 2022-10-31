import classNames from "classnames";
import { FC } from "react";

type BoardSlotProps = {
  text: string;
  marked: boolean;
};

export const BoardNumberSlot: FC<BoardSlotProps> = ({ text, marked }) => {
  return (
    <div
      className={classNames(
        "p-2 flex justify-center items-center transition-colors ease-in-out text-lg",
        marked ? "bg-gray-700 text-zinc-100" : "bg-white",
      )}
    >
      {text}
    </div>
  );
};
export const BoardHeadingSlot: FC<Pick<BoardSlotProps, "text">> = ({ text }) => {
  return (
    <div
      className={classNames(
        "p-2 text-xl flex justify-center items-center border-b border-gray-700 bg-zinc-100",
      )}
    >
      {text}
    </div>
  );
};
