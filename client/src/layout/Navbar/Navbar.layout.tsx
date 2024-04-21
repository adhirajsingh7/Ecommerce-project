import * as React from "react";
import { Outlet } from "react-router-dom";
import { NavbarComponent } from "@/components/Navbar/Navbar.component";
import { useGetCart } from "@/features/cart/api/getCart";

export const NavbarLayout = () => {

  const { isPending, data: userCart } = useGetCart();

  // console.log(userCart?.data[0]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <NavbarComponent userCart={userCart?.data[0]} />
      <Outlet context={userCart?.data[0]} />
    </>
  );
};
