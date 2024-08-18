import React from "react";
import Logo from "./Logo";
import ProfileButton from "./profile/ProfileButton";

const NavBar = () => {
  return (
    <nav className="flex justify-between">
      <Logo />
      <ProfileButton />
    </nav>
  );
};

export default NavBar;
