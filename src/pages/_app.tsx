import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { SWRConfig } from "swr";

import Shell from "../components/common/shell";
import { ModalsProvider } from "@mantine/modals";

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fallback: pageProps.ssr }}>
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
          <ModalsProvider
            modalProps={{
              closeOnEscape: true,
              closeOnClickOutside: true,
              withCloseButton: true,
            }}
          >
            <NotificationsProvider autoClose={2500}>
              <Shell>
                <Component {...pageProps} />
              </Shell>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </SessionProvider>
    </SWRConfig>
  );
}

export default App;
