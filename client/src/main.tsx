import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import axios from "axios";
import theme from "./theme/theme.ts";
import { Flip, ToastContainer, toast } from "react-toastify";
import "./styles/global.styles.scss";
import "react-toastify/dist/ReactToastify.css";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Loading } from "./components/Loading";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log("REACT QUERY ERROR : ", error);
      if (error?.response?.data?.message) {
        toast.error(
          `Status: ${error?.response?.status} ${error?.response?.data?.message}`
        );
      } else {
        toast.error(`Something went wrong: ${error.message}`);
      }
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
