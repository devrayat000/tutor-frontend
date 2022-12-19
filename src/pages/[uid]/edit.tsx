import {
  Button,
  Container,
  Group,
  Paper,
  Radio,
  TextInput,
  Textarea,
} from "@mantine/core";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]";
import getUserById from "../../services/userById";
import useSWR, { unstable_serialize } from "swr";
import { LocationSelect, SubjectSelect } from "../../components/auth/register";
import { Suspense } from "react";
import { BarLoader } from "../../components/common/loader";
import { useForm, zodResolver } from "@mantine/form";
import { TutionMethod } from "../../services/types";
import updateMe, { updateMeSchema } from "../../services/updateMe";
import { useSession } from "next-auth/react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const ProfileEditPage: NextPage<Props> = ({ uid }) => {
  const { data: session } = useSession();
  const { data: user, mutate } = useSWR(["user", uid], (_, id) =>
    getUserById(id)
  );
  const { getInputProps, setFieldValue, values, errors, onSubmit } = useForm({
    initialValues: {
      username: user?.username!,
      phone: user?.phone!,
      institute: user?.institute!,
      designation: user?.designation!,
      method: user?.method!,
      address: user?.address!,
      facebookUrl: user?.facebookUrl!,
      subjects: user?.subjects.map((e) => ({ entry: e.entry })),
      locations: user?.locations.map((e) => ({ entry: e.entry })),
    },
    validate: zodResolver(updateMeSchema),
  });

  const updateUser = onSubmit(async (data) => {
    await mutate(updateMe(user?.id!, data, session?.jwt!));
  });

  return (
    <Container>
      <Paper component="form" onSubmit={updateUser}>
        <TextInput
          label="Full Name"
          variant="filled"
          name="username"
          withAsterisk
          {...getInputProps("username")}
        />
        <TextInput
          label="Email"
          variant="filled"
          name="email"
          disabled
          defaultValue={user?.email}
          mt="sm"
        />
        <TextInput
          label="Phone"
          variant="filled"
          mt="sm"
          name="phone"
          type="tel"
          withAsterisk
          {...getInputProps("phone")}
        />
        <Textarea
          label="Address"
          withAsterisk
          variant="filled"
          mt="sm"
          name="address"
          {...getInputProps("address")}
        />
        <TextInput
          label="institute"
          variant="filled"
          name="institute"
          withAsterisk
          mt="sm"
          description="Write the full form of your institution."
          {...getInputProps("institute")}
        />
        <TextInput
          label="Designation"
          variant="filled"
          name="designation"
          withAsterisk
          mt="sm"
          {...getInputProps("designation")}
        />
        <Radio.Group
          label="Method"
          withAsterisk
          {...getInputProps("method")}
          value={values.method}
          onChange={(value) => setFieldValue("method", value as TutionMethod)}
          error={errors.method}
          mt="sm"
        >
          <Radio value={TutionMethod.OFFLINE} label="Offline" name="method" />
          <Radio value={TutionMethod.ONLINE} label="Online" name="method" />
        </Radio.Group>
        <TextInput
          label="Facebook URL"
          variant="filled"
          name="facebookUrl"
          mt="sm"
          type="url"
          {...getInputProps("facebookUrl")}
        />
        <Suspense fallback={<BarLoader />}>
          <SubjectSelect
            label="Subjects willing to teach"
            {...getInputProps("subjects")}
            value={values.subjects?.map((s) => s.entry)}
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
            mt="sm"
          />
        </Suspense>

        <Suspense fallback={<BarLoader />}>
          <LocationSelect
            label="Locations willing to tutor"
            {...getInputProps("locations")}
            value={values.locations?.map((s) => s.entry)}
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
            mt="sm"
          />
        </Suspense>

        <Group position="right" mt="lg">
          <Button type="submit">Save</Button>
        </Group>
      </Paper>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  const uid = ctx.params!.uid as string;

  if (session?.user.uid !== uid) {
    return {
      redirect: {
        destination: "/me",
        permanent: false,
      },
    };
  }

  const user = await getUserById(uid);
  return {
    props: {
      ssr: {
        [unstable_serialize(["user", user.uid])]: user,
      },
      session,
      uid,
    },
  };
};

export default ProfileEditPage;
