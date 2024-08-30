"use client";

import useDeploy from "@/hooks/useDeploy";
import { Button } from "@material-tailwind/react";
import { Loader2Icon } from "lucide-react";
import { useSelector } from "react-redux";

export default function DeployStep3() {
  const isLoading = useSelector((state) => state.deploy.isLoading);
  const { deployWalletExternal } = useDeploy();

  return (
    <>
      {!isLoading && (
        <>
          <div className="flex flex-col gap-1 w-full items-start">
            <h1 className="text-2xl font-semibold">All set!</h1>
            <p className="text-sm text-gray-500">
              Click the button below to deploy your Fusion
            </p>
          </div>

          <Button
            className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case border-black border-[1px]"
            onClick={() => {
              deployWalletExternal();
            }}
            disabled={isLoading}
          >
            Deploy
          </Button>
        </>
      )}

      {isLoading && (
        <>
          <div className="flex flex-col gap-1 w-full items-start">
            <h1 className="text-2xl font-semibold">Deploy Wallet</h1>
            <p className="text-sm text-gray-500">
              Go grab a coffee while we deploy your wallet
            </p>
          </div>

          <Loader2Icon
            className="text-black animate-spin mt-5 mb-5"
            size={80}
          />
        </>
      )}
    </>
  );
}
