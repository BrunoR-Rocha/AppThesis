import React, { useEffect, useState } from "react";
import axiosConfig from "../../../../providers/axiosConfig";

const News = () => {
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/front/news`)
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <p>Display the news here</p>
    </>
  );
};

export default News;
