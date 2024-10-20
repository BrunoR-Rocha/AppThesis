import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/CancelOutlined";

const ProgressCircle = ({
  result,
  referenceValue = 100,
  radiusAngle = 120,
  circleStartAngle = 135,
  circleAngleRange = 270,
  outsideQuiz = false,
  outsideQuizComponent = null,
  progressColor = "#F4AA5A",
  bgColor = "#ddd",
}) => {
  const [progress, setProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);

  const resultPercentage = Math.min((result / referenceValue) * 100, 100);
  useEffect(() => {
    if (progress < resultPercentage) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, resultPercentage));
      }, 40);

      return () => clearInterval(interval);
    } else {
      setAnimationComplete(true);
      setTimeout(() => {
        setShowFinalText(true);
      }, 1500);
    }
  }, [progress, resultPercentage]);

  // Constants for the circle
  const radius = radiusAngle;
  const cx = 150;
  const cy = 150;

  const startAngle = circleStartAngle; // Starting angle in degrees
  const angleRange = circleAngleRange; // Total angle range for progress (75% of circle)
  const endAngleMax = startAngle + angleRange; // Maximum ending angle (405 degrees)

  // Current end angle based on progress
  const endAngle = startAngle + (angleRange * progress) / 100;

  // Path description for the background arc (full 75% circle)
  const backgroundPath = describeArc(cx, cy, radius, startAngle, endAngleMax);

  // Path description for the progress arc (dynamic based on progress)
  const progressPath = describeArc(cx, cy, radius, startAngle, endAngle);

  // Function to generate the arc path
  function polarToCartesian(cx, cy, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: cx + radius * Math.cos(angleInRadians),
      y: cy + radius * Math.sin(angleInRadians),
    };
  }

  function describeArc(cx, cy, radius, startAngle, endAngle) {
    const start = polarToCartesian(cx, cy, radius, endAngle);
    const end = polarToCartesian(cx, cy, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");

    return d;
  }

  return (
    <div className="relative flex justify-center items-center">
      {/* The SVG container */}
      <svg width="300" height="300" style={{ transform: "rotate(90deg)" }}>
        {/* Background arc (full 75% of the circle) */}
        <path
          d={backgroundPath}
          fill="none"
          stroke={bgColor}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Progress arc (dynamic based on progress) */}
        <path
          d={progressPath}
          fill="none"
          stroke={progressColor}
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>

      {/* Text inside the circle */}
      {outsideQuiz ? (
        <>
          <div className="absolute flex flex-col justify-center items-center">
            {outsideQuizComponent}
          </div>
        </>
      ) : (
        <>
          <div className="absolute flex flex-col justify-center items-center">
            {showFinalText ? (
              <p className="text-white text-lg mt-5">Your Grade: {result}%</p>
            ) : !animationComplete ? (
              <>
                <p className="text-white text-lg">Your result is:</p>
                <p className="text-white text-2xl font-bold">{progress}%</p>
              </>
            ) : null}
          </div>

          {/* Check or X icon */}
          {animationComplete && (
            <div
              className={`absolute bottom-0 right-0 left-0 flex justify-center items-center transition-all duration-1000 ${
                showFinalText ? "top-[-80px]" : "top-0"
              }`}
            >
              {result >= 60 ? (
                <CheckIcon style={{ fontSize: 50, color: "green" }} />
              ) : (
                <CancelIcon style={{ fontSize: 50, color: "red" }} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProgressCircle;
