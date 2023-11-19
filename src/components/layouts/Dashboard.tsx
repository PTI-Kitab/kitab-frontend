import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Text,
  Stack,
  Divider,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

type Menu = {
  name: string;
  path: string;
  icon: IconType;
};

const DashboardLayout = ({
  title,
  menus,
  children,
}: {
  title: string;
  menus: Menu[];
  children: React.ReactNode;
}) => {
  const loc = useLocation();

  return (
    <Stack
      minH={"100vh"}
      direction={["column", "column", "row", "row", "row"]}
      gap={"1em"}
      mx={["2em", "2em", "8em", "8em", "8em"]}
      my={"2em"}
      color={"white"}
    >
      {/* desktop selector */}
      <Stack
        display={["none", "none", "flex", "flex", "flex"]}
        bgColor={"rgba(255, 255, 255, 0.15)"}
        w={"30%"}
        rounded={"2xl"}
        backdropFilter={"blur(4px)"}
        p={"1em"}
        align={"center"}
      >
        <Stack h={"20%"} w={"full"} align={"center"} justify={"center"}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {title}
          </Text>
          <Divider orientation="horizontal" mt={"1em"} />
        </Stack>

        {menus.map((m) => {
          if (loc.pathname === m.path) {
            return (
              <Button
                w={"full"}
                leftIcon={<Icon as={m.icon} />}
                justifyContent="start"
                //   px={"1em"}
                rounded={"2xl"}
                color={"#171229"}
                gap={"0.5em"}
              >
                {m.name}
              </Button>
            );
          }

          return (
            <Button
              as={RouterLink}
              to={m.path}
              w={"full"}
              leftIcon={<Icon as={m.icon} />}
              justifyContent="start"
              //   px={"1em"}
              rounded={"2xl"}
              color={"white"}
              _hover={{
                color: "#171229",
                bgColor: "whiteAlpha.900",
              }}
              variant={"ghost"}
              gap={"0.5em"}
            >
              {m.name}
            </Button>
          );
        })}
      </Stack>

      {/* mobile selector */}
      <Stack
        display={["flex", "flex", "none", "none", "none"]}
        bgColor={"rgba(255, 255, 255, 0.15)"}
        w={"full"}
        rounded={"2xl"}
        backdropFilter={"blur(4px)"}
        align={"center"}
        justify={"center"}
        p={"1em"}
      >
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          {title}
        </Text>
        <Divider orientation="horizontal" />
        <Menu placement="bottom">
          <MenuButton
            as={Button}
            w={"full"}
            rounded={"2xl"}
            rightIcon={<ChevronDownIcon />}
          >
            Menu
          </MenuButton>
          <Portal>
            <MenuList zIndex={"popover"} position={"relative"}>
              {menus.map((m) => (
                <MenuItem as={RouterLink} to={m.path} w={"full"}>
                  {m.name}
                </MenuItem>
              ))}
            </MenuList>
          </Portal>
        </Menu>
      </Stack>

      <Stack
        bgColor={"rgba(255, 255, 255, 0.15)"}
        w={"full"}
        rounded={"2xl"}
        backdropFilter={"blur(4px)"}
        p={"1em"}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default DashboardLayout;
