const Alpha = ({ size }) => {
  return (
    <h6 className={`text-gray-700 ${size} cursor-default`}>
      {process.env.NEXT_PUBLIC_VERSION_INFO}
    </h6>
  );
};

export default Alpha;
