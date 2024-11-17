import { useEffect, useState } from "react";
import axiosConfig from "../../../providers/axiosConfig";
import Wrapper from "../../components/general/Wrapper";
import Skeleton from "../../components/general/Skeleton";
import { CourseCard, QuizDashboardComponent } from "./style";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import EmptyValue from "../../components/general/EmptyValue";

const ProfileCourses = () => {
  const [loading, setLoading] = useState();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/profile/courses`)
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col gap-11 pb-10 pt-24">
        <div className="d-flex flex-col">
          <div className="flex flex-1 gap-5">
            <div className="flex flex-col basis-1/2 gap-5">
              <QuizDashboardComponent>
                {loading ? (
                  <>
                    <Skeleton height="100px" width="50%" />
                    <Skeleton height="100px" />
                  </>
                ) : (
                  <div className="flex flex-col items-start justify-start w-full self-start">
                    <p className="text-lg font-semibold text-[#FFF]">
                      Courses History
                    </p>

                    <div className="overflow-x-auto mt-4 w-full">
                      <table className="min-w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-300 text-[#AAA] font-medium capitalize opacity-75">
                            <th className="px-4 py-2">Course</th>
                            <th className="px-4 py-2">Progress</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Status</th>
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
                                      Finished
                                    </div>
                                  ) : (
                                    <div className="bg-[#FC5E5540] rounded-full flex justify-center font-medium px-3 py-2">
                                      Unfinished
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="px-4 py-2 text-center">
                                <EmptyValue label={"No courses enrolled yet"} />
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
            <div className="flex flex-col basis-1/2 gap-5">
              <p className="text-lg font-semibold text-[#FFF]">
                Don’t forget to finish!
              </p>
              <CourseCard>
                <div className="flex flex-col gap-10 p-4">
                  <div className="bg-[#FFFFFF40] rounded-full backdrop-blur-sm px-5 py-3 w-fit">
                    <span className="text-white">
                      {/* {course?.difficulty?.name} */}
                      Difficulty
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-white text-xl font-semibold">
                      Here goes the Course Title
                    </p>
                    <div className="flex justify-between">
                      <div className="flex items-end gap-3 text-[#ECECEC] ">
                        <div className="flex gap-1">
                          <FolderOpenRoundedIcon sx={{ color: "#6078DF" }} />
                          <span>3 sections</span>
                        </div>
                        <div className="flex gap-1">
                          <AccessTimeRoundedIcon sx={{ color: "#6078DF" }} />
                          <span>time</span>
                        </div>
                      </div>
                      <div className="flex rounded-full bg-[#F4AA5A] px-4 py-2">
                        <p className="text-white">Continue</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CourseCard>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfileCourses;
