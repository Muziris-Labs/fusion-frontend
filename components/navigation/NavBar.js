import React from "react";
import NavMenu from "./NavMenu";

const NavBar = () => {
  return (
    <nav className="h-screen w-72 hidden lg:flex">
      <NavMenu />
    </nav>
  );
};

export default NavBar;
