import styled from "styled-components";
import GeneralBg from "../../../media/about/background.png";
import GeneralShowBg from "../../../media/general/bg_gradient.png";

export const BannerArea = styled("div")`
  width: 100%;
  min-height: 100vh;
  background-image: url(${GeneralBg});
  background-size: cover;
`;

export const BannerDisplay = styled("div")`
  width: 100%;
  background-image: url(${GeneralShowBg});
  background-size: cover;
`;