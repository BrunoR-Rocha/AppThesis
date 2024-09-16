import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuizArea, QuizOption } from "../style/academy_style";
import axiosConfig from "../../../../providers/axiosConfig";
import Wrapper from "../../../components/general/Wrapper";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

function QuizPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/quiz/1/questions`)
      .then((res) => {
        // setTopicOptions(res.data.topics);
        // setDifficultyOptions(res.data.difficulty);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
              <div className="flex items-center">
                <div className="p-3 flex items-center gap-2 text-[#ECECEC]">
                  <TimerOutlinedIcon />
                  <p className="font-medium">01:51</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-20">
              <p className="text-3xl font-semibold text-[#ECECEC] text-center">
                Here goes the title of the question?
              </p>

              <div className="flex-1 flex justify-center items-center">
                <div className="py-20 grid grid-cols-2 gap-10 max-w-screen-lg">
                  <QuizOption className="group">
                    <div className="p-3 bg-[#6078DF40] text-[#E9F0FF] rounded group-hover:bg-[#E9F0FF] group-hover:text-[#6078DF]">A</div>
                    <p className="text-[#E9F0FF] text-center font-medium text-lg ">
                      Lorem ipsum sit dolor emet
                    </p>
                  </QuizOption>
                  <QuizOption>
                    <div className="p-3 bg-[#6078DF40] text-[#E9F0FF] rounded">B</div>
                    <p className="text-[#E9F0FF] text-center font-medium text-lg">
                      Lorem ipsum sit dolor emet
                    </p>
                  </QuizOption>
                  <QuizOption>
                    <div className="p-3 bg-[#6078DF40] text-[#E9F0FF] rounded">C</div>
                    <p className="text-[#E9F0FF] text-center font-medium text-lg">
                      Lorem ipsum sit dolor emet
                    </p>
                  </QuizOption>
                  <QuizOption>
                    <div className="p-3 bg-[#6078DF40] text-[#E9F0FF] rounded">D</div>
                    <p className="text-[#E9F0FF] text-center font-medium text-lg">
                      Lorem ipsum sit dolor emet
                    </p>
                  </QuizOption>
                </div>
              </div>

              <div className="flex w-full justify-center items-center gap-5">
                <button className="border-[1px] border-solid border-[#AAAAAA] px-10 py-4 font-semibold text-[#FFF] rounded-full">
                  Back
                </button>
                <button className="bg-[#F4AA5A] px-10 py-4 font-semibold text-[#FFF] rounded-full">
                  Next
                </button>
              </div>
            </div>
          </div>
        </Wrapper>
      </QuizArea>
    </>
  );
}

export default QuizPage;
