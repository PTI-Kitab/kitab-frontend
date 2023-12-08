import CKEditorWrapper from "@/components/CKEditor";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Text,
  Stack,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormControl,
  FormErrorMessage,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";

type Article101 = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

type Content = Article101 & { content: string };

type ModalState = {
  mode: "create" | "edit" | "delete";
  currentArticle?: Content;
};

type ArticleForm = {
  title: string;
  content: string;
};

const ArticleList = ({
  article,
  onEdit,
  onDelete,
}: {
  article: Article101;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <Stack
      direction={"row"}
      align={"center"}
      justify={"space-between"}
      bgColor={"whiteAlpha.200"}
      rounded={"2xl"}
      p={"1em"}
    >
      <Stack>
        <Text fontWeight={"bold"} fontSize={"lg"}>
          {article.title}
        </Text>
        <Text>
          {new Date(article.createdAt).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </Stack>

      <Stack direction={"row"}>
        <Button onClick={onEdit} rounded={"2xl"}>
          <Icon as={FaPenToSquare} />
        </Button>
        <Button onClick={onDelete} rounded={"2xl"}>
          <Icon as={FaTrash} />
        </Button>
      </Stack>
    </Stack>
  );
};

const Kost101Manager = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<Article101[]>([]);
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const api = useApi();
  const toast = useToast();
  const handleError = useToastErrorHandler();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ search: string }>();

  const {
    register: registerArticleForm,
    formState: { errors: articleFormErrors },
    handleSubmit: handleSubmitArticleForm,
    control: articleFormControl,
    reset: resetArticleForm,
  } = useForm<ArticleForm>();

  const fetchArticles = () => {
    const urlBuilder = new URLSearchParams();
    if (search) urlBuilder.append("search", search);
    if (page) urlBuilder.append("page", page.toString());

    api
      .get<ResponseModel<Article101[]>>(`/articles?${urlBuilder.toString()}`)
      .then((res) => {
        setArticles(res.data.data);
      })
      .catch(handleError);
  };

  useEffect(() => {
    fetchArticles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  return (
    <Stack direction={"column"} justify={"space-between"} h={"full"}>
      <Stack direction={"row"} justify={"space-between"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          CMS
        </Text>

        <Button
          rounded={"2xl"}
          onClick={() => {
            setModalState({
              mode: "create",
            });
            resetArticleForm();
          }}
        >
          Buat Baru
        </Button>
      </Stack>

      <Stack
        as={"form"}
        onSubmit={handleSubmit((v) => {
          setSearch(v.search);
          setPage(1);
        })}
        direction={"row"}
        my={"2em"}
      >
        <FormControl isInvalid={!!errors.search}>
          <InputGroup bgColor={"whiteAlpha.200"} rounded={"1em"}>
            <Input
              {...register("search", {
                // required: "Search harus diisi",
              })}
              rounded={"1em"}
              borderColor={"gray.500"}
              placeholder="Cari artikel"
              textOverflow={"ellipsis"}
            />
            <InputRightElement>
              <SearchIcon pr={"1em"} boxSize={"10"} color={"gray.500"} />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.search && errors.search.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          rounded={"full"}
          bgColor={"whiteAlpha.200"}
          color={"white"}
        >
          Cari
        </Button>
      </Stack>

      <Stack direction={"column"} gap={"1em"} flex={1}>
        {articles.map((article) => (
          <ArticleList
            article={article}
            onEdit={() => {
              api
                .get<ResponseModel<Content>>(`/articles/${article.id}`)
                .then((res) => {
                  setModalState({
                    mode: "edit",
                    currentArticle: res.data.data,
                  });
                  resetArticleForm(res.data.data);
                })
                .catch((err) => {
                  handleError(err);
                  setModalState(null);
                });
            }}
            onDelete={() => {
              api
                .get<ResponseModel<Content>>(`/articles/${article.id}`)
                .then((res) => {
                  setModalState({
                    mode: "delete",
                    currentArticle: res.data.data,
                  });
                })
                .catch((err) => {
                  handleError(err);
                  setModalState(null);
                });
            }}
          />
        ))}
      </Stack>

      <Stack w={"full"} align={"center"} justify={"center"} my={"1em"}>
        <Stack direction={"row"}>
          <Button
            rounded={"full"}
            bgColor={"whiteAlpha.200"}
            color={"white"}
            onClick={() => setPage(page - 1)}
            isDisabled={page === 1}
          >
            <ChevronLeftIcon />
          </Button>
          <Input
            w={"3em"}
            rounded={"2xl"}
            // defaultValue ={page}
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            textAlign={"center"}
            type="number"
          />
          <Button
            rounded={"full"}
            bgColor={"whiteAlpha.200"}
            color={"white"}
            onClick={() => setPage(page + 1)}
            isDisabled={articles.length < 5}
          >
            <ChevronRightIcon />
          </Button>
        </Stack>
      </Stack>

      <Modal
        isOpen={!!modalState}
        onClose={() => {
          setModalState(null);
          resetArticleForm();
        }}
        isCentered
        size={modalState?.mode === "delete" ? "md" : "full"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalState?.mode === "delete"
              ? "Hapus"
              : modalState?.mode === "edit"
              ? "Edit"
              : "Buat"}{" "}
            Artikel
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalState?.mode === "delete" && (
              <>
                <Text>
                  Apakah anda yakin untuk menghapus artikel:{" "}
                  <Text as="span" fontWeight={"bold"}>
                    {modalState.currentArticle?.title}
                  </Text>{" "}
                  ?
                </Text>
                <ModalFooter>
                  <Button
                    mx={"0.25em"}
                    onClick={() => {
                      api
                        .delete(`/articles/${modalState?.currentArticle?.id}`)
                        .then(() => {
                          toast({
                            title: "Berhasil",
                            description: "Artikel berhasil dihapus",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                          });
                        })
                        .catch((err) => {
                          handleError(err);
                        })
                        .finally(() => {
                          setModalState(null);
                          resetArticleForm();
                          fetchArticles();
                        });
                    }}
                  >
                    Yakin
                  </Button>
                  <Button
                    mx={"0.25em"}
                    onClick={() => {
                      setModalState(null);
                      resetArticleForm();
                      fetchArticles();
                    }}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}

            {modalState?.mode === "create" && (
              <form
                onSubmit={handleSubmitArticleForm((e) => {
                  api
                    .post("/articles", e)
                    .then(() => {
                      toast({
                        title: "Berhasil",
                        description: "Artikel baru berhasil dibuat",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });

                      setModalState(null);
                    })
                    .catch((err) => {
                      handleError(err);
                    })
                    .finally(() => {
                      setModalState(null);
                      resetArticleForm();
                      fetchArticles();
                    });
                })}
              >
                <FormControl isInvalid={!!articleFormErrors.title} my={"1em"}>
                  <FormLabel>Judul</FormLabel>
                  <Input
                    {...registerArticleForm("title", {
                      required: "Judul harus diisi",
                    })}
                  />
                  <FormErrorMessage>
                    {articleFormErrors.title && articleFormErrors.title.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!articleFormErrors.content} my={"1em"}>
                  <FormLabel>Konten</FormLabel>
                  <CKEditorWrapper
                    name="content"
                    control={articleFormControl}
                  />
                  <FormErrorMessage>
                    {articleFormErrors.content &&
                      articleFormErrors.content.message}
                  </FormErrorMessage>
                </FormControl>

                <ModalFooter>
                  <Button mx={"0.25em"} type="submit">
                    Submit
                  </Button>
                  <Button
                    mx={"0.25em"}
                    onClick={() => {
                      setModalState(null);
                      resetArticleForm();
                      fetchArticles();
                    }}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </form>
            )}

            {modalState?.mode === "edit" && (
              <form
                onSubmit={handleSubmitArticleForm((e) => {
                  api
                    .put(`/articles/${modalState.currentArticle?.id}`, e)
                    .then(() => {
                      toast({
                        title: "Berhasil",
                        description: "Artikel berhasil di edit",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                    .catch((err) => {
                      handleError(err);
                    })
                    .finally(() => {
                      resetArticleForm();
                      setModalState(null);
                      fetchArticles();
                    });
                })}
              >
                <FormControl isInvalid={!!articleFormErrors.title} my={"1em"}>
                  <FormLabel>Judul</FormLabel>
                  <Input
                    {...registerArticleForm("title", {
                      required: "Judul harus diisi",
                      value: modalState.currentArticle?.title,
                    })}
                  />
                  <FormErrorMessage>
                    {articleFormErrors.title && articleFormErrors.title.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!articleFormErrors.content} my={"1em"}>
                  <FormLabel>Konten</FormLabel>
                  <CKEditorWrapper
                    name="content"
                    control={articleFormControl}
                    defaultValue={modalState.currentArticle?.content}
                  />
                  <FormErrorMessage>
                    {articleFormErrors.content &&
                      articleFormErrors.content.message}
                  </FormErrorMessage>
                </FormControl>

                <ModalFooter>
                  <Button mx={"0.25em"} type="submit">
                    Submit
                  </Button>
                  <Button
                    mx={"0.25em"}
                    onClick={() => {
                      setModalState(null);
                      resetArticleForm();
                      fetchArticles();
                    }}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default Kost101Manager;
