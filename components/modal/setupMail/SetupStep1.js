"use client";
import OTPInput from "react-otp-input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@/redux/slice/setupSlice";
import useSetup from "@/hooks/useSetup";

export default function SetupStep1() {
  const [time, setTime] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { requestCode, verifyCode } = useSetup();
  const isLoading = useSelector((state) => state.setup.isLoading);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const requestTime = useSelector((state) => state.setup.requestTime);

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl text-left font-semibold">Add Recovery</h1>
        <p className="text-sm text-left text-gray-500">
          Add a recovery email to secure your account
        </p>
      </div>

      <div className="mt-10 flex w-full">
        <Input
          label="Your Email"
          size="lg"
          className={"rounded-xl rounded-r-none font-outfit"}
          labelProps={{
            className:
              "peer-placeholder-shown:mt-[5px] peer-focus:before:w-1 before:w-1 peer-placeholder-shown:before:w-3 peer-focus:mt-0 after:rounded-tr-none font-outfit before:border-none",
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
            "flex items-center w-32 font-medium rounded-xl rounded-l-none border border-l-0 border-black bg-black/80 hover:bg-black/60 text-white px-5 py-0 font-noto text-sm normal-case"
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

      {requestTime && (
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
                color: "black",
                width: "100%",
                outline: "2px solid transparent",
                outlineOffset: "2px",
                background: "transparent",
                borderWidth: "1px",
                borderColor: "black",
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
        className="mt-5 w-full p-5 flex items-center justify-center font-semibold rounded-full text-sm font-outfit normal-case"
        onClick={() => {
          dispatch(setIsLoading(true));
          verifyCode(email, code)
            .then(() => {
              dispatch(setIsLoading(false));
            })
            .catch((e) => {
              console.log(e);
              dispatch(setIsLoading(true));
            });
        }}
        disabled={isLoading || !code}
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
