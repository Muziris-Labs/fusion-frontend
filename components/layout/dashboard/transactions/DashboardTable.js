"use client";

import React from "react";
import { useSelector } from "react-redux";

import TransactionList from "../../transaction/TransactionList";
import TransactionHeading from "../../transaction/TransactionHeading";

const DashboardTable = ({ size = 3 }) => {
  const history = useSelector((state) => state.user.history);

  const transactions = history.slice(0, size);

  return (
    <div className="min-h-[200px]">
      <table className="min-w-full mt-4">
        <TransactionHeading />
        <TransactionList transactions={transactions} />
      </table>
    </div>
  );
};

export default DashboardTable;
