const formatAmount = (amount) => {
  return amount !== 0
    ? amount < 0.00001
      ? "< 0.00001"
      : Number(amount).toFixed(5)
    : "0";
};

export default formatAmount;
