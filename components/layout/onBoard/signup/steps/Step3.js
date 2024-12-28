"use client";

import { Loader2 } from "lucide-react";
import { Button, Input } from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import StepContainer from "./StepContainer";
import { setAccessToken, setStep } from "@/redux/slice/SignupSlice";
import OTPInput from "react-otp-input";
import { toast } from "sonner";
import useEmail from "@/hooks/useEmail";
import { useTheme } from "next-themes";

const Step3 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const accessToken = useSelector((state) => state.signup.accessToken);
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const { requestCode, verifyCode } = useEmail();
  const requestTime = useSelector((state) => state.signup.requestTime);
  const [time, setTime] = useState(new Date().getTime());
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StepContainer
      title="Add Recovery"
      description="Add your email as a recovery option for your account."
    >
      {!accessToken && (
        <div className="mt-10 flex w-full">
          <Input
            label="Your Email"
            size="lg"
            className={
              "rounded-xl rounded-r-none dark:text-white dark:focus:border-white dark:focus:border-t-transparent font-outfit"
            }
            labelProps={{
              className:
                "peer-placeholder-shown:mt-[5px] dark:peer-focus:after:!border-white dark:peer-focus:text-white dark:peer-placeholder-shown:text-white peer-focus:before:w-1 before:w-1 peer-placeholder-shown:before:w-3 peer-focus:mt-0 after:rounded-tr-none font-outfit before:border-none",
            }}
            containerProps={{
              className: "h-14 dark:text-white",
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Button
            variant="text"
            color="blue-gray"
            className={
              "flex items-center w-32 font-medium rounded-xl rounded-l-none border border-l-0 dark:bg-white dark:text-black border-black dark:border-white bg-black/80 hover:bg-black/70 dark:hover:bg-white/80 text-white px-5 py-0 font-noto text-sm normal-case"
            }
            onClick={() => {
              const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
              if (!emailRegex.test(email)) {
                toast.error("Invalid email address.");
                return;
              }

              requestCode(email);
            }}
            disabled={
              isLoading ||
              !email ||
              (() => {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!emailRegex.test(email)) {
                  return true;
                }
                return false;
              })() ||
              (requestTime && time < requestTime + 60000)
            }
          >
            {requestTime && time < requestTime + 60000
              ? `Resend in ${Math.floor((requestTime + 60000 - time) / 1000)}s`
              : "Send OTP"}
          </Button>
        </div>
      )}

      {!accessToken && requestTime && (
        <OTPInput
          onChange={(e) => {
            setCode(e?.toLowerCase());
          }}
          value={code}
          inputStyle="inputStyle"
          numInputs={6}
          separator={<span></span>}
          containerStyle={{
            marginLeft: "",
            marginTop: "20px",
          }}
          renderInput={(props) => (
            <input
              {...props}
              style={{
                color: resolvedTheme === "dark" ? "white" : "black",
                width: "100%",
                outline: "2px solid transparent",
                outlineOffset: "2px",
                background: "transparent",
                borderWidth: "1px",
                borderColor: resolvedTheme === "dark" ? "white" : "black",
                borderRadius: "10px",
                textAlign: "center",
                height: "60px",
                margin: "0 5px",

                fontSize: "30px",
              }}
              placeholder="-"
            />
          )}
        />
      )}

      <Button
        className="mt-5 w-full p-5 flex items-center justify-center font-semibold dark:bg-white dark:text-black rounded-full text-sm font-outfit normal-case"
        onClick={() => {
          if (accessToken) {
            dispatch(setStep(3));
            return;
          }

          setIsLoading(true);
          verifyCode(email, code)
            .then(() => {
              setIsLoading(false);
            })
            .catch((e) => {
              console.log(e);
              setIsLoading(false);
            });
        }}
        disabled={accessToken ? false : isLoading || !code}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : accessToken ? (
          "Continue"
        ) : (
          "Verify Email"
        )}
      </Button>
      <Button
        className="mt-4 w-full p-5 flex items-center justify-center font-semibold bg-transparent text-black  dark:border-white dark:text-white border border-black rounded-full text-sm font-outfit normal-case"
        onClick={() => {
          if (accessToken) {
            dispatch(setAccessToken(null));
            return;
          }

          dispatch(setStep(3));
        }}
        disabled={isLoading}
      >
        {!accessToken ? "Skip for now" : "Remove Email"}
      </Button>
    </StepContainer>
  );
};

export default Step3;
