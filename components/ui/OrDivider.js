import React from "react";

const OrDivider = () => {
  return (
    <div className="mt-2 flex items-center justify-center gap-4">
      <div className="mt-2 h-0.5 flex-1 bg-gray-400"></div>
      <p className="mt-2 text-sm text-gray-600">or</p>
      <div className="mt-2 h-0.5 flex-1 bg-gray-400"></div>
    </div>
  );
};

export default OrDivider;
