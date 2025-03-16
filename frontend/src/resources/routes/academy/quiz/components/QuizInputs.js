import { useEffect, useState } from "react";
import { QuizOption } from "../../style/academy_style";

const MultipleChoiceQuestion = ({
  question,
  handleAnswerChange,
  selectedAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer || null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    handleAnswerChange(question.id, option);
  };

  useEffect(() => {
    setSelectedOption(selectedAnswer || null);
  }, [selectedAnswer]);

  return (
    <div className="py-5 md:py-20 grid md:grid-cols-2 gap-5 md:gap-10 max-w-screen-lg">
      {question?.options.map((option, index) => {
        return (
          <QuizOption
            className={`group`}
            key={index}
            selected={selectedOption?.option_text === option.option_text}
            onClick={() => handleOptionChange(option)}
          >
            <div
              className={`p-3 rounded ${
                selectedAnswer?.option_text === option.option_text
                  ? "bg-[#E9F0FF] text-[#6078DF]"
                  : "bg-[#6078DF40] text-[#E9F0FF] group-hover:bg-[#E9F0FF] group-hover:text-[#6078DF]"
              } `}
            >
              {index + 1}
            </div>
            <p className="text-[#E9F0FF] text-center font-medium text-lg ">
              {option.option_text}
            </p>
          </QuizOption>
        );
      })}
    </div>
  );
};

const YesNoQuestion = ({ question, handleAnswerChange, selectedAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer || null);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    handleAnswerChange(question.id, option);
  };

  useEffect(() => {
    setSelectedOption(selectedAnswer || null);
  }, [selectedAnswer]);

  return (
    <div className="py-20 flex justify-center gap-10 max-w-screen-lg">
      <label className="group">
        <input
          type="radio"
          name={`yes_no_${question.id}`}
          value="yes"
          className="hidden"
          checked={selectedOption === "yes"}
          onClick={() => handleOptionChange("yes")}
        />
        <QuizOption className="group" selected={selectedOption === "yes"}>
          <div
            className={`p-3 rounded ${
              selectedOption === "yes"
                ? "bg-[#E9F0FF] text-[#6078DF]"
                : "bg-[#6078DF40] text-[#E9F0FF] group-hover:bg-[#E9F0FF] group-hover:text-[#6078DF]"
            } `}
          >
            Yes
          </div>
        </QuizOption>
      </label>
      <label className="group">
        <input
          type="radio"
          name={`yes_no_${question.id}`}
          value="no"
          className="hidden"
          checked={selectedOption === "no"}
          onClick={() => handleOptionChange("no")}
        />
        <QuizOption className="group" selected={selectedOption === "no"}>
          <div
            className={`p-3 rounded ${
              selectedOption === "no"
                ? "bg-[#E9F0FF] text-[#6078DF]"
                : "bg-[#6078DF40] text-[#E9F0FF] group-hover:bg-[#E9F0FF] group-hover:text-[#6078DF]"
            } `}
          >
            No
          </div>
        </QuizOption>
      </label>
    </div>
  );
};

const FreeTextQuestion = ({ question, handleAnswerChange, selectedAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer || null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    handleAnswerChange(question.id, option);
  };

  useEffect(() => {
    setSelectedOption(selectedAnswer || null);
  }, [selectedAnswer]);

  return (
    <QuizOption className="my-20">
      <textarea
        className="w-full p-3 bg-[#6078DF40] text-[#E9F0FF] rounded"
        placeholder={"Type your answer here..."}
        rows={4}
        value={selectedOption || ""}
        onChange={(e) => handleOptionChange(e.target.value)}
      ></textarea>
    </QuizOption>
  );
};

export { MultipleChoiceQuestion, YesNoQuestion, FreeTextQuestion };
