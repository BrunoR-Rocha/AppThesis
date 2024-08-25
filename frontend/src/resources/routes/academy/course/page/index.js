import React, { useState } from "react";
import Wrapper from "../../../../components/general/Wrapper";
import { CourseArea, CourseDisplay } from "../../style/academy_style";
import BackButton from "../../../../components/general/BackButton";
import { ReactComponent as Flower } from "../../../../media/general/flower.svg";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import LabeledIcon from "../../../../components/general/LabeledIcon";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import { Accordion, Box, Typography } from "@mui/material";
import {
  AccordionItem,
  AccordionItemDescription,
} from "../../../about/styles/landing_styles";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

const CoursePage = ({ id }) => {
  const [expanded, setExpanded] = useState();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const index = 1;

  console.log(id);

  function LinearProgressWithLabel({ value }) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={10} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  function LinearWithValueLabel() {
    const [progress, setProgress] = React.useState(10);

    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
    );
  }

  return (
    <>
      <CourseArea>
        <CourseDisplay className="relative overflow-hidden">
          <Flower className="absolute mix-blend-screen -right-1/3 -top-3/4 object-cover z-0 -rotate-[160deg]" />
          <Wrapper>
            <div className="flex flex-col gap-11 pb-10">
              <BackButton iconBorder="#AAAAAA" iconColor="#AAAAAA" />
              <div className="flex flex-col gap-3 w-full lg:w-1/2">
                <h3 className="text-3xl font-semibold text-[#ECECEC] capitalize">
                  Course Title
                </h3>
                <p className="text-base font-medium text-white self-stretch">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-7 items-center ">
                  <LabeledIcon
                    label={"3 Sections"}
                    icon={<FolderOpenRoundedIcon sx={{ color: "#FFFFFF99" }} />}
                  />
                  <LabeledIcon
                    label={"202 lectures"}
                    icon={
                      <PlayCircleOutlineRoundedIcon
                        sx={{ color: "#FFFFFF99" }}
                      />
                    }
                  />
                  <LabeledIcon
                    label={"20h 17m"}
                    icon={<AccessTimeRoundedIcon sx={{ color: "#FFFFFF99" }} />}
                  />
                  <LabeledIcon
                    label={"Last Updated 8/2024"}
                    icon={
                      <NewReleasesOutlinedIcon sx={{ color: "#FFFFFF99" }} />
                    }
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <div className="bg-[#1A184C40] rounded-md backdrop-blur-sm px-5 py-3">
                    <span className="text-white">Difficulty</span>
                  </div>
                  <div className="bg-[#1A184C40] rounded-md backdrop-blur-sm px-5 py-3">
                    <span className="text-white">4 hours</span>
                  </div>
                  <div className="bg-[#1A184C40] rounded-md backdrop-blur-sm px-5 py-3">
                    <LabeledIcon
                      icon={<GradeRoundedIcon sx={{ color: "#FFF" }} />}
                      label={" 4.7 (218 ratings)"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </CourseDisplay>
        <div>
          <Wrapper>
            <div className="flex">
              <div className="basis-1/2 flex flex-col gap-6 pt-10">
                <h3 className="text-2xl font-semibold text-white">
                  Course Contents
                </h3>
                <Accordion
                  slotProps={{
                    transition: { unmountOnExit: true },
                  }}
                  key={index}
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  }}
                  expanded={expanded === "content_" + index}
                  onChange={handleChange("content_" + index)}
                >
                  <AccordionItem
                    expanded={expanded === "content_" + index}
                    expandIcon={
                      expanded === "content_" + index ? (
                        <KeyboardArrowUpRoundedIcon sx={{ color: "#6078DF" }} />
                      ) : (
                        <KeyboardArrowDownRoundedIcon
                          sx={{ color: "#6078DF" }}
                        />
                      )
                    }
                    sx={{
                      paddingBlock: "10px",
                      borderRadius:
                        expanded === "content_" + index
                          ? "20px 20px 0 0"
                          : "20px",
                      border: "2px solid #1A184C",
                      borderBottom:
                        expanded === "content_" + index
                          ? "none"
                          : "2px solid #1A184C",
                      background:
                        expanded === "content_" + index
                          ? "rgba(96, 120, 223, 0.5)"
                          : "rgba(26, 24, 76, 0.25)",
                    }}
                  >
                    <p className="text-[#E9F0FF] font-semibold">
                      Lorem ipsum sit dolor emet <br />
                      <span className="text-[#6078DF] font-medium text-sm">
                        30min
                      </span>
                    </p>
                  </AccordionItem>
                  <AccordionItemDescription
                    sx={{
                      borderRight: "2px solid #1A184C",
                      borderLeft: "2px solid #1A184C",
                      borderTop: "none",
                    }}
                  >
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores.
                  </AccordionItemDescription>
                </Accordion>
              </div>
              <div className="flex basis-1/2 justify-center pt-10">
                {/* Primeiro card a mostrar, se não tiver subscrito mostra o card abaixo */}
                {/* <div>
                  <button className="bg-white px-10 py-4 rounded-full flex gap-4">
                    <span className="text-[#F4AA5A] font-semibold text-base capitalize">
                      Enroll Course Now
                    </span>
                    <EastRoundedIcon sx={{ color: "#F4AA5A" }} />
                  </button>
                </div> */}
                {/* Se tiver subscrito mostra este */}
                <div className="flex flex-col gap-6 bg-[#6078DF26] backdrop-blur-lg border-[1px] border-[#6078DF] rounded-lg p-6 w-3/5 h-fit">
                  <p className="text-[#E9F0FF] text-lg font-medium">
                    You’re almost done!
                  </p>
                  <div className="flex gap-2 items-center">
                    <div className="w-full">
                      <LinearProgress variant="determinate" value={10} />
                    </div>

                    <div>
                      <span className="text-[#E9F0FF] font-medium text-sm">
                        10%
                      </span>
                    </div>
                  </div>
                  <div>
                    <button className="bg-[#F4AA5A] px-10 py-4 rounded-full flex gap-4">
                      <span className="text-white font-semibold text-base capitalize">
                        Continue Course
                      </span>
                      <EastRoundedIcon sx={{ color: "#FFF" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </div>
      </CourseArea>
    </>
  );
};

export default CoursePage;
