import { Group, createStyles, Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  links: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export const GeneralLinks = () => {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const active = router.pathname;

  return (
    <Group className={classes.links} spacing={5}>
      <Link
        href={"/"}
        className={cx(classes.link, {
          [classes.linkActive]: active === "/",
        })}
      >
        Home
      </Link>
      <Link
        href={"/tutors"}
        className={cx(classes.link, {
          [classes.linkActive]: active === "/tutors",
        })}
      >
        Available Tutors
      </Link>
      <Link
        href={"/about"}
        className={cx(classes.link, {
          [classes.linkActive]: active === "/about",
        })}
      >
        About Us
      </Link>
      <Link
        href={"/contact"}
        className={cx(classes.link, {
          [classes.linkActive]: active === "/contact",
        })}
      >
        Contact Us
      </Link>
    </Group>
  );
};

export const AuthLinks = () => {
  const { classes } = useStyles();

  return (
    <Group className={classes.links} spacing={12}>
      <Button component={Link} href="/login" variant="filled">
        Login
      </Button>

      <Button component={Link} href="/register" variant="outline">
        Register
      </Button>
    </Group>
  );
};
