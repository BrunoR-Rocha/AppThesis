import React, { useEffect, useState } from "react";
import Wrapper from "../../components/general/Wrapper";
import { AcademyArea, AcademyList } from "./style/academy_style";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import Courses from "./course";
import axiosConfig from "../../../providers/axiosConfig";
import CustomDropdown from "../../components/general/Dropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Academy() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [loading, setLoading] = useState(false);

  const [topicOptions, setTopicOptions] = useState([]);
  const [difficultyOptions, setDifficultyOptions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/params/questions`)
      .then((res) => {
        setTopicOptions(res.data.topics);
        setDifficultyOptions(res.data.difficulty);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStartQuiz = () => {
    if (!selectedTopic || !selectedDifficulty) {
      toast.error("Please select both a topic and a difficulty.");
      return;
    }

    console.log("Selected Topic:", selectedTopic);
    console.log("Selected Difficulty:", selectedDifficulty);

    // You can now make an API call or navigate to another page with these values
  };

  const renderButton = (tabId, label) => (
    <button
      className={`py-2 px-4 font-semibold rounded-full ${
        activeTab === tabId
          ? "bg-white text-[#6078DF]"
          : "bg-transparent text-[#AAA] border-[1px] border-solid border-[#4B5057]"
      }`}
      onClick={() => setActiveTab(tabId)}
    >
      {label}
    </button>
  );

  return (
    <>
      <AcademyArea>
        <Wrapper>
          <AcademyList className="flex flex-col w-full min-h-screen gap-10">
            <div className="flex gap-6">
              <h1 className="text-[#ECECEC] text-3xl lg:text-4xl font-semibold">
                Academy
              </h1>
              {renderButton("tab1", "Quizzes")}
              {renderButton("tab2", "Courses")}
            </div>
            {activeTab === "tab1" && (
              <div className="flex flex-col items-center justify-center py-10 gap-10">
                <div className="flex flex-col gap-3">
                  <h3 className="text-[#ECECEC] text-center font-semibold text-xl lg:text-3xl">
                    Learning through quizzes
                  </h3>
                  <p className="text-white text-lg text-center max-w-xl">
                    Challenge yourself with an expanded set of questions across
                    multiple difficulty levels.
                  </p>
                </div>

                <div className="flex flex-grow w-full max-w-xl">
                  <div className="flex flex-col gap-5 w-full">
                    <button className="w-full bg-[#6078DF] px-10 py-4 rounded-full backdrop-blur-2xl">
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
                    />
                    <CustomDropdown
                      options={difficultyOptions}
                      label="Difficulty"
                      selectedOption={selectedDifficulty}
                      setSelectedOption={setSelectedDifficulty}
                    />

                    <div className="flex items-center justify-center pt-5">
                      <button
                        className="bg-white px-10 py-4 text-[#F4AA5A] rounded-full"
                        onClick={handleStartQuiz}
                      >
                        <p className="text-base font-semibold capitalize">
                          Start Quiz{" "}
                          <EastRoundedIcon sx={{ color: "#F4AA5A" }} />{" "}
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "tab2" && (
              <div className="content">
                <Courses />
              </div>
            )}
          </AcademyList>
        </Wrapper>
      </AcademyArea>
    </>
  );
}

export default Academy;
