import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../../media/navbar/logo_moony.svg";
import AuthLogo from "../../../media/auth/auth_moony.svg";
import { AuthArea, AuthInput, AuthSideLogo } from "../styles/auth_styles";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../../../providers/axiosConfig";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await axiosConfig.post("/forgot/reset", {
        token: token,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      toast.success("Password has been reset successfully.");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset password."
      );
    }
  };

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
                One step closer
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl text-[#1A184C] font-bold font-sans">
                Reset Password
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-4"
              >
                <AuthInput>
                  <label htmlFor="reset_email">Email</label>
                  <input
                    id="reset_email"
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    readOnly
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      This field is required
                    </span>
                  )}
                </AuthInput>
                <AuthInput>
                  <label htmlFor="reset_password">Password</label>
                  <input
                    id="reset_password"
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="text-xs text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </AuthInput>
                <AuthInput>
                  <label htmlFor="reset_password_confirm">Password Confirmation</label>
                  <input
                    id="reset_password_confirm"
                    type="password"
                    placeholder="Confirm new Password"
                    {...register("password_confirmation", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  {errors.password_confirmation && (
                    <span className="text-xs text-red-500">
                      {errors.password_confirmation.message}
                    </span>
                  )}
                </AuthInput>
                <input
                  type="submit"
                  className="bg-[#6078DF] rounded-full p-3 text-white cursor-pointer"
                />
              </form>

              <p className="text-center font-medium text-md">
                Already registered?{" "}
                <Link
                  to={"/login"}
                  className="uppercase text-[#6078DF] underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthArea>
    </>
  );
}

export default ResetPassword;
