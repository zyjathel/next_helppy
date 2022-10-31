import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { Board } from "./Board";
import { Cheat } from "./Cheat";
import { History } from "./History";
import { AuthenticatedAppState, useAppStore, useGameStore } from "../store/store";
import { BaseButton } from "./BaseButton";

export const Game: FC<{}> = () => {
  const username = useAppStore((state) => (state as AuthenticatedAppState).username);

  const seed = useGameStore((state) => state.seed);
  const board = useGameStore((state) => state.board);

  const isGameOver = useGameStore((state) => state.isOver);

  const history = useGameStore((state) => state.history);

  const next = useGameStore((state) => state.next, shallow);

  const restart = useGameStore((state) => state.shuffle, shallow);

  useEffect(restart, [restart]);

  return (
    <div className="bg-slate-50 flex h-screen w-screen flex-col">
      <div className="bg-slate-100 text-xl py-4 px-10">
        <h1>{username}'s Game</h1>
      </div>
      <div className="p-10">
        {isGameOver && (
          <p className="p-4 bg-purple-100 my-8 text-lg">The game took {history.length} turns.</p>
        )}
        <BaseButton onClick={restart} color="orange">
          Restart
        </BaseButton>
      </div>
      <div className="p-10">
        <Board data={board} heading={seed} marked={new Set(history)} />
      </div>
      <div className="p-10">
        <BaseButton color="blue" onClick={() => next()} disabled={isGameOver}>
          Next
        </BaseButton>
      </div>
      <div className="p-10">
        <Cheat onConfirm={next} disabled={isGameOver} />
      </div>
      {history.length > 0 && (
        <div className="p-10">
          <History data={history} />
        </div>
      )}
    </div>
  );
};
