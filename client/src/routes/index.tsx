import { Navigate, createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import LoginPage from "../pages/Login page/LoginPage";
import CartPage from "../pages/Cart page/CartPage";
import NavbarLayout from "../layout/Navbar layout/Navbar.layout";
import DashboardPage from "../pages/Dashboard page/DashboardPage";
import AddressPage from "../pages/Dashboard settings/AddressPage";
import ProfilePage from "../pages/Dashboard settings/ProfilePage";
import MerchantsPage from "../pages/Dashboard settings/MerchantsPage";
import OrdersPage from "../pages/Dashboard settings/OrdersPage";
import SellProductsPage from "../pages/Dashboard settings/SellProductsPage";
import ProductsPage from "../pages/Products page/ProductsPage";

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
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/product/:product_id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
          {
            path: "addresses",
            element: <AddressPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "merchants",
            element: <MerchantsPage />,
          },
          {
            path: "view-orders",
            element: <OrdersPage />,
          },
          {
            path: "sell-products",
            element: <SellProductsPage />,
          },
        ],
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
]);

export default router;
