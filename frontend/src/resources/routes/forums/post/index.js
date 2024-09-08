import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import axiosConfig from "../../../../providers/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const PostSection = ({ isOpen, onClose, posts_count, thread }) => {
  const [loading, setLoading] = useState();
  const [loadingComments, setLoadingComments] = useState();
  const [comments, setComments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const formData = {
      ...data,
      forum_thread_id: thread.id,
    };

    setLoading(true);

    axiosConfig
      .post(`/front/post/comment`, formData)
      .then((res) => {
        setLoading(false);
        reset();
        toast.success(res.data.message);

        const newComment = res.data.comment;
        setComments((prevComments) => [...prevComments, newComment]);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoadingComments(true);

    axiosConfig
      .get(`/front/comments/` + thread.id)
      .then((res) => {
        setLoadingComments(false);
        setComments(res.data);
      })
      .catch((err) => {
        setLoadingComments(false);
      });
  }, [thread]);

  return (
    <div
      className={`fixed top-20 right-0 h-full w-1/3 bg-[#1A184C] transform transition-transform duration-300 z-[1000] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="py-5 px-6">
        <div className="flex justify-between items-center">
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-white">
              Comments ({comments.length})
            </h2>
          </div>
          <div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border-2 border-solid border-[#AAAAAA] group hover:border-[#F4AA5A]"
            >
              <ClearIcon
                sx={{
                  color: "#AAAAAA",
                  ".group:hover &": {
                    color: "#F4AA5A",
                  },
                }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-5 px-6 gap-4">
        <div className="border-[1px] border-[#FFFFFF26] border-solid bg-[#201F41] rounded-md p-4 flex flex-col gap-4">
          <p className="text-white font-semibold">User Name and picture </p>
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
        <div className="flex flex-col overflow-y-auto max-h-[50vh] scrollbar-hide">
          {comments &&
            comments.map((comment) => (
              <div className="border-b-[1px] border-b-[#FFFFFF26] border-b-solid flex flex-col gap-3 py-5">
                <div className="">
                  <p className="text-white font-semibold">{comment.author}</p>
                  <p className="text-white text-sm font-normal">
                    {moment(comment.created_at).fromNow()}
                  </p>
                </div>
                <div>
                  <p className="text-[#ECECEC] text-base font-normal">
                    {comment.body}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <ThumbUpAltOutlinedIcon />
                    <span>1</span>
                  </div>
                  <p className="font-medium text-[#ECECEC] text-base">Reply</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostSection;
