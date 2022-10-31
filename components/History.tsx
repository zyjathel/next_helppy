import { FC } from "react";

export const History: FC<{ data: number[] }> = ({ data }) => {
  return (
    <div className="flex flex-col">
      <p className="text-md">Previous numbers:</p>
      <p className="font-mono italic text-sm">
        {data.map((x, i) => (
          <span key={i}> {x} </span>
        ))}
      </p>
    </div>
  );
};
