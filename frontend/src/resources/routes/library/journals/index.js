import React, { useEffect, useState } from "react";
import axiosConfig from "../../../../providers/axiosConfig";

const Journals = () => {
  const [journals, setJournals] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/front/journals`)
      .then((res) => {
        setJournals(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <p>Display the journals here</p>
    </>
  );
};

export default Journals;
