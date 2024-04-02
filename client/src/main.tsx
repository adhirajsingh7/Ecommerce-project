import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import axios from "axios";
import theme from "./theme/theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Flip, ToastContainer } from "react-toastify";
import LoaderComponent from "./components/Loader.tsx";
import "./styles/global.styles.scss";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:8080";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<LoaderComponent />}>
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
