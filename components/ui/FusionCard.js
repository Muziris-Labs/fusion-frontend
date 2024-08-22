const FusionCard = ({ children, className }) => {
  return (
    <section
      className={`relative text-black bg-white shadow-md bg-clip-border rounded-3xl flex-1 border ${className}`}
    >
      {children}
    </section>
  );
};

export default FusionCard;
