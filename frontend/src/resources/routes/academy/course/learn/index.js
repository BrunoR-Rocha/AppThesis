import React, { useState, useEffect } from "react";
import Wrapper from "../../../../components/general/Wrapper";
import { CourseArea, CourseDisplay } from "../../style/academy_style";
import BackButton from "../../../../components/general/BackButton";
import { useParams } from "react-router-dom";
import axiosConfig from "../../../../../providers/axiosConfig";
import LabeledIcon from "../../../../components/general/LabeledIcon";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import CourseProgress from "../../../../components/app/courses/CourseProgress";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { Accordion } from "@mui/material";
import {
  AccordionItem,
  AccordionItemDescription,
} from "../../../about/styles/landing_styles";
import Skeleton from "../../../../components/general/Skeleton";

const CourseLearn = () => {
  const { id } = useParams();
  const [expanded, setExpanded] = useState();
  const [loading, setLoading] = useState(false);
  const [courseContents, setCourseContents] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/front/courses/${id}/contents`)
      .then((res) => {
        setCourseContents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return (
    <>
      <CourseArea>
        <CourseDisplay className="relative overflow-hidden">
          {loading ? (
            <>
              <div className="flex flex-col gap-5">
                <Skeleton width="50%" />
                <Skeleton height="100px" />
              </div>
            </>
          ) : (
            <Wrapper>
              <div className="flex items-center py-14 gap-8">
                <BackButton
                  iconBorder="#AAAAAA"
                  iconColor="#AAAAAA"
                  noPaddingTop
                />
                <div className="flex flex-col gap-3">
                  <h3 className="text-3xl font-semibold text-[#ECECEC] capitalize">
                    {/* {courseContents?.course?.title} */}
                    Here goes course title
                  </h3>
                  <div className="flex gap-7 items-center ">
                    <LabeledIcon
                      label={courseContents?.course?.num_lessons + " lectures"}
                      icon={
                        <PlayCircleOutlineRoundedIcon
                          sx={{ color: "#FFFFFF99" }}
                        />
                      }
                    />
                    <LabeledIcon
                      label={courseContents?.course?.average_time}
                      icon={
                        <AccessTimeRoundedIcon sx={{ color: "#FFFFFF99" }} />
                      }
                    />
                    <LabeledIcon
                      label={
                        "Last Updated " + courseContents?.course?.updated_at
                      }
                      icon={
                        <NewReleasesOutlinedIcon sx={{ color: "#FFFFFF99" }} />
                      }
                    />
                  </div>
                </div>
              </div>
            </Wrapper>
          )}
        </CourseDisplay>
        {!loading && (
          <div className="min-h-fit py-10">
            <Wrapper>
              <div className="flex flex-wrap-reverse lg:flex-nowrap gap-10 sm:gap-20 flex-1">
                <div className="flex flex-col basis-2/3">
                  <p>Add generative content here based on user progress</p>
                </div>
                <div className="flex flex-col gap-8 basis-1/3">
                  <div className="flex flex-col gap-4">
                    <CourseProgress label={"Course Contents"} />
                  </div>
                  <div>
                    {courseContents &&
                      courseContents?.course?.lessons.map((lesson, index) => (
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
                                <KeyboardArrowUpRoundedIcon
                                  sx={{ color: "#6078DF" }}
                                />
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
                              {lesson?.title} <br />
                              <span className="text-[#6078DF] font-medium text-sm">
                                {lesson.estimated_duration}
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
                            {lesson?.description}
                          </AccordionItemDescription>
                        </Accordion>
                      ))}
                  </div>
                </div>
              </div>
            </Wrapper>
          </div>
        )}
      </CourseArea>
    </>
  );
};

export default CourseLearn;
