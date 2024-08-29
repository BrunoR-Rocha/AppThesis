import Wrapper from "../../components/general/Wrapper";

const ProfileDashboard = () => {
  const DashboardItem = ({ value, valueLabel }) => {
    return (
      <div className="flex flex-1 bg-[#1A184C40] p-6 gap-4 rounded-xl border-[1px] border-[#1A184C] items-center">
        <div className="w-11 h-11 bg-[#6078DF59]"></div>
        <div className="flex flex-col gap-1">
          <p className="text-2xl text-white font-semibold">{value}</p>
          <p className="text-[#6078DF] font-medium text-sm">{valueLabel}</p>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <div className="flex flex-col gap-11 pb-10 pt-24">
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold text-white capitalize">
            Dashboard
          </h3>
          <div className="flex items-center flex-wrap gap-5 flex-1">
            <DashboardItem valueLabel="Completed Courses" value="135" />
            <DashboardItem valueLabel="Completed Courses" value="136" />
            <DashboardItem valueLabel="Completed Courses" value="137" />
            <DashboardItem valueLabel="Completed Courses" value="138" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold text-white capitalize">
            Let’s start learning, User
          </h3>
          <div></div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfileDashboard;
