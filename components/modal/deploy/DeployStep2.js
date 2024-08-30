"use client";

import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Auth0Client } from "auth0-spa-js";
import { Fingerprint } from "lucide-react";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";
import useDeploy from "@/hooks/useDeploy";

export default function DeployStep2() {
  const isLoading = useSelector((state) => state.deploy.isLoading);
  const user = useSelector((state) => state.user.mailUser);
  const { handleEmailProof, handlePasskeyProof } = useDeploy();
  return (
    <>
      {!isLoading && (
        <>
          <div className="flex flex-col gap-1 w-full items-start">
            <h1 className="text-2xl font-semibold">Approval Required</h1>
            <p className="text-sm text-gray-500">
              Generate a proof to approve the deployment
            </p>
          </div>

          <Button
            color="white"
            className=" flex h-40 w-full rounded-full border-px items-center justify-center border-black border-[1px] bg-white px-3"
            onClick={() => {
              handlePasskeyProof();
            }}
            disabled={isLoading}
          >
            <Fingerprint className="text-black" size={80} />
          </Button>

          {user && (
            <div className="w-full -mt-3 border-[1px] border-black flex border-dashed rounded-xl p-5 gap-5">
              <Image
                src={user.picture}
                width={50}
                height={40}
                className="rounded-full"
                alt="profilepic"
              />
              <div className="flex flex-col justify-between items-start ">
                <p className="font-semibold text-lg">{user.nickname}</p>
                <p className="font-outfit text-sm text-gray-600">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {user && (
            <p
              className="-mt-8 -mb-5 text-center w-full text-xs text-gray-500 hover:cursor-pointer hover:underline"
              onClick={() => {
                const auth0 = new Auth0Client({
                  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
                  client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
                  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                  scope: "read:current_user",
                });

                auth0.logout();
              }}
            >
              Logout
            </p>
          )}

          <div className="flex flex-col gap-2 w-full">
            <Button
              className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case border-black border-[1px]"
              onClick={() => {
                handleEmailProof();
              }}
              disabled={isLoading}
            >
              Use E-mail instead
            </Button>
          </div>
        </>
      )}

      {isLoading && (
        <>
          <div className="flex flex-col gap-1 w-full items-start">
            <h1 className="text-2xl font-semibold">Generating Proof</h1>
            <p className="text-sm text-gray-500">
              Please wait while we generate the proof
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
