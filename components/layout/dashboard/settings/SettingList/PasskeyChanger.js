"use client";

import SettingItem from "@/components/ui/SettingItem";
import ThemeButton from "@/components/ui/ThemeButton";
import { toggleChangeDrawer } from "@/redux/slice/changeSlice";
import { Key } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function PasskeyChanger() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  return (
    user &&
    user?.recoveryEnabled && (
      <SettingItem
        title="Change Passkey"
        description="
       Change your Passkey with a new one. This will require you to authenticate with Email.
      "
        icon={<Key size={22} className="mt-1 dark:invert" />}
      >
        <ThemeButton
          theme="Change Passkey"
          onClick={() => {
            dispatch(toggleChangeDrawer());
          }}
          name="Change Passkey"
        />
      </SettingItem>
    )
  );
}
