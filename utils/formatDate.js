import React from "react";

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const dayMonthYear = date.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return dayMonthYear;
};

export default formatDate;
