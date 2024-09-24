import React from "react";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";
import {
  ArrowDownUp,
  Forward,
  ScanLine,
  Settings,
  WalletMinimal,
} from "lucide-react";

const navList = [
  {
    href: "/dashboard",
    label: "Portfolio",
    icon: <WalletMinimal size={20} />,
  },
  { href: "/transfer", label: "Send", icon: <Forward size={20} /> },
  { href: "/receive", label: "Receive", icon: <ScanLine size={20} /> },
  {
    href: "/transactions",
    label: "History",
    icon: <ArrowDownUp size={20} />,
  },
  { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
];

const NavList = () => {
  return (
    <ul className="flex flex-col w-72 gap-10 py-10 px-9">
      <NavLogo />
      {navList.map((item) => (
        <NavItem
          key={item.label}
          href={item.href}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </ul>
  );
};

export default NavList;
