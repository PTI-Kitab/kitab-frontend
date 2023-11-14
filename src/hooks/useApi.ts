import { env } from "process";
import axios from "axios";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
export const baseUrl = env.API_BASE_URL ?? "http://localhost:3000";

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

export default useApi;
