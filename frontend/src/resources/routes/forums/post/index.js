import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

const PostSection = ({ isOpen, onClose, posts }) => {
  return (
    <div
      className={`fixed top-20 right-0 h-full w-1/3 bg-[#1A184C] transform transition-transform duration-300 z-[1000] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="py-5 px-6">
        <div className="flex justify-between items-center">
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-white">
              Comments ({posts})
            </h2>
          </div>
          <div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border-2 border-solid border-[#AAAAAA] group hover:border-[#F4AA5A]"
            >
              <ClearIcon
                sx={{
                  color: "#AAAAAA",
                  ".group:hover &": {
                    color: "#F4AA5A",
                  },
                }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-5 px-6 gap-4">
        <div className="border-[1px] border-[#FFFFFF26] border-solid bg-[#201F41] rounded-md p-4">
          <p className="text-white font-semibold">Richard </p>
          {/* Add the submission form here */}
        </div>
        <div className="border-b-[1px] border-b-[#FFFFFF26] border-b-solid flex flex-col gap-3">
          <div className="">
            <p className="text-white font-semibold">Stella</p>
            <p className="text-white text-sm font-normal">2h ago</p>
          </div>
          <div>
            <p className="text-[#ECECEC] text-base font-normal">
              Sleep is so much essential for us. Awareness is needed on sleep,
              we don’t prioritise it as we should.
            </p>
          </div>
          <div className="flex justify-between items-center pb-5">
            <div className="flex gap-3">
              <ThumbUpAltOutlinedIcon />
              <span>1</span>
            </div>
            <p className="font-medium text-[#ECECEC] text-base">Reply</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSection;
