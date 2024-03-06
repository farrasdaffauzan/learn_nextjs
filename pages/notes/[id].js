import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function DetailNotes({ notes }) {
  return (
    <>
      <LayoutComponent metatitle={"Detail Notes"}>
        <ul style={{ border: "1px solid black" }}>
          <li>title: {notes?.data?.title}</li>
          <li>description: {notes?.data?.description}</li>
          <li>Update At: {notes?.data?.updated_at}</li>
        </ul>
      </LayoutComponent>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();
  const paths = notes?.data?.map((item) => ({
    params: {
      id: item.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`);
  const notes = await res.json();
  return { props: { notes }, revalidate: 5 };
}
