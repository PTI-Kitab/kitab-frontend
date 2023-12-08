import { Text, Stack } from "@chakra-ui/react";
import Kost101 from "@/components/Kost101";
import { useEffect, useState } from "react";
import useApi, {
  ResponseModel,
  ResponseErrorModel,
  useToastErrorHandler,
} from "@/hooks/useApi";
import { useNavigate, useParams } from "@/router";
import { AxiosError } from "axios";
import LoadingScreen from "@/components/LoadingScreen";
import ResetScroll from "@/components/ResetScroll";
import useTitle from "@/hooks/useTitle";

type Article101 = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

type ArticleContent = Article101 & { content: string };

const ArticlePage = () => {
  // hooks
  const api = useApi();
  const errorHandler = useToastErrorHandler();

  const { id } = useParams("/articles/:id");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // [Articles]
  const [articles, setArticles] = useState<Article101[]>([]);
  const [isLoadCandidate, setIsLoadCandidate] = useState<boolean>(true);

  // [Content]
  const [content, setContent] = useState<ArticleContent | null>(null);

  useEffect(() => {
    api
      .get<ResponseModel<Article101[]>>("/articles?page=1")
      .then((res) => {
        if (res.data.data.length < 5) {
          setIsLoadCandidate(false);
        }

        setArticles(res.data.data);
      })
      .catch(errorHandler);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    api
      .get<ResponseModel<ArticleContent>>(`/articles/${id}`)
      .then((res) => {
        setContent(res.data.data);
        setIsLoading(false);
      })
      .catch((err: AxiosError<ResponseErrorModel>) => {
        errorHandler(err);
        navigate("/");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onLoadMoreButton = () => {
    api
      .get<ResponseModel<Article101[]>>(
        `/articles?page=${~~(articles.length / 5) + 1}`
      )
      .then((res) => {
        if (res.data.data.length < 5) {
          setIsLoadCandidate(false);
        }

        setArticles([...articles, ...res.data.data]);
      })
      .catch(errorHandler);
  };

  useTitle(`KITAB - ${content?.title}`);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack direction={"column"}>
      <ResetScroll />
      <Stack
        minH={"50vh"}
        direction={"column"}
        mx={["2em", "2em", "8em", "8em", "8em"]}
        my={"1em"}
        bgColor={"rgba(255, 255, 255, 0.15)"}
        backdropFilter={"blur(4px)"}
        rounded={"2xl"}
        color={"white"}
        textShadow={"md"}
        p={"1em"}
      >
        <Stack>
          <Text
            fontWeight={"bold"}
            fontSize={["2xl", "2xl", "4xl", "4xl", "4xl"]}
          >
            {content?.title}
          </Text>
          <Text>
            {
              // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              new Date(content?.createdAt!).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }
          </Text>
        </Stack>

        <Stack my={"1em"}>
          <div
            dangerouslySetInnerHTML={{
              __html: content?.content || "",
            }}
          />
        </Stack>
      </Stack>
      <Kost101
        articles={articles}
        isLoadCandidate={isLoadCandidate}
        onLoadMoreButton={onLoadMoreButton}
      />
    </Stack>
  );
};

export default ArticlePage;
