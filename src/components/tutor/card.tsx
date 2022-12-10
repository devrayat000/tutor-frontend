import { Badge, Button, Card, Group, Text } from "@mantine/core";
import Image from "next/image";
import { IconUserCheck, IconDeviceLaptop } from "@tabler/icons";

import maleAvatar from "../../assets/avatar/male.png";
import femaleAvatar from "../../assets/avatar/female.png";
import { Gender, TutionMethod, User } from "../../services/types";
import Link from "next/link";

type TutorCardProps = Pick<
  User,
  "username" | "institute" | "gender" | "method" | "uid"
> & {};

const TutorCard = (props: TutorCardProps) => {
  return (
    <Card>
      <Card.Section component="figure">
        <Image
          src={props.gender === Gender.MALE ? maleAvatar : femaleAvatar}
          alt={`Avatar - ${props.username}`}
        />
      </Card.Section>

      <Text component="figcaption" size={"lg"} weight={700}>
        {props.username}
      </Text>
      <Group>
        <Group grow>
          <Text lineClamp={1}>{props.institute}</Text>
        </Group>
        <Badge
          size="lg"
          radius="sm"
          leftSection={
            props.method === TutionMethod.ONLINE ? (
              <IconDeviceLaptop />
            ) : (
              <IconUserCheck />
            )
          }
          color={props.method === TutionMethod.ONLINE ? "teal" : "red"}
        >
          {props.method}
        </Badge>
      </Group>
      <Button
        fullWidth
        color="grape"
        component={Link}
        href={`/${props.uid}/requests/make`}
      >
        Request
      </Button>
    </Card>
  );
};

export default TutorCard;
