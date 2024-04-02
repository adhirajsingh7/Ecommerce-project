import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import NewProductPage from "../pages/NewProductPage";
import LoginPage from "../pages/Login page/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/product/:product_id",
    element: <ProductPage />,
  },
  {
    path: "/dashboard",
    element: <NewProductPage />,
  },
]);

export default router;
