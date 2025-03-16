import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuizArea } from "../style/academy_style";
import axiosConfig from "../../../../providers/axiosConfig";
import Wrapper from "../../../components/general/Wrapper";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  FreeTextQuestion,
  MultipleChoiceQuestion,
  YesNoQuestion,
} from "./components/QuizInputs";
import ProgressCircle from "./components/Progress";
import { useRef } from "react";
import Skeleton from "../../../components/general/Skeleton";

function QuizPage() {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 468,
    backgroundColor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    padding: 4,
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  };

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    unansweredQuestions: [],
  });

  const [closeConfirmationModal, setCloseConfirmationModal] = useState({
    show: false,
  });

  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(false);
  const [resultsScore, setResultsScore] = useState(false);
  const timerIntervalRef = useRef(null);
  const { quiz_id } = location.state || {};

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .post(`/quiz/${quiz_id}/questions`)
      .then((res) => {
        setQuestions(res.data.questions);
        setTimer(res.data.params.time_limit);

        if (res.data.saved_answers) {
          setAnswers(res.data.saved_answers);

          const unansweredQuestionIndex = res.data.questions.findIndex(
            (q) => !res.data.saved_answers[q.id]
          );

          setCurrentQuestionIndex(
            unansweredQuestionIndex !== -1 ? unansweredQuestionIndex : 0
          );

          const answeredCount = Object.keys(res.data.saved_answers).length;
          setProgress((answeredCount / res.data.questions.length) * 100);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [quiz_id]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    } else {
      showConfirmationModal();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setProgress(((currentQuestionIndex - 1) / questions.length) * 100);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const showConfirmationModal = () => {
    const unansweredQuestions = questions.filter(
      (question) => !answers[question.id]
    );

    setConfirmationModal({
      show: true,
      unansweredQuestions,
    });
  };

  const hideConfirmationModal = () => {
    setConfirmationModal({ show: false, unansweredQuestions: [] });
  };

  const hideCloseConfirmationModal = () => {
    setCloseConfirmationModal({ show: false });
  };

  const handleSubmitQuiz = async () => {
    clearInterval(timerIntervalRef.current);

    try {
      await axiosConfig
        .post(`/quiz/${quiz_id}/submit`, {
          answers: answers,
        })
        .then((res) => {
          toast.success("Quiz submitted successfully!");

          hideConfirmationModal();
          setIsSubmitting(false);
          setResults(true);
          setResultsScore(res.data.score);
        });
    } catch (error) {
      toast.error("There was an error submitting your quiz. Please try again.");
      setIsSubmitting(false);
    }
  };

  const saveQuizProgress = useCallback(() => {
    axiosConfig
      .post(`/quiz/${quiz_id}/save-progress`, {
        answers: answers,
      })
      .catch((error) => {
        console.error("Failed to auto-save quiz progress:", error);
      });
  }, [answers, quiz_id]);

  const handleQuizClose = () => {
    clearInterval(timerIntervalRef.current);
    setCloseConfirmationModal({
      show: true,
    });
  };

  const quizClose = () => {
    saveQuizProgress();
    navigate("/academy");
  };

  // Save progress every 5 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      saveQuizProgress();
    }, 5000);

    return () => clearInterval(autoSaveInterval);
  }, [saveQuizProgress]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      saveQuizProgress();
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [saveQuizProgress]);

  // Timer
  useEffect(() => {
    if (timer > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(timerIntervalRef.current);
    }

    return () => {
      clearInterval(timerIntervalRef.current);
    };
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const questionTypeComponents = {
    multiple_choice: MultipleChoiceQuestion,
    yes_no: YesNoQuestion,
    free_text: FreeTextQuestion,
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion?.id];
  const QuestionComponent = questionTypeComponents[currentQuestion?.type];

  return (
    <>
      <QuizArea>
        <Wrapper>
          {loading ? (
            <>
              <div className="flex flex-col gap-5">
                <Skeleton width="50%" />
                <Skeleton height="100px" />
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col pt-10 md:pt-20">
              <div className="flex flex-1 justify-between">
                {/* Close Button */}
                <div className="flex items-center">
                  <div
                    onClick={handleQuizClose}
                    className="p-3 group flex items-center gap-2 text-[#ECECEC] hover:text-[#F4AA5A] hover:cursor-pointer"
                  >
                    <CloseIcon
                      sx={{
                        color: "#ECECEC",
                        ".group:hover &": {
                          color: "#F4AA5A",
                        },
                      }}
                    />
                    <p className="font-medium">Close</p>
                  </div>
                </div>
                {/* Timer */}
                {!isSubmitting && !results && (
                  <div className="flex items-center">
                    <div className="p-3 flex items-center gap-2 text-[#ECECEC]">
                      <TimerOutlinedIcon />
                      <p className="font-medium">{formatTime(timer)}</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Main Content */}
              <div className="flex flex-col flex-1 justify-center items-center">
                {!isSubmitting && !results && (
                  <>
                    {/* Question Title */}
                    <p className="text-3xl font-semibold text-[#ECECEC] text-center mt-5 md:mt-10">
                      {questions[currentQuestionIndex]?.title}
                    </p>

                    {/* Question Component */}
                    <div className="flex-1 flex justify-center items-start md:items-center w-3/4  max-h-[calc(100vh-450px)] overflow-y-auto md:max-h-full md:overflow-visible">
                      {QuestionComponent && (
                        <QuestionComponent
                          question={currentQuestion}
                          handleAnswerChange={handleAnswerChange}
                          selectedAnswer={selectedAnswer}
                        />
                      )}
                    </div>
                  </>
                )}

                {isSubmitting && (
                  <div className="flex-1 flex justify-center items-center">
                    <p className="text-3xl font-semibold text-[#ECECEC] text-center">
                      We're compiling your results...
                    </p>
                  </div>
                )}

                {results && (
                  <div className="flex flex-col justify-center items-center gap-8 h-full">
                    <p className="text-3xl font-semibold text-[#ECECEC] text-center">
                      You finished the quiz!
                    </p>
                    <div>
                      <ProgressCircle result={resultsScore} />
                    </div>
                    <div>
                      <p className="text-lg text-white text-center">
                        We hope the results are satisfying and that this quiz
                        offered you new insights.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="fixed bottom-0 left-0 w-full">
                {!isSubmitting && !results && (
                  <div className="flex flex-col gap-5 md:gap-10">
                    {/* Buttons */}
                    <div className="flex justify-center items-center gap-5 py-4">
                      <button
                        className="border-[1px] border-solid border-[#AAAAAA] px-10 py-4 font-semibold text-[#FFF] rounded-full"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        Back
                      </button>
                      <button
                        className="bg-[#F4AA5A] px-10 py-4 font-semibold text-[#FFF] rounded-full"
                        onClick={handleNextQuestion}
                      >
                        {currentQuestionIndex === questions.length - 1
                          ? "Finish"
                          : "Next"}
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full">
                      <p className="text-center text-[#E9F0FF] font-medium pb-4">
                        {currentQuestionIndex + 1} of {questions.length}
                      </p>
                      <LinearProgress variant="determinate" value={progress} />
                    </div>
                  </div>
                )}

                {results && (
                  <div className="flex justify-center items-center gap-5 py-4">
                    <button
                      className="border-[1px] border-solid border-[#AAAAAA] px-10 py-4 font-semibold text-[#FFF] rounded-full"
                      onClick={() =>
                        navigate("/profile", {
                          state: { activeTab: "quizzes" },
                        })
                      }
                    >
                      My Quizzes
                    </button>
                    <button
                      className="bg-[#FFF] px-10 py-4 font-semibold text-[#F4AA5A] rounded-full hover:border-2 hover:border-[#F4AA5A] hover:border-solid transition-transform"
                      onClick={() => navigate("/new-quiz")}
                    >
                      New Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Wrapper>

        <Modal
          open={confirmationModal.show}
          onClose={hideConfirmationModal}
          aria-labelledby="confirmation-modal-title"
          aria-describedby="confirmation-modal-description"
        >
          <Box sx={modalStyle}>
            <h2 id="confirmation-modal-title" className="text-xl font-semibold">
              Are you sure you want to submit the quiz?
            </h2>
            {confirmationModal?.unansweredQuestions.length > 0 ? (
              <p id="confirmation-modal-description" className="text-[#FC5E55]">
                You have{" "}
                <span className="text-lg font-bold text-[#FC5E55]">
                  {confirmationModal.unansweredQuestions.length} unanswered{" "}
                </span>
                {confirmationModal.unansweredQuestions.length === 1
                  ? "question"
                  : "questions"}
                . Please review before submitting.
              </p>
            ) : (
              <p id="confirmation-modal-description" className="text-gray-700">
                All questions are answered.
              </p>
            )}

            <div className="flex justify-between gap-4 mt-4">
              <button
                className="basis-1/2 border-[1px] border-solid border-[#6078DF] rounded-full text-[#6078DF] px-8 py-4"
                onClick={hideConfirmationModal}
              >
                Cancel
              </button>
              <button
                className="basis-1/2 bg-[#6078DF] rounded-full text-[#FFF] px-8 py-4"
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={closeConfirmationModal.show}
          onClose={hideCloseConfirmationModal}
          aria-labelledby="confirmation-modal-title"
          aria-describedby="confirmation-modal-description"
        >
          <Box sx={modalStyle}>
            <h2 id="confirmation-modal-title" className="text-xl font-semibold">
              Are you sure you want to leave the current quiz?
            </h2>

            <div className="flex justify-between gap-4 mt-4">
              <button
                className="basis-1/2 border-[1px] border-solid border-[#6078DF] rounded-full text-[#6078DF] px-8 py-4"
                onClick={hideCloseConfirmationModal}
              >
                Cancel
              </button>
              <button
                className="basis-1/2 bg-[#6078DF] rounded-full text-[#FFF] px-8 py-4"
                onClick={quizClose}
              >
                Exit Quiz
              </button>
            </div>
          </Box>
        </Modal>
      </QuizArea>
    </>
  );
}

export default QuizPage;
