"use client";

import { Dialog, DialogBody, Button } from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";

import {
  setAccessToken,
  setAuthentication,
  setRequestTime,
  setStep,
  toggleSetupDrawer,
} from "@/redux/slice/setupSlice";
import SetupStep1 from "./setupMail/SetupStep1";
import SetupStep2 from "./setupMail/SetupStep2";
import SetupStep3 from "./setupMail/SetupStep3";
import SetupStepper from "./setupMail/Stepper";

export default function SetupMailModal() {
  const open = useSelector((state) => state.setup.open);
  const isLoading = useSelector((state) => state.setup.isLoading);
  const dispatch = useDispatch();
  const step = useSelector((state) => state.setup.step);

  const handleDrawer = () => {
    if (isLoading) return;
    dispatch(toggleSetupDrawer());
    dispatch(setStep(0));
    dispatch(setAccessToken(null));
    dispatch(setAuthentication(null));
    dispatch(setRequestTime(null));
  };

  return (
    <Dialog
      size="sm"
      open={open}
      handler={() => {
        handleDrawer();
      }}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="font-outfit bg-transparent items-center justify-center flex shadow-none min-w-[90%]"
    >
      <DialogBody className="text-center gap-y-4 font-outfit text-black bg-white rounded-3xl w-full max-w-[32rem] sm:p-10">
        <section className="flex flex-col h-full justify-between items-center">
          {step === 0 && <SetupStep1 />}
          {step === 1 && <SetupStep2 />}
          {step === 2 && <SetupStep3 />}
        </section>
        <div className="w-full flex justify-center mt-3">
          <SetupStepper />
        </div>
      </DialogBody>
    </Dialog>
  );
}
