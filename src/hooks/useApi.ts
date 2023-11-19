import axios, { AxiosError, isAxiosError } from "axios";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
export const baseUrl =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const instance = axios.create({
  baseURL: baseUrl,
});

export type ResponseModel<T = string> = {
  status: number;
  message: string;
  data: T;
};

export type ResponseErrorModel<T = string> = {
  status: number;
  message: string;
  reason: T;
};

const useApi = () => {
  const user = useAuth();

  useEffect(() => {
    if (user) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.user?.token}`;
    }

    return () => {
      delete instance.defaults.headers.common["Authorization"];
    };
  }, [user]);

  return instance;
};

export const useToastErrorHandler = () => {
  const toast = useToast();

  return (error: AxiosError<ResponseErrorModel>) => {
    console.error(error);

    if (!isAxiosError(error)) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (error.response) {
      toast({
        title: "Error",
        description:
          (error.response.data.reason as string) ||
          error.response.data.message ||
          "Something went wrong",
        status: "error",
        isClosable: true,
      });
      return;
    }
  };
};

export default useApi;
