import { Box, Divider, List, Text, Paper } from "@mantine/core";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { openModal } from "@mantine/modals";

import getRequests from "../../services/request";
import { Request } from "../../services/types";

const RequestsBoard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: requests } = useSWR(["requests", router.query.uid], () =>
    getRequests(session?.jwt!)
  );

  const displayRequestDetails = (request: {
    id: number;
    attributes: Request;
  }) => {
    openModal({
      modalId: String(request.id),
      title: "Tution Request",
      shadow: "md",
      padding: "xs",
      centered: true,
      transition: "scale",
      children: (
        <Box>
          <Text size="sm">Class: {request.attributes.class}</Text>
          <Text size="sm">Institute: {request.attributes.institute}</Text>
          <Text size="sm">Subject(s): {request.attributes.subject}</Text>
          <Text component="p" color="dimmed" weight={500}>
            {request.attributes.message}
          </Text>
          <Text size="sm">Contact: {request.attributes.contact}</Text>
        </Box>
      ),
    });
  };

  return (
    <Paper w={280} mt="lg" withBorder>
      <Text weight={700} align="center">
        Requests
      </Text>
      <Divider my="xs" />
      <Box sx={{ overflowY: "auto" }}>
        <List type="ordered" mah={240}>
          {requests?.data.map((request) => (
            <List.Item
              key={request.id}
              onClick={() => displayRequestDetails(request)}
            >
              {request.attributes.message}
            </List.Item>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default RequestsBoard;
