import { GameType } from "./game";

// code from web
export function shuffle<T extends any>(array: T[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array as T[];
}
export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function calculateWinningStates(n: number) {
  const range = Array.from(Array(n).keys());

  const winningByRows = range.map((i) => Array.from(Array(n).keys()).map((j) => j + n * i));

  const winningByColumns = range.map((i) => Array.from(Array(n).keys()).map((j) => j * n + i));
  const diagonal = range.map((i) => i * (n + 1));
  const reversedDiagonal = range.map((i) => i * (n - 1));

  return [...winningByRows, ...winningByColumns, diagonal, reversedDiagonal];
}

export function generateBoard({ seed, range }: Pick<GameType, "seed" | "range">) {
  let board: (number | null)[] = [];
  for (let i = 0; i < seed.length; i++) {
    const candidates = Array.from(Array(range).keys()).map((x) => x + 1 + range * i);
    const shuffledSlice = shuffle(candidates).slice(0, seed.length);

    board = [...board, ...shuffledSlice];
  }
  board[Math.floor(board.length / 2)] = null;
  return board;
}
