import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { GameInitProps, useGameStore } from "../store/store";
import { BaseButton } from "./BaseButton";
import { Board } from "./Board";
import { Cheat } from "./Cheat";
import { Landing } from "./Landing";

const NextNumber: FC<{ value: number }> = () => {
  return <div></div>;
};

export const Game: FC<{ initState?: GameInitProps }> = ({ initState }) => {
  const [seed, board, isGameOver, next, restart, history, resume] = useGameStore(
    (state) => [
      state.seed,
      state.board,
      state.isOver,
      state.next,
      state.shuffle,
      state.numberHistory,
      state.resume,
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
      <div className="px-10 py-4">
        {/* {isGameOver && (
          <p className="p-4 bg-purple-100 my-8 text-lg">The game took {history.length} turns.</p>
        )} */}
        <BaseButton onClick={restart} color="orange">
          Restart
        </BaseButton>
      </div>
      <div className="px-10 py-4">
        <Board data={board} heading={seed} marked={new Set(history)} />
      </div>
      <div className="px-10 py-4">
        <BaseButton color="blue" onClick={() => next()} disabled={isGameOver}>
          Next
        </BaseButton>
      </div>
      <div className="px-10 py-12">
        <Cheat onConfirm={next} disabled={isGameOver} />
      </div>
      {/* {history.length > 0 && (
        <div className="p-10">
          <History data={history} />
        </div>
      )} */}
    </div>
  );
};
