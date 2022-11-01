import { Component, FC, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import shallow from "zustand/shallow";
import { GameInitProps, GameType, useGameStore } from "../store/store";
import { BaseButton } from "./BaseButton";
import { Board } from "./Board";
import { Celebrate } from "./Celebrate";
import { Cheat } from "./Cheat";
import { Landing } from "./Landing";

const NextNumber: FC<{ value: number; show: boolean }> = ({ value, show }) => {
  return <div className="fixed bottom-3 border border-gray-800 font-mono text-4xl">{value}</div>;
};

// type BingoProps = Pick<
//   GameType,
//   "seed" | "board" | "isOver" | "next" | "shuffle" | "numberHistory" | "transpose"
// >;

// const Bingo: FC<BingoProps> = ({
//   seed,
//   shuffle: restart,
//   transpose,
//   isOver,
//   board,
//   numberHistory: history,
//   next,
// }) => {
//   return (
//     <div className="bg-slate-50 flex h-screen w-screen flex-col">
//       <div className="py-4 px-10">
//         <Landing />
//       </div>
//       <div className="px-10 py-4 w-full flex items-center divide-x gap-4">
//         <BaseButton onClick={restart} color="orange">
//           Restart
//         </BaseButton>
//         <BaseButton onClick={transpose} color="blue">
//           Transpose
//         </BaseButton>
//       </div>
//       <div className="px-10 py-4 relative">
//         <Celebrate show={isOver} />
//         <Board data={board} heading={seed} marked={new Set(history)} />
//       </div>
//       <div className="px-10 py-4 w-full flex items-center justify-center">
//         <BaseButton color="emerald" onClick={() => next()} disabled={isOver}>
//           Next
//         </BaseButton>
//       </div>
//       <div className="px-10 py-12">
//         <Cheat onConfirm={next} disabled={isOver} />
//       </div>
//     </div>
//   );
// };

export const Game: FC<{ initState?: GameInitProps }> = ({ initState }) => {
  const [seed, board, isOver, next, shuffle, numberHistory, resume, transpose] = useGameStore(
    (state) => [
      state.seed,
      state.board,
      state.isOver,
      state.next,
      state.shuffle,
      state.numberHistory,
      state.resume,
      state.transpose,
    ],
    shallow,
  );

  useEffect(() => {
    if (initState) {
      resume(initState);
    }
  }, [initState, resume]);

  return (
    <div className="bg-slate-50 flex h-screen w-screen flex-col">
      <div className="py-4 px-10">
        <Landing />
      </div>
      <div className="px-10 py-4 w-full flex items-center divide-x gap-4">
        <BaseButton onClick={shuffle} color="orange">
          Restart
        </BaseButton>
        <BaseButton onClick={transpose} color="blue">
          Transpose
        </BaseButton>
      </div>
      <div className="px-10 py-4 relative">
        <Celebrate show={isOver} />
        <Board data={board} heading={seed} marked={new Set(numberHistory)} />
      </div>
      <div className="px-10 py-4 w-full flex items-center justify-center">
        <BaseButton color="emerald" onClick={() => next()} disabled={isOver}>
          Next
        </BaseButton>
      </div>
      <div className="px-10 py-12">
        <Cheat onConfirm={next} disabled={isOver} />
      </div>
    </div>
  );
};
