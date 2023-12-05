import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "@generouted/react-router";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./contexts/AuthProvider";

import "@fontsource/kanit/200.css";
import "@fontsource/kanit/300.css";
import "@fontsource/kanit/400.css";
import "@fontsource/kanit/500.css";
import "@fontsource/kanit/600.css";
import "@fontsource/kanit/700.css";
import "@fontsource/kanit/800.css";
import "@fontsource/kanit/900.css";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Kanit', sans-serif`,
    body: `'Kanit', sans-serif`,
  },
  styles: {
    global: {
      h2: {
        fontSize: "2xl",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "xl",
        fontWeight: "bold",
      },
      h4: {
        fontSize: "lg",
        fontWeight: "bold",
      },
      // table: {
      //   borderCollapse: "collapse",
      // },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
