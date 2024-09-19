import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>this is header</header>
      <Component {...pageProps} />
    </>
  );
}
