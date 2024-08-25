import React from "react";
import { Card, CardContent, CardMedia } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ExampleImage from "../../../media/academy/courses/example.png";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { Link } from "react-router-dom";

const Courses = () => {
  const slides = [
    {
      id: 1,
      title: "Course 1",
      description: "This is course 1",
      difficulty: "easy",
    },
    {
      id: 2,
      title: "Course 2",
      description: "This is course 1",
      difficulty: "intermediate",
    },
    {
      id: 3,
      title: "Course 3",
      description: "This is course 1",
      difficulty: "hard",
    },
    {
      id: 4,
      title: "Course 4",
      description: "This is course 1",
      difficulty: "expert",
    },
  ];

  const totalSlides = slides.length;

  function SampleArrow(props) {
    const { onClick, side } = props;

    return (
      <div
        className={`absolute flex justify-center top-1/2 ${
          side === "next" ? "right-6" : ""
        } transform translate-x-1/2 w-12 h-12 rounded-full border-[1px] border-solid border-[#AAAAAA] ${
          side === "prev" ? "rotate-180" : ""
        } z-50 cursor-pointer`}
        onClick={onClick}
      >
        <div className="flex items-center justify-center">
          <EastRoundedIcon sx={{ color: "#E9F0FF" }} />
        </div>
      </div>
    );
  }

  const settings = {
    infinite: true, // Enables seamless looping
    centerMode: true,
    slidesToShow: totalSlides >= 5 ? 5 : totalSlides > 2 ? 3 : totalSlides,
    speed: 500,
    centerPadding: "0px",
    focusOnSelect: true,
    beforeChange: (current, next) => setActiveSlide(next),
    nextArrow: <SampleArrow side="next" />,
    prevArrow: <SampleArrow side="prev" />,
  };

  const [activeSlide, setActiveSlide] = React.useState(0);

  const prevIndex1 = activeSlide === 0 ? totalSlides - 1 : activeSlide - 1;
  const prevIndex2 =
    totalSlides > 5 && prevIndex1 === 0 ? totalSlides - 1 : prevIndex1 - 1;

  const nextIndex1 = activeSlide === totalSlides - 1 ? 0 : activeSlide + 1;
  const nextIndex2 =
    totalSlides > 5 && nextIndex1 === totalSlides - 1 ? 0 : nextIndex1 + 1;

  const getClassNames = (index) => {
    let className = `px-2 transform transition-transform duration-300 relative ${
      index === activeSlide ? "z-30" : "scale-90"
    }`;

    if (totalSlides > 2) {
      className += `${
        index === prevIndex1 ? " translate-x-14 -rotate-6 z-20" : ""
      } ${index === nextIndex1 ? "-translate-x-14 rotate-6 z-20" : ""}`;
    }

    if (totalSlides > 5) {
      className += `${
        index === prevIndex2 ? " translate-x-40 -rotate-12 z-10" : ""
      } ${index === nextIndex2 ? "-translate-x-40 rotate-12 z-10" : ""}`;
    }

    return className;
  };

  const getScaleValues = (index) => {
    let scaleValue = 1;
    if (index === prevIndex1 || index === nextIndex1) {
      scaleValue = 0.9;
    } else if (
      totalSlides > 5 &&
      (index === prevIndex2 || index === nextIndex2)
    ) {
      scaleValue = 0.8;
    }
    return scaleValue;
  };

  return (
    <div className="relative max-w-full mx-auto my-auto ">
      <Slider {...settings} className="h-full min-h-96 flex items-center">
        {slides.map((slide, index) => (
          <div key={slide.id} className={getClassNames(index)}>
            <Card
              sx={{
                minHeight: "22rem",
                backgroundColor: "#6078DF40",
                filter: activeSlide === index ? "none" : "grayscale(100%)",
                transform: `scale(${getScaleValues(index)})`,
                transition:
                  "transform 0.5s ease, filter 0.5s ease, , background-color 0.5s ease-in-out",
                padding: "0px",
                zIndex: activeSlide === index ? 3 : 1,
                position: "relative",
                backdropFilter: "blur(40px)",
                border: "1px solid #6078DF",
                borderRadius: "10px",
                cursor: "pointer",
                "&:hover":
                  activeSlide === index
                    ? {
                        backgroundColor: "#6078DF99",
                        backdropFilter: "blur(40px)",
                      }
                    : {},
                "&:hover .zoom-image":
                  activeSlide === index
                    ? {
                        transform: "scale(1.1)", // Image zoom-in effect only if this slide is active
                      }
                    : {},
              }}
            >
              <div className=" absolute left-8 top-8 max-w-fit rounded-full bg-[#FFFFFF40] shadow-md shadow-[#2b00d40f] px-4 py-2 z-[5]">
                <span className="capitalize text-white text-xs font-medium">
                  {slide.difficulty}
                </span>
              </div>
              <CardMedia
                sx={{
                  height: "12rem",
                  width: "100%",
                  transition: "transform 0.5s ease",
                }}
                className="card-image"
                image={ExampleImage}
                title={slide.title}
              />
              <CardContent>
                <div className="flex flex-col gap-7">
                  {activeSlide === index ? (
                    <Link
                      to={"/academy/course/" + slide.id}
                      className="text-white font-semibold text-3xl"
                    >
                      {slide.title}
                    </Link>
                  ) : (
                    <h5 className="text-white font-semibold text-3xl">
                      {slide.title}
                    </h5>
                  )}
                  <p className="text-[#ECECEC] text-base font-normal">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores.
                  </p>
                  <div className="flex items-start gap-3 text-[#ECECEC] ">
                    <div className="flex gap-1">
                      <FolderOpenRoundedIcon sx={{ color: "#6078DF" }} />
                      <span> 3 sections</span>
                    </div>
                    <div className="flex gap-1">
                      <AccessTimeRoundedIcon sx={{ color: "#6078DF" }} />
                      <span> 4 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Courses;
