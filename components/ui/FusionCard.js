const FusionCard = ({ children, className }) => {
  return (
    <div
      className={`relative text-black bg-gray-100 shadow-md bg-clip-border p-6 rounded-3xl w-96 border ${className}`}
    >
      {children}
    </div>
  );
};

export default FusionCard;
