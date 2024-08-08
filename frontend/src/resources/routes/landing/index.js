import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeroArea,
  HeroCaption,
} from "./styles/landing_styles";
import axiosConfig from "../../../providers/axiosConfig";
import Wrapper from "../../components/general/Wrapper";

function Landing() {
  return (
    <>
      <HeroArea className="min-h-[900px] md:min-h-max pb-20">
        <Wrapper>
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex xl:flex-row flex-col items-center w-full xl:py-[60px] mt-10">
              <HeroCaption className="flex-grow gap-2 sm:gap-5 mt-44 md:mt-24">
                <h1 className="text-5xl md:text-6xl lg:text-8xl text-white uppercase font-normal font-cormorant">
                  Awaken your <br/><span class="font-bold font-sans">sleep & Health</span><br/> Knowledge
                </h1>
                <Link
                  to="/about"
                  className="mt-3 py-2 px-4 bg-[#DCDCDC] rounded uppercase font-semibold"
                >
                  Saber Mais
                </Link>
              </HeroCaption>
            </div>
          </div>
        </Wrapper>
      </HeroArea>
    </>
  );
}

export default Landing;
