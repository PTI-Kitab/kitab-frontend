import { MacWindowModel } from "@/components/WindowModel";
import { Heading, Stack, Button, useToast } from "@chakra-ui/react";

const Index = () => {
  const toast = useToast();

  return (
    <Stack h={"100vh"} align={"center"} justify={"center"}>
      <MacWindowModel>
        <Heading color={"white"} size={"md"}>
          Choose your president!
        </Heading>
        <Stack direction={"row"}>
          <Button
            onClick={() => {
              toast({
                title: "Ganjar FTW!",
                status: "success",
                description: "ganjar nomor 1!",
              });
            }}
          >
            Ganjar
          </Button>
          <Button
            onClick={() => {
              toast({
                title: "Prabowo Cringe!",
                status: "error",
                description: "prabowo gembel",
              });
            }}
          >
            Prabowo
          </Button>
          <Button
            onClick={() => {
              toast({
                title: "Anies Gembel!",
                status: "warning",
                description: "anies gembel",
              });
            }}
          >
            Anies
          </Button>
        </Stack>
      </MacWindowModel>
    </Stack>
  );
};

export default Index;
