const OnBoardSection = ({ heading, paragaph, children }) => {
  return (
    <div className="flex flex-col z-10 bg-white/70 p-16 rounded-xl border border-gray-200 shadow-sm">
      <h1 className="font-gloock text-4xl">{heading}</h1>
      <p className="mt-2 font-noto text-sm text-text-gray">{paragaph}</p>

      {children}
    </div>
  );
};

export default OnBoardSection;
