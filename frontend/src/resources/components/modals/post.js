import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { TextInput } from "../styles/contact";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axiosConfig from "../../../providers/axiosConfig";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

function PostModal({ open, handleClose, onAddThread}) {
  const [loading, setLoading] = useState();
  const [topics, setTopics] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {

    const formData = new FormData();

    for (const key in data) {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    }

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await axiosConfig.post("/front/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onAddThread(response.data.thread);
      toast.success(response.data.message);
      reset();
      handleClose();
      setSelectedImage(null);
    
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    axiosConfig
      .get("/front/post/category")
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        toast.error("There was an error fetching the topics!");
      });
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setValue("image", e.target.files);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("image_upload").click();
  };

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
            onClick={() => navigate(-1)}
            className="border-[#A5A6CC] hover:border-[#F4AA5A] border-2 border-solid rounded-full p-3 group"
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
            <div className="flex flex-1 w-full gap-6 flex-wrap lg:flex-nowrap">
              <div className="flex flex-col basis-full lg:basis-1/2 w-full gap-6">
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
                  <label htmlFor="post_title">Title</label>
                  <input
                    id="post_title"
                    placeholder="Write here"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
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
              <div className="flex flex-col basis-full lg:basis-1/2 gap-6">
                <div className="flex flex-col flex-1">
                  <div className="flex gap-4 bg-white py-6 items-center flex-wrap-reverse lg:flex-nowrap rounded-lg flex-1 px-12">
                    <div className="flex basis-1/2 flex-wrap lg:flex-nowrap">
                      {selectedImage ? (
                        <div className="mt-2">
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Preview"
                            className="bg-[#F5F7FA] min-w-40 min-h-40 flex items-center justify-center rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="mt-2 bg-[#F5F7FA] min-w-40 min-h-40 flex items-center justify-center rounded-lg">
                          <InsertPhotoOutlinedIcon
                            sx={{ height: "80px", width: "80px" }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col basis-1/2 lg:h-full justify-around">
                      <div>
                        <label
                          htmlFor="image_upload"
                          className="font-medium text-[#4B5057]"
                        >
                          Add an image (optional)
                        </label>
                        <p className="text-[#AAA] font-medium">
                          Supported format:{" "}
                          <span className="text-[#4B5057]">
                            .jpg, .jpeg, or .png
                          </span>
                        </p>
                      </div>

                      <input
                        id="image_upload"
                        type="file"
                        accept=".jpg,.jpeg,.png" // Restrict to .jpg, .jpeg, and .png files
                        onInput={handleImageChange}
                        className="hidden"
                        {...register("image")}
                      />

                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="mt-2 text-[#AAA] p-2 rounded-full flex items-center justify-center cursor-pointer border-[1px] border-[#ECECEC] hover:text-[#F4AA5A] hover:border-[#F4AA5A]"
                      >
                        <FileUploadOutlinedIcon />
                        Upload Image
                      </button>

                      {errors.image && (
                        <span className="text-xs text-red-500">
                          Error when uploading image
                        </span>
                      )}
                    </div>
                  </div>
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
