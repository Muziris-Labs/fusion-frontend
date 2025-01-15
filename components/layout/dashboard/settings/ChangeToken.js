"use client";

import SettingItem from "@/components/ui/SettingItem";
import ThemeButton from "@/components/ui/ThemeButton";
import { toggleDefaultTokenModal } from "@/redux/slice/UserSlice";
import { Coins } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function ChangeToken() {
  const defaultToken = useSelector((state) => state.user.defaultToken);
  const dispatch = useDispatch();
  return (
    <SettingItem
      title="Change Default Token"
      description="
        Change your default token to another one. This will be used on your dashboard to display your token balance.
          "
      icon={<Coins size={22} className="mt-1 dark:invert" />}
      isLast
    >
      <div className="flex items-center gap-4">
        {defaultToken && (
          <div className="flex items-center gap-2">
            <Image
              src={defaultToken.logo}
              alt={defaultToken.name}
              width={20}
              height={20}
              className="rounded-full"
            />

            <div className="text-sm dark:text-white">{defaultToken.symbol}</div>
          </div>
        )}
        <ThemeButton
          theme="Change Token"
          onClick={() => {
            dispatch(toggleDefaultTokenModal());
          }}
          name="Change Token"
        />
      </div>
    </SettingItem>
  );
}
