"use client";

import { setStep } from "@/redux/slice/SignupSlice";
import { Button } from "@material-tailwind/react";
import { Auth0Client } from "auth0-spa-js";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import useChange from "@/hooks/useChange";
import { Loader2 } from "lucide-react";

export default function ChangeStep2() {
  const passkey = useSelector((state) => state.change.passkey);
  const user = useSelector((state) => state.user.mailUser);
  const { handleVerification } = useChange();
  const isLoading = useSelector((state) => state.change.isLoading);

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl text-left font-semibold">Verify your email</h1>
        <p className="text-sm text-left text-gray-500">
          Verify your email to prove your identity
        </p>
      </div>
      {user && (
        <div className="w-full">
          {user && (
            <div className="w-full border-[1px] border-black flex border-dashed rounded-xl  p-5 gap-5">
              <Image
                src={user.picture}
                width={50}
                height={40}
                className="rounded-full"
                alt="profilepic"
              />
              <div className="flex flex-col justify-between items-start ">
                <p className="font-semibold text-lg sm:hidden block">
                  {user.nickname && user.nickname.length > 20 ? (
                    <span>{user.nickname.slice(0, 20)}...</span>
                  ) : (
                    user.nickname
                  )}
                </p>
                <p className="font-semibold text-lg sm:block hidden">
                  {user.nickname}
                </p>
                <p className="font-outfit text-sm text-gray-600 sm:hidden block">
                  {user.email && user.email.length > 25 ? (
                    <span>{user.email.slice(0, 25)}...</span>
                  ) : (
                    user.email
                  )}
                </p>
                <p className="font-outfit text-sm text-gray-600 sm:block hidden">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {user && (
            <p
              className="mt-2 -mb-5 text-center w-full text-xs text-gray-500 hover:cursor-pointer hover:underline"
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
        </div>
      )}

      <Button
        className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case flex items-center justify-center"
        onClick={() => {
          handleVerification();
        }}
        disabled={!passkey || isLoading}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          "Verify Email"
        )}
      </Button>
    </>
  );
}
