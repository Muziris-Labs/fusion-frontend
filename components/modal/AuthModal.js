"use client";

import useProof from "@/hooks/useProof";
import { setLoading, toggleProofDrawer } from "@/redux/slice/proofSlice";
import { Dialog, DialogBody, Button, Input } from "@material-tailwind/react";
import { Fingerprint, Loader2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { setWithEmail } from "@/redux/slice/transferSlice";
import { toast } from "sonner";

export default function AuthModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.proof.proofDrawer);
  const loading = useSelector((state) => state.proof.isLoading);
  const { generateProofWithPasskey, requestCode, verifyCode } = useProof();
  const message = useSelector((state) => state.proof.message);
  const withEmail = useSelector((state) => state.transfer.withEmail);
  const [code, setCode] = useState("");
  const requestTime = useSelector((state) => state.transfer.refreshTime);
  const [time, setTime] = useState(new Date().getTime());
  const [email, setEmail] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDrawer = () => {
    if (loading) return;
    dispatch(toggleProofDrawer());
    dispatch(setWithEmail(false));
  };

  return (
    <Dialog
      size="sm"
      open={open}
      handler={handleDrawer}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="font-outfit bg-transparent items-center justify-center flex shadow-none"
    >
      {!loading && (
        <DialogBody className="text-center gap-y-4 font-outfit text-black bg-white rounded-3xl w-full max-w-[32rem] p-10">
          <div className="flex flex-col gap-1 w-full items-start">
            <h1 className="text-2xl font-semibold">Approval Required</h1>
            <p className="text-sm text-gray-500">
              Generate a proof to sign the transaction
            </p>
          </div>

          {!withEmail && (
            <>
              <Button
                color="white"
                className="mt-7 flex h-40 w-full rounded-full border-px items-center justify-center border-black border-[1px] bg-white px-3"
                onClick={() => {
                  generateProofWithPasskey();
                }}
                disabled={loading}
              >
                <Fingerprint className="text-black" size={80} />
              </Button>

              <div className="flex flex-col gap-2 mt-5 w-full">
                <Button
                  className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case border-black border-[1px]"
                  onClick={() => {
                    dispatch(setWithEmail(true));
                  }}
                  disabled={loading}
                >
                  Use E-mail instead
                </Button>
                <Button
                  className=" w-full p-5 font-semibold border-[1px] border-black rounded-full text-sm font-outfit normal-case"
                  color="white"
                  onClick={() => {
                    dispatch(toggleProofDrawer());
                  }}
                  disabled={loading}
                >
                  Back
                </Button>{" "}
              </div>
            </>
          )}

          {withEmail && !loading && (
            <>
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
                    loading ||
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
                    ? `Resend in ${Math.floor(
                        (requestTime + 60000 - time) / 1000
                      )}s`
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
                  verifyCode(email, code);
                }}
                disabled={loading || !code}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Verify Email"
                )}
              </Button>

              <Button
                className=" w-full mt-3 p-5 font-semibold border-[1px] border-black rounded-full text-sm font-outfit normal-case"
                color="white"
                onClick={() => {
                  dispatch(toggleProofDrawer());
                  dispatch(setWithEmail(false));
                }}
                disabled={loading}
              >
                Back
              </Button>
            </>
          )}
        </DialogBody>
      )}
      {loading && (
        <DialogBody className="text-center gap-y-4 font-outfit text-black bg-white rounded-3xl w-full max-w-[32rem] p-10">
          <div className="flex flex-col gap-1 w-full items-start">
            <h1 className="text-2xl font-semibold">{message}.</h1>
            <p className="text-sm text-gray-500">
              Please wait while we generate the proof
            </p>
          </div>

          <Loader2Icon className="text-black animate-spin mt-10" size={80} />
        </DialogBody>
      )}
    </Dialog>
  );
}
