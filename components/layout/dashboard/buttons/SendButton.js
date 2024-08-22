"use client";

import { ArrowBigUp } from "lucide-react";
import { Button } from "@material-tailwind/react";

import React from "react";
import { useRouter } from "next/navigation";

const SendButton = () => {
  const router = useRouter();

  return (
    <Button
      size="lg"
      color="white"
      className="bg-transparent shadow-none hover:shadow-none rounded-none py-12 flex items-center gap-2 justify-center bg-gray-50 border"
      fullWidth
      onClick={() => {
        router.push("/send");
      }}
    >
      Send <ArrowBigUp size={24} />
    </Button>
  );
};

export default SendButton;
