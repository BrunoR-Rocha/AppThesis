import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuizArea } from "../style/academy_style";
import axiosConfig from "../../../../providers/axiosConfig";
import Wrapper from "../../../components/general/Wrapper";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../components/general/BackButton";
import { QuizDashboardComponent } from "../../profile/style";
import { formatTimeText } from "../../../utils/timeUtils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function QuizReview() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/quiz/${id}/review`)
      .then((res) => {
        setQuizData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getUserAnswerText = (userAnswer) => {
    if (typeof userAnswer === "string") {
      return userAnswer;
    } else if (typeof userAnswer === "object" && userAnswer !== null) {
      return userAnswer.option_text || "";
    } else {
      return "";
    }
  };

  const getCorrectAnswerText = (question) => {
    if (question.correct_answer) {
      return question.correct_answer;
    } else if (Array.isArray(question.question_options)) {
      const correctOption = question.question_options.find(
        (option) => option.is_correct
      );
      return correctOption ? correctOption.option_text : "N/A";
    } else {
      return "No correct answer available";
    }
  };

  return (
    <>
      <QuizArea>
        <Wrapper>
          <div className="w-full flex flex-col pt-20">
            <div className="flex flex-1 justify-between">
              {/* Close Button */}
              <div className="flex items-center">
                <BackButton
                  iconBorder="#ECECEC"
                  iconColor="#ECECEC"
                  noPaddingTop
                />
              </div>
            </div>
            {/* Main Content */}
            <div className="flex flex-col flex-1 text-white gap-10 mt-5 sm:mt-10">
              <div className="flex justify-start items-center">
                <h1 className="text-[#ECECEC] text-3xl lg:text-4xl font-semibold">
                  Quiz Review
                </h1>
              </div>
              <QuizDashboardComponent>
                <div className="flex items-center justify-start w-full gap-5">
                  <p className="text-lg font-semibold text-[#FFF] basis-1/2">
                    Score: {quizData?.score}
                  </p>
                  <p className="text-lg font-semibold text-[#FFF] basis-1/2">
                    Time Spent: {formatTimeText(quizData?.time)}
                  </p>
                </div>
              </QuizDashboardComponent>
              <div className="flex justify-start items-center">
                <h1 className="text-[#ECECEC] text-xl lg:text-2xl font-semibold">
                  Questions
                </h1>
              </div>
              {quizData?.questions?.map((question, index) => {
                const userAnswer = quizData?.answers
                  ? quizData?.answers[question.question_id]
                  : "N/A";
                const displayUserAnswer = getUserAnswerText(userAnswer);
                const correctAnswer = getCorrectAnswerText(question);

                return (
                  <>
                    <div
                      key={question.question_id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex flex-col gap-3">
                        <p className="font-semibold">
                          {index + 1}. {question.question_text}
                        </p>
                        <p>Your Answer: {displayUserAnswer}</p>
                        <p>Correct Answer: {correctAnswer}</p>
                      </div>
                      <div>
                        {question.is_correct ? (
                          <div className="bg-[#6078DF] rounded-full flex justify-center font-medium gap-2 px-4 py-2">
                            <CheckCircleIcon />
                            Correct
                          </div>
                        ) : (
                          <div className="bg-[#FC5E5540] rounded-full flex justify-center font-medium gap-2 px-4 py-2">
                            <CancelIcon /> Wrong
                          </div>
                        )}
                      </div>
                    </div>
                    <hr className="mb-4" />
                  </>
                );
              })}
            </div>
          </div>
        </Wrapper>
      </QuizArea>
    </>
  );
}

export default QuizReview;
