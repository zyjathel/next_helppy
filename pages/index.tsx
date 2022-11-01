import { GetServerSideProps, NextPage } from "next";
import shallow from "zustand/shallow";
import { Game } from "../components/Game";
import { UsernameInput } from "../components/UsernameInput";
import { GameInitProps, UnauthenticatedState, useAppStore } from "../store/store";
import { generateBoard } from "../store/utils";
import { useHasHydrated } from "../hooks/useHasHydrated";

type PageProps = {
  initGameState: GameInitProps;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  // e.g. get user data from db
  const seed = "bingo";
  const range = 15;
  const board = generateBoard({ seed, range });
  return {
    props: {
      initGameState: {
        board,
        seed,
        numberHistory: [],
        startedAt: Date.now(),
        range,
      },
    }, // will be passed to the page component as props
  };
};

const IndexPage: NextPage<PageProps> = ({ initGameState }) => {
  const [authenticated, auth] = useAppStore(
    (state) => [state.authenticated, (state as UnauthenticatedState).auth],
    shallow,
  );

  const hydrated = useHasHydrated();

  return (
    <div className="text-gray-800">
      {hydrated && (authenticated ? <Game initState={initGameState} /> : <UsernameInput onConfirm={auth} />)}
    </div>
  );
};

export default IndexPage;
