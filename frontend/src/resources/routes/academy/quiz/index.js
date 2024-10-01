import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuizArea, QuizOption } from "../style/academy_style";
import axiosConfig from "../../../../providers/axiosConfig";
import Wrapper from "../../../components/general/Wrapper";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
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

function QuizPage() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quizParams, setQuizParams] = useState([]);
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    unansweredQuestions: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .post(`/quiz/1/questions`)
      .then((res) => {
        setQuestions(res.data.questions);
        setQuizParams(res.data.params);
        setTimer(res.data.params.time_limit);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
    console.log("here");
    setConfirmationModal({ show: false, unansweredQuestions: [] });
  };

  const handleSubmitQuiz = async () => {
    // hideConfirmationModal();
    // setIsSubmitting(true);
    try {
      console.log(answers);
      // Make the POST request to submit the quiz answers
      // const response = await axiosConfig.post('/quiz/1/submit', {
      //   answers: answers, // Pass the user's answers
      // }).then((res) => {
      //    toast.success("Quiz submitted successfully!");
      //    setTimeout(() => {
      //      setIsSubmitting(false);
      //      setResults(true);
      //    }, 3000);
      // });
    } catch (error) {
      toast.error("There was an error submitting your quiz. Please try again.");
      setIsSubmitting(false);
    }
  };

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

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
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
          <div className="w-full flex flex-col pt-20">
            <div className="flex flex-1 justify-between">
              {/* Close Button */}
              <div className="flex items-center">
                <Link
                  to={() => navigate(-1)}
                  className="p-3 group flex items-center gap-2 text-[#ECECEC] hover:text-[#F4AA5A]"
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
                </Link>
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
                  <p className="text-3xl font-semibold text-[#ECECEC] text-center mt-10">
                    {questions[currentQuestionIndex]?.title}
                  </p>

                  {/* Question Component */}
                  <div className="flex-1 flex justify-center items-center">
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
                  {/* Animation with correct score from 1-100 */}
                  <div>
                    <ProgressCircle result={75} />
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
                <div className="flex flex-col gap-10">
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
                    onClick={() => navigate("/my-quizzes")}
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
      </QuizArea>
    </>
  );
}

export default QuizPage;
