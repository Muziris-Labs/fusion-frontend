"use client";

import React from "react";
import TransactionList from "../../transaction/TransactionList";
import TransactionHeading from "../../transaction/TransactionHeading";
import { useSelector } from "react-redux";

const transactions = [
  {
    name: "Eth",
    blockchain: "Ethereum",
    logo: "/tokens/eth-logo.svg",
    date: 1705322460,
    status: "Successful",
    amount: -50,
    toFrom: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
    visit: "/transaction/1",
  },
  {
    name: "Matic",
    blockchain: "Polygon",
    logo: "/tokens/eth-logo.svg",
    date: 1705236600,
    status: "Successful",
    amount: 100,
    toFrom: "0xe4778D3cBB087892C789E9b44F47eb52b2C6Ff8D",
    visit: "/transaction/2",
  },
  {
    name: "BNB",
    blockchain: "Binance Smart Chain",
    logo: "/tokens/eth-logo.svg",
    date: 1705236600,
    status: "Successful",
    amount: 100,
    toFrom: "0xD807e94e84C8aBA6bb982f42995E108fC6dFbc33",
    visit: "/transaction/2",
  },
];

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
