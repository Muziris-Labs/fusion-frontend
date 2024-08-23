import React from "react";

import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions }) => {
  return (
    <tbody>
      {transactions.map(
        (transaction, index) =>
          index < 3 && <TransactionItem key={index} transaction={transaction} />
      )}
    </tbody>
  );
};

export default TransactionList;
