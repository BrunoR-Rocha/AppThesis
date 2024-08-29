import React, { useState } from "react";
import { ReactComponent as Flower } from "../../media/general/flower.svg";
import Wrapper from "../../components/general/Wrapper";
import { ProfileArea, ProfileDisplay } from "./style";
import Courses from "../academy/course";
import ProfileDashboard from "./dashboard";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("tab1");

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
      <ProfileArea>
        <ProfileDisplay className="relative overflow-hidden">
          <Flower className="absolute mix-blend-screen -right-1/3 -top-3/4 object-cover z-0 -rotate-[160deg]" />
          <Wrapper>
            <div className="flex flex-col gap-11 pb-10 pt-24 sm:pt-40 ">
              <div className="flex items-center gap-5">
                <div className="flex">
                  <div className="w-24 h-24 bg-[#1A184C40] rounded-full"></div>
                </div>
                <div className="flex flex-col gap-3 w-full lg:w-1/2">
                  <h3 className="text-3xl font-semibold text-[#ECECEC] capitalize">
                    User Name
                  </h3>
                  <p className="text-base font-medium text-white self-stretch">
                    useremail@email.com
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex gap-3 items-center">
                  {renderButton("tab1", "Dashboard")}
                  {renderButton("tab2", "Courses")}
                  {renderButton("tab3", "Quizzes")}
                  {renderButton("tab4", "Saved")}
                  {renderButton("tab5", "Settings")}
                </div>
              </div>
            </div>
          </Wrapper>
        </ProfileDisplay>
        <div>
          <Wrapper>
            <div className="flex">
              {activeTab === "tab1" && <ProfileDashboard />}
              {activeTab === "tab2" && <></>}
              {activeTab === "tab3" && <></>}
              {activeTab === "tab4" && <></>}
              {activeTab === "tab5" && <></>}
            </div>
          </Wrapper>
        </div>
      </ProfileArea>
    </>
  );
};

export default Profile;
