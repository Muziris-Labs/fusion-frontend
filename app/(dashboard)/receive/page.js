"use client";

import React from "react";

import { Button } from "@material-tailwind/react";

import FusionCard from "@/components/ui/FusionCard";
import DashboardCredit from "@/components/layout/dashboard/DashboardCredit";

import SettingsQRContainer from "@/components/layout/dashboard/settings/SettingsQRContainer";
import SettingsChains from "@/components/layout/dashboard/settings/SettingsChains";

const ReceivePage = () => {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-2">
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
                Change your passkey for security reasons or if you forgot it
              </p>
            </div>

            <Button className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case">
              Change
            </Button>
          </FusionCard>

          <FusionCard className="p-6 shadow text-center space-y-5">
            <div className="flex flex-col gap-1 w-full">
              <h2 className="text-2xl font-semibold">Deployments</h2>
              <p className="text-sm text-gray-500">
                Manage your deployments and view their status
              </p>
            </div>

            <SettingsChains />
          </FusionCard>
        </div>
      </div>
    </div>
  );
};

export default ReceivePage;
