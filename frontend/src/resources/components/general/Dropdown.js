import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useTranslation } from "react-i18next";

const CustomDropdown = ({
  options,
  label,
  selectedOption,
  setSelectedOption,
  optionLabelKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="w-full bg-[#1A184C40] px-10 py-4 rounded-lg border-2 border-[#1A184C]">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-2 justify-start w-full">
          <span className="uppercase text-start text-xs font-semibold text-[#ECECEC]">
            {label}
          </span>
          <div
            className="relative w-full cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`flex justify-between items-center font-normal text-base bg-transparent w-full py-2 ${
                selectedOption ? "text-[#FFF]" : "text-[#AAA]"
              }`}
            >
              {selectedOption
                ? selectedOption[optionLabelKey]
                : t("app.option_placeholder")}
              <ExpandMoreRoundedIcon
                sx={{
                  color: "#6078DF",
                  width: "24px",
                  height: "24px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="w-full mt-2 rounded-lg">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-[#6078DF40] text-[#FFFFFF] cursor-pointer"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
