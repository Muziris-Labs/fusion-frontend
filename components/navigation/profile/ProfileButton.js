"use client";

import { Menu } from "@material-tailwind/react";

import ProfileMenu from "./ProfileMenu";
import ProfileMenuList from "./ProfileMenuList";

const ProfileButton = () => {
  return (
    <Menu>
      <ProfileMenu />
      <ProfileMenuList />
    </Menu>
  );
};

export default ProfileButton;
