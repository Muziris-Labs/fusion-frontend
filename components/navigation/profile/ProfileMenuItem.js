import { MenuItem } from "@material-tailwind/react";

import React from "react";
import Link from "next/link";

const ProfileMenuItem = ({ label, icon, href }) => {
  return (
    <MenuItem>
      <Link href={href} className="text-black flex gap-2 items-center">
        {icon} {label}
      </Link>
    </MenuItem>
  );
};

export default ProfileMenuItem;
