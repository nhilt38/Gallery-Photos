import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";

const Links = ["Home"];

const NavLink = (props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"/"}
    >
      {children}
    </Box>
  );
};

export default function WithAction() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.100", "gray.900");
  if (user) {
    return (
      <>
        <Box bg={bg} px={4}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <HStack spacing={8} alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  href="/"
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/f/fb/Google-Photos_icon_logo_%28May-September_2015%29.png"
                    }
                  />
                </MenuButton>
              </Menu>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={"center"} gap={3}>
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                onClick={() => navigate("/upload")}
                leftIcon={<AddIcon />}
              >
                Upload
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://picsum.photos/seed/my-avatar/200"}
                  />
                </MenuButton>
                <MenuButton
                  as={Button}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  onClick={() => logout(dispatch)}
                >
                  Log out
                </MenuButton>
              </Menu>
            </Flex>
          </Flex>
        </Box>
      </>
    );
  } else {
    return (
      <Box bg={bg} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                href="/"
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/f/fb/Google-Photos_icon_logo_%28May-September_2015%29.png"
                  }
                />
              </MenuButton>
            </Menu>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Link
              colorScheme={"teal"}
              size={"sm"}
              variant={"link"}
              href="/login"
            >
              Log in
            </Link>
          </Flex>
        </Flex>
      </Box>
    );
  }
}
