import Menuku from "../menu";
import { withAuth } from "../with-auth";
// import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
// import { ChevronDownIcon } from "@chakra-ui/icons";

function Header() {
  return (
    <div>
      <Menuku />
      {/* <li>
        <Link href="/notes">Logout</Link>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </li> */}
    </div>
  );
}

export default withAuth(Header);
