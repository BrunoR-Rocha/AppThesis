import React, { useEffect, useState } from "react";
import Wrapper from "../../components/general/Wrapper";
import { AcademyArea, AcademyList } from "./style/academy_style";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import Courses from "./course";
import axiosConfig from "../../../providers/axiosConfig";
import CustomDropdown from "../../components/general/Dropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import RenderButton from "../../components/general/SectionButtons";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "../../components/general/Skeleton";

function Academy() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [loadingParams, setLoadingParams] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [topicOptions, setTopicOptions] = useState([]);
  const [difficultyOptions, setDifficultyOptions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  useEffect(() => {
    setLoadingParams(true);
    axiosConfig
      .get(`/question/params`)
      .then((res) => {
        setTopicOptions(res.data.topics);
        setDifficultyOptions(res.data.difficulty);
        setLoadingParams(false);
      })
      .catch(() => setLoadingParams(false));
  }, []);

  const handleStartQuiz = (isRandom = true) => {
    setLoading(true);
    let formData = {};
    if (!isRandom) {
      if (!selectedTopic || !selectedDifficulty) {
        toast.error("Please select both a topic and a difficulty.");
        return;
      }

      formData = {
        topic_id: selectedTopic.id,
        difficulty: selectedDifficulty.id,
        is_random: isRandom,
      };
    } else {
      formData = {
        is_random: isRandom,
      };
    }

    axiosConfig
      .post(`/front/quiz/create`, formData)
      .then((res) => {
        setLoading(false);
        navigate("/academy/quiz/" + res.data.quiz_id, {
          state: { quiz_id: res.data.quiz_id },
        });
      })
      .catch(() => setLoading(false));
  };

  return (
    <>
      <AcademyArea>
        <Wrapper>
          <AcademyList className="flex flex-col w-full min-h-screen gap-10">
            {loadingParams ? (
              <>
                <div className="flex flex-col gap-5">
                  <Skeleton width="50%" />
                  <Skeleton height="50px" />
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-6">
                  <h1 className="text-[#ECECEC] text-3xl lg:text-4xl font-semibold">
                    Academy
                  </h1>
                  <RenderButton
                    tabId="tab1"
                    label="Quizzes"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  <RenderButton
                    tabId="tab2"
                    label="Courses"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </div>
                {activeTab === "tab1" && (
                  <div className="flex flex-col items-center justify-center py-10 gap-10">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[#ECECEC] text-center font-semibold text-xl lg:text-3xl">
                        Learning through quizzes
                      </h3>
                      <p className="text-white text-lg text-center max-w-xl">
                        Challenge yourself with an expanded set of questions
                        across multiple difficulty levels.
                      </p>
                    </div>

                    <div className="flex flex-grow w-full max-w-xl">
                      {loading ? (
                        <div className="flex flex-col gap-5 w-full text-white items-center justify-center mt-5">
                          <p>Please wait!</p>
                          <p>We're building your quiz</p>
                          <CircularProgress color="inherit" />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-5 w-full">
                          <button
                            className="w-full bg-[#6078DF] px-10 py-4 rounded-full backdrop-blur-2xl"
                            onClick={() => handleStartQuiz(true)}
                          >
                            <div className="flex justify-between w-full items-center">
                              <div className="flex flex-col gap-2 justify-start">
                                <span className="uppercase text-start text-xs font-semibold text-[#ECECEC]">
                                  Randomize
                                </span>
                                <span className="text-white font-semibold text-lg">
                                  General Sleep
                                </span>
                              </div>
                              <RepeatRoundedIcon sx={{ color: "#FFFFFF" }} />
                            </div>
                          </button>
                          <p className="text-center flex items-center uppercase font-medium text-sm text-[#AAA]">
                            <span className="flex-grow border-t border-white opacity-25 mx-4"></span>
                            Or
                            <span className="flex-grow border-t border-white opacity-25 mx-4"></span>
                          </p>

                          <CustomDropdown
                            options={topicOptions}
                            label="Topic"
                            selectedOption={selectedTopic}
                            setSelectedOption={setSelectedTopic}
                            optionLabelKey="name"
                          />
                          <CustomDropdown
                            options={difficultyOptions}
                            label="Difficulty"
                            selectedOption={selectedDifficulty}
                            setSelectedOption={setSelectedDifficulty}
                            optionLabelKey="name"
                          />

                          <div className="flex items-center justify-center pt-5">
                            <button
                              className="bg-white px-10 py-4 text-[#F4AA5A] rounded-full"
                              onClick={() => handleStartQuiz(false)}
                            >
                              <p className="text-base font-semibold capitalize">
                                Start Quiz{" "}
                                <EastRoundedIcon sx={{ color: "#F4AA5A" }} />{" "}
                              </p>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {activeTab === "tab2" && (
                  <div className="content">
                    <Courses />
                  </div>
                )}
              </>
            )}
          </AcademyList>
        </Wrapper>
      </AcademyArea>
    </>
  );
}

export default Academy;
