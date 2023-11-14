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
  isAuthLoading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type LoginDto = Pick<User, "id" | "email" | "role"> & {
  token: string;
};

export const AuthContext = createContext<AuthContext>({
  user: null,
  isAuthLoading: false,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthLoading(false);
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
      })
      .finally(() => setIsAuthLoading(false));
  }, []);

  const login = (email: string, password: string) => {
    setIsAuthLoading(true);
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
      })
      .finally(() => setIsAuthLoading(false));
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

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
