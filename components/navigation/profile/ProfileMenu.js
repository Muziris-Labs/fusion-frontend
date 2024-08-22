import { MenuHandler, Button } from "@material-tailwind/react";

import React from "react";
import Image from "next/image";

const ProfileMenu = () => {
  return (
    <MenuHandler>
      <Button
        color="white"
        className="flex gap-2 items-center justify-start px-3 py-2 bg-white w-fit rounded-full"
      >
        <Image src="/fusion-logo.svg" alt="logo" width={32} height={32} />

        <div className="text-left mr-6">
          <p className="text-gray-500 text-xs">Fusion Id</p>
          <p className="text-sm">0x8aeR...uzQ</p>
        </div>
      </Button>
    </MenuHandler>
  );
};

export default ProfileMenu;
