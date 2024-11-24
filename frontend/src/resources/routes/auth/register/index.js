import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../../media/navbar/logo_moony.svg";
import AuthLogo from "../../../media/auth/auth_moony.svg";
import {
  AuthArea,
  AuthButton,
  AuthIcon,
  AuthInput,
  AuthSideLogo,
} from "../styles/auth_styles";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../../../providers/axiosConfig";
import { useTranslation } from "react-i18next";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosConfig.post("/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);
      reset();

      navigate("/email-confirmation");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <AuthArea className="min-h-[900px] md:min-h-max flex">
        <AuthSideLogo>
          <img
            src={AuthLogo}
            className="h-full object-cover object-left"
            alt=""
          />
        </AuthSideLogo>
        <div className="flex-1 flex justify-center items-center bg-white h-full">
          <div className="w-full lg:max-w-screen-md flex flex-col gap-8 lg:gap-20 p-10 lg:p-20">
            <div className="flex justify-between items-center">
              <Logo
                className="justify-self-center cursor-pointer"
                onClick={() => navigate("/")}
                color="black"
              />
              <Link
                to={location.state?.from || "/"}
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

            <div className="flex flex-col gap-5">
              <p className="uppercase text-[#44456A] font-medium text-sm">
                {t("auth.register.pre_title")}
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl text-[#1A184C] font-bold font-sans">
                {t("auth.register.title")}
              </h2>
              <div className="flex flex-wrap gap-3">
                <AuthButton>
                  <AuthIcon>
                    <GoogleIcon />
                  </AuthIcon>
                  <span>{t("auth.socials.google")}</span>
                </AuthButton>
                <AuthButton>
                  <AuthIcon>
                    <FacebookIcon />
                  </AuthIcon>
                  <span>{t("auth.socials.facebook")}</span>
                </AuthButton>
              </div>
              <p className="text-center flex items-center uppercase font-medium text-sm">
                <span className="flex-grow border-t border-gray-300 mx-4"></span>
                {t("auth.register.option")}
                <span className="flex-grow border-t border-gray-300 mx-4"></span>
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-4"
              >
                <div className="flex w-full items-center gap-4">
                  <AuthInput className="flex-1">
                    <label htmlFor="register_name">{t("auth.form.name")}</label>
                    <input
                      id="register_name"
                      type="text"
                      placeholder={t("auth.form.name_placeholder")}
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500">
                        {t("auth.form.required")}
                      </span>
                    )}
                  </AuthInput>
                  <AuthInput className="flex-1">
                    <label htmlFor="register_email">
                      {t("auth.form.email")}
                    </label>
                    <input
                      id="register_email"
                      type="text"
                      placeholder={t("auth.form.email")}
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500">
                        {t("auth.form.required")}
                      </span>
                    )}
                  </AuthInput>
                </div>

                <div className="flex w-full items-center gap-4">
                  <AuthInput className="flex-1">
                    <label htmlFor="register_password">
                      {t("auth.form.password")}
                    </label>
                    <input
                      id="register_password"
                      type="password"
                      placeholder={t("auth.form.password")}
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-xs text-red-500">
                        {t("auth.form.required")}
                      </span>
                    )}
                  </AuthInput>
                  <AuthInput className="flex-1">
                    <label htmlFor="register_c_password">
                      {t("auth.form.password_confirmation")}
                    </label>
                    <input
                      id="register_c_password"
                      type="password"
                      placeholder={t("auth.form.password_confirmation")}
                      {...register("password_confirmation", {
                        required: true,
                        validate: (value) => {
                          const { password } = getValues();
                          return (
                            password === value ||
                            t("auth.form.password_confirmation_error")
                          );
                        },
                      })}
                    />
                    {errors.password_confirmation && (
                      <span className="text-xs text-red-500">
                        {t("auth.form.password_confirmation_error")}
                      </span>
                    )}
                  </AuthInput>
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    className="mr-2"
                    {...register("remember")}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-[#575757] text-sm"
                  >
                    {t("auth.form.remember")}
                  </label>
                </div>
                <input
                  type="submit"
                  className="bg-[#6078DF] rounded-full p-3 text-white cursor-pointer"
                  label="Continue"
                />
              </form>

              <p className="text-center font-medium text-md">
                {t("auth.register.login_title")}
                <Link
                  to={"/login"}
                  className="uppercase text-[#6078DF] underline"
                >
                  {t("auth.register.login_link")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthArea>
    </>
  );
}

export default Register;
