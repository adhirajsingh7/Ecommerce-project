import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/Login page/LoginPage";
import CartPage from "../pages/Cart page/CartPage";
import NavbarLayout from "../layout/Navbar layout/Navbar.layout";
import DashboardPage from "../pages/Dashboard page/DashboardPage";

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
      {
        path: "/product/:product_id",
        element: <ProductPage />,
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
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

export default router;
