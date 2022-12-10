import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const MePage = () => {
  return <></>;
};

export default MePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  return {
    redirect: {
      permanent: false,
      destination: `/${session?.user.uid}`,
    },
  };
};
