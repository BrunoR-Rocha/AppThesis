import { useNavigate } from "react-router-dom";
import {
  LibraryItem,
  LibraryTitle,
} from "../../../routes/library/styles/library_styles";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";

const LibraryCard = ({ page, handleBookmark, savedPages }) => {
  const navigate = useNavigate();
  const year = page.date ? new Date(page.date).getFullYear() : "";

  return (
    <LibraryItem className="basis-1/3">
      <div className="flex justify-between">
        <div className="flex rounded-full items-center text-white bg-[#FFFFFF1A] px-3 py-1">
          <span>{page.tag}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleBookmark(page.id);
          }}
        >
          {savedPages[page.id] ? (
            <BookmarkOutlinedIcon sx={{ color: "#ECECEC" }} />
          ) : (
            <BookmarkBorderOutlinedIcon sx={{ color: "#ECECEC" }} />
          )}
        </button>
      </div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <LibraryTitle
            onClick={() =>
              navigate("/library/" + page.id, {
                state: { page: page },
              })
            }
          >
            {page.title}
          </LibraryTitle>
          <p className="text-sm font-semibold uppercase text-white">
            {page.author} • {year}
          </p>
        </div>
        <p className="font-normal text-[#ECECEC] text-base">
          {page.description}
        </p>
      </div>
    </LibraryItem>
  );
};

export default LibraryCard;
