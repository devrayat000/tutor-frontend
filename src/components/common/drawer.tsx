import {
  Burger,
  Button,
  Drawer,
  Group,
  Stack,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import getMe from "../../services/me";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { AuthLinks, GeneralLinks } from "./links";

const useStyles = createStyles((theme) => ({
  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },
}));

const CustomDrawer = () => {
  const { classes } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <section>
      <Burger
        opened={opened}
        onClick={toggle}
        className={classes.burger}
        size="sm"
      />
      <Drawer
        opened={opened}
        onClose={close}
        shadow="sm"
        overlayBlur={3}
        padding="sm"
        size={240}
      >
        <DrawerContent />
      </Drawer>
    </section>
  );
};

export const DrawerContent = () => {
  const { data: session } = useSession();
  const { data: user } = useSWR(
    "me",
    session && (() => getMe((session as any).jwt)),
    {
      suspense: true,
    }
  );

  return (
    <Stack spacing="xl">
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
    </Stack>
  );
};

export default CustomDrawer;
