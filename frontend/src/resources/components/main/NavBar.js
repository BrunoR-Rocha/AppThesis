import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate, matchPath } from "react-router-dom";
import { ReactComponent as Logo } from "../../media/navbar/logo_moony.svg";
import Wrapper from "../general/Wrapper";
import ContactModal from "../modals/contact";

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
    font-size: 15px;
    line-height: 16px;
  }
  &.scrolled {
    backdrop-filter: blur(5px);
  }
  & .nav-links {
    display: none;
  }
  @media (min-width: 1024px) {
    & .nav-links {
      display: flex;
    }
  }

  & .mobilenavigation {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

function NavBar() {
  const [scrolled, setScrolled] = useState();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const location = useLocation();

  const isActive = (path) => {
    return matchPath({ path, end: false }, location.pathname);
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
            <div className="nav-links flex gap-10 items-center mx-auto">
              <Link
                to="/"
                className={`uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold ${
                  isActive("/") && location.pathname === "/"
                    ? "opacity-100 font-semibold"
                    : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold ${
                  isActive("/about") ? "opacity-100 font-semibold" : ""
                }`}
              >
                About
              </Link>
              <Link
                to="/library"
                className={`uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold ${
                  isActive("/library") ? "opacity-100 font-semibold" : ""
                }`}
              >
                Library
              </Link>
              <Link
                to="/posts"
                className={`uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold ${
                  isActive("/posts") ? "opacity-100 font-semibold" : ""
                }`}
              >
                Forums
              </Link>

              <Link
                to="/academy"
                className={`uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold ${
                  isActive("/academy") ? "opacity-100 font-semibold" : ""
                }`}
              >
                Academy
              </Link>
              <Link
                to="#"
                onClick={handleOpenModal}
                className="uppercase text-sm text-white font-light hover:opacity-100 hover:font-semibold"
              >
                Contact Us
              </Link>
              <ContactModal open={isModalOpen} handleClose={handleCloseModal} />
            </div>

            <div className="nav-links flex gap-10 items-center mx-auto">
              <Link
                to="/login"
                className="uppercase text-sm text-white font-light hover:opacity-100 bg-[#1A184C] rounded-3xl px-5 py-3"
              >
                Sign In
              </Link>
            </div>
          </div>
        </Wrapper>
      </>
    </NavigationBar>
  );
}

export default NavBar;
