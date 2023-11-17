import { Stack, Text, Divider, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Article = {
  id: number;
  title: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

const Kost101 = ({
  articles,
  isLoadCandidate,
}: {
  articles: Article[];
  isLoadCandidate: boolean;
}) => {
  return (
    <Stack
      bgColor={"white"}
      borderTopRadius={"2em"}
      boxShadow={"0px 5px 24px 8px rgba(0,0,0,0.3) inset"}
      px={["4em", "4em", "8em", "8em", "8em"]}
      py={"2em"}
      w={"full"}
    >
      <Text
        fontSize={["2xl", "2xll", "4xl", "4xl", "4xl"]}
        fontWeight={"bold"}
        flex={"1"}
        textAlign={"center"}
      >
        Artikel{" "}
        <Text
          fontWeight={"bold"}
          whiteSpace={"nowrap"}
          as={"span"}
          bgGradient={"linear(to-t, #0198BD, #01108D)"}
          bgClip="text"
        >
          Kost101.
        </Text>
      </Text>

      <Stack>
        {articles.map((article) => (
          <>
            <Divider border={"1px"} borderColor={"#171229"} variant={"solid"} />

            <Stack
              as={Link}
              to={`/articles/${article.id}`}
              flexDirection={"row"}
              align={"center"}
              py={"1em"}
              rounded={"lg"}
              transition={"all 0.1s ease-in-out"}
              _hover={{
                bgColor: "rgba(2, 52, 154, 0.05)",
              }}
            >
              <Stack
                bgColor={"rgba(2, 52, 154, 0.5)"}
                h={"fit-content"}
                rounded={"full"}
                p={"0.5em"}
              >
                <Stack
                  boxSize={"0.25em"}
                  rounded={"full"}
                  outline={"1px solid #02349A"}
                />
              </Stack>
              <Text
                fontSize={["md", "md", "xl", "xl", "xl"]}
                ml={"1em"}
                fontWeight={"semibold"}
                color={"rgba(0, 0, 0, 0.6)"}
                // isTruncated
                noOfLines={2}
              >
                {article.title}
              </Text>
            </Stack>

            <Divider border={"1px"} borderColor={"#171229"} variant={"solid"} />
          </>
        ))}
      </Stack>

      {isLoadCandidate ? (
        <Button
          variant={"ghost"}
          fontWeight={"semibold"}
          color={"rgba(0, 0, 0, 0.6)"}
        >
          Load more...
        </Button>
      ) : (
        <Text
          textAlign={"center"}
          fontWeight={"semibold"}
          color={"rgba(0, 0, 0, 0.6)"}
        >
          Thats it...
        </Text>
      )}
    </Stack>
  );
};

export default Kost101;
