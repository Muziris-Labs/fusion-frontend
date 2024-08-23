import React from "react";

const TransactionHeading = () => {
  return (
    <thead>
      <tr>
        <th className="px-4 py-2 text-left">Name</th>
        <th className="px-4 py-2 text-left">Date</th>
        <th className="px-4 py-2 text-left">Status</th>
        <th className="px-4 py-2 text-left">Amount</th>
        <th className="px-4 py-2 text-left">To/From</th>
        <th className="px-4 py-2 text-left">Actions</th>
      </tr>
    </thead>
  );
};

export default TransactionHeading;
