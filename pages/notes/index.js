import dynamic from "next/dynamic";
import Link from "next/link";
const LayoutComponent = dynamic(() => import("@/layout"));
import { Flex, Grid, CardBody, CardHeader, CardFooter, GridItem, Heading, Card, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Notes() {
  const [notes, setNotes] = useState();
  const router = useRouter();
  useEffect(() => {
    async function fetchingData() {
      const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
      const listNotes = await res.json();
      setNotes(listNotes);
    }
    fetchingData();
  }, []);

  console.log("notes => ", notes);

  return (
    <>
      <LayoutComponent metatitle={"Notes"}>
        <Box padding={"5"}>
          <Flex justifyContent={"end"}>
            <Button colorScheme={"blue"} onClick={() => router.push("/notes/add")}>
              Add Notes
            </Button>
          </Flex>
          <Flex>
            <Grid templateColumns="repeat(4, 1fr)" gap={5}>
              {notes?.data?.map((item) => (
                <GridItem>
                  <Card>
                    <CardHeader>
                      <Heading>{item?.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <text>{item?.description}</text>
                    </CardBody>
                    <CardFooter justify="space-between" flexWrap="wrap">
                      <Button flex="1" variant="Danger">
                        Edit
                      </Button>
                      <Button flex="1" colorScheme={"red"}>
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      </LayoutComponent>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();
  return { props: { notes }, revalidate: 5 };
}
