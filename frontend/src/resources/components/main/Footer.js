import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Wrapper from "../general/Wrapper";

const FooterWrapper = styled("div")`
  position: relative;
  background-color: #8373e8;
  backdrop-filter: blur(5px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  min-height: 20vh;
  z-index: 10;
  padding: 20px 0;
  margin: 5px;
  border-radius: 8px;
  padding-top: 60px;
`;


function Footer() {
  return (
    <FooterWrapper>
      <Wrapper>
        <div className="flex flex-col h-full w-full justify-between gap-5">
          <div className="flex flex-col md:flex-row w-full items-center justify-between text-white mt-auto">
            <div className="flex flex-col md:flex-row items-start gap-10 w-full justify-center">
              <div className="md:basis-2/5 flex justify-end flex-wrap flex-col gap-3 text-start">
                <h4 className="text-2xl md:text-3xl text-white font-semibold font-sans">
                  Awaken your{" "}
                  <span class="font-medium text-5xl font-cormorant italic">
                    sleep <br />
                    <span className="font-sans text-2xl md:text-3xl">
                      &
                    </span>{" "}
                    health
                  </span>{" "}
                  Knowledge
                </h4>

                <p className="text-white font-normal text-base">
                  Join us now and learn something new today!
                </p>
              </div>

              <div className="md:basis-2/5 flex justify-end w-9/12 md:w-full flex-wrap flex-col gap-3 text-start">
                <h4 className="text-2xl font-semibold">Explore</h4>
                <Link to="/" className="flex justify-start">
                  Home
                </Link>
                <Link to="/about" className="flex justify-start">
                  About
                </Link>
                <Link to="/library" className="flex justify-start">
                  Library
                </Link>
                <Link to="/posts" className="flex justify-start">
                  Forums
                </Link>
                <Link to="/academy" className="flex justify-start">
                  Academy
                </Link>
              </div>

              <div className="md:basis-1/5 flex justify-end w-9/12 md:w-full flex-wrap flex-col gap-3 text-start">
                <h4 className="text-2xl font-semibold">Moony</h4>

                <Link to="/privacy-policy" className="flex justify-start">
                  Privacy Policy
                </Link>

                <Link to="/terms-conditions" className="flex justify-start">
                  Terms and conditions
                </Link>

                <a
                  href="https://www.livroreclamacoes.pt/Inicio/"
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className="flex justify-start"
                >
                  Compliments, suggestions and complaints
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap md:flex-nowrap justify-center">
            <p className="text-white text-center text-sm">
              Copyright © 2024 Moony Project
            </p>
          </div>
        </div>
      </Wrapper>
    </FooterWrapper>
  );
}

export default Footer;
