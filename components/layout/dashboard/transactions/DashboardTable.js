"use client";

import React from "react";
import { useSelector } from "react-redux";

import TransactionList from "../../transaction/TransactionList";
import TransactionHeading from "../../transaction/TransactionHeading";
import { XCircleIcon } from "lucide-react";

const DashboardTable = ({ size = 3 }) => {
  const history = useSelector((state) => state.user.history);

  let transactions = [];
  if (size !== 0) {
    transactions = history.slice(0, size);
  } else {
    transactions = history;
  }

  return (
    <div
      className="min-h-[200px] flex flex-col items-center"
      style={{
        justifyContent:
          transactions && transactions.length > 0 ? "flex-start" : "center",
      }}
    >
      {transactions && transactions.length > 0 && (
        <table className="min-w-full mt-4">
          <TransactionHeading />
          <TransactionList transactions={transactions} />
        </table>
      )}
      {(!transactions || transactions.length === 0) && (
        <div className="text-center text-gray-500 w-full flex flex-col items-center justify-center">
          <XCircleIcon size={50} className="mb-2" />
          No transactions found
        </div>
      )}
    </div>
  );
};

export default DashboardTable;
