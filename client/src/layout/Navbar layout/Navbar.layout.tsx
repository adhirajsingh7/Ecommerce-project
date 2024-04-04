import * as React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../../components/Navbar/Navbar.component";

const NavbarLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};

export default NavbarLayout;
