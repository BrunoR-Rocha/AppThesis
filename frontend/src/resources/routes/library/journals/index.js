import React, { useEffect, useState } from "react";
import axiosConfig from "../../../../providers/axiosConfig";
import { CircularProgress } from "@mui/material";
import JournalCard from "../../../components/app/library/JournalCard";
import EmptyValue from "../../../components/general/EmptyValue";

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
      {loading ? (
        <CircularProgress className="mx-auto" sx={{ color: "#FFF" }} />
      ) : journals && journals.length > 0 ? (
        journals.map((journal, index) => {
          return <JournalCard key={index} journal={journal} />;
        })
      ) : (
        <EmptyValue label={"No journals yet"} />
      )}
    </>
  );
};

export default Journals;
