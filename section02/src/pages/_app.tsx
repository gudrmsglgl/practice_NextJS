import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GlobalLayout from "../components/global-layout";
import { NextPage } from "next";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  applySearchableLayout?: (page: ReactNode) => ReactNode;
}

export default function App(
  { Component, pageProps }: AppProps & { Component: NextPageWithLayout }
) {
  const applySearchableLayout = Component.applySearchableLayout ?? ((page: ReactNode) => page)

  return (
    <GlobalLayout>
      {applySearchableLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  );

}
