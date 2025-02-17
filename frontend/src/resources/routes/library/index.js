import React, { useEffect, useState } from "react";
import Wrapper from "../../components/general/Wrapper";
import axiosConfig from "../../../providers/axiosConfig";
import { CircularProgress } from "@mui/material";
import { LibraryArea, LibraryList } from "./styles/library_styles";
import RenderButton from "../../components/general/SectionButtons";
import News from "./news";
import Journals from "./journals";
import LibraryCard from "../../components/app/library/LibraryCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyValue from "../../components/general/EmptyValue";
import { useTranslation } from "react-i18next";

function Library() {
  const [loading, setLoading] = useState();
  const [pages, setPages] = useState();
  const [activeTab, setActiveTab] = useState("tab1");
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
        if (isCurrentlyFavorite) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }

        setSavedPages((prev) => ({ ...prev, [pageId]: !isCurrentlyFavorite }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { t } = useTranslation();

  return (
    <>
      <LibraryArea>
        <Wrapper>
          <LibraryList className="flex flex-col w-full min-h-screen gap-10">
            <div className="flex flex-col md:flex-row gap-6">
              <h1 className="text-[#ECECEC] text-3xl lg:text-4xl font-semibold">
                {t("library.title")}
              </h1>
              <div className="flex flex-wrap md:flex-nowrap gap-3">
                <RenderButton
                  tabId="tab1"
                  label={t("library.title")}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <RenderButton
                  tabId="tab2"
                  label={t("library.sections.news.title")}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <RenderButton
                  tabId="tab3"
                  label={t("library.sections.journals.title")}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
              
            </div>

            {activeTab === "tab1" && (
              <div className="flex flex-wrap w-full gap-5">
                {loading ? (
                  <CircularProgress
                    className="mx-auto"
                    sx={{ color: "#FFF" }}
                  />
                ) : pages && pages.length > 0 ? (
                  pages.map((page, index) => {
                    return (
                      <LibraryCard
                        key={index}
                        page={page}
                        handleBookmark={handleBookmark}
                        savedPages={savedPages}
                      />
                    );
                  })
                ) : (
                  <EmptyValue label={"No library pages yet"} />
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
