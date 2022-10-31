import { UsernameInput } from "../components/UsernameInput";
import { Game } from "../components/Game";
import { UnauthenticatedState, useAppStore } from "../store/store";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  const authenticated = useAppStore((state) => state.authenticated);

  const auth = useAppStore((state) => (state as UnauthenticatedState).auth);
  return <div className="text-gray-800">{authenticated ? <Game /> : <UsernameInput onConfirm={auth} />}</div>;
};

export default IndexPage;
