import styled from "styled-components";
import GeneralBg from "../../../media/about/background.webp";
import CourseShowBg from "../../../media/general/bg_gradient.png";
import QuizBg from "../../../media/academy/quizzes/quiz_bg.svg";

export const AcademyArea = styled("div")`
  width: 100%;
  background-image: url(${GeneralBg});
  background-size: cover;
`;

export const AcademyList = styled("div")`
  width: 100%;
  padding-block: 120px;
`;

export const CourseArea = styled("div")`
  width: 100%;
  min-height: 100vh;
  background-image: url(${GeneralBg});
  background-size: cover;
`;

export const CourseDisplay = styled("div")`
  width: 100%;
  background-image: url(${CourseShowBg});
  background-size: cover;
`;

export const QuizArea = styled("div")`
  width: 100%;
  height: 100vh;
  background-image: url(${QuizBg});
  background-color: #040a15;
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const QuizOption = styled("div")`
  border-radius: 10px;
  display: flex;
  flex-grow: 1;
  border: 1px solid #6078df;
  background-color: ${({ selected }) => (selected ? "#6078df" : "#6078DF26")};
  backdrop-filter: blur(40px);
  padding: 24px;
  align-items: center;
  gap: 24px;
  &:hover {
    border: 1px solid #6078df;
    background-color: #6078df;
    cursor: pointer;
  }
`;

export const CourseText = styled("p")`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  align-self: stretch;
  * {
    color: #fff !important;
    line-height: 24px !important;
  }
`;
