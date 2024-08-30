"use client";

import { toggleDeployDrawer } from "@/redux/slice/deploySlice";
import { Button } from "@material-tailwind/react";

import React from "react";
import { useDispatch } from "react-redux";

const DeployBtn = () => {
  const dispatch = useDispatch();
  return (
    <Button
      className="w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case"
      onClick={() => {
        dispatch(toggleDeployDrawer());
      }}
    >
      Deploy
    </Button>
  );
};

export default DeployBtn;
