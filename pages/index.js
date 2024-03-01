// import Layout from "@/layout";
import { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response => ", res))
      .catch((err) => console.log("err => ", err));
  }, []);

  return (
    <>
      <LayoutComponent metatitle={"home"}>
        <p>Home</p>
        <Image src="/logoNext.png" width={400} height={400} alt="Next Img" />
      </LayoutComponent>
    </>
  );
}
