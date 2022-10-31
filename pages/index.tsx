import Head from "next/head";
import Image from "next/image";

import { UsernameInput } from "../components/UsernameInput";
import { Game } from "../components/Game";
import { UnauthenticatedState, useAppStore } from "../store/store";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  const authenticated = useAppStore((state) => state.authenticated);

  const auth = useAppStore((state) => (state as UnauthenticatedState).auth);
  return authenticated ? <Game /> : <UsernameInput onConfirm={auth} />;
};

export default IndexPage;
