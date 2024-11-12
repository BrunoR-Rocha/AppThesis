import LinearProgress from "@mui/material/LinearProgress";

const CourseProgress = ({ label, value, hasPercentage = false }) => {
  return (
    <>
      <p className="text-[#E9F0FF] text-lg font-medium">{label}</p>
      <div className="flex gap-2 items-center">
        <div className="w-full">
          <LinearProgress variant="determinate" value={value} />
        </div>
        <div className="min-w-14">
          <span className="text-[#E9F0FF] font-medium text-sm flex items-center">
            {value} {hasPercentage && "%"}
          </span>
        </div>
      </div>
    </>
  );
};

export default CourseProgress;
