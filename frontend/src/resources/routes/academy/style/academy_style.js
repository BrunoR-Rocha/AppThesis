import styled from "styled-components";
import GeneralBg from "../../../media/about/background.png";
import CourseShowBg from "../../../media/academy/courses/course_show_bg.png";

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
  height: 100vh;
  background-image: url(${GeneralBg});
  background-size: cover;
`;

export const CourseDisplay = styled("div")`
  width: 100%;
  background-image: url(${CourseShowBg});
  background-size: cover;
`;
