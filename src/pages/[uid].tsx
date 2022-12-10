import { Button, Container, Text } from "@mantine/core";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { unstable_getServerSession } from "next-auth";
import useSWR, { unstable_serialize } from "swr";

import getUserById from "../services/userById";
import { authOptions } from "./api/auth/[...nextauth]";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const UserDetailsPage: NextPage<Props> = ({ uid, isCurrentUser }) => {
  const { data: user } = useSWR(["user", uid], (_, id) => getUserById(id));

  return (
    <Container>
      <Text>{user?.username}</Text>
      {isCurrentUser && <Button>Edit</Button>}
    </Container>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const uid = ctx.params!.uid as string;
  const user = await getUserById(uid);

  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  return {
    props: {
      ssr: {
        [unstable_serialize(["user", user.uid])]: user,
      },
      isCurrentUser: user.id === session?.user.id,
      session,
      uid,
    },
  };
};

export default UserDetailsPage;
