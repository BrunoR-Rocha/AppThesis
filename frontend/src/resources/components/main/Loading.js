import { useMediaQuery } from "@mui/material";
import React from "react";

const Loading = () => {
  const mobile = useMediaQuery("(max-width:768px)");

  return (
    <div className="fixed flex items-center justify-center w-screen h-screen bg-[#172726] z-[9999]">
      
    </div>
  );
};

export default Loading;
