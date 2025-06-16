import React, { useEffect, useState } from "react";
import {
  AboutArea,
  AboutCaption,
  AboutHero,
  FaqArea,
  AccordionItem,
  AccordionItemDescription,
  TeamArea,
  TeamCaption,
  TeamCard,
  TeamMemberImage,
  TeamMemberInfo,
  TeamMemberName,
  TeamMemberSocial,
} from "./styles/landing_styles";
import Wrapper from "../../components/general/Wrapper";
import { ReactComponent as HeroLogo } from "../../media/about/moony_about_us.svg";
import { ReactComponent as Linkedin } from "../../media/general/LinkedIn.svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Member_1 from "../../media/team/member1.svg";
import Member_2 from "../../media/team/member2.svg";
import Member_3 from "../../media/team/member3.svg";
import axiosConfig from "../../../providers/axiosConfig";
import { Accordion, CircularProgress } from "@mui/material";
import ContactModal from "../../components/modals/contact";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function About() {
  const [faqs, setFaqs] = useState();
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, i18n} = useTranslation();
  const currentLanguage = i18n.language;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/front/faqs`, {
        params: {
          locale: currentLanguage,
        },
      })
      .then((res) => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentLanguage]);

  return (
    <>
      <AboutArea className="min-h-[900px] md:min-h-max pb-20 px-5 md:px-0">
        <AboutHero className="flex items-center flex-wrap md:flex-nowrap">
          <HeroLogo className="absolute md:relative max-h-[500px] md:max-h-[900px] max-w-full md:max-w-screen-lg z-[-1] md:z-0 top-0 sm:top-auto left-0 sm:left-auto" />
          <Wrapper className="mt-72 md:mt-40 mb-20 lg:mt-0 md:mb-0">
            <div className="flex flex-col items-center justify-items-center gap-5 flex-grow">
              <div className="flex xl:flex-row flex-col items-center w-full">
                <AboutCaption className="basis-3/4 gap-3 sm:gap-10">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold font-sans">
                    {t("about.title")}
                  </h1>
                  <div>
                    <p
                      className="text-base font-medium text-white"
                      dangerouslySetInnerHTML={{
                        __html: t("about.description"),
                      }}
                    ></p>
                  </div>
                </AboutCaption>
              </div>
            </div>
          </Wrapper>
        </AboutHero>

        <TeamArea>
          <TeamCaption> {t("about.team.title")}</TeamCaption>
          <div className="w-11/12 mx-auto md:w-full flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-10">
            <TeamCard>
              <TeamMemberInfo>
                <TeamMemberImage src={Member_1} alt="Team member Bruno"/>
                <TeamMemberName>Bruno Rocha</TeamMemberName>
                <p className="mx-5">
                  Informatics Engineer Masters Student and Full-Stack Developer
                </p>
                <TeamMemberSocial
                  href={"linkedin.com/in/bruno-rocha-3a48651a3"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find more about Bruno"
                >
                  <Linkedin />
                </TeamMemberSocial>
              </TeamMemberInfo>
            </TeamCard>
            <TeamCard>
              <TeamMemberInfo>
                <TeamMemberImage src={Member_2} alt="Team member Morgado"/>
                <TeamMemberName>Morgado Dias</TeamMemberName>
                <p className="mx-5">
                  Project Coordinator and Associate Professor at the University
                  of Madeira
                </p>
                <TeamMemberSocial
                  href={"https://www.linkedin.com/in/morgado-dias-b631883/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find more about Morgado"
                >
                  <Linkedin />
                </TeamMemberSocial>
              </TeamMemberInfo>
            </TeamCard>
            <TeamCard>
              <TeamMemberInfo>
                <TeamMemberImage src={Member_3} alt="Team member Fábio"/>
                <TeamMemberName>Fábio Mendonça</TeamMemberName>
                <p className="mx-5">
                  Project Co-Coordinator and ITI/Larsys Investigator
                </p>
                <TeamMemberSocial
                  href={"https://www.linkedin.com/in/fábio-mendonça/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find more about Fábio"
                >
                  <Linkedin />
                </TeamMemberSocial>
              </TeamMemberInfo>
            </TeamCard>
          </div>
        </TeamArea>
        <FaqArea>
          <Wrapper>
            <div className="flex flex-col items-center justify-center gap-10">
              <h3 className="text-3xl md:text-4xl lg:text-6xl">FAQ's</h3>

              <div className="flex flex-col gap-5 w-full lg:w-4/6">
                {loading ? (
                  <CircularProgress
                    className="mx-auto"
                    sx={{ color: "#FFF" }}
                  />
                ) : (
                  faqs &&
                  faqs.map((faq, index) => {
                    return (
                      <Accordion
                        slotProps={{
                          transition: { unmountOnExit: true },
                        }}
                        key={index}
                        sx={{
                          color: "white",
                          backgroundColor: "transparent",
                          boxShadow: "none",
                        }}
                        expanded={expanded === "faq_" + index}
                        onChange={handleChange("faq_" + index)}
                      >
                        <AccordionItem
                          // expanded={expanded === "faq_" + index}
                          expandIcon={
                            expanded === "faq_" + index ? (
                              <RemoveIcon sx={{ color: "#6078DF" }} />
                            ) : (
                              <AddIcon sx={{ color: "#6078DF" }} />
                            )
                          }
                          sx={{
                            paddingBlock: "10px",
                            borderRadius:
                              expanded === "faq_" + index
                                ? "20px 20px 0 0"
                                : "20px",
                            border: "2px solid #1A184C",
                            borderBottom:
                              expanded === "faq_" + index
                                ? "none"
                                : "2px solid #1A184C",
                            background:
                              expanded === "faq_" + index
                                ? "rgba(96, 120, 223, 0.5)"
                                : "rgba(26, 24, 76, 0.25)",
                          }}
                        >
                          <p>{faq.title}</p>
                        </AccordionItem>
                        <AccordionItemDescription
                          sx={{
                            borderRight: "2px solid #1A184C",
                            borderLeft: "2px solid #1A184C",
                            borderTop: "none",
                          }}
                        >
                          <p dangerouslySetInnerHTML={{ __html: faq.body }}></p>
                        </AccordionItemDescription>
                      </Accordion>
                    );
                  })
                )}
              </div>

              <div className="flex flex-col gap-3 justify-center">
                <p className="text-lg font-normal text-center">
                  {t("contacts.helper")}
                </p>
                <Link
                  className="text-[#F4AA5A] text-lg font-semibold text-center hover:underline"
                  to={"#"}
                  onClick={() => handleOpenModal()}
                >
                  {t("contacts.link")}
                </Link>
                <ContactModal
                  open={isModalOpen}
                  handleClose={handleCloseModal}
                />
              </div>
            </div>
          </Wrapper>
        </FaqArea>
      </AboutArea>
    </>
  );
}

export default About;
