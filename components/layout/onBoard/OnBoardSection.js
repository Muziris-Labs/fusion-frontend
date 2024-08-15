const OnBoardSection = ({ heading, paragaph, children }) => {
  return (
    <div className="flex flex-col z-10 backdrop-blur-sm">
      <h1 className="font-gloock text-4xl">{heading}</h1>
      <p className="mt-2 font-noto text-sm text-text-gray">{paragaph}</p>

      {children}
    </div>
  );
};

export default OnBoardSection;
