import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Paper,
  Container,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";
import useSWR, { unstable_serialize } from "swr";
import { showNotification } from "@mantine/notifications";
import { GetServerSideProps } from "next";

import { DataResponse, Request, RequestStatus } from "../../../services/types";
import createRequest, {
  createRequestSchema,
} from "../../../services/createRequest";
import getUserById from "../../../services/userById";

export default function MakeRequestsPage() {
  const router = useRouter();
  const { data: user } = useSWR(["user", router.query.uid as string], (_, id) =>
    getUserById(id)
  );
  const { mutate, isValidating } = useSWR<DataResponse<Request>>([
    "requests",
    router.query.uid,
  ]);
  const form = useForm({
    initialValues: {
      class: "",
      institute: "",
      subject: "",
      message: "",
      contact: "",
      status: RequestStatus.PENDING,
      user: user?.id!,
    },
    validate: zodResolver(createRequestSchema),
  });

  const sendTutorRequest = form.onSubmit(async (data, e) => {
    const resp = await mutate(async (prevData) => {
      if (!prevData) {
        return prevData;
      }
      const newReq = await createRequest(data);
      return {
        ...prevData,
        data: [newReq.data, ...prevData?.data],
        meta: {
          ...prevData.meta,
          pagination: {
            ...prevData.meta.pagination,
            total: prevData.meta.pagination.total + 1,
          },
        },
      };
    });
    e.currentTarget.reset();

    showNotification({
      id: String(resp?.data[-1].id),
      title: "Request for tutor",
      message: "Your request has been sent. Wait for tutor response.",
    });
  });

  return (
    <Container>
      <Paper component="form" onSubmit={sendTutorRequest}>
        <Title
          order={2}
          size="h1"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
          weight={900}
          align="center"
        >
          Get in touch
        </Title>

        <SimpleGrid
          cols={2}
          mt="xl"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <TextInput
            label="Student's class"
            placeholder="Class 11"
            name="class"
            variant="filled"
            withAsterisk
            {...form.getInputProps("class")}
          />
          <TextInput
            label="Student's Institute"
            placeholder="Dhaka College"
            name="institute"
            variant="filled"
            withAsterisk
            {...form.getInputProps("institute")}
          />
        </SimpleGrid>

        <TextInput
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
          withAsterisk
          {...form.getInputProps("subject")}
        />
        <Textarea
          mt="md"
          label="Message"
          placeholder="Your message"
          maxRows={10}
          minRows={2}
          autosize
          name="message"
          variant="filled"
          withAsterisk
          {...form.getInputProps("message")}
        />
        <Textarea
          mt="md"
          label="Contact"
          placeholder="Your contact"
          maxRows={10}
          minRows={2}
          autosize
          name="contact"
          variant="filled"
          withAsterisk
          {...form.getInputProps("contact")}
        />

        <Group position="center" mt="xl">
          <Button
            type="submit"
            size="md"
            disabled={isValidating}
            loading={isValidating}
          >
            Send request
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const uid = ctx.params!.uid as string;
  return {
    props: {
      ssr: {
        [unstable_serialize(["user", uid])]: await getUserById(uid),
      },
    },
  };
};
