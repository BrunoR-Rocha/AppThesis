import { useEffect, useState } from "react";
import axiosConfig from "../../../providers/axiosConfig";
import Wrapper from "../../components/general/Wrapper";
import Skeleton from "../../components/general/Skeleton";
import { CourseCard, QuizDashboardComponent } from "./style";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import EmptyValue from "../../components/general/EmptyValue";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileCourses = () => {
  const [loading, setLoading] = useState();
  const [courses, setCourses] = useState([]);
  const [firstPendingCourse, setFirstPendingCourse] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/profile/courses`)
      .then((res) => {
        setCourses(res.data);
        const pending = res.data.filter((course) => !course.is_completed);
        setFirstPendingCourse(pending.length > 0 ? pending[0] : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col gap-11 pb-10 pt-24">
        <div className="d-flex flex-col">
          <div className="flex flex-1 gap-5 flex-wrap-reverse md:flex-nowrap">
            <div className="flex flex-col basis-full md:basis-1/2 gap-5 max-w-full">
              <QuizDashboardComponent>
                {loading ? (
                  <>
                    <Skeleton height="100px" width="50%" />
                    <Skeleton height="100px" />
                  </>
                ) : (
                  <div className="flex flex-col items-start justify-start w-full self-start">
                    <p className="text-lg font-semibold text-[#FFF]">
                      {t("profile.courses.title")}
                    </p>

                    <div className="overflow-x-auto mt-4 w-full">
                      <table className="min-w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-300 text-[#AAA] font-medium capitalize opacity-75">
                            <th className="px-4 py-2">
                              {t("profile.courses.headerCourse")}
                            </th>
                            <th className="px-4 py-2">
                              {t("profile.courses.headerProgress")}
                            </th>
                            <th className="px-4 py-2">
                              {t("profile.courses.headerDate")}
                            </th>
                            <th className="px-4 py-2">
                              {t("profile.courses.headerStatus")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses?.length > 0 ? (
                            courses?.map((course) => (
                              <tr
                                key={course.id}
                                className="hover:bg-[#6078DF1A] font-semibold text-white"
                              >
                                <td className="px-4 py-2">{course.title}</td>
                                <td className="px-4 py-2">
                                  {course.general_progress}
                                </td>
                                <td className="px-4 py-2">
                                  {course.subscribed_at}
                                </td>
                                <td className="px-4 py-2">
                                  {course.is_completed === true ? (
                                    <div className="bg-[#98E39940] rounded-lg flex justify-center font-medium px-3 py-2">
                                      {t("profile.courses.finished")}
                                    </div>
                                  ) : (
                                    <div className="bg-[#FC5E5540] rounded-full flex justify-center font-medium px-3 py-2">
                                      {t("profile.courses.unfinished")}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="px-4 py-2 text-center">
                                <EmptyValue
                                  label={t("profile.courses.empty")}
                                />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </QuizDashboardComponent>
            </div>
            <div className="flex flex-col basis-full md:basis-1/2 gap-5 justify-center">
              {loading ? (
                <Skeleton height="100px" />
              ) : firstPendingCourse ? (
                <>
                  <p className="text-lg font-semibold text-[#FFF]">
                    {t("profile.courses.forget")}
                  </p>
                  <CourseCard>
                    <div className="flex flex-col gap-10 p-4">
                      <div className="bg-[#FFFFFF40] rounded-full backdrop-blur-sm px-5 py-3 w-fit">
                        <span className="text-white">
                          {firstPendingCourse?.difficulty}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <p className="text-white text-xl font-semibold">
                          {firstPendingCourse?.title}
                        </p>
                        <div className="flex justify-between">
                          <div className="flex items-end gap-3 text-[#ECECEC] ">
                            <div className="flex gap-1">
                              <FolderOpenRoundedIcon
                                sx={{ color: "#6078DF" }}
                              />

                              <span>
                                {firstPendingCourse?.sections_count || 0}{" "}
                                sections
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <AccessTimeRoundedIcon
                                sx={{ color: "#6078DF" }}
                              />
                              <span>
                                {" "}
                                {firstPendingCourse?.average_time || "N/A"} mins
                              </span>
                            </div>
                          </div>
                          <a
                            href={`/courses/${firstPendingCourse?.id}`}
                            className="flex rounded-full bg-[#F4AA5A] px-4 py-2"
                          >
                            <p className="text-white">
                              {t("profile.courses.continue")}
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </CourseCard>
                </>
              ) : (
                <div className="flex flex-col items-center text-center text-white gap-10">
                  <p>{t("profile.courses.pending")}</p>
                  <button
                    onClick={() =>
                      navigate("/academy", {
                        state: { activeTab: "courses" },
                      })
                    }
                    className="flex rounded-full bg-[#F4AA5A] px-4 py-2"
                  >
                    {t("profile.courses.redirect")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfileCourses;
