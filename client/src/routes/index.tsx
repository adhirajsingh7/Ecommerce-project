import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import NewProductPage from "../pages/NewProductPage";
import LoginPage from "../pages/Login page/LoginPage";
import CartPage from "../pages/Cart page/CartPage";
import NavbarLayout from "../layout/Navbar layout/Navbar.layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
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
