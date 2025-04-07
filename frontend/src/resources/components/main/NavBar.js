import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate, matchPath } from "react-router-dom";
import { ReactComponent as Logo } from "../../media/navbar/logo_moony.svg";
import Wrapper from "../general/Wrapper";
import ContactModal from "../modals/contact";
import AuthContext from "../../../context/AuthContext";
import LanguageSwitch from "../app/LanguageSwitch";
import { useTranslation } from "react-i18next";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const NavigationBar = styled("div")`
  width: 100%;
  height: 80px;
  background-color: #6078df0d;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background-color 0.3s ease-in-out;

  & a,
  p {
    font-family: "Montserrat", sans-serif;
    font-size: 22px;
    line-height: 24px;
  }
  &.scrolled {
    backdrop-filter: blur(5px);
  }
  & .nav-links {
    display: none;
  }
  & .mobile-menu-button {
    display: flex;
  }

  @media (min-width: 1024px) {
    & .nav-links {
      display: flex;
    }

    & .mobile-menu-button {
      display: none;
    }

    & a,
    p {
      font-family: "Montserrat", sans-serif;
      font-size: 15px;
      line-height: 16px;
    }

  }

  & .mobilenavigation {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #040A17;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 10rem ;
`;


function NavBar() {
  const [scrolled, setScrolled] = useState();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, usabilityTestingEnabled } = useContext(AuthContext);
  const { t } = useTranslation();
  const location = useLocation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setScrolled(true);
    } else if (window.location.pathname === "/") {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      });
    }
  }, [scrolled]);

  const isActive = (path) => {
    return matchPath({ path, end: false }, location.pathname);
  };

  

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <NavigationBar className={scrolled && "scrolled"}>
      <>
        <Wrapper className="relative z-40">
          <div className="flex gap-10 items-center h-[80px]">
            <Logo
              className="justify-self-center cursor-pointer"
              onClick={() => navigate("/")}
              color="#fff"
            />
            <div className="mobile-menu-button ml-auto lg:hidden">
              <MenuRoundedIcon
                style={{ color: "#fff", fontSize: "2rem", cursor: "pointer" }}
                onClick={() => setMobileMenuOpen(true)}
              />
            </div>
            <div className="nav-links flex gap-10 items-center mx-auto">
              <Link
                to="/"
                className={`uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold ${
                  isActive("/") && location.pathname === "/"
                    ? "opacity-100 font-semibold"
                    : ""
                }`}
              >
                {t("links.home")}
              </Link>
              <Link
                to="/about"
                className={`uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold ${
                  isActive("/about") ? "opacity-100 font-semibold" : ""
                }`}
              >
                {t("links.about")}
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/library"
                    className={`uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold ${
                      isActive("/library") ? "opacity-100 font-semibold" : ""
                    }`}
                  >
                    {t("links.library")}
                  </Link>
                  <Link
                    to="/posts"
                    className={`uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold ${
                      isActive("/posts") ? "opacity-100 font-semibold" : ""
                    }`}
                  >
                    {t("links.forums")}
                  </Link>
                  <Link
                    to="/academy"
                    className={`uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold ${
                      isActive("/academy") ? "opacity-100 font-semibold" : ""
                    }`}
                  >
                    {t("links.academy")}
                  </Link>
                </>
              )}

              <Link
                to="#"
                onClick={handleOpenModal}
                className="uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold"
              >
                {t("links.contacts")}
              </Link>
              <ContactModal open={isModalOpen} handleClose={handleCloseModal} />
            </div>

            <div className="nav-links flex gap-10 items-center mx-auto">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="uppercase text-sm text-white font-light hover:opacity-100 bg-[#1A184C] rounded-3xl px-5 py-3"
                >
                   {!usabilityTestingEnabled ? t("links.login") :  t("links.guest")}
                </Link>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="uppercase text-sm text-white font-light hover:opacity-100 bg-[#1A184C] rounded-3xl px-5 py-3"
                  >
                    {t("links.profile")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="uppercase text-sm text-white font-light hover:opacity-100 bg-[#1A184C] rounded-3xl px-5 py-3"
                  >
                    {t("links.logout")}
                  </button>
                </>
              )}
              <LanguageSwitch />
            </div>
          </div>
          {mobileMenuOpen && (
            <MobileMenuOverlay>
              {/* Close Button */}
              <div className="absolute top-4 right-4">
                <CloseRoundedIcon 
                  style={{ color: "#fff", fontSize: "2rem", cursor: "pointer" }}
                  onClick={() => setMobileMenuOpen(false)}
                />
              </div>
              {/* Navigation Links in Column */}
              <div className="flex flex-col gap-10 items-center">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="uppercase text-lg text-white font-medium"
                >
                  {t("links.home")}
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="uppercase text-lg text-white font-medium"
                >
                  {t("links.about")}
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to="/library"
                      onClick={() => setMobileMenuOpen(false)}
                      className="uppercase text-lg text-white font-medium"
                    >
                      {t("links.library")}
                    </Link>
                    <Link
                      to="/posts"
                      onClick={() => setMobileMenuOpen(false)}
                      className="uppercase text-lg text-white font-medium"
                    >
                      {t("links.forums")}
                    </Link>
                    <Link
                      to="/academy"
                      onClick={() => setMobileMenuOpen(false)}
                      className="uppercase text-lg text-white font-medium"
                    >
                      {t("links.academy")}
                    </Link>
                  </>
                )}
                <Link
                  to="#"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenModal();
                  }}
                  className="uppercase text-lg text-white font-medium"
                >
                  {t("links.contacts")}
                </Link>
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="uppercase text-lg text-white font-medium"
                  >
                    {t("links.login")}
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="uppercase text-lg text-white font-medium"
                    >
                      {t("links.profile")}
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="uppercase text-lg text-white font-medium"
                    >
                      {t("links.logout")}
                    </button>
                  </>
                )}
                <LanguageSwitch />
              </div>
            </MobileMenuOverlay>
          )}
        </Wrapper>
      </>
    </NavigationBar>
  );
}

export default NavBar;
