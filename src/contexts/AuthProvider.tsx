import { ReactNode, createContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ResponseErrorModel, ResponseModel, baseUrl } from "@/hooks/useApi";
import { useToast } from "@chakra-ui/react";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string | null;
  role: "client" | "pemilik" | "admin";
  token: string;
};

type UserDto = Omit<User, "token"> & {
  noHp: string;
};

type AuthContext = {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => void;
  logout: () => void;
};

type LoginDto = Pick<User, "id" | "email" | "role"> & {
  token: string;
};

export const AuthContext = createContext<AuthContext>({
  user: null,
  status: "loading",
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatus("unauthenticated");
      return;
    }

    axios
      .get<ResponseModel<UserDto>>(baseUrl + "/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        setUser({
          ...res.data.data,
          token: token,
        });

        setStatus("authenticated");
      })
      .catch(() => {
        localStorage.removeItem("token");
        setStatus("unauthenticated");
      });
  }, []);

  const login = (email: string, password: string) => {
    setStatus("loading");
    axios
      .post<ResponseModel<LoginDto>>(baseUrl + "/auth/login", {
        email,
        password,
      })

      .then((authRes) => {
        localStorage.setItem("token", authRes.data.data.token);

        axios
          .get<ResponseModel<UserDto>>(baseUrl + "/users/profile", {
            headers: {
              Authorization: `Bearer ${authRes.data.data.token}`,
            },
          })
          .then((profileRes) => {
            setUser({
              ...profileRes.data.data,
              token: authRes.data.data.token,
            });

            toast({
              title: "Login Berhasil",
              description: "Selamat Datang di KITAB",
              status: "success",
              duration: 3000,
              isClosable: true,
            });

            setStatus("authenticated");
          })
          .catch(() => {
            localStorage.removeItem("token");
            setStatus("unauthenticated");
          });
      })
      .catch((err: AxiosError<ResponseErrorModel>) => {
        toast({
          title: "Login Gagal",
          description: err.response?.data.reason,
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        setStatus("unauthenticated");
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    toast({
      title: "Logout Berhasil",
      description: "Terima Kasih telah menggunakan KITAB",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
