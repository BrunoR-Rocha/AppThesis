import { useEffect, useState } from "react";
import Wrapper from "../../components/general/Wrapper";
import axiosConfig from "../../../providers/axiosConfig";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";

const ProfileDashboard = () => {
  const [loading, setLoading] = useState();
  const [dashboardData, setDashboardData] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/profile/dashboard`)
      .then((res) => {
        setDashboardData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
    <>
      {loading ? (
        <CircularProgress className="mx-auto" sx={{ color: "#FFF" }} />
      ) : (
        <Wrapper>
          <div className="flex flex-col gap-11 pb-10 pt-24">
            <div className="flex flex-col gap-5">
              <h3 className="text-xl font-semibold text-white capitalize">
                {t("profile.title")}
              </h3>
              <div className="flex items-center flex-wrap gap-5 flex-1">
                {dashboardData &&
                  Object.entries(dashboardData).map(([key, value]) => (
                    <DashboardItem
                      key={key}
                      valueLabel={t(`profile.${key}`)}
                      value={value}
                    />
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-xl font-semibold text-white capitalize">
                {t("profile.motivation")}
              </h3>
              <div></div>
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default ProfileDashboard;
