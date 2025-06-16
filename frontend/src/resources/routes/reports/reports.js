import React, { useState } from "react";
import { ReactComponent as Flower } from "../../media/general/flower.svg";
import Wrapper from "../../components/general/Wrapper";
import { BannerArea, BannerDisplay } from "../profile/style";
import axiosConfig from "../../../providers/axiosConfig";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/styles/contact";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Report = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const isAnonymous = watch("anonymous");

  const onSubmit = (data) => {
    setLoading(true);

    axiosConfig
      .post(`/front/report`, data)
      .then((res) => {
        setLoading(false);
        reset();
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <BannerArea>
        <BannerDisplay className="relative overflow-hidden">
          <Flower className="absolute mix-blend-screen -right-1/3 -top-3/4 object-cover z-0 -rotate-[160deg]" />
          <Wrapper>
            <div className="flex flex-col gap-11 pb-10 pt-24 sm:pt-40 sm:pb-24">
              <div className="flex items-center justify-center gap-5">
                <h3 className="text-5xl font-semibold text-[#FFF]">
                  {t("reports.title")}
                </h3>
              </div>
            </div>
          </Wrapper>
        </BannerDisplay>

        <div className="py-24">
          <Wrapper>
            <div className="flex justify-center">
              <div className="pb-10 md:pb-20 max-w-screen-md">
                <p className="text-base text-center font-medium text-white">
                  {t("reports.description")}
                </p>
              </div>
            </div>

            <div className="flex flex-1 bg-[#6078DF26] p-7 gap-4 rounded-xl border border-[#6078DF] items-center backdrop-blur-xl text-[#ECECEC] leading-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex-1 flex flex-col w-full gap-4 z-[1]"
              >
                <TextInput>
                  <label>{t("reports.form.anonymous")}</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="yes"
                        {...register("anonymous", { required: true })}
                      />
                      <span>{t("reports.form.anonymousOptions.yes")}</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="no"
                        {...register("anonymous", { required: true })}
                      />
                      <span>{t("reports.form.anonymousOptions.no")}</span>
                    </label>
                  </div>
                  {errors.anonymous && (
                    <span className="text-xs text-red-500">
                      {t("reports.form.required")}
                    </span>
                  )}
                </TextInput>
                {isAnonymous === "no" && (
                  <>
                    <TextInput className="flex-1">
                      <label htmlFor="report_name">
                        {t("reports.form.name")}
                      </label>
                      <input
                        id="report_name"
                        type="text"
                        className="text-[#4B5057]"
                        placeholder={t("reports.form.name_placeholder")}
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <span className="text-xs text-red-500">
                          {t("reports.form.required")}
                        </span>
                      )}
                    </TextInput>

                    <div className="flex flex-wrap lg:flex-nowrap w-full items-center gap-4">
                      <TextInput className="flex-1">
                        <label htmlFor="report_email">
                          {t("reports.form.email")}
                        </label>
                        <input
                          id="report_email"
                          type="text"
                          className="text-[#4B5057]"
                          placeholder={t("reports.form.email_placeholder")}
                          {...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                        />
                        {errors.email && (
                          <span className="text-xs text-red-500">
                            {t("reports.form.required")}
                          </span>
                        )}
                      </TextInput>
                      <TextInput className="flex-1">
                        <label htmlFor="report_phone">
                          {t("reports.form.phone")}
                        </label>
                        <input
                          id="report_phone"
                          type="text"
                          className="text-[#4B5057]"
                          placeholder={t("reports.form.phone_placeholder")}
                          {...register("phone", {
                            required: true,
                            pattern: /^[0-9]+$/,
                            maxLength: {
                              value: 9,
                              message: "Phone number must be 9 digits",
                            },
                          })}
                          inputMode="numeric"
                        />
                        {errors.phone && (
                          <span className="text-xs text-red-500">
                            {t("reports.form.required")}
                          </span>
                        )}
                      </TextInput>
                    </div>
                  </>
                )}

                <div className="flex flex-wrap lg:flex-nowrap w-full items-center gap-4">
                  <TextInput className="flex-1">
                    <label htmlFor="report_subject">
                      {t("reports.form.subject")}
                    </label>
                    <select
                      id="report_subject"
                      className="outline-0 text-[#4B5057]"
                      style={{ minHeight: "40px" }}
                      {...register("subject", { required: true })}
                    >
                      <option value="">
                        {t("reports.form.subjectOptions.default")}
                      </option>
                      <option value="corruption">
                        {t("reports.form.subjectOptions.corruption")}
                      </option>
                      <option value="dataProtection">
                        {t("reports.form.subjectOptions.dataProtection")}
                      </option>
                      <option value="ethics">
                        {t("reports.form.subjectOptions.ethics")}
                      </option>
                      <option value="others">
                        {t("reports.form.subjectOptions.others")}
                      </option>
                    </select>
                    {errors.subject && (
                      <span className="text-xs text-red-500">
                        {t("reports.form.required")}
                      </span>
                    )}
                  </TextInput>
                  <TextInput className="flex-1">
                    <label htmlFor="report_date">
                      {t("reports.form.date")}
                    </label>
                    <input
                      id="report_date"
                      type="date"
                      className="text-[#4B5057]"
                      placeholder={t("reports.form.date_placeholder")}
                      {...register("date", { required: true })}
                    />
                    {errors.date && (
                      <span className="text-xs text-red-500">
                        {t("reports.form.required")}
                      </span>
                    )}
                  </TextInput>
                </div>

                <TextInput>
                  <label htmlFor="report_description">
                    {t("reports.form.description")}
                  </label>
                  <textarea
                    id="report_description"
                    className="text-[#4B5057]"
                    placeholder={t("reports.form.description_placeholder")}
                    {...register("description", { required: true })}
                    rows={5}
                  />
                  {errors.description && (
                    <span className="text-xs text-red-500">
                      {t("reports.form.required")}
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
                    t("reports.form.submit")
                  )}
                </button>
              </form>
            </div>
          </Wrapper>
        </div>
      </BannerArea>
    </>
  );
};

export default Report;
