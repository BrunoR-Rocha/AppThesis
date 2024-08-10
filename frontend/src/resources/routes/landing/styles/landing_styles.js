import styled from "styled-components";
import BackgroundBg from "../../../media/landing/background.png";

export const HeroArea = styled("div")`
  width: 100%;
  height: 75vh;
`;

export const HeroCaption = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const QuoteArea = styled("div")`
  position: relative;
  z-index: 1;
  width: 100%;
`;

export const LandingArea = styled("div")`
    width: 100%;
    background-image: url(${BackgroundBg});
    background-size: cover;
`;

export const ProblemArea = styled("div")`
    width: 100%;
    height: 75vh;
`;