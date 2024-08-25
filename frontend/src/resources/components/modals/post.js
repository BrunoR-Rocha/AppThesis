import React from "react";
import {
  Dialog,
  DialogContent,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { TextInput } from "../styles/contact";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function PostModal({ open, handleClose }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    handleClose();
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
            Share your <span className="font-cormorant text-5xl italic">opinion!</span>
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
            className="flex-1 flex flex-col w-full gap-4 z-[1]"
          >
            <TextInput>
              <label htmlFor="contact_subject">Subject</label>
              <input
                id="contact_subject"
                type="text"
                placeholder="Write here"
                {...register("subject", { required: true })}
              />
            </TextInput>
            <div className="flex w-full items-center gap-4">
              <TextInput className="flex-1">
                <label htmlFor="contact_name">Name</label>
                <input
                  id="contact_name"
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: true })}
                />
              </TextInput>
              <TextInput className="flex-1">
                <label htmlFor="contact_email">Email</label>
                <input
                  id="contact_email"
                  type="text"
                  placeholder="Your Email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </TextInput>
            </div>
            <TextInput>
              <label htmlFor="contact_message">Email</label>
              <textarea
                id="contact_message"
                placeholder="Write here"
                {...register("message", { required: true })}
                rows={5}
              />
            </TextInput>

            <input
              type="submit"
              className="bg-[#6078DF] rounded-full p-3 text-white cursor-pointer"
            />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostModal;
