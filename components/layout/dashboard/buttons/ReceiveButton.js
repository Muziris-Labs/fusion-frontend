"use client";

import { Button } from "@material-tailwind/react";
import { ArrowBigDown } from "lucide-react";

import React from "react";
import { useRouter } from "next/navigation";

const ReceiveButton = () => {
  const router = useRouter();
  return (
    <Button
      size="lg"
      color="white"
      className="bg-transparent shadow-none hover:shadow-none rounded-none py-12 flex items-center gap-2 justify-center border"
      fullWidth
    >
      Receive <ArrowBigDown size={24} />
    </Button>
  );
};

export default ReceiveButton;
