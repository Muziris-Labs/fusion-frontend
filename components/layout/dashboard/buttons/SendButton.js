"use client";

import React from "react";

import { Button } from "@material-tailwind/react";
import { ArrowBigUp } from "lucide-react";

const SendButton = () => {
  return (
    <Button
      size="lg"
      color="white"
      className="bg-transparent shadow-none hover:shadow-none rounded-none py-12 flex items-center gap-2 justify-center bg-gray-50 border"
      fullWidth
    >
      Send <ArrowBigUp size={24} />
    </Button>
  );
};

export default SendButton;
