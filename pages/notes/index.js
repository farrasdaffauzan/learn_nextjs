import dynamic from "next/dynamic";
import Link from "next/link";
const LayoutComponent = dynamic(() => import("@/layout"));
import { Flex, Grid, CardBody, CardHeader, CardFooter, GridItem, Heading, Card, Button, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueries } from "@/hooks/useQueries";
import { useMutation } from "@/hooks/useMutation";
import useSWR from "swr";
import { data } from "autoprefixer";
import fetcher from "@/utils/fetcher";

export default function Notes() {
  const { mutate } = useMutation();

  // const { data: listNotes } = useQueries({ prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notes" });

  const { data, isLoading } = useSWR("https://paace-f178cafcae7b.nevacloud.io/api/notes", fetcher, { revalidateOnFocus: true });

  const [notes, setNotes] = useState();
  const router = useRouter();

  const HandleDelete = async (id) => {
    try {
      const response = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
      const listNotes = await res.json();
      setNotes(listNotes);
    }
    fetchingData();
  }, []);

  // console.log("notes => ", notes);

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
                      <Text>{item?.description}</Text>
                    </CardBody>
                    <CardFooter justify="space-between" flexWrap="wrap">
                      <Button flex="1" variant="Danger" onClick={() => router.push(`/notes/edit/${item?.id}`)}>
                        Edit
                      </Button>
                      <Button flex="1" colorScheme={"red"} onClick={() => HandleDelete(item?.id)}>
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
