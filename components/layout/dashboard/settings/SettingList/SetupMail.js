"use client";

import SettingItem from "@/components/ui/SettingItem";
import ThemeButton from "@/components/ui/ThemeButton";
import { toggleSetupDrawer } from "@/redux/slice/setupSlice";
import { MailPlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function SetupMail() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  return (
    user &&
    !user?.recoveryEnabled && (
      <SettingItem
        title="Setup Recovery"
        description="
        Setup your recovery email to recover your account in case your lose access to your device.
      "
        icon={<MailPlusIcon size={22} className="mt-1 dark:invert" />}
      >
        <ThemeButton
          theme="Setup Recovery"
          onClick={() => {
            dispatch(toggleSetupDrawer());
          }}
          name="Setup Recovery"
        />
      </SettingItem>
    )
  );
}
