import {
  Button,
  Container,
  Text,
  Title,
  Box,
  createStyles,
  Badge,
  Group,
  Stack,
} from "@mantine/core";
import {
  IconDeviceLaptop,
  IconGenderFemale,
  IconGenderMale,
  IconUserCheck,
} from "@tabler/icons";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { unstable_getServerSession } from "next-auth";
import useSWR, { unstable_serialize } from "swr";
import { Gender, TutionMethod } from "../services/types";

import getUserById from "../services/userById";
import { authOptions } from "./api/auth/[...nextauth]";
import Link from "next/link";
import getRequests from "../services/request";
import RequestsBoard from "../components/tutor/RequestsBoard";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const useStyles = createStyles((theme) => ({
  list: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
    listStyleType: "none",
    paddingLeft: 0,
  },
}));

const UserDetailsPage: NextPage<Props> = ({ uid, isCurrentUser }) => {
  const { data: user } = useSWR(["user", uid], (_, id) => getUserById(id));
  const { classes } = useStyles();

  console.log({ user });

  return (
    <Container size={"md"}>
      <Group align={"flex-start"}>
        <Box>
          <Text>Name: {user?.username}</Text>
          <Text>Email: {user?.email}</Text>
          <Text>Phone: {user?.phone}</Text>
          <Text>Institute: {user?.institute}</Text>
          <Text>Designation: {user?.designation}</Text>
          <Text>{user?.address}</Text>
          <Badge
            component="span"
            size="lg"
            radius="sm"
            leftSection={
              user?.gender === Gender.MALE ? (
                <IconGenderMale size={16} />
              ) : (
                <IconGenderFemale size={16} />
              )
            }
            color={user?.gender === Gender.MALE ? "teal" : "red"}
          >
            {user?.gender}
          </Badge>
          <span style={{ width: 20, display: "inline-block" }} />
          <Badge
            component="span"
            size="md"
            radius="sm"
            leftSection={
              user?.method === TutionMethod.ONLINE ? (
                <IconDeviceLaptop size={12} />
              ) : (
                <IconUserCheck size={12} />
              )
            }
            color={user?.method === TutionMethod.ONLINE ? "teal" : "red"}
          >
            {user?.method}
          </Badge>

          <Box mt="md">
            <Title order={4}>Subject willing to teach:</Title>
            <Box mt="xs" component="ul" className={classes.list}>
              {user?.subjects.map((subject) => (
                <Button
                  key={subject.id}
                  component="li"
                  compact
                  size="sm"
                  disabled
                >
                  {subject.entry}
                </Button>
              ))}
            </Box>
          </Box>

          <Box mt="md">
            <Title order={4}>Locations willing to tutor:</Title>
            <Box mt="xs" component="ul" className={classes.list}>
              {user?.locations.map((location) => (
                <Button
                  key={location.id}
                  component="li"
                  compact
                  size="sm"
                  disabled
                >
                  {location.entry}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>

        <Group grow sx={{ justifySelf: "flex-end", flexGrow: 1 }}>
          <Stack align={"end"}>
            <Button
              component={Link}
              href={{
                pathname: `/${uid}/${isCurrentUser ? "edit" : "requests/make"}`,
              }}
            >
              {isCurrentUser ? "Edit" : "Send Request"}
            </Button>

            {isCurrentUser && <RequestsBoard />}
          </Stack>
        </Group>
      </Group>
    </Container>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const uid = ctx.params!.uid as string;

  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  const isCurrentUser = uid === session?.user.uid;

  const ssr = {
    [unstable_serialize(["user", uid])]: await getUserById(uid),
  };
  if (isCurrentUser) {
    Object.defineProperty(
      ssr,
      unstable_serialize(["requests", uid]),
      await getRequests(session?.jwt!)
    );
  }

  return {
    props: {
      ssr,
      isCurrentUser,
      session,
      uid,
    },
  };
};

export default UserDetailsPage;
