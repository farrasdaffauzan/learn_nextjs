import dynamic from "next/dynamic";
const LayoutComponent = dynamic(() => import("@/layout"));
import { Flex, Grid, GridItem, Heading, Card, Button, Box, Text, Textarea, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AddNotes() {
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });
  const router = useRouter();

  const HandleSubmit = async () => {
    try {
      const response = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notes),
      });
      const result = await response.json();
      if (result?.success) {
        router.push("/notes");
      }
    } catch (error) {}
  };

  console.log("notes => ", notes);

  return (
    <>
      <LayoutComponent metatitle={"Notes"}>
        <Card margin={"5"} padding={"5"}>
          <Heading>Add Notes</Heading>
          <Grid gap={"5"}>
            <GridItem>
              <Text>Title</Text>
              <Input type="text" onChange={(event) => setNotes({ ...notes, title: event.target.value })} />
            </GridItem>
            <GridItem>
              <Text>description</Text>
              <Textarea onChange={(event) => setNotes({ ...notes, description: event.target.value })} />
            </GridItem>
            <GridItem>
              <Button colorScheme={"blue"} onClick={() => HandleSubmit()}>
                Submit
              </Button>
            </GridItem>
          </Grid>
        </Card>
      </LayoutComponent>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();
  return { props: { notes }, revalidate: 5 };
}
