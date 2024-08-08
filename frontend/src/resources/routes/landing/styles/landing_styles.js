import styled from "styled-components";
import HeroBg from "../../../media/landing/hero_img.png";

export const HeroArea = styled("div")`
  width: 100%;
  /* height: 105vh; */
  max-height: 1080px;
  background-image: url(${HeroBg});
  background-size: cover;
`;

export const HeroCaption = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
