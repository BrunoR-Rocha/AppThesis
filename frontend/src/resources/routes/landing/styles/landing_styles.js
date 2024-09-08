import styled from "styled-components";
import BackgroundBg from "../../../media/landing/background.png";
import FeatureBg from "../../../media/landing/feature_bg.svg";

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

export const FeatureArea = styled("div")`
  width: 100%;
  padding-top: 60px;
  padding-bottom: 120px;
  background-image: url(${FeatureBg});
  background-repeat: no-repeat;
  background-position: center;
`;

export const ToolsArea = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-block: 80px;
  margin-bottom: 80px;
`;
