import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { TextInput } from "../styles/contact";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axiosConfig from "../../../providers/axiosConfig";

function PostModal({ open, handleClose }) {
  const [loading, setLoading] = useState();
  const [topics, setTopics] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    handleClose();
  };

  useEffect(() => {
    // Fetch topics from the API
    axiosConfig
      .get("/front/post/category")
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        toast.error("There was an error fetching the topics!");
      });
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xl"}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: "100%",
          padding: "0px",
          backgroundColor: "#E9F0FF",
          borderRadius: "10px",
          overflow: "visible",
          position: "relative",
        }}
      >
        <div className="flex justify-between px-12 pt-12 pb-4">
          <h2 className="text-4xl text-[#1A184C] font-bold flex-1">
            Share your{" "}
            <span className="font-cormorant text-5xl italic">opinion!</span>
          </h2>
          <Link
            onclick={() => navigate(-1)}
            className="border-[#A5A6CC] hover:border-[#F4AA5A] border-2 border-solid rounded-full p-3 group"
            onClick={handleClose}
          >
            <CloseIcon
              sx={{
                color: "#A5A6CC",
                ".group:hover &": {
                  color: "#F4AA5A",
                },
              }}
            />
          </Link>
        </div>
        <div className="flex w-full h-full relative overflow-hidden px-12 pb-12 gap-10 items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex-col w-full z-[1]"
          >
            <div className="flex flex-1 w-full gap-6">
              <div className="flex flex-col basis-1/2 w-full gap-6">
                <TextInput>
                  <label htmlFor="post_topic">Topic</label>
                  <select
                    id="post_topic"
                    {...register("topic", { required: true })}
                    className="border p-2 rounded"
                  >
                    <option value="">Select a topic</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                  {errors.topic && (
                    <span className="text-xs text-red-500">
                      This field is required
                    </span>
                  )}
                </TextInput>
                <TextInput>
                  <label htmlFor="post_description">Name</label>
                  <textarea
                    id="post_description "
                    placeholder="Write here"
                    {...register("description", { required: true })}
                    rows={5}
                  />
                  {errors.description && (
                    <span className="text-xs text-red-500">
                      This field is required
                    </span>
                  )}
                </TextInput>
              </div>
              <div className="flex flex-col basis-1/2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="image_upload">Add an image</label>
                  <input
                    id="image_upload"
                    type="file"
                    accept="image/*"
                    onChange={() => console.log("here")}
                    className="border p-2 rounded"
                    {...register("image", { required: true })}
                  />
                  {errors.image && (
                    <span className="text-xs text-red-500">
                      This field is required
                    </span>
                  )}
                  {selectedImage && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Preview"
                        className="h-40 w-40 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-[#6078DF] rounded-full p-3 text-white cursor-pointer flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Share Post"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostModal;
