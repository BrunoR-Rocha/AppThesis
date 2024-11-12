import React, { useState } from "react";

const CustomRating = ({ onRatingSelect, minValue, maxValue }) => {
  const [rating, setRating] = useState(0);

  const ratingValues = Array.from(
    { length: maxValue - minValue + 1 },
    (_, index) => minValue + index
  );

  return (
    <div className="flex justify-center gap-5">
      {ratingValues.map((value) => (
        <button
          type="button"
          key={value}
          className="focus:outline-none"
          onClick={() => {
            setRating(value);
            onRatingSelect(value);
          }}
        >
          <div
            className={`p-6 text-white rounded-xl ${
              value === rating ? "bg-[#6078DF]" : "bg-[#6078DF26]"
            } hover:bg-[#6078DF]`}
          >
            {value}
          </div>
        </button>
      ))}
    </div>
  );
};

export default CustomRating;
