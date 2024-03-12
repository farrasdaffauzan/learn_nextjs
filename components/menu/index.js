import Link from "next/link";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useQueries } from "@/hooks/useQueries";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Menuku() {
  const router = useRouter();
  const { mutate } = useMutation();
  const { data } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  const handleLogout = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (!response?.success) {
      console.log("Gagal Logout");
    } else {
      Cookies.remove("user_token");
      router.push("/login");
    }
  };

  return (
    <div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Proile</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
        <li>
          <Link href="/notes">Notes</Link>
        </li>
        <li>
          {/* <Link href="/notes">Logout</Link> */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {data?.data?.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </li>

        <br></br>
      </ul>
    </div>
  );
}
