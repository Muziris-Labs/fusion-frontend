"use client";

import { toggleChangeDrawer } from "@/redux/slice/changeSlice";
import { Button } from "@material-tailwind/react";

import React from "react";
import { useDispatch } from "react-redux";

const ChangePasskeyBtn = () => {
  const dispatch = useDispatch();
  return (
    <Button
      className="w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case"
      onClick={() => {
        dispatch(toggleChangeDrawer());
      }}
    >
      Change
    </Button>
  );
};

export default ChangePasskeyBtn;
