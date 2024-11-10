import { useState } from "react";
import UploadInput from "../../components/forms/UploadInput";
import Wrapper from "../../components/general/Wrapper";
import { TextInput } from "../../components/styles/contact";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosConfig from "../../../providers/axiosConfig";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const ProfileSettings = () => {
  const SettingSection = ({ title, children }) => {
    return (
      <div className="flex flex-1 bg-[#E9F0FF] p-6 gap-4 rounded-xl border border-[#1A184C] items-center">
        <div className="flex flex-col gap-1 w-full">
          {title && (
            <p className="text-xl font-semibold text-[#040A17]">{title}</p>
          )}
          {children}
        </div>
      </div>
    );
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    setValue: setValueProfile,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  // Second form: Change Password
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm();

  const onSubmitProfile = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await axiosConfig.post("/front/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);

      const updatedUser = {
        ...user,
        name: response.data.user.name,
        email: response.data.user.email,
      };

      setUser(updatedUser);

      const authData = JSON.parse(localStorage.getItem("auth"));
      if (authData) {
        const updatedAuthData = { ...authData, user: updatedUser };
        localStorage.setItem("auth", JSON.stringify(updatedAuthData));
      } else {
        toast.error("Profile update failed: Authentication data missing.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const onSubmitPassword = async (data) => {
    if (data.new_password !== data.new_password_confirmation) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      await axiosConfig.post("/front/profile/password", {
        current_password: data.current_password,
        new_password: data.new_password,
        new_password_confirmation: data.new_password_confirmation,
      });
      toast.success("Password changed successfully");
      resetPassword();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleImageSelected = (imageFile) => {
    setSelectedImage(imageFile);
    setValueProfile("image", imageFile);
  };

  useEffect(() => {
    setValueProfile("name", user?.name || "");
    setValueProfile("email", user?.email || "");
  }, [user, setValueProfile]);

  return (
    <Wrapper>
      <div className="flex flex-col gap-11 pb-10 pt-24">
        <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
          <SettingSection title="Profile Information">
            <div className="flex flex-col w-full">
              <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-10">
                <div className="flex flex-col basis-1/2 gap-4 w-full">
                  <TextInput>
                    <label htmlFor="profile_name">Name</label>
                    <input
                      id="profile_name"
                      placeholder="Write here"
                      {...registerProfile("name", { required: true })}
                    />
                    {errorsProfile.name && (
                      <span className="text-xs text-red-500">
                        This field is required
                      </span>
                    )}
                  </TextInput>
                  <TextInput>
                    <label htmlFor="profile_email">Email</label>
                    <input
                      id="profile_email"
                      placeholder="Write here"
                      {...registerProfile("email", {
                        required: true,
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errorsProfile.email && (
                      <span className="text-xs text-red-500">
                        {errorsProfile.email.message ||
                          "This field is required"}
                      </span>
                    )}
                  </TextInput>
                </div>
                <div className="flex flex-col basis-1/2 w-full">
                  <UploadInput
                    onImageSelected={handleImageSelected}
                    error={errorsProfile.image && "Error when uploading image"}
                    secondaryLabel="Image size should be under 1MB and image ration needs to be 1:1"
                    label="Add a profile image (optional)"
                    accept=".jpg,.jpeg,.png"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#6078DF] text-white rounded-full px-6 py-2 mt-4"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </SettingSection>
        </form>
        <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
          <SettingSection title="Change password">
            <div className="flex flex-col gap-4 mt-4">
              <TextInput>
                <label htmlFor="current_password">Current Password</label>
                <div className="flex">
                  <input
                    id="current_password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Current Password"
                    {...registerPassword("current_password", {
                      required: true,
                    })}
                  />
                  <span
                    className="flex items-center cursor-pointer"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <VisibilityOffOutlinedIcon
                        size={20}
                        sx={{ color: "#AAAAAA" }}
                      />
                    ) : (
                      <VisibilityOutlinedIcon
                        size={20}
                        sx={{ color: "#AAAAAA" }}
                      />
                    )}
                  </span>
                </div>

                {errorsPassword.current_password && (
                  <span className="text-xs text-red-500">
                    This field is required
                  </span>
                )}
              </TextInput>
              <TextInput>
                <label htmlFor="new_password">New Password</label>
                <div className="flex">
                  <input
                    id="new_password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    {...registerPassword("new_password", { required: true })}
                  />
                  <span
                    className="flex items-center cursor-pointer"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <VisibilityOffOutlinedIcon
                        size={20}
                        sx={{ color: "#AAAAAA" }}
                      />
                    ) : (
                      <VisibilityOutlinedIcon
                        size={20}
                        sx={{ color: "#AAAAAA" }}
                      />
                    )}
                  </span>
                </div>

                {errorsPassword.new_password && (
                  <span className="text-xs text-red-500">
                    This field is required
                  </span>
                )}
              </TextInput>
              <TextInput>
                <label htmlFor="new_password_confirmation">
                  Confirm Password
                </label>
                <div className="flex">
                  <input
                    id="new_password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new Password"
                    {...registerPassword("new_password_confirmation", {
                      required: true,
                    })}
                  />
                  <span
                    className="flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffOutlinedIcon
                        size={20}
                        sx={{ color: "#AAAAAA" }}
                      />
                    ) : (
                      <VisibilityOutlinedIcon
                        size={20}
                        sx={{ color: "#AAAAAA" }}
                      />
                    )}
                  </span>
                </div>

                {errorsPassword.new_password_confirmation && (
                  <span className="text-xs text-red-500">
                    This field is required
                  </span>
                )}
              </TextInput>

              <div>
                <button
                  type="submit"
                  className="bg-[#6078DF] text-white rounded-full px-6 py-2 mt-4"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </SettingSection>
        </form>
      </div>
    </Wrapper>
  );
};

export default ProfileSettings;
