import { Box, Divider, List, Text, Paper } from "@mantine/core";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import getRequests from "../../services/request";

const RequestsBoard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: requests } = useSWR(["requests", router.query.uid], () =>
    getRequests(session?.jwt!)
  );

  return (
    <Paper w={280} mt="lg" withBorder>
      <Text weight={700} align="center">
        Requests
      </Text>
      <Divider my="xs" />
      <Box sx={{ overflowY: "auto" }}>
        <List type="ordered" mah={240}>
          {requests?.data.map((request) => (
            <List.Item key={request.id}>{request.attributes.message}</List.Item>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default RequestsBoard;
