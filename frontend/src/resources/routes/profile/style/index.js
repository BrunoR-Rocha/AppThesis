import styled from "styled-components";
import GeneralBg from "../../../media/about/background.png";
import GeneralShowBg from "../../../media/general/bg_gradient.png";

export const ProfileArea = styled("div")`
  width: 100%;
  height: 100vh;
  background-image: url(${GeneralBg});
  background-size: cover;
`;

export const ProfileDisplay = styled("div")`
  width: 100%;
  background-image: url(${GeneralShowBg});
  background-size: cover;
`;