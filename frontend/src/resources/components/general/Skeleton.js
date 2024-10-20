const Skeleton = ({ width = "100%", height = "20px" }) => {
  return (
    <div
      className="animate-pulse bg-gray-700 rounded"
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;
