
import React from "react";
import { MaintenanceArea } from "./styles/maintenance_styles";
import { useEffect } from "react";
import axiosConfig from "../../../providers/axiosConfig";

const Maintenance = () => {

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axiosConfig.get("/front/config/social_logins");
        if(response.status === 200)
        {
          window.location.href = '/';
        }
      } catch (error) {
        console.error("Failed to fetch config:", error);
      }
    };

    fetchConfig();
  }, []);
  
  return (
    <MaintenanceArea className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-between h-full py-20">
        <h4 className="font-cormorant text-4xl text-center font-medium text-[#ECECEC]">
          Oops!
          <br />
          Nothing here...
        </h4>
        <p className="text-2xl text-center font-medium text-[#ECECEC]">
            System in maintenance
        </p>
      </div>
    </MaintenanceArea>
  );
};

export default Maintenance;
