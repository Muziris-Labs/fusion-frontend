import React from "react";

const TransactionHeading = () => {
  return (
    <thead>
      <tr className="dark:text-white">
        <th className="py-4 text-left font-normal">Name</th>
        <th className="px-4 py-4 text-left font-normal">Date</th>
        <th className="px-4 py-4 text-left font-normal">Status</th>
        <th className="px-4 py-4 text-left font-normal">Amount</th>
        <th className="px-4 py-4 text-left font-normal">To/From</th>
        <th className="px-4 py-4 text-right font-normal">Actions</th>
      </tr>
    </thead>
  );
};

export default TransactionHeading;
