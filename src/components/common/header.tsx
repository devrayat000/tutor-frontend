import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Title,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconLego } from "@tabler/icons";
import { AuthLinks, GeneralLinks } from "./links";

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
  const [opened, { toggle }] = useDisclosure(false);
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
          <Group spacing={"xl"} className={classes.links}>
            <GeneralLinks />
            <AuthLinks />
          </Group>
        )}

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  );
}
