import React, { useState } from "react";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const UploadInput = ({
  onImageSelected,
  initialImage = null,
  error = null,
  accept = ".jpg,.jpeg,.png",
  label = "Add an image (optional)",
  secondaryLabel = null
}) => {
  const [selectedImage, setSelectedImage] = useState(initialImage);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      if (onImageSelected) {
        onImageSelected(file);
      }
    }
  };

  const triggerFileInput = () => {
    document.getElementById("image_upload").click();
  };

  return (
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
            <InsertPhotoOutlinedIcon sx={{ height: "80px", width: "80px" }} />
          </div>
        )}
      </div>
      <div className="flex flex-col basis-1/2 lg:h-full justify-around">
        <div>
          <label htmlFor="image_upload" className="font-medium text-[#4B5057]">
            {label}
          </label>
          {secondaryLabel && (
            <p
              className="text-[#AAA] font-medium"
            >
              {secondaryLabel}
            </p>
          )}
        </div>

        <input
          id="image_upload"
          type="file"
          accept={accept}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={triggerFileInput}
          className="mt-2 text-[#AAA] p-2 rounded-full flex items-center justify-center cursor-pointer border-[1px] border-[#ECECEC] hover:text-[#F4AA5A] hover:border-[#F4AA5A]"
        >
          <FileUploadOutlinedIcon />
          Upload Image
        </button>

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default UploadInput;
