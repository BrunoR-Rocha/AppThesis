import React, { useState, useEffect } from "react";
import Wrapper from "../../../../components/general/Wrapper";
import { CourseArea, CourseDisplay } from "../../style/academy_style";
import BackButton from "../../../../components/general/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import axiosConfig from "../../../../../providers/axiosConfig";
import LabeledIcon from "../../../../components/general/LabeledIcon";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import CourseProgress from "../../../../components/app/courses/CourseProgress";
import Skeleton from "../../../../components/general/Skeleton";
import contentTypeComponents from "./components/components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CourseLearn = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseContents, setCourseContents] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [courseProgress, setCourseProgress] = useState(0);
  const [expandedLessons, setExpandedLessons] = useState([]);
  const [currentCourseContent, setCurrentCourseContent] = useState(null);
  const [completedCourseContents, setCompletedCourseContents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/front/courses/${id}/contents`)
      .then((res) => {
        setCourseContents(res.data);

        if (res.data.lessons.length > 0) {
          setCurrentLesson(res.data.lessons[0]);

          if (res.data.lessons[0].course_contents.length > 0) {
            setCurrentCourseContent(res.data.lessons[0].course_contents[0]);
          }
        }

        axiosConfig
          .get(`/front/courses/${id}/progress`)
          .then((progressRes) => {
            const completedContents =
              progressRes.data.completed_course_contents || [];
            const completedLessons = progressRes.data.completed_lessons || [];
            const overallProgress = progressRes.data.overall_progress || 0;

            setCompletedCourseContents(completedContents);
            setCompletedLessons(completedLessons);
            setCourseProgress(overallProgress);

            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to fetch progress:", err);
            setLoading(false);
          });
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleMarkContentComplete = (contentId) => {
    if (!completedCourseContents.includes(contentId)) {
      const updatedCompletedContents = [...completedCourseContents, contentId];
      setCompletedCourseContents(updatedCompletedContents);

      const totalContents = courseContents.lessons.reduce(
        (total, lesson) => total + lesson.course_contents.length,
        0
      );
      const newProgress =
        (updatedCompletedContents.length / totalContents) * 100;
      setCourseProgress(newProgress);

      const lessonContentIds = currentLesson.course_contents.map(
        (content) => content.id
      );
      const isLessonCompleted = lessonContentIds.every((id) =>
        updatedCompletedContents.includes(id)
      );

      if (isLessonCompleted && !completedLessons.includes(currentLesson.id)) {
        const updatedCompletedLessons = [...completedLessons, currentLesson.id];
        setCompletedLessons(updatedCompletedLessons);

        saveCourseProgress(updatedCompletedContents, updatedCompletedLessons);
      } else {
        saveCourseProgress(updatedCompletedContents, completedLessons);
      }
    }
  };

  const saveCourseProgress = (completedContents, completedLessons) => {
    axiosConfig
      .post(`/front/courses/${id}/save-progress`, {
        completed_course_contents: completedContents,
        completed_lessons: completedLessons,
      })
      .then(() => {
        console.log("Progress saved successfully");
      })
      .catch((error) => {
        console.error("Failed to save progress:", error);
      });
  };

  const handleNextContent = () => {
    if (!currentLesson || !currentCourseContent || !courseContents) return;

    const lessonIndex = courseContents.lessons.findIndex(
      (lesson) => lesson.id === currentLesson.id
    );

    const contentIndex = currentLesson.course_contents.findIndex(
      (content) => content.id === currentCourseContent.id
    );

    if (
      contentIndex >= 0 &&
      contentIndex < currentLesson.course_contents.length - 1
    ) {
      const nextContent = currentLesson.course_contents[contentIndex + 1];
      setCurrentCourseContent(nextContent);
    } else if (
      lessonIndex >= 0 &&
      lessonIndex < courseContents.lessons.length - 1
    ) {
      const nextLesson = courseContents.lessons[lessonIndex + 1];
      setCurrentLesson(nextLesson);
      if (nextLesson.course_contents.length > 0) {
        setCurrentCourseContent(nextLesson.course_contents[0]);
      } else {

        handleNextContent();
      }
    } else {
      console.log("You have completed all contents!");
    }
  };

  const hasNextContent = () => {
    if (!currentLesson || !currentCourseContent || !courseContents)
      return false;

    const lessonIndex = courseContents.lessons.findIndex(
      (lesson) => lesson.id === currentLesson.id
    );

    const contentIndex = currentLesson.course_contents.findIndex(
      (content) => content.id === currentCourseContent.id
    );

    if (contentIndex < currentLesson.course_contents.length - 1) {
      return true;
    } else if (lessonIndex < courseContents.lessons.length - 1) {
      return true;
    } else {
      return false;
    }
  };

  const allContentsCompleted = () => {
    const totalContents = courseContents?.lessons?.reduce(
      (total, lesson) => total + lesson.course_contents.length,
      0
    );
    return (
      totalContents > 0 && completedCourseContents.length === totalContents
    );
  };

  const handleFinishCourse = () => {
    if (!courseContents?.is_completed) {
      navigate(`/academy/course/${id}/rating`);
    }
  };

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
                    {courseContents?.title}
                  </h3>
                  <div className="flex gap-7 items-center ">
                    <LabeledIcon
                      label={courseContents?.num_lessons + " lectures"}
                      icon={
                        <PlayCircleOutlineRoundedIcon
                          sx={{ color: "#FFFFFF99" }}
                        />
                      }
                    />
                    <LabeledIcon
                      label={courseContents?.average_time}
                      icon={
                        <AccessTimeRoundedIcon sx={{ color: "#FFFFFF99" }} />
                      }
                    />
                    <LabeledIcon
                      label={"Last Updated " + courseContents?.updated_at}
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
                  {currentCourseContent ? (
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        {currentLesson?.title}
                      </h2>
                      {(() => {
                        const ContentComponent =
                          contentTypeComponents[
                            currentCourseContent.content_type
                          ] || contentTypeComponents.default;

                        if (ContentComponent) {
                          return (
                            <ContentComponent
                              key={currentCourseContent.id}
                              content={currentCourseContent}
                            />
                          );
                        } else {
                          return (
                            <div key={currentCourseContent.id}>
                              <p>
                                Unsupported content type:{" "}
                                {currentCourseContent.content_type}
                              </p>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  ) : (
                    <div>
                      <p>Select a content to view</p>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      onClick={() =>
                        handleMarkContentComplete(currentCourseContent?.id)
                      }
                      className={`mt-4 flex items-center gap-2 text-white px-4 py-3 rounded-full ${
                        completedCourseContents.includes(
                          currentCourseContent?.id
                        )
                          ? "bg-[#AAA]"
                          : "bg-[#4B5057]"
                      }`}
                      disabled={completedCourseContents.includes(
                        currentCourseContent?.id
                      )}
                    >
                      {completedCourseContents.includes(
                        currentCourseContent?.id
                      )
                        ? "Completed"
                        : "Mark as Completed"}
                      <CheckCircleIcon
                        sx={{
                          color: completedCourseContents.includes(
                            currentCourseContent?.id
                          )
                            ? "#ECECEC"
                            : "#AAAAAA",
                          marginLeft: "8px",
                        }}
                      />
                    </button>
                    <button
                      onClick={
                        allContentsCompleted()
                          ? handleFinishCourse
                          : handleNextContent
                      }
                      className="mt-4 bg-[#6078DF] text-white px-4 py-3 rounded-full disabled:opacity-50"
                      disabled={
                        courseContents?.is_completed ||
                        (!hasNextContent() && !allContentsCompleted())
                      }
                    >
                      {allContentsCompleted()
                        ? "Finish Course"
                        : "Next Content"}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-8 basis-1/3">
                  <div className="flex flex-col gap-4">
                    <CourseProgress
                      label={"Course Contents"}
                      value={courseProgress}
                      hasPercentage
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    {courseContents &&
                      courseContents.lessons.map((lesson) => (
                        <div key={lesson.id} className="lesson-container">
                          <div
                            className={`flex flex-col border-2 border-solid border-[#1A184C] p-6 cursor-pointer ${
                              lesson.id === currentLesson?.id
                                ? "bg-[#6078DF40]"
                                : completedLessons.includes(lesson.id)
                                ? "bg-[#1A184CCC]"
                                : "bg-[#1A184C40]"
                            } ${
                              expandedLessons.includes(lesson.id)
                                ? "rounded-t-xl"
                                : "rounded-xl"
                            }`}
                            onClick={() => {
                              if (expandedLessons.includes(lesson.id)) {
                                setExpandedLessons(
                                  expandedLessons.filter(
                                    (id) => id !== lesson.id
                                  )
                                );
                              } else {
                                setExpandedLessons([
                                  ...expandedLessons,
                                  lesson.id,
                                ]);
                              }
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <p className="text-[#E9F0FF] font-semibold">
                                {lesson?.title}
                                <br />
                                <span className="text-[#6078DF] font-medium text-sm">
                                  {lesson?.estimated_duration}
                                </span>
                              </p>
                              <CheckCircleIcon
                                sx={{
                                  color: completedLessons.includes(lesson.id)
                                    ? "#6078DF"
                                    : "#FFFFFF26",
                                  marginLeft: "8px",
                                }}
                              />
                            </div>
                          </div>

                          {expandedLessons.includes(lesson.id) && (
                            <div className="course-contents">
                              {lesson.course_contents.map(
                                (contentItem, index) => (
                                  <div
                                    key={contentItem.id}
                                    className={`flex justify-between items-center p-4 cursor-pointer ${
                                      currentCourseContent?.id ===
                                      contentItem.id
                                        ? "bg-[#6078DF40]"
                                        : completedCourseContents.includes(
                                            contentItem.id
                                          )
                                        ? "bg-[#1A184CCC]"
                                        : "bg-[#1A184C40]"
                                    } ${
                                      index ===
                                      lesson?.course_contents?.length - 1
                                        ? "rounded-b-xl"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setCurrentLesson(lesson);
                                      setCurrentCourseContent(contentItem);
                                    }}
                                  >
                                    <p className="text-[#E9F0FF] font-medium">
                                      {contentItem.title}
                                    </p>
                                    <CheckCircleIcon
                                      sx={{
                                        color: completedCourseContents.includes(
                                          contentItem.id
                                        )
                                          ? "#6078DF"
                                          : "#FFFFFF26",
                                      }}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
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
