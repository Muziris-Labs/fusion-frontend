import React from "react";

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
};

export default formatTime;
