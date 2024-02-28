import Layout from "@/layout";
import { useRouter } from "next/router";

export default function userByName() {
  const router = useRouter();
  const { id } = router?.query;

  return (
    <Layout metatitle={id}>
      <p>Users by Name {id}</p>
    </Layout>
  );
}
