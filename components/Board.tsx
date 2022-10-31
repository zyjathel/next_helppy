import { FC } from "react";
import { BoardHeadingSlot, BoardNumberSlot } from "./BoardSlot";

export const Board: FC<{ data: (number | null)[]; heading: string; marked: Set<number> }> = ({
  data,
  heading,
  marked,
}) => {
  // an option to render heading can be added
  const columnsCount = heading.length;
  const rowsCount = data.length / columnsCount;

  return (
    <div
      className="grid font-mono border border-gray-500"
      style={{ gridTemplateColumns: `1fr `.repeat(columnsCount), gridTemplateRows: `1fr`.repeat(rowsCount) }}
    >
      {heading.split("").map((char, i) => (
        <BoardHeadingSlot key={i} text={char} />
      ))}
      {data.map((numberOrNull, i) => (
        <BoardNumberSlot
          key={i}
          text={numberOrNull ? numberOrNull.toString() : "*"}
          marked={numberOrNull ? marked.has(numberOrNull) : true}
        />
      ))}
    </div>
  );
};
