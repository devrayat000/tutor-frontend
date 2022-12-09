import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider
        theme={{
          ...DEFAULT_THEME,
          globalStyles(theme) {
            return {
              "html, body": {
                fontFamily: `Montserrat, ${theme.fontFamily}`,
              },
              "input::-ms-reveal": {
                display: "none",
              },
            };
          },
        }}
        withCSSVariables
        withNormalizeCSS
        withGlobalStyles
      >
        <NotificationsProvider autoClose={2500}>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
