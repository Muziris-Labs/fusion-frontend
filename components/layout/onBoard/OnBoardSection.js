const OnBoardSection = ({ heading, paragaph, children }) => {
  return (
    <div className="flex flex-col z-10 sm:p-8 sm:w-[450px] rounded-xl ">
      <h1 className="font-semibold text-3xl dark:text-white">{heading}</h1>
      <p className="mt-2 text-sm text-text-gray">{paragaph}</p>

      {children}
    </div>
  );
};

export default OnBoardSection;
