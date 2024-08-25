import React from "react";
import NavItem from "./NavItem";

const navListLeft = [
  { href: "/transfer", label: "Send" },
  { href: "/receive", label: "Receive" },
];

const navListRight = [
  { href: "/transactions", label: "History" },
  { href: "/settings", label: "Settings" },
];

const NavList = ({ children }) => {
  return (
    <ul className="flex justify-between items-center gap-10 h-16 bg-white rounded-full p-5 px-9 shadow-md">
      {navListLeft.map((item) => (
        <NavItem key={item.label} href={item.href} label={item.label} />
      ))}

      {children}

      {navListRight.map((item) => (
        <NavItem key={item.label} href={item.href} label={item.label} />
      ))}
    </ul>
  );
};

export default NavList;
