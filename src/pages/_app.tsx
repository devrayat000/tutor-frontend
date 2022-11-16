import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider theme={DEFAULT_THEME}>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
}
