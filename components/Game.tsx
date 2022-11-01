import { FC, useEffect, useState } from "react";
import { animated, config, useSpring } from "react-spring";
import shallow from "zustand/shallow";
import { GameInitProps, useGameStore } from "../store/store";
import { BaseButton } from "./BaseButton";
import { Board } from "./Board";
import { Celebrate } from "./Celebrate";
import { Cheat } from "./Cheat";
import { Landing } from "./Landing";

const NextNumber: FC<{}> = () => {
  const [isOver, controlledNext] = useGameStore((state) => [state.isOver, state.controlledNext], shallow);

  const [handle, setHandle] = useState<Exclude<ReturnType<typeof controlledNext>, undefined>>();

  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { number } = useSpring({
    reset: false,
    reverse: false,
    from: { number: 0 },
    number: handle?.roll,
    delay: 100,
    config: config.molasses,
    onRest: () => {
      if (!handle) return;
      setIsAnimating(false);
      handle.start();
    },
    onStart: () => {
      setIsAnimating(true);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-2">
        <div className={isAnimating ? "invisible" : "visible"}>
          <BaseButton
            color="emerald"
            onClick={() => {
              const next = controlledNext();
              if (!next) {
                return;
              }
              setHandle(next);
            }}
            disabled={isOver}
          >
            Next
          </BaseButton>
        </div>
      </div>

      <div className=" text-8xl font-mono font-bold py-3 ">
        <animated.div className="p-4">{number.to((n) => n.toFixed(0))}</animated.div>
      </div>
    </div>
  );
};

const GameOver: FC<{}> = () => {
  return <div></div>;
};

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
      <div className="px-10 py-4 w-full">
        <NextNumber />
      </div>
      <div className="px-10 py-12">
        <Cheat onConfirm={next} disabled={isOver} />
      </div>
    </div>
  );
};
