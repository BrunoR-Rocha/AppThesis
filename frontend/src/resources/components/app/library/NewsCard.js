import {
  LibraryItem,
  LibraryTitle,
} from "../../../routes/library/styles/library_styles";

const NewsCard = ({ news }) => {

  return (
    <LibraryItem className="basis-1/3">
      <div className="flex flex-col gap-12 justify-between h-full">
        <div className="flex flex-col gap-4">
          <LibraryTitle
            onClick={() => window.open(news.link, "_blank")}
            className="cursor-pointer"
          >
            {news.title}
          </LibraryTitle>
          <p className="text-sm font-semibold uppercase text-white">
            {news.journal_title}
          </p>
        </div>
        <p className="font-normal text-[#ECECEC] text-base">
          {news.body?.length > 100
            ? `${news.body.substring(0, 100)}...`
            : news.body}
        </p>
      </div>
    </LibraryItem>
  );
};

export default NewsCard;
