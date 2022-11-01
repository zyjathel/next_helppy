import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { calculateWinningStates, generateBoard, randomIntFromInterval } from "./utils";

export type GameType = {
  isOver: boolean;
  numberHistory: number[];
  startedAt: number | null;
  endedAt: number | null;
  // null is the *free* one
  board: (number | null)[];
  next(number?: number): void;
  shuffle(): void;
  seed: string;
  range: number;
  winningStates: number[][];
  updateSeed: (seed: string) => void;
  transpose: () => void;
  resume: (state: GameInitProps) => void;
};

export type GameInitProps = Pick<GameType, "board" | "numberHistory" | "startedAt" | "seed" | "range">;

export const useGameStore = create<GameType>()(
  devtools(
    // persist(
    immer((set, get) => ({
      isOver: false,
      numberHistory: [],
      board: [],
      startedAt: null,
      endedAt: null,
      seed: "BINGO",
      resume: (prevState) => {
        set((state) => {
          state.board = prevState.board;
          state.startedAt = prevState.startedAt;
          state.numberHistory = prevState.numberHistory;
          state.seed = prevState.seed;
          state.range = prevState.range;
          state.winningStates = calculateWinningStates(prevState.seed.length);
        });
      },
      shuffle: () => {
        const { seed, range } = get();
        const board = generateBoard({ seed, range });

        set((state) => {
          state.board = board;
          state.numberHistory = [];
          state.winningStates = calculateWinningStates(seed.length);
          state.isOver = false;
          state.startedAt = Date.now();
        });
      },
      next: (number) => {
        const { seed, range: range, numberHistory: history, winningStates, board, isOver } = get();

        if (isOver) {
          return;
        }

        let roll: number;

        if (number) {
          if (history.includes(number)) {
            return;
          } else {
            roll = number;
          }
        } else {
          roll = randomIntFromInterval(1, range * seed.length);
          while (history.includes(roll)) {
            roll = randomIntFromInterval(1, range * seed.length);
          }
        }

        set((state) => {
          state.numberHistory.push(roll);
        });

        const hasGameFinished = winningStates.some((indices) =>
          indices.every((index) => board[index] === null || get().numberHistory.includes(board[index]!)),
        );

        if (hasGameFinished) {
          set((state) => {
            state.isOver = true;
            state.endedAt = Date.now();
          });
        }
      },
      range: 15,
      winningStates: [],
      transpose: () => {
        const { board, seed } = get();
        const newBoard = Array(board.length);
        for (let i = 0; i < seed.length; i++) {
          for (let j = 0; j < seed.length; j++) {
            newBoard[i * seed.length + j] = board[j * seed.length + i];
          }
        }
        set((state) => {
          state.board = newBoard;
        });
      },
      updateSeed: (seed) => {
        set((state) => {
          state.seed = seed;
        });
        get().shuffle();
      },
    })),
    // ),
  ),
);
