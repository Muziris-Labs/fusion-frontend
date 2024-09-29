"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import StepContainer from "./StepContainer";
import useSignup from "@/hooks/useSignup";
import { Auth0Client } from "auth0-spa-js";
import { setEmail, setStep, setUser } from "@/redux/slice/SignupSlice";

const Step3 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleEmail } = useSignup();
  const email = useSelector((state) => state.signup.email);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.signup.user);

  return (
    <StepContainer
      title="Setup your new Wallet"
      description="Verify your Email to Deploy your wallet."
    >
      {user && (
        <div className="w-full border-[1px] border-black dark:border-white flex border-dashed rounded-xl mt-8 p-5 gap-5">
          <Image
            src={user.picture}
            width={50}
            height={40}
            className="rounded-full"
            alt="profilepic"
          />
          <div className="flex flex-col justify-between ">
            <p className="font-semibold text-lg dark:text-white">
              {user.nickname}
            </p>
            <p className="font-outfit text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
      )}

      {email && (
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

            dispatch(setEmail(null));
            dispatch(setUser(null));
          }}
        >
          Logout
        </p>
      )}

      <Button
        className="mt-8 w-full p-5 flex items-center justify-center font-semibold dark:bg-white dark:text-black rounded-full text-sm font-outfit normal-case"
        onClick={() => {
          if (email) {
            dispatch(setStep(3));
            return;
          }

          setIsLoading(true);
          handleEmail()
            .then(() => {
              setIsLoading(false);
            })
            .catch((e) => {
              console.log(e);
              setIsLoading(false);
            });
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : email ? (
          "Continue"
        ) : (
          "Verify Email"
        )}
      </Button>
    </StepContainer>
  );
};

export default Step3;
