import classnames from "classnames";
import { FC, useEffect, useState } from "react";
import { animated, config, useSpring } from "react-spring";
import shallow from "zustand/shallow";
import { GameInitProps, useGameStore } from "../store/store";
import { BaseButton } from "./BaseButton";
import { Board } from "./Board";
import { Celebrate } from "./Celebrate";
import { Cheat } from "./Cheat";
import { Landing } from "./Landing";
import prettyMilliseconds from "pretty-ms";

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
        <div className={classnames(isAnimating ? "invisible" : "visible", "transition-all ease-in-out")}>
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

const GameOver: FC<{ show: boolean }> = ({ show }) => {
  const [numberHistory, startedAt, endedAt] = useGameStore(
    (state) => [state.numberHistory, state.startedAt, state.endedAt],
    shallow,
  );
  const [localShow, setShow] = useState<boolean>(show);

  useEffect(() => {
    setShow(show);
  }, [show]);

  if (!localShow) {
    return <></>;
  }

  return (
    <div className="absolute h-full w-full bg-transparent flex justify-center items-center z-20">
      <div className="bg-white border border-dashed border-gray-500 flex flex-col w-1/2 tracking-wider">
        <div className=" bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 px-12 py-2 text-xl rounded-t-sm  justify-between flex">
          <div>Stats</div>
          <div
            className=" text-gray-600 hover:bg-zinc-50 hover:cursor-pointer rounded-sm"
            onClick={() => {
              setShow(false);
            }}
          >
            [x]
          </div>
        </div>
        <div className="divide-y px-12 py-4">
          <section className="py-4">
            <h3 className="mb-4">Rolls</h3>
            <div className="flex">
              {numberHistory.map((n, i) => (
                <div
                  key={i}
                  className="font-mono text-sm px-2 py-0.5 bg-neutral-100 rounded-sm hover:bg-neutral-800 hover:text-neutral-100 mx-1"
                >
                  {n}
                </div>
              ))}
            </div>
          </section>

          <section className="py-4">
            <h3 className="mb-4">Duration</h3>
            <div className="font-mono text-sm px-2 py-0.5">{prettyMilliseconds(endedAt! - startedAt!)}</div>
          </section>
        </div>
      </div>
    </div>
  );
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
    <div className="bg-slate-50 flex flex-col relative">
      <div className="py-4 px-10">
        <Landing />
      </div>
      <div className="px-10 py-4 w-full flex items-center divide-x gap-4">
        <BaseButton onClick={shuffle} color="orange" data-testId="restart">
          Restart
        </BaseButton>
        <BaseButton onClick={transpose} color="blue" data-testId="transpose">
          Transpose
        </BaseButton>
      </div>
      <div className="px-10 py-4 relative">
        <GameOver show={isOver} />
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
