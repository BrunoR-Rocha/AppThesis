import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/general/Wrapper";
import axiosConfig from "../../../providers/axiosConfig";
import {
    CircularProgress,
  } from "@mui/material";
import { LibraryArea, LibraryItem, LibraryList, LibraryTitle } from "./styles/library_styles";
import EastIcon from '@mui/icons-material/East';

function Library() {
    const [loading, setLoading] = useState();
    const [pages, setPages] = useState();

    useEffect(() => {
        setLoading(true);
        axiosConfig
          .get(`/library_pages`)
          .then((res) => {
            setPages(res.data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }, []);
  return (
    <>
    <LibraryArea>
        <Wrapper>
            <LibraryList className="flex flex-col w-full min-h-screen gap-10">
                <h1 className="text-[#ECECEC] text-3xl lg:text-4xl font-semibold">Library</h1>

                <div className="flex flex-wrap w-full gap-5">
                    {loading ? (
                        <CircularProgress className="mx-auto" sx={{ color: "#FFF" }} />
                    ) : (
                        pages && pages.map((page, index) => {
                            let year = page.date ? new Date(page.date).getFullYear() : '';
                            return (
                            <LibraryItem className="basis-1/3">
                                <div className="flex justify-between">
                                    <div className="flex rounded-full items-center text-white bg-[#FFFFFF1A] px-3 py-1">
                                        <span>{page.tag}</span>
                                    </div>
                                    <Link to={"/library/"+page.id} state={{ page: page }} className="bg-white rounded-full p-3 group">
                                        <EastIcon sx={{ 
                                            color: "#6078DF", 
                                            transition: 'transform 0.3s ease',
                                            ".group:hover &": {
                                                transform: 'rotate(-45deg)',
                                            }
                                        }}/>
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-12">
                                    <div className="flex flex-col gap-4">
                                        <LibraryTitle>{page.title}</LibraryTitle>
                                        <p className="text-sm font-semibold uppercase text-white">{page.author} • {year}</p>
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
            </LibraryList>
        </Wrapper>
        
    </LibraryArea>
    </>
  );
}

export default Library;
