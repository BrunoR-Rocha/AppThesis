import { useEffect, useState } from "react";
import axiosConfig from "../../../providers/axiosConfig";
import Wrapper from "../../components/general/Wrapper";
import Skeleton from "../../components/general/Skeleton";
import ProgressCircle from "../academy/quiz/components/Progress";
import { QuizDashboardComponent } from "./style";
import { Link } from "react-router-dom";
import { formatTimeText } from "../../utils/timeUtils";

const QuizDashboard = () => {
  const OverviewBox = ({
    value,
    percentage = null,
    color = null,
    colorLabel,
  }) => {
    return (
      <div className="rounded-lg bg-[#6078DF1A]">
        <div className="flex flex-col w-full p-5">
          <div className="flex items-center justify-start gap-3 min-w-5">
            <span className="text-2xl font-bold text-white">{value}</span>
            {percentage !== null && (
              <span className="text-[#F4AA5A] text-lg font-semibold">
                {percentage} %
              </span>
            )}
          </div>
          <div className="flex items-center justify-start gap-3 min-w-5">
            {color !== null && (
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
            )}
            <span className="text-[#AAA] font-medium">{colorLabel}</span>
          </div>
        </div>
      </div>
    );
  };

  const [loading, setLoading] = useState();
  const [quizzes, setQuizzes] = useState();

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/profile/quizzes`)
      .then((res) => {
        setQuizzes(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col gap-11 pb-10 pt-24">
        <div className="flex flex-1 gap-5">
          <div className="flex flex-col basis-1/2 gap-5">
            <QuizDashboardComponent>
              {loading ? (
                <Skeleton width="70%" height="50px" />
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg font-semibold text-[#FFF]">
                    Overall Score
                  </span>
                  <span className="text-3xl font-bold text-[#FFF]">
                    {quizzes?.metrics?.totalScore} pts
                  </span>
                </div>
              )}
            </QuizDashboardComponent>

            <QuizDashboardComponent>
              {loading ? (
                <Skeleton width="60%" height="50px" />
              ) : (
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-[#FFF]">Overview</p>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-3">
                      <OverviewBox
                        value={quizzes?.metrics?.finished_quizzes}
                        percentage={
                          quizzes?.metrics?.percentage_finished_quizzes
                        }
                        color={"#6078DF"}
                        colorLabel={"Finished"}
                      />
                      <OverviewBox
                        value={quizzes?.metrics?.unfinished_quizzes}
                        percentage={
                          quizzes?.metrics?.percentage_unfinished_quizzes
                        }
                        color={"#6078DF66"}
                        colorLabel={"Unfinished"}
                      />
                      <OverviewBox
                        value={formatTimeText(
                          quizzes?.metrics?.time_efficiency
                        )}
                        colorLabel={"Average Time"}
                      />
                    </div>
                    <div>
                      <ProgressCircle
                        result={quizzes?.metrics?.finished_quizzes}
                        referenceValue={quizzes?.quizzes?.length}
                        outsideQuiz={true}
                        outsideQuizComponent={
                          <div className="flex flex-col gap-2">
                            <p className="font-bold text-4xl text-white text-center">
                              {quizzes?.quizzes?.length}
                            </p>
                            <p className="font-medium text-lg text-[#AAA] text-center">
                              Total Quizzes
                            </p>
                          </div>
                        }
                        bgColor={"#6078DF66"}
                        progressColor={"#6078DF"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </QuizDashboardComponent>
          </div>

          <QuizDashboardComponent>
            {loading ? (
              <Skeleton height="100px" />
            ) : (
              <div className="flex flex-col items-start justify-start w-full self-start">
                <p className="text-lg font-semibold text-[#FFF]">
                  Quiz History
                </p>

                <div className="overflow-x-auto mt-4 w-full">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-300 text-[#AAA] font-medium capitalize opacity-75">
                        <th className="px-4 py-2">Quiz</th>
                        <th className="px-4 py-2">Score</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizzes?.quizzes.length > 0 ? (
                        quizzes?.quizzes.map((quiz) => (
                          <tr
                            key={quiz.quiz_id}
                            className="hover:bg-[#6078DF1A] font-semibold text-white"
                          >
                            <td className="px-4 py-2">{quiz.quiz_id}</td>
                            <td className="px-4 py-2">{quiz.score}</td>
                            <td className="px-4 py-2">{quiz.completed_at}</td>
                            <td className="px-4 py-2">
                              {quiz.is_completed == 1 ? (
                                <Link
                                  to={`/academy/quiz/review/${quiz.quiz_id}`}
                                  className="bg-[#6078DF] rounded-lg flex justify-center font-medium cursor-pointer"
                                >
                                  Review Quiz
                                </Link>
                              ) : (
                                <Link
                                  to={`/academy/quiz/continue/${quiz.quiz_id}`}
                                  state={{ quiz_id: quiz.quiz_id }}
                                  className="bg-[#4B5057] rounded-lg flex justify-center font-medium cursor-pointer"
                                >
                                  Finish Quiz
                                </Link>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-4 py-2 text-center">
                            No quizzes created yet
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
      </div>
    </Wrapper>
  );
};

export default QuizDashboard;
