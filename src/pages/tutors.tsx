import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import useSWR, { unstable_serialize } from "swr";
import { Container, SimpleGrid, Group, Pagination } from "@mantine/core";
import { Suspense } from "react";

import getUsers, { filterSchema, getUsersCount } from "../services/users";
import TutorCard from "../components/tutor/card";
import TutorFilter from "../components/tutor/filter";

export default function Home() {
  const router = useRouter();
  const { data: tutors } = useSWR(["user", router.query], (_, params) =>
    getUsers(params)
  );

  return (
    <Container size={"sm"}>
      <TutorFilter />

      <SimpleGrid
        cols={1}
        breakpoints={[
          { minWidth: "md", cols: 2 },
          { minWidth: "lg", cols: 3 },
        ]}
        mt="xl"
      >
        {tutors?.map((tutor) => (
          <TutorCard key={tutor.id} {...tutor} />
        ))}
      </SimpleGrid>

      <Group position="center" mt="xl">
        <Suspense>
          <HomePagination limit={30} />
        </Suspense>
      </Group>
    </Container>
  );
}

const HomePagination = (props: { limit: number }) => {
  const router = useRouter();
  const { data: count } = useSWR("user-count", getUsersCount, {
    suspense: true,
  });

  return (
    <Pagination
      page={Number(router.query.page) || 1}
      onChange={(page) =>
        router.push({ query: { ...router.query, page } }, undefined, {
          shallow: true,
        })
      }
      total={Math.ceil((count || 0) / props.limit)}
    />
  );
};

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
