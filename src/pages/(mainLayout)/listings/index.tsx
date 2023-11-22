import {
  Text,
  Stack,
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Show,
  Hide,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ListingsList from "@/components/ListingsList";

const ListingPage = () => {
  return (
    <Stack
      px={["2em", "2em", "8em", "8em", "8em"]}
      py={["0em", "0em", "1em", "2em", "2em"]}
    >
      <Stack paddingBottom={"3em"}>
        <Box>
          <Image src="/background/blackLives.png" w={"90em"} />
        </Box>
      </Stack>

      <Stack paddingBottom={"3em"}>
        <Box>
          <InputGroup w={"100%"} bgColor={"whiteAlpha.200"} rounded={"1em"}>
            <Input
              rounded={"1em"}
              borderColor={"gray.500"}
              placeholder="Treasure Kost, Warteg Murah, Kost terdekat dari UMN"
              textOverflow={"ellipsis"}
            />
            <InputRightElement>
              <SearchIcon pr={"1em"} boxSize={"10"} color={"gray.500"} />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Stack>

      {/* mobile filter panel (button) */}

      <Show breakpoint="(max-width: 1020px)">
        <Stack display={"flex"} alignItems={"end"}>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button
                fontSize={"xl"}
                bgGradient={"linear(to-l, #0198BD, #01108D)"}
                rounded={"0.5em"}
                color={"white"}
                w={"10em"}
              >
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                Are you sure you want to have that milkshake?
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Stack>
      </Show>

      <Stack paddingBottom={"3em"} flexDirection={"row"}>
        {/* desktop filter panel */}

        <Show breakpoint="(min-width: 1020px)">
          <Stack
            bgColor={"whiteAlpha.200"}
            flex={"1"}
            borderRadius={"1em"}
            border={"0.05em solid #718096"}
            padding={"1em"}
          >
            <Text fontWeight={600}>Put your filter here</Text>
          </Stack>
        </Show>
        <Stack
          flex={"2"}
          borderRadius={"1em"}
          paddingStart={["0em", "0em", "0em", "1em", "1em"]}
        >
          <ListingsList />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ListingPage;
