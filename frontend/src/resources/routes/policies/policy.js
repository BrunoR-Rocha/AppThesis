import React, { useState } from "react";
import { ReactComponent as Flower } from "../../media/general/flower.svg";
import Wrapper from "../../components/general/Wrapper";
import { BannerArea, BannerDisplay } from "../profile/style";

const Policy = ({ label }) => {
  return (
    <>
      <BannerArea>
        <BannerDisplay className="relative overflow-hidden">
          <Flower className="absolute mix-blend-screen -right-1/3 -top-3/4 object-cover z-0 -rotate-[160deg]" />
          <Wrapper>
            <div className="flex flex-col gap-11 pb-10 pt-24 sm:pt-40 sm:pb-24">
              <div className="flex items-center justify-center gap-5">
                <h3 className="text-5xl font-semibold text-[#FFF]">{label}</h3>
              </div>
            </div>
          </Wrapper>
        </BannerDisplay>
        <div className="pt-24">
          <Wrapper>
            <div className="flex flex-1 bg-[#6078DF26] p-7 gap-4 rounded-xl border border-[#6078DF] items-center backdrop-blur-xl text-[#ECECEC]"></div>
          </Wrapper>
        </div>
      </BannerArea>
    </>
  );
};

export default Policy;
