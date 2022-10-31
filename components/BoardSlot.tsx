import classNames from "classnames";
import { FC } from "react";

export const BoardSlot: FC<{ text: string; marked: boolean }> = ({ text, marked }) => {
  return <div className={classNames(" p-2", marked ? "bg-green-200" : "bg-gray-100")}>{text}</div>;
};
