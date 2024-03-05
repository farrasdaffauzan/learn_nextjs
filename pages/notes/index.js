import dynamic from "next/dynamic";
import Link from "next/link";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ notes }) {
  console.log("notes data =>", notes);
  return (
    <>
      <LayoutComponent metatitle={"Notes"}>
        {notes?.data?.map((item, idx) => (
          <Link key={idx} href={`/notes/${item?.id}`}>
            <ul style={{ border: "1px solid black" }}>
              <li>title: {item?.title}</li>
              <li>description: {item?.description}</li>
            </ul>
          </Link>
        ))}
      </LayoutComponent>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();
  return { props: { notes }, revalidate: 5 };
}
