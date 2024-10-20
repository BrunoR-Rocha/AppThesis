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

function About() {
  const [faqs, setFaqs] = useState();
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      .get(`/front/faqs`)
      .then((res) => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <AboutArea className="min-h-[900px] md:min-h-max pb-20">
        <AboutHero className="flex items-center flex-wrap md:flex-nowrap">
          <HeroLogo className="absolute md:relative md:max-h-[900px] max-w-full md:max-w-screen-lg z-[-1] md:z-0" />
          <Wrapper className="mt-40 mb-20 md:mt-0 md:mb-0">
            <div className="flex flex-col items-center justify-items-center gap-5 flex-grow">
              <div className="flex xl:flex-row flex-col items-center w-full">
                <AboutCaption className="basis-3/4 gap-3 sm:gap-10">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold font-sans">
                    About us
                  </h1>
                  <div>
                    <p className="text-base font-medium text-white">
                      Moony is a platform dedicated to e-learning of sleep and
                      its mechanisms. It provides an overview of the basic
                      science, suggests clinical implications from those basic
                      sciences, and delivers a user experience that integrates
                      these two aspects into one cohesive learning package.
                    </p>
                    <p className="text-base font-medium text-white">
                      The platform provides scientifically-based insights about
                      sleep to the user. The main goal of Moony is to give an
                      easy access to users that want to learn about the topic
                      and also collaborate with experts around the globe.
                    </p>
                  </div>
                </AboutCaption>
              </div>
            </div>
          </Wrapper>
        </AboutHero>

        <TeamArea>
          <TeamCaption>Meet the Team behind Moony </TeamCaption>
          <div className="w-11/12 mx-auto md:w-full flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-10">
            <TeamCard>
              <TeamMemberInfo>
                <TeamMemberImage src={Member_1} />
                <TeamMemberName>Bruno Rocha</TeamMemberName>
                <p className="mx-5">
                  Computer Science Masters Student and Full-Stack Developer
                </p>
                <TeamMemberSocial
                  href={"#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin />
                </TeamMemberSocial>
              </TeamMemberInfo>
            </TeamCard>
            <TeamCard>
              <TeamMemberInfo>
                <TeamMemberImage src={Member_2} />
                <TeamMemberName>Morgado Dias</TeamMemberName>
                <p className="mx-5">
                  Project Coordinator and Associate Professor at the University
                  of Madeira
                </p>
                <TeamMemberSocial
                  href={"#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin />
                </TeamMemberSocial>
              </TeamMemberInfo>
            </TeamCard>
            <TeamCard>
              <TeamMemberInfo>
                <TeamMemberImage src={Member_3} />
                <TeamMemberName>Fábio Mendonça</TeamMemberName>
                <p className="mx-5">
                  Project Co-Coordinator and ITI/Larsys Investigator
                </p>
                <TeamMemberSocial
                  href={"#"}
                  target="_blank"
                  rel="noopener noreferrer"
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
                          expanded={expanded === "faq_" + index}
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
                          {faq.body}
                        </AccordionItemDescription>
                      </Accordion>
                    );
                  })
                )}
              </div>

              <div className="flex flex-col gap-3 justify-center">
                <p className="text-lg font-normal text-center">
                  Couldn’t find what you were looking for?
                </p>
                <Link
                  className="text-[#F4AA5A] text-lg font-semibold text-center hover:underline"
                  to={"#"}
                  onClick={() => handleOpenModal()}
                >
                  Contact our team
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
