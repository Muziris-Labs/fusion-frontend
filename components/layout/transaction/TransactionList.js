import React from "react";

import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions }) => {
  return (
    <div className="flex flex-col gap-2 pb-20">
      {transactions.map((transaction, index) => (
        <TransactionItem key={index} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
