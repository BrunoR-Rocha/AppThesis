import React, { useState, useEffect } from "react";
import Wrapper from "../../../../components/general/Wrapper";
import {
  CourseArea,
  CourseDisplay,
  CourseText,
} from "../../style/academy_style";
import BackButton from "../../../../components/general/BackButton";
import { ReactComponent as Flower } from "../../../../media/general/flower.svg";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import LabeledIcon from "../../../../components/general/LabeledIcon";
import { Accordion } from "@mui/material";
import {
  AccordionItem,
  AccordionItemDescription,
} from "../../../about/styles/landing_styles";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useNavigate, useParams } from "react-router-dom";
import axiosConfig from "../../../../../providers/axiosConfig";
import CourseProgress from "../../../../components/app/courses/CourseProgress";

const CoursePage = () => {
  const { id } = useParams();
  const [expanded, setExpanded] = useState();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const course_id = id;

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/front/courses/${course_id}`)
      .then((res) => {
        setCourse(res.data);
        setIsSubscribed(res.data.is_subscribed);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [course_id]);

  const handleManageSubscription = () => {
    setLoading(true);
    axiosConfig
      .post(`/front/courses/manage/${course_id}`)
      .then((res) => {
        setIsSubscribed(res.data.isSubscribed || !isSubscribed);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleCourseLearn = () => {
    navigate(`/academy/course/${course?.id}/learn`);
  };

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
                  {course?.title}
                </h3>
                <CourseText
                  dangerouslySetInnerHTML={{ __html: course?.description }}
                ></CourseText>
              </div>
              <div className="flex justify-between items-center flex-wrap-reverse gap-5">
                <div className="flex gap-7 items-center ">
                  <LabeledIcon
                    label={course?.num_lessons + " lectures"}
                    icon={
                      <PlayCircleOutlineRoundedIcon
                        sx={{ color: "#FFFFFF99" }}
                      />
                    }
                  />
                  <LabeledIcon
                    label={course?.average_time}
                    icon={<AccessTimeRoundedIcon sx={{ color: "#FFFFFF99" }} />}
                  />
                  <LabeledIcon
                    label={"Last Updated " + course?.updated_at}
                    icon={
                      <NewReleasesOutlinedIcon sx={{ color: "#FFFFFF99" }} />
                    }
                  />
                </div>
                <div className="flex gap-3 items-center">
                  {isSubscribed && (
                    <div className="bg-[#FFF] rounded-md backdrop-blur-sm px-5 py-3">
                      <button
                        className="px-5 rounded-full flex gap-4"
                        onClick={handleManageSubscription}
                      >
                        <span className="text-[#F4AA5A] font-semibold text-base capitalize">
                          Leave Course Now
                        </span>
                        <EastRoundedIcon sx={{ color: "#F4AA5A" }} />
                      </button>
                    </div>
                  )}
                  <div className="bg-[#1A184C40] rounded-md backdrop-blur-sm px-5 py-3">
                    <span className="text-white">
                      {course?.difficulty?.name}
                    </span>
                  </div>
                  {/* <div className="bg-[#1A184C40] rounded-md backdrop-blur-sm px-5 py-3">
                    <LabeledIcon
                      icon={<GradeRoundedIcon sx={{ color: "#FFF" }} />}
                      label={" 4.7 (218 ratings)"}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </Wrapper>
        </CourseDisplay>
        <div className="min-h-fit pb-10">
          <Wrapper>
            <div className="flex">
              <div className="basis-1/2 flex flex-col gap-6 pt-10">
                <h3 className="text-2xl font-semibold text-white">
                  Course Contents
                </h3>
                {course?.lessons && course?.lessons.length > 0 ? (
                  course?.lessons.map((lesson, index) => (
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
                  ))
                ) : (
                  <div className="bg-[#1A184C] p-6 rounded-lg border-2 border-[#6078DF] text-center text-[#E9F0FF]">
                    No information for now.
                  </div>
                )}
              </div>
              <div className="flex basis-1/2 justify-center pt-10">
                <>
                  {loading ? (
                    <></>
                  ) : isSubscribed ? (
                    <div className="flex flex-col gap-6 bg-[#6078DF26] backdrop-blur-lg border-[1px] border-[#6078DF] rounded-lg p-6 w-3/5 h-fit">
                      <CourseProgress
                        label={"You're almost done!"}
                        value={course?.general_progress}
                      />
                      <div>
                        <button
                          className="bg-[#F4AA5A] px-10 py-4 rounded-full flex gap-4"
                          onClick={handleCourseLearn}
                        >
                          <span className="text-white font-semibold text-base capitalize">
                            Continue Course
                          </span>
                          <EastRoundedIcon sx={{ color: "#FFF" }} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="bg-white px-10 py-4 rounded-full flex gap-4"
                        onClick={handleManageSubscription}
                      >
                        <span className="text-[#F4AA5A] font-semibold text-base capitalize">
                          Enroll Course Now
                        </span>
                        <EastRoundedIcon sx={{ color: "#F4AA5A" }} />
                      </button>
                    </div>
                  )}
                </>
              </div>
            </div>
          </Wrapper>
        </div>
      </CourseArea>
    </>
  );
};

export default CoursePage;
