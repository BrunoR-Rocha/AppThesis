import React, { useState } from "react";
import { ReactComponent as Flower } from "../../media/general/flower.svg";
import Wrapper from "../../components/general/Wrapper";
import { BannerArea, BannerDisplay } from "./style";
import ProfileDashboard from "./dashboard";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import ProfileSettings from "./settings";
import QuizDashboard from "./quiz";
import Favorites from "./favorites";
import ProfileCourses from "./courses";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { usabilityTestingEnabled } = useContext(AuthContext);
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "dashboard"
  );

  const renderButton = (tabId, label) => (
    <button
      className={`px-10 py-3 font-medium rounded-full ${
        activeTab === tabId
          ? "bg-white text-[#6078DF]"
          : "bg-[#1A184C40] text-white backdrop-blur-sm"
      }`}
      onClick={() => setActiveTab(tabId)}
    >
      {label}
    </button>
  );
  return (
    <>
      <BannerArea>
        <BannerDisplay className="relative overflow-hidden">
          <Flower className="absolute mix-blend-screen -right-1/3 -top-3/4 object-cover z-0 -rotate-[160deg]" />
          <Wrapper>
            <div className="flex flex-col gap-11 pb-10 pt-24 sm:pt-40 ">
              <div className="flex items-center gap-5">
                <div className="flex">
                  <div className="w-24 h-24 bg-[#1A184C40] rounded-full"></div>
                </div>
                <div className="flex flex-col gap-3 w-full lg:w-1/2">
                  <h3 className="text-3xl font-semibold text-[#ECECEC] capitalize">
                    {user.name}
                  </h3>
                  <p className="text-base font-medium text-white self-stretch">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex gap-3 items-center overflow-x-scroll md:overflow-x-auto">
                  {renderButton("dashboard", t("profile.tabs.dashboard"))}
                  {renderButton("courses", t("profile.tabs.courses"))}
                  {renderButton("quizzes", t("profile.tabs.quizzes"))}
                  {renderButton("library", t("profile.tabs.saved"))}
                  {!usabilityTestingEnabled &&
                    renderButton("settings", t("profile.tabs.settings"))}
                </div>
              </div>
            </div>
          </Wrapper>
        </BannerDisplay>
        <div>
          <Wrapper>
            <div className="flex">
              {activeTab === "dashboard" && <ProfileDashboard />}
              {activeTab === "courses" && <ProfileCourses />}
              {activeTab === "quizzes" && <QuizDashboard />}
              {activeTab === "library" && <Favorites />}
              {activeTab === "settings" && !usabilityTestingEnabled && (
                <ProfileSettings />
              )}
            </div>
          </Wrapper>
        </div>
      </BannerArea>
    </>
  );
};

export default Profile;
