import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shuffle, calculateWinningStates, randomIntFromInterval } from "./utils";

type Game = {
  isOver: boolean;
  history: number[];
  // null is the *free* one
  board: (number | null)[];
  next(number?: number): void;
  shuffle(): void;
  seed: string;
  rangeBasedOnSeed: number;
  winningStates: number[][];
};

export const useGameStore = create<Game>()(
  devtools(
    persist(
      immer((set, get) => ({
        isOver: false,
        history: [],
        board: [],
        seed: "BINGO",
        shuffle: () => {
          let board: (number | null)[] = [];
          const { seed, rangeBasedOnSeed: range } = get();
          for (let i = 0; i < seed.length; i++) {
            const candidates = Array.from(Array(range).keys()).map((x) => x + 1 + range * i);
            const shuffledSlice = shuffle(candidates).slice(0, seed.length);
            // .sort((a, b) => a - b);

            board = [...board, ...shuffledSlice];
          }
          board[Math.floor(board.length / 2)] = null;
          set((state) => {
            state.board = board;
            state.history = [];
            state.winningStates = calculateWinningStates(seed.length);
            state.isOver = false;
          });
        },
        next: (number) => {
          const { seed, rangeBasedOnSeed: range, history, winningStates, board, isOver } = get();

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
            state.history.push(roll);
          });

          const hasGameFinished = winningStates.some((indices) =>
            indices.every((index) => board[index] === null || history.includes(board[index]!)),
          );

          if (hasGameFinished) {
            set((state) => {
              state.isOver = true;
            });
          }
        },
        rangeBasedOnSeed: 15,
        winningStates: [],
      })),
    ),
  ),
);
