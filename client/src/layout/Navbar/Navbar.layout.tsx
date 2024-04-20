import * as React from "react";
import { Outlet } from "react-router-dom";
import { NavbarComponent } from "@/components/Navbar/Navbar.component";
import { useGetCart } from "@/features/cart/api/getCart";

export const NavbarLayout = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "");

  const { isPending, data: userCart } = useGetCart(userId);

  if (isPending) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <NavbarComponent userCart={userCart} />
      <Outlet context={userCart} />
    </>
  );
};
