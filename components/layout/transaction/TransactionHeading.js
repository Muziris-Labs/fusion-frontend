import React from "react";

const TransactionHeading = () => {
  return (
    <thead>
      <tr className="dark:text-white">
        <th className="py-4 text-left font-normal">
          <span className="md:block hidden">Name</span>
          <span className="block md:hidden">Token</span>
        </th>
        <th className="px-4 py-4 text-left font-normal md:block hidden">
          Date
        </th>
        <th className="px-4 py-4 text-left font-normal hidden xl:table-cell">
          Status
        </th>
        <th className="px-4 py-4 text-left font-normal">
          {" "}
          <span className="md:block hidden">Amount</span>
          <span className="block md:hidden">Date/Amount</span>
        </th>
        <th className="px-4 py-4 text-left font-normal md:table-cell hidden">
          To/From
        </th>
        <th className="px-4 py-4 text-right font-normal">Actions</th>
      </tr>
    </thead>
  );
};

export default TransactionHeading;
