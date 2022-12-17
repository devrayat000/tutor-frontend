import { Badge, Button, Card, Group, Text, Box } from "@mantine/core";
import Image from "next/image";
import { IconUserCheck, IconDeviceLaptop } from "@tabler/icons";
import { useRouter } from "next/router";
import Link from "next/link";

import maleAvatar from "../../assets/avatar/male.png";
import femaleAvatar from "../../assets/avatar/female.png";
import { Gender, TutionMethod, User } from "../../services/types";

type TutorCardProps = Pick<
  User,
  "username" | "institute" | "gender" | "method" | "uid"
> & {};

const TutorCard = (props: TutorCardProps) => {
  const router = useRouter();
  return (
    <Card withBorder shadow="sm" component={Link} href={`/${props.uid}`}>
      <Box component="figure" sx={{ position: "relative", aspectRatio: "1/1" }}>
        <Image
          src={props.gender === Gender.MALE ? maleAvatar : femaleAvatar}
          alt={`Avatar - ${props.username}`}
          fill
        />
      </Box>

      <Text component="figcaption" size={"lg"} weight={700}>
        {props.username}
      </Text>
      <Group noWrap>
        <Group grow={true} sx={{ flexGrow: 1 }}>
          <Text lineClamp={1}>{props.institute}</Text>
        </Group>
        <Group>
          <Badge
            size="md"
            radius="sm"
            leftSection={
              props.method === TutionMethod.ONLINE ? (
                <IconDeviceLaptop size={12} />
              ) : (
                <IconUserCheck size={12} />
              )
            }
            color={props.method === TutionMethod.ONLINE ? "teal" : "red"}
          >
            {props.method}
          </Badge>
        </Group>
      </Group>
      <Button
        fullWidth
        color="grape"
        onClick={() => router.push(`/${props.uid}/requests/make`)}
        mt="sm"
      >
        Request
      </Button>
    </Card>
  );
};

export default TutorCard;
