import LinearProgress from "@mui/material/LinearProgress";

const CourseProgress = ({ label, value }) => {
  return (
    <>
      <p className="text-[#E9F0FF] text-lg font-medium">{label}</p>
      <div className="flex gap-2 items-center">
        <div className="w-full">
          <LinearProgress variant="determinate" value={value} />
        </div>
        <div>
          <span className="text-[#E9F0FF] font-medium text-sm flex items-center">
            {value}
          </span>
        </div>
      </div>
    </>
  );
};

export default CourseProgress;
