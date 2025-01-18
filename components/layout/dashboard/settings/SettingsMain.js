import ChangeToken from "./ChangeToken";
import Deployments from "./SettingList/Deployments";
import NodeChanger from "./SettingList/NodeChanger";
import PasskeyChanger from "./SettingList/PasskeyChanger";
import SetupMail from "./SettingList/SetupMail";
import ThemeChanger from "./SettingList/ThemeChanger";

export default function SettingsMain() {
  return (
    <div className="flex flex-col w-full h-full gap-10">
      <h1 className="text-2xl font-normal mb-5 dark:text-white">Settings</h1>

      <div className="flex flex-col gap-10 flex-1 overflow-y-scroll hide-scroll">
        <ThemeChanger />
        <NodeChanger />
        <SetupMail />
        <PasskeyChanger />
        <Deployments />
        <ChangeToken />
      </div>
    </div>
  );
}
