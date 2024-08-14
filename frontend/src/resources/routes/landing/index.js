import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeroArea,
  HeroCaption,
  LandingArea,
  ProblemArea,
  QuoteArea,
} from "./styles/landing_styles";
import axiosConfig from "../../../providers/axiosConfig";
import Wrapper from "../../components/general/Wrapper";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

function Landing() {
  return (
    <>
        <LandingArea>
            <HeroArea className="min-h-[900px] md:min-h-max pb-20">
                <Wrapper>
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="flex xl:flex-row flex-col items-center w-full xl:py-[60px] mt-10">
                    <HeroCaption className="flex-grow gap-2 sm:gap-5 mt-44 md:mt-24">
                        <h1 className="text-5xl md:text-6xl lg:text-8xl text-white uppercase font-normal font-cormorant">
                        Awaken your <br/><span class="font-bold font-sans">sleep & Health</span><br/> Knowledge
                        </h1>
                    </HeroCaption>
                    </div>
                </div>
                </Wrapper>
            </HeroArea>
            <QuoteArea>
                <Wrapper>
                    <div className="flex flex-row gap-5">
                        <div className="basis-5/6 flex flex-col text-start font-cormorant text-white">
                            <span className="text-7xl md:text-8xl lg:text-9xl">“</span>
                            <span className="text-5xl md:text-6xl lg:text-8xl">Before you sleep, read something that is exquisite, and worth remembering.</span>
                        </div>
                        <div className="basis-1/6 flex flex-col gap-5 text-white font-sans justify-end">
                            <div>
                                <p className=" text-lg font-medium">Nome</p>
                                <p className="text-sm uppercase">Title</p>
                            </div>
                            <div className="flex flex-row gap-4">
                                <ArrowCircleLeftOutlinedIcon fontSize='large'/>
                                <ArrowCircleRightOutlinedIcon fontSize='large'/>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </QuoteArea>
            <ProblemArea>

            </ProblemArea>
        </LandingArea>
    </>
  );
}

export default Landing;
