import React from "react";
import NavMenu from "./NavMenu";

const NavBar = ({ searchParams }) => {
  console.log("Nav: " + searchParams);
  return (
    <nav className="flex justify-center p-2">
      <NavMenu />
    </nav>
  );
};

export default NavBar;
