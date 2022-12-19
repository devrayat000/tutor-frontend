import type { AppProps } from "next/app";
import { NextPageContext, NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { SWRConfig } from "swr";
import { unstable_getServerSession } from "next-auth";

import Shell from "../components/common/shell";
import { authOptions } from "./api/auth/[...nextauth]";
import getMe from "../services/me";

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
          <NotificationsProvider autoClose={2500}>
            <Shell>
              <Component {...pageProps} />
            </Shell>
          </NotificationsProvider>
        </MantineProvider>
      </SessionProvider>
    </SWRConfig>
  );
}

// App.getInitialProps = async (ctx: NextPageContext) => {
//   const session = await unstable_getServerSession(
//     ctx.req as any,
//     ctx.res as any,
//     authOptions
//   );

//   return {
//     pageProps: {
//       session,
//       ssr: {
//         me: await getMe((session as any)?.jwt),
//       },
//     },
//   };
// };

export default App;
