import styled from "styled-components";
import AboutBackgroundBg from "../../../media/about/background.png";

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export const AboutArea = styled("div")`
  width: 100%;
  background-image: url(${AboutBackgroundBg});
  background-size: cover;
`;

export const AboutHero = styled("div")`
  width: 100%;
  height: 100%;
`;

export const AboutCaption = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  text-align: start;
`;

export const TeamArea = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  gap: 70px;
  margin-bottom: 100px;
`;

export const TeamCaption = styled("h3")`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
`;

export const TeamCard = styled("div")`
  width: 100%;
  display: flex;
  flex-basis: 25%;
  border-radius: 10px;
  border: 1px solid #6078DF;
  background: rgba(96, 120, 223, 0.15);
  backdrop-filter: blur(30px);
  
  :hover {
    background: rgba(96, 120, 223, 0.30);
    transition: 800ms ease;
  }
`;

export const TeamMemberInfo = styled("div")`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 40px;
`;

export const TeamMemberName = styled("p")`
  color: white;
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-transform: uppercase;
`;

export const TeamMemberImage = styled('img')`
  max-width: 220px;
  max-height: 220px;
  flex-shrink: 0;
  border-radius: 200px;
`;

export const TeamMemberSocial = styled("a")`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 69px;
  background: rgba(96, 120, 223, 0.35);
  backdrop-filter: blur(8px);

  &:hover {
    background: #6078DF;
  }
`;

export const FaqArea = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 70px;
  padding-top: 100px;
  color: white;
`;

export const FaqItem = styled(AccordionSummary)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
 
`;

export const FaqItemDescription = styled(AccordionDetails)`
  border-top: 2px solid #1A184C;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: rgba(96, 120, 223, 0.5);
  color: "white";
  padding: "16px";
  transition: "all 0.3s ease";
`;
