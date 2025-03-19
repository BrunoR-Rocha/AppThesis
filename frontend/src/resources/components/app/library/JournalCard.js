import {
  LibraryItem,
  LibraryTitle,
} from "../../../routes/library/styles/library_styles";

const JournalCard = ({ journal }) => {
  return (
    <LibraryItem className="basis-full md:basis-1/2 xl:basis-1/3 flex-grow">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <LibraryTitle
            onClick={() => journal.link && window.open(journal.link, "_blank")}
            className="cursor-pointer"
          >
            {journal.title}
          </LibraryTitle>
          <p className="text-sm font-semibold uppercase text-white">
            {journal.publisher}
          </p>
        </div>
      </div>
    </LibraryItem>
  );
};

export default JournalCard;
