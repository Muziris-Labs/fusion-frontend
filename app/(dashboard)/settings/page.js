import React from "react";

import FusionCard from "@/components/ui/FusionCard";
import DashboardCredit from "@/components/layout/dashboard/DashboardCredit";
import SettingsChains from "@/components/layout/dashboard/settings/SettingsChains";
import ChangePasskeyBtn from "@/components/layout/dashboard/settings/ChangePasskeyBtn";
import SettingsQRContainer from "@/components/layout/dashboard/settings/SettingsQRContainer";
import DeployBtn from "@/components/layout/dashboard/settings/DeployBtn";

const SettingPage = () => {
  return (
    <div className="mt-5 max-w-4xl mx-auto space-y-2">
      <div className="flex gap-5">
        <div className="w-1/2 space-y-5">
          <DashboardCredit />
          <SettingsQRContainer />
        </div>

        <div className="w-1/2 space-y-5">
          <FusionCard className="p-6 shadow space-y-5">
            <div className="flex flex-col gap-1 w-full">
              <h2 className="text-2xl font-semibold">Change Passkey</h2>
              <p className="text-sm text-gray-500">
                Change your Passkey with a new one. This will require you to
                authenticate with Email.
              </p>
            </div>

            <ChangePasskeyBtn />
          </FusionCard>

          <FusionCard className="p-6 shadow text-center space-y-5">
            <div className="flex flex-col gap-1 w-full">
              <h2 className="text-2xl font-semibold">Deployments</h2>
              <p className="text-sm text-gray-500">
                Manage your deployments and view their status
              </p>
            </div>

            <SettingsChains />

            <DeployBtn />
          </FusionCard>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
