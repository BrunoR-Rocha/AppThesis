import React, { useContext } from "react";
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
import AuthContext from "../../../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const result = await login({
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      navigate("/profile");
    } else {
      toast.error("Invalid email or password");
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
                Welcome Back
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl text-[#1A184C] font-bold font-sans">
                Continue to your account
              </h2>
              <div className="flex flex-wrap gap-3">
                <AuthButton>
                  <AuthIcon>
                    <GoogleIcon />
                  </AuthIcon>
                  <span>Continue with Google</span>
                </AuthButton>
                <AuthButton>
                  <AuthIcon>
                    <FacebookIcon />
                  </AuthIcon>
                  <span>Continue with Facebook</span>
                </AuthButton>
              </div>
              <p className="text-center flex items-center uppercase font-medium text-sm">
                <span className="flex-grow border-t border-gray-300 mx-4"></span>
                Or
                <span className="flex-grow border-t border-gray-300 mx-4"></span>
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-4"
              >
                <AuthInput>
                  <label htmlFor="login_email">Email</label>
                  <input
                    id="login_email"
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      This field is required
                    </span>
                  )}
                </AuthInput>
                <AuthInput>
                  <label htmlFor="login_password">Password</label>
                  <input
                    id="login_password"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-xs text-red-500">
                      This field is required
                    </span>
                  )}
                </AuthInput>
                <div className="mb-4 flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    className="mr-2"
                    {...register("rememberMe")}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-[#575757] text-sm"
                  >
                    Remember Password
                  </label>
                </div>
                <input
                  type="submit"
                  className="bg-[#6078DF] rounded-full p-3 text-white cursor-pointer"
                />
              </form>

              <p className="text-center font-medium text-md">
                Are you a Newbie?{" "}
                <Link
                  to={"/register"}
                  className="uppercase text-[#6078DF] underline"
                >
                  Get Started
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthArea>
    </>
  );
}

export default Login;
