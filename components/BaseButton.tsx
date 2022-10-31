import classNames from "classnames";
import { FC } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

const fullConfig = resolveConfig(tailwindConfig);

export type BaseButtonProps = {
  color: string;
} & Omit<JSX.IntrinsicElements["button"], "className">;

export const BaseButton: FC<BaseButtonProps> = ({ color, ...props }) => {
  return (
    <button
      className={classNames("px-4 py-1 rounded-sm  disabled:cursor-not-allowed disabled:bg-gray-300")}
      style={{
        //@ts-ignore
        backgroundColor: fullConfig.theme?.colors?.[color]?.["200"] ?? "white",
      }}
      {...props}
    ></button>
  );
};
