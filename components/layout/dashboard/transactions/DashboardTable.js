"use client";

import React from "react";
import TransactionList from "../../transaction/TransactionList";
import TransactionHeading from "../../transaction/TransactionHeading";
import { useSelector } from "react-redux";

const DashboardTable = () => {
  const history = useSelector((state) => state.user.history);

  return (
    <div className="min-h-[200px]">
      <table className="min-w-full mt-4">
        <TransactionHeading />
        <TransactionList transactions={history} />
      </table>
    </div>
  );
};

export default DashboardTable;
