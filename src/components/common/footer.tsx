import { createStyles, Container, Text } from "@mantine/core";
import { IconLego } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 28,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export default function CustomFooter() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <IconLego size={28} />

        <Text>Copyright 2022 All Rights Reserved by TutorBD</Text>
      </Container>
    </div>
  );
}
