import {
  createStyles,
  Header,
  Container,
  Group,
  Title,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconLego } from "@tabler/icons";
import useSWR from "swr";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import getMe from "../../services/me";
import { AuthLinks, GeneralLinks } from "./links";
import CustomDrawer from "./drawer";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },
}));

export default function CustomHeader() {
  const { classes, theme } = useStyles();
  const isMobile = useMediaQuery(theme.fn.smallerThan("sm"));

  return (
    <Header height={60} mb={120} bg="teal">
      <Container className={classes.header}>
        <Group>
          <IconLego size={28} />
          <Title order={4}>Guru</Title>
        </Group>

        {!isMobile && (
          <Suspense>
            <Links />
          </Suspense>
        )}

        <CustomDrawer />
      </Container>
    </Header>
  );
}

export const Links = () => {
  const { classes } = useStyles();
  const { data: session } = useSession();
  const { data: user } = useSWR(
    "me",
    session && (() => getMe((session as any).jwt)),
    {
      suspense: true,
      fallback: {},
    }
  );

  return (
    <Group spacing={"xl"} className={classes.links}>
      <GeneralLinks />
      {!user ? (
        <AuthLinks />
      ) : (
        <Group>
          <Button component={Link} href="/me">
            Dashboard
          </Button>
        </Group>
      )}
    </Group>
  );
};
