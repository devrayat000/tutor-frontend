import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { loginSchema } from "../services/login";

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    overflowY: "hidden",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  stack: {
    height: "100%",
    maxWidth: 450,
    marginLeft: "auto",
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  form: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function LoginPage() {
  const { classes } = useStyles();
  const { getInputProps, onSubmit } = useForm({
    initialValues: {
      identifier: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const handleLogin = onSubmit(async (data) => {
    signIn("credentials", { ...data, redirect: true, callbackUrl: "/me" });
  });

  return (
    <div className={classes.wrapper}>
      <Stack justify="center" className={classes.stack}>
        <Paper
          className={classes.form}
          component="form"
          radius={0}
          p={30}
          onSubmit={handleLogin}
        >
          <Title order={2} className={classes.title} align="center" mb={"xl"}>
            Welcome back to TutorBD!
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            name="identifier"
            {...getInputProps("identifier")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            name="password"
            {...getInputProps("password")}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md">
            Login
          </Button>

          <Text align="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor weight={700} component={Link} href="/register">
              Register
            </Anchor>
          </Text>
        </Paper>
      </Stack>
    </div>
  );
}
