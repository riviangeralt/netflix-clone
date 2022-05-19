import React from "react";
import {
  Flex,
  Stack,
  Text,
  Heading,
  Avatar,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/login";

const Header = (props) => {
  const dispatch = useDispatch();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="#0000002a"
      backgroundBlendMode={"multiply"}
      color="white"
      position="fixed"
      width="100%"
      zIndex={3}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Netflix Clone
        </Heading>
      </Flex>
      <Flex align="center" mr={5}>
        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "block", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
          columnGap={5}
        >
          <Text>
            <Link to="/">Home</Link>
          </Text>
          <Text>
            <Link to="/profiles">Profiles</Link>
          </Text>
          <Text>
            <Link to="/list">List</Link>
          </Text>

          <Menu bg="black" color="white" border="none" zIndex={1}>
            <MenuButton>
              <Avatar size={"sm"} />
            </MenuButton>
            <MenuList bg="black" color="white" border="none">
              <MenuItem _hover={{ bg: "gray.900" }} as={Link} to="/profiles">
                Download
              </MenuItem>
              <MenuItem _hover={{ bg: "gray.900" }} as={Link} to="/profiles">
                Upload
              </MenuItem>
              <MenuItem
                _hover={{ bg: "gray.900" }}
                onClick={() => dispatch(logout())}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default withRouter(Header);
