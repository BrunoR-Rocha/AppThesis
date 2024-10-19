import React from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import NavBar from "../../components/main/NavBar";
import Footer from "../../components/main/Footer";

const CustomLayout = () => {
  const location = useLocation();
  const hiddenRoutes = [
    "/login",
    "/register",
    "/academy/quiz/*",
    "/email-confirmation/*",
    "/forgot*"
  ];

  const hideNavAndFooter = hiddenRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  return (
    <>
      {!hideNavAndFooter && <NavBar />}
        <Outlet />
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

export default CustomLayout;
