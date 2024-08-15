"use client";

import { useSelector } from "react-redux";

export default function DisclaimerFooter() {
  const { style } = useSelector((state) => state.chain.currentChain);

  return (
    <div
      className="w-full font-noto h-10"
      style={{
        background: style.gradientColorLight,
        color: style.baseTextColor,
      }}
    >
      <div className="flex justify-center h-full p-3 px-5">
        <p className="text-xs">
          This is an alpha version of the platform. Use at your own risk.
          Contracts are unaudited.
        </p>
      </div>
    </div>
  );
}
