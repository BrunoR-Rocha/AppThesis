import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosConfig from "../../../../../providers/axiosConfig";
import { QuizArea } from "../../style/academy_style";
import Wrapper from "../../../../components/general/Wrapper";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomRating from "../../../../components/forms/Rating";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseRating = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {

      await axiosConfig.post(`/front/courses/${id}/rating`, {
        rating: data.rating,
        comment: data.comment,
      });

      toast.success("Thank you for rating the course!");
      navigate(`/academy/course/${id}`);
    } catch (error) {
      toast.error(error.message ?? "Failed to submit rating. Please try again.");
      navigate("/academy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <QuizArea>
        <Wrapper>
          <div className="pt-20 md:pt-40 text-white flex items-center justify-center flex-col gap-20">
            <h3 className="text-[#ECECEC] text-3xl font-semibold">
              Rate this course
            </h3>
            <div>
              <CustomRating
                minValue={1}
                maxValue={5}
                onRatingSelect={(value) => setValue("rating", value)}
              />
            </div>
            <h4 className="text-[#ECECEC] text-xl font-semibold">
              Please give us your honest feedback
            </h4>
            <div className="w-full md:w-1/2">
              <div className="border-[1px] border-[#FFFFFF26] border-solid bg-[#201F41] rounded-md p-4 flex flex-col gap-4">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex-1 flex flex-col w-full z-[1] gap-4"
                >
                  <div className="flex flex-col w-full">
                    <textarea
                      id="post_comment"
                      className="bg-transparent"
                      placeholder="Write your opinion"
                      {...register("comment", { required: true })}
                      rows={5}
                    />
                    {errors.comment && (
                      <span className="text-xs text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#FFFFFF] rounded-full px-3 py-1 text-[#F4AA5A] text-sm font-semibold capitalize cursor-pointer flex justify-center items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Wrapper>
      </QuizArea>
    </>
  );
};

export default CourseRating;
