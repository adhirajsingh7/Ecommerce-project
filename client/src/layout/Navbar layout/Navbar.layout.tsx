import * as React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../../components/Navbar/Navbar.component";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../../api/cart.api";

const NavbarLayout = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "");
  const {
    isPending,
    isError,
    error,
    data: userCart,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart({ userId }),
  });
  // console.log(userCart)

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <NavbarComponent userCart={userCart} />
      <Outlet context={userCart} />
    </>
  );
};

export default NavbarLayout;
