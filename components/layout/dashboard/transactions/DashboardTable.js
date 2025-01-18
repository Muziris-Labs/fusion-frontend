"use client";

import React from "react";
import { useSelector } from "react-redux";

import TransactionList from "../../transaction/TransactionList";
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
      className="min-h-[200px] flex flex-col gap-5 w-full h-full"
      style={{
        justifyContent:
          transactions && transactions.length > 0 ? "flex-start" : "center",
      }}
    >
      <h1 className="text-2xl font-normal dark:text-white mb-2">
        Transactions
      </h1>
      <div className="flex-1 overflow-y-scroll hide-scroll rounded-xl">
        {transactions && transactions.length > 0 && (
          <div className="min-w-full">
            <TransactionList transactions={transactions} />
          </div>
        )}
        {(!transactions || transactions.length === 0) && (
          <div className="text-center text-gray-500 w-full flex flex-col items-center justify-center">
            <XCircleIcon size={50} className="mb-2" />
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTable;
