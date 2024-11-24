import React, { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import { ReactComponent as Flower } from "../../media/general/flower.svg";
import { useForm } from "react-hook-form";
import { TextInput } from "../styles/contact";
import CloseIcon from "@mui/icons-material/Close";
import axiosConfig from "../../../providers/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

function ContactModal({ open, handleClose }) {
  const [loading, setLoading] = useState();
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    axiosConfig
      .post(`/front/contacts`, data)
      .then((res) => {
        setLoading(false);
        reset();
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      })
      .finally(() => handleClose());
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xl"}
      >
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
          <div className="flex justify-end p-3">
            <div
              className="border-[#A5A6CC] hover:border-[#F4AA5A] border-2 border-solid rounded-full p-3 group hover:cursor-pointer"
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
            </div>
          </div>
          <div className="flex w-full h-full relative overflow-hidden px-12 pb-12 gap-10 items-center">
            <Flower className="absolute mix-blend-hard-light opacity-25 left-1/4 -top-1/3 object-cover z-0 -rotate-90" />
            <div className="flex flex-col flex-1 gap-5">
              <h2 className="text-4xl text-[#1A184C] font-bold">
                {t("contacts.modal.title")} <br />{" "}
                <span className="font-cormorant text-5xl italic">
                  {t("contacts.modal.subtitle")}
                </span>
              </h2>
              <p
                className="font-medium text-[#575757]"
                dangerouslySetInnerHTML={{
                  __html: t("contacts.modal.descripton"),
                }}
              ></p>

              <div className="flex flex-col gap-3">
                <PlaceIcon sx={{ color: "#6078DF" }} />
                <p className="text-[#6078DF] text-sm font-bold uppercase">
                  {t("contacts.modal.location")}
                </p>
                <p>
                  Polo Científico e Tecnológico da Madeira, <br />
                  Caminho da Penteada, piso -2 <br />
                  9020-105 <br />
                  Funchal, Portugal
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <EmailIcon sx={{ color: "#6078DF" }} />
                <p className="text-[#6078DF] text-sm font-bold uppercase">
                  {t("contacts.modal.email")}
                </p>
                <a
                  href="mailto:support_sleepinsight@gmail.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-medium text-[#575757] underline"
                >
                  support_sleepinsight@gmail.com
                </a>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex-1 flex flex-col w-full gap-4 z-[1]"
            >
              <TextInput>
                <label htmlFor="contact_subject">
                  {t("contacts.form.subject")}
                </label>
                <input
                  id="contact_subject"
                  type="text"
                  placeholder={t("contacts.form.subject_placeholder")}
                  {...register("subject", { required: true })}
                />
                {errors.subject && (
                  <span className="text-xs text-red-500">
                    {t("contacts.form.required")}
                  </span>
                )}
              </TextInput>
              <div className="flex w-full items-center gap-4">
                <TextInput className="flex-1">
                  <label htmlFor="contact_name">
                    {t("contacts.form.name")}
                  </label>
                  <input
                    id="contact_name"
                    type="text"
                    placeholder={t("contacts.form.name_placeholder")}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500">
                      {t("contacts.form.required")}
                    </span>
                  )}
                </TextInput>
                <TextInput className="flex-1">
                  <label htmlFor="contact_email">
                    {t("contacts.form.email")}
                  </label>
                  <input
                    id="contact_email"
                    type="text"
                    placeholder={t("contacts.form.email_placeholder")}
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      {t("contacts.form.required_email")}
                    </span>
                  )}
                </TextInput>
              </div>
              <TextInput>
                <label htmlFor="contact_message">
                  {t("contacts.form.message")}
                </label>
                <textarea
                  id="contact_message"
                  placeholder={t("contacts.form.message_placeholder")}
                  {...register("message", { required: true })}
                  rows={5}
                />
                {errors.message && (
                  <span className="text-xs text-red-500">
                    {t("contacts.form.required")}
                  </span>
                )}
              </TextInput>

              <button
                type="submit"
                className="bg-[#6078DF] rounded-full p-3 text-white cursor-pointer flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ContactModal;
