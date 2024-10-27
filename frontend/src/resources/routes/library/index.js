import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../components/general/Wrapper";
import axiosConfig from "../../../providers/axiosConfig";
import { CircularProgress } from "@mui/material";
import {
  LibraryArea,
  LibraryItem,
  LibraryList,
  LibraryTitle,
} from "./styles/library_styles";
import RenderButton from "../../components/general/SectionButtons";
import News from "./news";
import Journals from "./journals";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";

function Library() {
  const [loading, setLoading] = useState();
  const [pages, setPages] = useState();
  const [activeTab, setActiveTab] = useState("tab1");
  const navigate = useNavigate();
  const [savedPages, setSavedPages] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/front/library`)
      .then((res) => {
        setPages(res.data);
        const initialFavorites = res.data.reduce((acc, page) => {
          acc[page.id] = page.isFavorite;
          return acc;
        }, {});
        setSavedPages(initialFavorites);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleBookmark = async (pageId) => {
    const isCurrentlyFavorite = savedPages[pageId];

    await axiosConfig
      .post(`/library/favorites`, { content_id: pageId })
      .then((res) => {
        setSavedPages((prev) => ({ ...prev, [pageId]: !isCurrentlyFavorite }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <LibraryArea>
        <Wrapper>
          <LibraryList className="flex flex-col w-full min-h-screen gap-10">
            <div className="flex gap-6">
              <h1 className="text-[#ECECEC] text-3xl lg:text-4xl font-semibold">
                Library
              </h1>
              <RenderButton
                tabId="tab1"
                label="Library"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <RenderButton
                tabId="tab2"
                label="News"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <RenderButton
                tabId="tab3"
                label="Journals"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {activeTab === "tab1" && (
              <div className="flex flex-wrap w-full gap-5">
                {loading ? (
                  <CircularProgress
                    className="mx-auto"
                    sx={{ color: "#FFF" }}
                  />
                ) : (
                  pages &&
                  pages.map((page, index) => {
                    let year = page.date
                      ? new Date(page.date).getFullYear()
                      : "";
                    return (
                      <LibraryItem className="basis-1/3" key={index}>
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
                              <BookmarkBorderOutlinedIcon
                                sx={{ color: "#ECECEC" }}
                              />
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
                  })
                )}
              </div>
            )}
            {activeTab === "tab2" && (
              <div className="flex flex-wrap w-full gap-5">
                <News />
              </div>
            )}
            {activeTab === "tab3" && (
              <div className="flex flex-wrap w-full gap-5">
                <Journals />
              </div>
            )}
          </LibraryList>
        </Wrapper>
      </LibraryArea>
    </>
  );
}

export default Library;
