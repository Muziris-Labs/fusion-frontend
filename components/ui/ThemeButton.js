"use client";

import { Button } from "@material-tailwind/react";

const ThemeButton = ({ theme, onClick, name }) => {
  return (
    <Button
      color="white"
      className="bg-transparent border-[1px] flex items-center gap-2 border-black/10 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-gray-600"
      onClick={onClick}
      style={{
        borderColor: theme === name ? "" : "transparent",
        backgroundColor: theme === name ? "#b09dff" : "",
        color: theme === name ? "white" : "",
        boxShadow:
          theme === name
            ? "0px 4px 6px rgba(0, 0, 0, 0.1)"
            : "0px 0px 0px rgba(0, 0, 0, 0)",
      }}
    >
      {name}
    </Button>
  );
};

export default ThemeButton;
