import styled from "styled-components";
import GeneralBg from "../../../media/about/background.png";
import GeneralShowBg from "../../../media/general/bg_gradient.png";
import CourseBg from "../../../media/academy/courses/CourseBg.png";

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

export const QuizDashboardComponent = styled("div")`
  display: flex;
  flex-grow: 1;
  align-items: center;
  backdrop-filter: blur(30px);
  background-color: #6078df26;
  padding: 28px;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid #6078df;
`;

export const CourseCard = styled("div")`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #6078df;
  background: linear-gradient(
      0deg,
      rgba(18, 6, 108, 0.15) 0%,
      rgba(18, 6, 108, 0.15) 100%
    ),
    url(${CourseBg}) lightgray 0px -67.38px / 178.894% 254.786% no-repeat;
`;
