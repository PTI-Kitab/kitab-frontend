import { Text, Card, CardBody, Stack } from "@chakra-ui/react";

const Prabowo = () => {
  return (
    <>
      <Stack h={"100vh"} align={"center"} justify={"center"}>
        <Card
          w={["16em", "20em", "24em", "32em", "36em"]}
          rounded={"full"}
          bgColor={"gray.100"}
        >
          <CardBody>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
              vero dolore ex maiores eum ratione aut, sapiente quae quaerat
              perspiciatis nisi obcaecati, deserunt accusamus quos alias
              incidunt culpa veritatis consequatur?
            </Text>
          </CardBody>
        </Card>
      </Stack>
    </>
  );
};

export default Prabowo;
