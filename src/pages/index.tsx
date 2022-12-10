import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import useSWR, { unstable_serialize } from "swr";
import {
  Container,
  SimpleGrid,
  Paper,
  Group,
  Select,
  Text,
  TextInput,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import { Suspense } from "react";
import { IconFilter } from "@tabler/icons";

import getUsers, { filterSchema } from "../services/users";
import TutorCard from "../components/tutor/card";
import { useForm, zodResolver } from "@mantine/form";
import { Gender, TutionMethod } from "../services/types";
import { BarLoader } from "../components/common/loader";
import { LocationSelect, SubjectSelect } from "../components/auth/register";

const useStyles = createStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const router = useRouter();
  const { getInputProps, values, setFieldValue, onSubmit } = useForm({
    initialValues: {
      method: router.query.method as TutionMethod | undefined,
      gender: router.query.gender as Gender | undefined,
      institute: router.query.institute,
      subjects:
        typeof router.query.subjects === "string"
          ? [router.query.subjects]
          : router.query.subjects,
      locations:
        typeof router.query.locations === "string"
          ? [router.query.locations]
          : router.query.locations,
    },
    validate: zodResolver(filterSchema),
  });
  const { data: tutors } = useSWR(["user", router.query], (_, params) =>
    getUsers(params)
  );
  const { classes } = useStyles();

  return (
    <Container size={"sm"}>
      <Paper
        withBorder
        radius="md"
        p="md"
        component="form"
        onSubmit={onSubmit((data) => {
          for (const key in data) {
            if (
              Object.prototype.hasOwnProperty.call(data, key) &&
              !data[key as keyof typeof data]
            ) {
              delete data[key as keyof typeof data];
            }
          }
          router.push({ query: data }, undefined, { shallow: true });
        })}
      >
        <Text weight={700} size="lg">
          Filter
        </Text>

        <TextInput
          label="Search by Institute"
          placeholder="Dhaka University"
          {...getInputProps("institute")}
        />

        <Group mt="sm">
          <Group grow className={classes.grow}>
            <Suspense fallback={<BarLoader />}>
              <SubjectSelect
                label="Subjects willing to teach"
                {...getInputProps("subjects")}
                value={values.subjects}
                onChange={(subjects) => setFieldValue("subjects", subjects)}
                searchable
                nothingFound="Nothing found"
                clearable
                maxDropdownHeight={160}
                dropdownComponent="div"
              />
            </Suspense>
          </Group>

          <Group grow className={classes.grow}>
            <Suspense fallback={<BarLoader />}>
              <LocationSelect
                label="Locations willing to tutor"
                {...getInputProps("locations")}
                value={values.locations}
                onChange={(locations) => setFieldValue("locations", locations)}
                searchable
                nothingFound="Nothing found"
                clearable
                maxDropdownHeight={160}
                dropdownComponent="div"
              />
            </Suspense>
          </Group>
        </Group>

        <Group mt="sm">
          <Group grow className={classes.grow}>
            <Select
              label="Gender"
              data={[Gender.MALE, Gender.FEMALE]}
              {...getInputProps("gender")}
              value={values.gender}
              onChange={(gender) =>
                setFieldValue("gender", (gender as any) || undefined)
              }
              clearable
            />
          </Group>

          <Group grow className={classes.grow}>
            <Select
              label="Method of teaching"
              data={[TutionMethod.OFFLINE, TutionMethod.ONLINE]}
              {...getInputProps("method")}
              value={values.method}
              onChange={(method) =>
                setFieldValue("method", (method as any) || undefined)
              }
              clearable
            />
          </Group>

          <ActionIcon
            variant="filled"
            color="teal"
            size={36}
            sx={{ alignSelf: "end", flexGrow: 0 }}
            title="Filter"
            type="submit"
          >
            <IconFilter />
          </ActionIcon>
        </Group>
      </Paper>

      <SimpleGrid cols={3} mt="xl">
        {tutors?.map((tutor) => (
          <TutorCard key={tutor.id} {...tutor} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const params = filterSchema.parse(ctx.query);

  return {
    props: {
      ssr: {
        [unstable_serialize(["user", params])]: await getUsers(params),
      },
    },
  };
};
