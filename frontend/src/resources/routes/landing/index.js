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
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { HashLink } from "react-router-hash-link";
import { useTranslation, Trans } from "react-i18next";

function Landing() {
  const imageCount = 8;
  const imageNames = Array.from(
    { length: imageCount },
    (_, i) => `Frame_${i + 1}.svg`
  );

  const { t } = useTranslation();

  return (
    <>
      <LandingArea>
        <HeroArea className="min-h-[900px] md:min-h-max sm:pb-20">
          <Wrapper>
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="flex xl:flex-row flex-col items-center w-full xl:py-[60px] mt-10">
                <HeroCaption className="flex-grow gap-10 mt-44 md:mt-24">
                  <h1 className="text-5xl md:text-6xl lg:text-8xl text-white font-semibold font-sans md:leading-[74%]">
                    <Trans
                      i18nKey="landing.title"
                      components={{
                        strong: (
                          <span className="font-medium text-7xl md:text-8xl lg:text-9xl font-cormorant italic" />
                        ),
                        br: <br />,
                        small: (
                          <span className="font-sans text-7xl md:text-8xl" />
                        ),
                      }}
                    />
                  </h1>
                  <HashLink
                    className="flex gap-2 items-center"
                    to={"/#about"}
                    smooth
                  >
                    <p className="text-base font-medium text-white">
                      {t("landing.learn_more")}
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
            <div className="flex flex-col sm:flex-row">
              <div className="basis-1/2 flex flex-col text-start font-cormorant text-white">
                <img src={AboutImg} className="sm:scale-125" alt="" />
              </div>
              <div className="basis-1/2 flex flex-col gap-5 text-white font-sans justify-center items-center">
                <div className="text-center flex flex-col gap-7 md:max-w-96">
                  <div className="flex flex-col gap-4">
                    <p className="text-[#6078DF] font-semibold uppercase">
                      {t("landing.project.slogan")}
                    </p>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                      {t("landing.project.title")}
                    </h3>
                  </div>
                  <p className="text-lg font-medium text-white">
                    {t("landing.project.description")}
                  </p>
                  <div className="flex flex-1 justify-center">
                    <Link
                      to="/about"
                      className="text-sm text-white font-light hover:opacity-100 rounded-3xl px-5 py-3 border-2 border-solid border-[#ECECEC] max-w-fit hover:text-[#F4AA5A] hover:border-[#F4AA5A]"
                    >
                      {t("landing.learn_more")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </QuoteArea>
        <FeatureArea>
          <div className="flex flex-col flex-1 justify-center items-center pt-14 gap-20">
            <h3 className="text-2xl md:text-5xl font-semibold font-sans text-[#ECECEC]">
              {t("landing.features.title")}
            </h3>
            <div className="flex flex-wrap gap-12 items-center justify-center">
              <Feature
                text={t("landing.features.features.comments")}
                icon={
                  <ForumOutlinedIcon
                    sx={{ color: "#6078DF", height: "54px", width: "54px" }}
                  />
                }
              />
              <Feature
                text={t("landing.features.features.quizzes")}
                icon={
                  <LiveHelpOutlinedIcon
                    sx={{ color: "#6078DF", height: "54px", width: "54px" }}
                  />
                }
              />
              <Feature
                text={t("landing.features.features.courses")}
                icon={
                  <SchoolOutlinedIcon
                    sx={{ color: "#6078DF", height: "54px", width: "54px" }}
                  />
                }
              />
              <Feature
                text={t("landing.features.features.tools")}
                icon={
                  <AutoStoriesOutlinedIcon
                    sx={{ color: "#6078DF", height: "54px", width: "54px" }}
                  />
                }
              />
              <Feature
                text={t("landing.features.features.learning")}
                icon={
                  <MemoryOutlinedIcon
                    sx={{ color: "#6078DF", height: "54px", width: "54px" }}
                  />
                }
              />
              <Feature
                text={t("landing.features.features.evaluation")}
                icon={
                  <QueryStatsOutlinedIcon
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
                {t("landing.tools")}
              </p>

              <div className="flex items-center justify-evenly flex-1 w-full gap-12 flex-wrap">
                {imageNames.map((imageName, index) => (
                  <img
                    key={index}
                    src={require(`../../media/landing/tech/${imageName}`)}
                    alt={`Frame ${index + 1}`}
                    className="w-32 h-16"
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
