import Wrapper from "../../components/general/Wrapper";

const QuizDashboard = () => {
  const QuizDashboardComponent = ({ children }) => {
    return (
      <div className="flex flex-1 bg-[#6078DF26] p-7 gap-4 rounded-xl border border-[#6078DF] items-center backdrop-blur-xl">
        {children}
      </div>
    );
  };

  return (
    <Wrapper>
      <div className="flex flex-col gap-11 pb-10 pt-24">
        <div className="flex flex-1 gap-5">
          <div className="flex flex-col basis-1/2 gap-5">
            <QuizDashboardComponent>
              <p className="text-lg font-semibold text-[#FFF]">Total Score</p>
            </QuizDashboardComponent>
            <QuizDashboardComponent>
              <p className="text-lg font-semibold text-[#FFF]">Overview</p>
            </QuizDashboardComponent>
          </div>

          <QuizDashboardComponent>
            <p className="text-lg font-semibold text-[#FFF]">Quiz History</p>
          </QuizDashboardComponent>
        </div>
      </div>
    </Wrapper>
  );
};

export default QuizDashboard;
