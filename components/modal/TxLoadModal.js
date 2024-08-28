"use client";

import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { Loader2Icon } from "lucide-react";
import { useSelector } from "react-redux";
export default function TxLoadModal() {
  const open = useSelector((state) => state.tx.isRunning);

  return (
    <Dialog
      size="sm"
      open={open}
      handler={() => {}}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="font-outfit bg-transparent items-center justify-center flex shadow-none"
    >
      <DialogBody className="text-center gap-y-4 font-outfit text-black bg-white rounded-3xl w-full max-w-[32rem] p-10">
        <div className="flex flex-col gap-1 w-full items-start">
          <h1 className="text-2xl font-semibold">Processing Transaction</h1>
          <p className="text-sm text-gray-500">
            Go grab a coffee while we process your transaction.
          </p>
        </div>

        <Loader2Icon className="text-black animate-spin mt-10" size={80} />
      </DialogBody>
    </Dialog>
  );
}
