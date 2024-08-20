import { SquareArrowOutUpRight } from "lucide-react";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";
import CopyToClipboard from "@/utils/CopyToClipboard";
import FusionTooltip from "@/components/ui/FusionTooltip";

const TransactionItem = ({ transaction }) => {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-2 flex items-center w-40">
        <Image
          width={40}
          height={40}
          src={transaction.logo}
          alt={transaction.name}
          className="w-10 h-10 mr-2"
        />

        <div className="w-24 flex flex-col">
          <FusionTooltip label={transaction.name} />

          <p className="text-gray-500 text-sm truncate">
            <FusionTooltip label={transaction.blockchain}>
              {transaction.blockchain}
            </FusionTooltip>
          </p>
        </div>
      </td>

      <td className="px-4 py-2 text-left">
        <p>{formatTime(transaction.date)}</p>

        <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
      </td>

      <td className="p-1">
        <div className="bg-green-50 flex items-center px-3 py-1 rounded-full">
          <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500"></span>
          <p>{transaction.status}</p>
        </div>
      </td>

      <td
        className={`px-4 py-2 ${
          transaction.amount < 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount)}
      </td>

      <td className="px-4 py-2">
        <CopyToClipboard text={transaction.toFrom} />
      </td>

      <td className="px-4 py-2">
        <Link href={transaction.visit} className="text-gray-700">
          <SquareArrowOutUpRight size={18} />
        </Link>
      </td>
    </tr>
  );
};

export default TransactionItem;
