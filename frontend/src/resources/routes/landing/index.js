import React from "react";
import { Link } from "react-router-dom";
import {
  FeatureArea,
  HeroArea,
  HeroCaption,
  LandingArea,
  QuoteArea,
  ToolsArea,
} from "./styles/landing_styles";
import Wrapper from "../../components/general/Wrapper";
import AboutImg from "../../media/landing/about.svg";
import { Feature } from "./feature";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { HashLink } from "react-router-hash-link";

function Landing() {
  const imageCount = 6;
  const imageNames = Array.from(
    { length: imageCount },
    (_, i) => `Frame_${i + 1}.svg`
  );
  return (
    <>
      <LandingArea>
        <HeroArea className="min-h-[900px] md:min-h-max pb-20">
          <Wrapper>
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="flex xl:flex-row flex-col items-center w-full xl:py-[60px] mt-10">
                <HeroCaption className="flex-grow gap-4 sm:gap-10 mt-44 md:mt-24">
                  <h1 className="text-5xl md:text-6xl lg:text-8xl text-white font-semibold font-sans leading-[74%]">
                    Awaken your
                    <br />
                    <span class="font-medium font-cormorant italic text-7xl md:text-8xl lg:text-9xl">
                      sleep{" "}
                      <span className="font-sans italic font-medium text-7xl">
                        &
                      </span>{" "}
                      health
                    </span>
                    <br />
                    Knowledge
                  </h1>
                  <HashLink
                    className="flex gap-2 items-center"
                    to={"/#about"}
                    smooth
                  >
                    <p className="text-base font-medium text-white">
                      Learn More
                    </p>
                    <ArrowDownwardRoundedIcon sx={{ color: "#AAAAAA" }} />
                  </HashLink>
                </HeroCaption>
              </div>
            </div>
          </Wrapper>
        </HeroArea>
        <QuoteArea id="about">
          <Wrapper>
            <div className="flex">
              <div className="basis-1/2 flex flex-col text-start font-cormorant text-white">
                <img src={AboutImg} className="scale-125" alt="" />
              </div>
              <div className="basis-1/2 flex flex-col gap-5 text-white font-sans justify-center items-center">
                <div className="text-center flex flex-col gap-7 md:max-w-96">
                  <div className="flex flex-col gap-4">
                    <p className="text-[#6078DF] font-semibold uppercase">
                      About the project
                    </p>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                      What is Moony
                    </h3>
                  </div>
                  <p className="text-lg font-medium text-white">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas molestias.
                  </p>
                  <div className="flex flex-1 justify-center">
                    <Link
                      to="/about"
                      className="text-sm text-white font-light hover:opacity-100 rounded-3xl px-5 py-3 border-2 border-solid border-[#ECECEC] max-w-fit hover:text-[#F4AA5A] hover:border-[#F4AA5A]"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </QuoteArea>
        <FeatureArea>
          <div className="flex flex-col flex-1 justify-center items-center pt-14 gap-20">
            <h3 className="text-5xl font-semibold font-sans text-[#ECECEC]">
              Our features
            </h3>
            <div className="flex flex-wrap gap-12 items-center justify-center">
              <Feature
                text={
                  "Discussions et accusamus et iusto odio dignissimos ducimus qui  blanditiis praesentium."
                }
                icon={
                  <ForumOutlinedIcon
                    sx={{ color: "#6078DF", height: "54px", width: "54px" }}
                  />
                }
              />
              <Feature
                text={
                  "Quizzes eos et accusamus et iusto odio dignissimos ducimus qui  blanditiis praesentium."
                }
                icon={
                  <LiveHelpOutlinedIcon
                    sx={{ color: "#6078DF", height: "54px", width: "54px" }}
                  />
                }
              />
              <Feature
                text={
                  "Courses eos et accusamus et iusto odio dignissimos ducimus qui  blanditiis praesentium."
                }
                icon={
                  <SchoolOutlinedIcon
                    sx={{ color: "#6078DF", height: "54px", width: "54px" }}
                  />
                }
              />
              <Feature
                text={
                  "Learning et accusamus et iusto odio dignissimos ducimus qui  blanditiis praesentium."
                }
                icon={
                  <AutoStoriesOutlinedIcon
                    sx={{ color: "#6078DF", height: "54px", width: "54px" }}
                  />
                }
              />
              <Feature
                text={
                  "AI-based Evaluation eos et accusamus dignissimos ducimus qui  blanditiis."
                }
                icon={
                  <MemoryOutlinedIcon
                    sx={{ color: "#6078DF", height: "54px", width: "54px" }}
                  />
                }
              />
              <Feature
                text={
                  "AI-based Evaluation eos et accusamus dignissimos ducimus qui  blanditiis."
                }
                icon={
                  <MemoryOutlinedIcon
                    sx={{ color: "#6078DF", height: "54px", width: "54px" }}
                  />
                }
              />
            </div>
          </div>
        </FeatureArea>
        <ToolsArea>
          <Wrapper>
            <div className="flex flex-col gap-10">
              <p className="text-[#FFFFFFCC] text-lg text-center">
                Tools used in this project
              </p>

              <div className="flex items-center justify-evenly flex-1 w-full gap-12">
                {imageNames.map((imageName, index) => (
                  <img
                    key={index}
                    src={require(`../../media/landing/tech/${imageName}`)} // Use the correct relative path
                    alt={`Frame ${index + 1}`}
                    className="w-32 h-16" // Adjust the size as needed
                  />
                ))}
              </div>
            </div>
          </Wrapper>
        </ToolsArea>
      </LandingArea>
    </>
  );
}

export default Landing;
