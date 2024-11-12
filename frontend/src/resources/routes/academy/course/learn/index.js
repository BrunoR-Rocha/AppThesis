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
  const navigate = useNavigate();

  const handleChange = (lesson) => {
    setCurrentLesson(lesson);
  };

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/front/courses/${id}/contents`)
      .then((res) => {
        setCourseContents(res.data);

        if (res.data.lessons.length > 0) {
          setCurrentLesson(res.data.lessons[0]);
        }

        axiosConfig
          .get(`/front/courses/${id}/progress`)
          .then((progressRes) => {
            const completedLessons = progressRes.data.completed_lessons || [];
            setCompletedLessons(completedLessons);

            const progress = progressRes.data.overall_progress;
            setCourseProgress(progress);

            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to fetch progress:", err);
            setLoading(false);
          });
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleMarkLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const updatedCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(updatedCompletedLessons);

      const totalLessons = courseContents.lessons.length;
      const newProgress = (updatedCompletedLessons.length / totalLessons) * 100;
      setCourseProgress(newProgress);

      saveCourseProgress(updatedCompletedLessons);
    }
  };

  const saveCourseProgress = (completedLessons) => {
    axiosConfig
      .post(`/front/courses/${id}/save-progress`, {
        completed_lessons: completedLessons,
      })
      .then((res) => {
        console.log("Progress saved successfully");
      })
      .catch((error) => {
        console.error("Failed to save progress:", error);
      });
  };

  const handleNextLesson = () => {
    if (!currentLesson || !courseContents) return;

    const currentIndex = courseContents.lessons.findIndex(
      (lesson) => lesson.id === currentLesson.id
    );

    if (currentIndex >= 0 && currentIndex < courseContents.lessons.length - 1) {
      const nextLesson = courseContents.lessons[currentIndex + 1];
      setCurrentLesson(nextLesson);
    } else {
      console.log("You have completed all lessons!");
    }
  };

  const hasNextLesson = () => {
    if (!currentLesson || !courseContents) return false;

    const currentIndex = courseContents.lessons.findIndex(
      (lesson) => lesson.id === currentLesson.id
    );

    return (
      currentIndex >= 0 && currentIndex < courseContents.lessons.length - 1
    );
  };

  const allLessonsCompleted = () => {
    return (
      courseContents &&
      completedLessons.length === courseContents.lessons.length
    );
  };

  const handleFinishCourse = () => {
    navigate(`/academy/course/${id}/rating`);
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
                  {currentLesson ? (
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        {currentLesson.title}
                      </h2>
                      {currentLesson.course_contents.map((contentItem) => {
                        const ContentComponent =
                          contentTypeComponents[contentItem.content_type] ||
                          contentTypeComponents.default;

                        if (ContentComponent) {
                          return (
                            <ContentComponent
                              key={contentItem.id}
                              content={contentItem}
                            />
                          );
                        } else {
                          return (
                            <div key={contentItem.id}>
                              <p>
                                Unsupported content type:{" "}
                                {contentItem.content_type}
                              </p>
                            </div>
                          );
                        }
                      })}
                    </div>
                  ) : (
                    <>
                      {() => {
                        const ContentComponent = contentTypeComponents.default;
                        return (
                          <ContentComponent content={currentLesson.content} />
                        );
                      }}
                    </>
                  )}
                  <div className="flex w-full justify-between">
                    <button
                      onClick={() =>
                        handleMarkLessonComplete(currentLesson?.id)
                      }
                      className={`mt-4 flex items-center gap-2 text-white px-4 py-3 rounded-full ${
                        completedLessons.includes(currentLesson?.id)
                          ? "bg-[#AAA]"
                          : "bg-[#4B5057]"
                      }`}
                      disabled={completedLessons.includes(currentLesson?.id)}
                    >
                      {completedLessons.includes(currentLesson?.id)
                        ? "Completed"
                        : "Mark as Completed"}
                      <CheckCircleIcon
                        sx={{
                          color: completedLessons.includes(currentLesson?.id)
                            ? "#ECECEC"
                            : "#AAAAAA",
                          marginLeft: "8px",
                        }}
                      />
                    </button>
                    <div className="p-0 rounded-full border-8 border-transparent hover:border-[#6078DF59]">
                      <button
                        onClick={
                          allLessonsCompleted()
                            ? handleFinishCourse
                            : handleNextLesson
                        }
                        className="bg-[#6078DF] text-white px-4 py-3 rounded-full"
                        disabled={!hasNextLesson() && !allLessonsCompleted()}
                      >
                        {allLessonsCompleted()
                          ? "Finish Course"
                          : "Next Lesson"}
                      </button>
                    </div>
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
                      courseContents.lessons.map((lesson, index) => (
                        <div
                          key={lesson.id}
                          className={`flex flex-col rounded-xl border-2 border-solid border-[#1A184C] p-6 cursor-pointer ${
                            lesson.id === currentLesson?.id
                              ? "bg-[#6078DF40]"
                              : completedLessons.includes(lesson.id)
                              ? "bg-[#1A184CCC]"
                              : "bg-[#1A184C40]"
                          }`}
                          onClick={() => handleChange(lesson)}
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
