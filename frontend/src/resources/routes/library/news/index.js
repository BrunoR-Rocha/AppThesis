import React, { useEffect, useState } from "react";
import axiosConfig from "../../../../providers/axiosConfig";
import { CircularProgress } from "@mui/material";
import NewsCard from "../../../components/app/library/NewsCard";

const News = () => {
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/front/news`)
      .then((res) => {
        console.log(res.data);
        setNews(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress className="mx-auto" sx={{ color: "#FFF" }} />
      ) : (
        news &&
        news.map((info, index) => {
          return <NewsCard key={index} news={info} />;
        })
      )}
    </>
  );
};

export default News;
