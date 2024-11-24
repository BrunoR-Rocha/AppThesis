import WestIcon from "@mui/icons-material/West";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BackButton({
  rotate,
  className,
  iconBorder = "#272A2E",
  iconColor = "#ECECEC",
  noPaddingTop = false,
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      className={`${className} flex items-center gap-3 ${
        !noPaddingTop ? "pt-24 sm:pt-40" : ""
      } group`}
      onClick={() => navigate(-1)}
    >
      <div
        className={`rounded-full border-[1px] border-[${iconBorder}] p-2 group-hover:border-[#F4AA5A]`}
      >
        <WestIcon
          sx={{
            color: iconColor,
            transition: "transform 0.3s ease",
            rotate: rotate ? "180deg" : "0deg",
            ".group:hover &": {
              color: "#F4AA5A",
            },
          }}
        />
      </div>

      <span className="text-[#ECECEC]">{t("app.back")}</span>
    </button>
  );
}

export default BackButton;
