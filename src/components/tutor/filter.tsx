import { useRouter } from "next/router";
import {
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
import { useForm, zodResolver } from "@mantine/form";
import { Gender, TutionMethod } from "../../services/types";
import { filterSchema } from "../../services/users";
import { LocationSelect, SubjectSelect } from "../auth/register";
import { BarLoader } from "../common/loader";

const useStyles = createStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

const TutorFilter = () => {
  const { classes } = useStyles();
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

  return (
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
  );
};

export default TutorFilter;
