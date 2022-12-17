import { useRouter } from "next/router";
import {
  Container,
  SimpleGrid,
  Group,
  Box,
  BackgroundImage,
  Stack,
  Title,
  Text,
  Button,
  Image,
} from "@mantine/core";

import hero_illustration from "../assets/hero_illustration.jpg";
import study from "../assets/study.jpg";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <Container size={"lg"}>
      <Box>
        <BackgroundImage src={hero_illustration.src} px={72} py={96}>
          <Stack align="start">
            <Title order={1} maw="20ch">
              Professional Tutor for Your Children
            </Title>
            <Text component="p" maw="52ch">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id rem
              vel ducimus. Praesentium repellendus suscipit similique ducimus
              nulla placeat mollitia!
            </Text>
            <Button mt="lg" tt="capitalize" component={Link} href="/tutors">
              Find Your Tutor
            </Button>
          </Stack>
        </BackgroundImage>
      </Box>

      <Box mt="xl" px={72} py={96}>
        <Title order={2} align="center">
          Services We Provide
        </Title>
        <SimpleGrid
          cols={1}
          breakpoints={[
            { minWidth: "md", cols: 2 },
            { minWidth: "lg", cols: 3 },
          ]}
          mt="lg"
          mx={72}
          spacing="lg"
        >
          <Stack p="lg" align={"center"}>
            <Image
              width={64}
              src={
                "https://vigorous-jepsen-7a0654.netlify.app/static/media/s2.8eb1a595.png"
              }
              alt="Physics"
            />
            <Title order={4} align="center">
              Physics
            </Title>
            <Text component="p" size={"sm"} align="center" my={0}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id rem
              vel ducimus.
            </Text>
          </Stack>
          <Stack p="lg" align={"center"}>
            <Image
              width={64}
              src={
                "https://vigorous-jepsen-7a0654.netlify.app/static/media/s2.8eb1a595.png"
              }
              alt="Physics"
            />
            <Title order={4} align="center">
              Physics
            </Title>
            <Text component="p" size={"sm"} align="center" my={0}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id rem
              vel ducimus.
            </Text>
          </Stack>
          <Stack p="lg" align={"center"}>
            <Image
              width={64}
              src={
                "https://vigorous-jepsen-7a0654.netlify.app/static/media/s1.4c06459a.png"
              }
              alt="Chemistry"
            />
            <Title order={4} align="center">
              Chemistry
            </Title>
            <Text component="p" size={"sm"} align="center" my={0}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id rem
              vel ducimus.
            </Text>
          </Stack>
        </SimpleGrid>
      </Box>

      <Box>
        <Group noWrap spacing={52}>
          <Image
            src={study.src}
            alt="Study"
            placeholder={<img src={study.blurDataURL} alt="blur" />}
            width={360}
          />

          <Box>
            <Title order={2}>Exceptional Care for your Children</Title>
            <Text component="p" mt="xl" size={"lg"}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
              voluptatem quo amet, vitae hic similique animi, repudiandae non
              porro dolorum nihil repellat vel esse nam harum ea totam.
              Voluptates itaque culpa pariatur molestiae, maiores veritatis
              eaque tenetur quisquam, numquam repudiandae quos ab corporis, nemo
              quas rerum dicta explicabo similique! Aperiam tenetur quaerat,
              ullam labore id ea.
            </Text>
          </Box>
        </Group>
      </Box>
    </Container>
  );
}
