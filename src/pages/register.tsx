import {
  Container,
  Stepper,
  Group,
  Button,
  Box,
  Title,
  TextInput,
  PasswordInput,
  createStyles,
  Paper,
  Text,
  Radio,
  Anchor,
  Textarea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { useState, Suspense } from "react";
import { IconUser } from "@tabler/icons";

import { LocationSelect, SubjectSelect } from "../components/auth/register";
import { BarLoader } from "../components/common/loader";
import register, { registerSchema } from "../services/register";
import { Gender, TutionMethod } from "../services/types";

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const RegisterPage = () => {
  const [active, setActive] = useState(0);
  const { classes } = useStyles();
  const { getInputProps, setFieldValue, values, errors, onSubmit } = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      gender: Gender.MALE,
      institute: "",
      designation: "",
      method: TutionMethod.OFFLINE,
      address: "",
      facebookUrl: "",
      subjects: [{ entry: "" }],
      locations: [{ entry: "" }],
    },
    validate: zodResolver(registerSchema),
  });

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSignup = onSubmit(async (data) => {
    const { user } = await register(data);
    showNotification({
      id: user.uid,
      message:
        "Wait for our admins to enable your account ans then you can sign in.",
      icon: <IconUser />,
    });
  });

  return (
    <Container>
      <Box component="form" mt="xl" onSubmit={handleSignup}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="First step" description="Create an account">
            <Title order={2} className={classes.title} align="center" mb={"xl"}>
              Welcome to TutorBD!
            </Title>

            <Text component="p" align="center" my="xs">
              Already have an account?{" "}
              <Anchor component={Link} href="/login">
                Log In
              </Anchor>
            </Text>

            <Paper
              withBorder
              shadow="md"
              p={30}
              mt={30}
              radius="md"
              sx={{ maxWidth: 480 }}
              mx="auto"
            >
              <TextInput
                label="Full Name"
                placeholder="John Doe"
                variant="filled"
                name="username"
                withAsterisk
                {...getInputProps("username")}
              />
              <Group grow>
                <TextInput
                  label="Email address"
                  placeholder="hello@gmail.com"
                  variant="filled"
                  mt="md"
                  name="email"
                  type="email"
                  withAsterisk
                  {...getInputProps("email")}
                />
                <TextInput
                  label="Phone"
                  placeholder="01234567890"
                  variant="filled"
                  mt="md"
                  name="phone"
                  type="tel"
                  withAsterisk
                  {...getInputProps("phone")}
                />
              </Group>
              <Textarea
                label="Address"
                withAsterisk
                placeholder="Azimpur, Dhaka"
                variant="filled"
                mt="md"
                name="address"
                {...getInputProps("address")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                mt="md"
                variant="filled"
                name="password"
                withAsterisk
                {...getInputProps("password")}
              />
            </Paper>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Verify email">
            <Title order={2} className={classes.title} align="center" mb={"xl"}>
              Add user details
            </Title>

            <Paper
              withBorder
              shadow="md"
              p={30}
              mt={30}
              radius="md"
              sx={{ maxWidth: 480 }}
              mx="auto"
            >
              <TextInput
                label="institute"
                placeholder="Dhaka University"
                variant="filled"
                name="institute"
                withAsterisk
                mt="md"
                {...getInputProps("institute")}
              />
              <TextInput
                label="Designation"
                placeholder="Student"
                variant="filled"
                name="designation"
                withAsterisk
                mt="md"
                {...getInputProps("designation")}
              />

              <Group mt="md" grow position="apart">
                <Group grow>
                  <Radio.Group
                    label="Gender"
                    withAsterisk
                    {...getInputProps("gender")}
                    value={values.gender}
                    onChange={(value) =>
                      setFieldValue("gender", value as Gender)
                    }
                  >
                    <Radio value={Gender.MALE} label="Male" name="gender" />
                    <Radio value={Gender.FEMALE} label="Female" name="gender" />
                  </Radio.Group>
                </Group>

                <Group grow>
                  <Radio.Group
                    label="Method"
                    withAsterisk
                    {...getInputProps("method")}
                    value={values.method}
                    onChange={(value) =>
                      setFieldValue("method", value as TutionMethod)
                    }
                    error={errors.method}
                  >
                    <Radio
                      value={TutionMethod.OFFLINE}
                      label="Offline"
                      name="method"
                    />
                    <Radio
                      value={TutionMethod.ONLINE}
                      label="Online"
                      name="method"
                    />
                  </Radio.Group>
                </Group>
              </Group>

              <TextInput
                label="Facebook URL"
                placeholder="https://www.facebook.com/user.name"
                variant="filled"
                name="facebookUrl"
                mt="md"
                type="url"
                {...getInputProps("facebookUrl")}
              />
            </Paper>
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            <Title order={2} className={classes.title} align="center" mb={"xl"}>
              Add Experiences
            </Title>

            <Paper
              withBorder
              shadow="md"
              p={30}
              mt={30}
              radius="md"
              sx={{ maxWidth: 480 }}
              mx="auto"
            >
              <Suspense fallback={<BarLoader />}>
                <SubjectSelect
                  label="Subjects willing to teach"
                  {...getInputProps("subjects")}
                  value={values.subjects.map((s) => s.entry)}
                  onChange={(subjects) =>
                    setFieldValue(
                      "subjects",
                      subjects.map((entry) => ({ entry }))
                    )
                  }
                  error={errors.subjects}
                  searchable
                  nothingFound="Nothing found"
                  clearable
                  maxDropdownHeight={160}
                  dropdownComponent="div"
                />
              </Suspense>

              <Suspense fallback={<BarLoader />}>
                <LocationSelect
                  label="Locations willing to tutor"
                  {...getInputProps("locations")}
                  value={values.locations.map((s) => s.entry)}
                  onChange={(locations) =>
                    setFieldValue(
                      "locations",
                      locations.map((entry) => ({ entry }))
                    )
                  }
                  searchable
                  nothingFound="Nothing found"
                  clearable
                  maxDropdownHeight={160}
                  dropdownComponent="div"
                  mt="md"
                />
              </Suspense>

              <Text component="p" mt="md" mb={0} size="sm" fs="italic">
                You can also edit these later.
              </Text>
            </Paper>
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
            {!!Object.keys(errors).length && (
              <Text c="red" component="p" mb={0} mt="sm">
                Please fill up the form correctly!
              </Text>
            )}
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          <Button key="prev" variant="default" onClick={prevStep}>
            Back
          </Button>
          {active < 3 ? (
            <Button key="next" onClick={nextStep}>
              Next step
            </Button>
          ) : (
            <Button key="submit" type="submit">
              Create Account
            </Button>
          )}
        </Group>
      </Box>
    </Container>
  );
};

export default RegisterPage;
