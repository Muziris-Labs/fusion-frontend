const formatAmount = (amount, decimals = 5) => {
  return amount !== 0
    ? amount < 0.00001
      ? "< 0.00001"
      : Number(amount).toFixed(decimals)
    : "0";
};

export default formatAmount;
