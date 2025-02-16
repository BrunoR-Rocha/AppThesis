import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Wrapper from "../general/Wrapper";
import AuthContext from "../../../context/AuthContext";
import { useTranslation, Trans } from "react-i18next";
import { ReactComponent as Logo } from "../../media/navbar/logo_moony.svg";
import FooterLogo from "../../media/footer/footer_logo.svg";

const FooterWrapper = styled("div")`
  position: relative;
  background-color: #080a2a;
  background-image: url(${FooterLogo});
  backdrop-filter: blur(5px);
  border-top: 1px solid rgba(96, 120, 223, 0.4);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  z-index: 10;
  padding: 20px 0;
  margin: 5px;
  border-radius: 8px;
  padding-top: 60px;
`;

function Footer() {
  const { t } = useTranslation();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <FooterWrapper className="min-h-[300px] md:min-h-[600px] bg-no-repeat bg-right">
      <Wrapper>
        <div className="flex flex-col h-full w-full justify-between gap-5">
          <div className="flex flex-col md:flex-row w-full items-center justify-between text-white mt-auto">
            <div className="flex flex-col md:flex-row items-start gap-10 w-full justify-between relative">
              <div className="md:basis-2/5 flex justify-end flex-wrap flex-col gap-3 text-start">
                {/* <h4 className="text-2xl md:text-3xl text-white font-semibold font-sans">
                  <Trans
                    i18nKey="footer.title"
                    components={{
                      strong: (
                        <span className="font-medium text-5xl font-cormorant italic" />
                      ),
                      br: <br />,
                      small: (
                        <span className="font-sans text-2xl md:text-3xl" />
                      ),
                    }}
                  />
                </h4> */}
                <Logo />
                <p className="text-white font-normal text-base">
                  {t("footer.title")}
                </p>

                <p className="text-white font-normal text-base">
                  {t("footer.slogan")}
                </p>
              </div>

              {/* <div className="md:basis-2/5 flex justify-end w-9/12 md:w-full flex-wrap flex-col gap-3 text-start">
                <h4 className="text-2xl font-semibold">
                  {t("footer.explore")}
                </h4>
                <Link to="/" className="flex justify-start">
                  {t("links.home")}
                </Link>
                <Link to="/about" className="flex justify-start">
                  {t("links.about")}
                </Link>
                {isAuthenticated && (
                  <>
                    <Link to="/library" className="flex justify-start">
                      {t("links.library")}
                    </Link>
                    <Link to="/posts" className="flex justify-start">
                      {t("links.forums")}
                    </Link>
                    <Link to="/academy" className="flex justify-start">
                      {t("links.academy")}
                    </Link>
                  </>
                )}
              </div> */}

              <div className="md:basis-1/5 flex justify-end w-9/12 md:w-full flex-wrap flex-col gap-3 text-end self-end md:self-auto">
                <h4 className="text-xl font-semibold">Links</h4>

                <Link to="/privacy-policy" className="flex justify-end">
                  {t("footer.privacy")}
                </Link>

                <Link to="/terms-conditions" className="flex justify-end">
                  {t("footer.terms")}
                </Link>

                <a
                  href="https://www.livroreclamacoes.pt/Inicio/"
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className="flex justify-end"
                >
                  {t("footer.suggestions")}
                </a>
                <a
                  href="#"
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className="flex justify-end"
                >
                  {t("footer.reports")}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap md:flex-nowrap justify-start">
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
