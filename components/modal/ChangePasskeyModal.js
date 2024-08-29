"use client";

import { toggleChangeDrawer } from "@/redux/slice/changeSlice";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { Loader2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "@/redux/slice/changeSlice";
import Stepper from "./changePasskey/Stepper";
import ChangeStep1 from "./changePasskey/ChangeStep1";
import ChangeStep2 from "./changePasskey/ChangeStep2";
import ChangeStep3 from "./changePasskey/ChangeStep3";

export default function ChangePasskeyModal() {
  const open = useSelector((state) => state.change.open);
  const isLoading = useSelector((state) => state.change.isLoading);
  const dispatch = useDispatch();
  const step = useSelector((state) => state.change.step);

  const handleDrawer = () => {
    if (isLoading) return;
    dispatch(toggleChangeDrawer());
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
      className="font-outfit bg-transparent items-center justify-center flex shadow-none"
    >
      <DialogBody className="text-center gap-y-4 font-outfit text-black bg-white rounded-3xl w-full max-w-[32rem] p-10">
        <section className="flex flex-col h-full gap-10 justify-between items-center">
          {step === 0 && <ChangeStep1 />}
          {step === 1 && <ChangeStep2 />}
          {step === 2 && <ChangeStep3 />}
        </section>
        <div className="w-full flex justify-center mt-3">
          <Stepper />
        </div>
      </DialogBody>
    </Dialog>
  );
}
