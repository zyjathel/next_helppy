import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type UnauthenticatedState = {
  authenticated: false;
  username: null;
  auth(name: string): void;
};

export type AuthenticatedAppState = {
  authenticated: true;
  username: string;
};

export type AppState = UnauthenticatedState | AuthenticatedAppState;

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      immer((set, get) => ({
        authenticated: false,
        username: null,
        auth: (name) => {
          set((state) => {
            state.authenticated = true;
            state.username = name;
          });
        },
      })),
    ),
  ),
);
