import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Wrapper from "../../../components/general/Wrapper";
import EastIcon from "@mui/icons-material/East";
import { ForumPostArea, ThreadInfo } from "../styles/forum_styles";
import { LibraryItemTitle } from "../../library/styles/library_styles";
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const ThreadPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const thread = location.state?.thread;
  const navigate = useNavigate();

  const handleNextChapterClick = () => {};

  return (
    <>
      <ForumPostArea>
        <Wrapper className={"flex items-start gap-14 flex-wrap sm:flex-nowrap"}>
          <button
            className="flex items-center gap-3 pt-24 sm:pt-40 group"
            onClick={() => navigate(-1)}
          >
            <div className="rounded-full border-[1px] border-[#272A2E] p-2 group-hover:border-[#F4AA5A]">
              <EastIcon
                sx={{
                  color: "#ECECEC",
                  transition: "transform 0.3s ease",
                  rotate: "180deg",
                  ".group:hover &": {
                    color: "#F4AA5A",
                  },
                }}
              />
            </div>

            <span className="text-[#ECECEC]">Back</span>
          </button>
          <ThreadInfo className="flex flex-col w-full">
            <div className="flex flex-col gap-4 pb-6">
              <div className="flex rounded-full items-center text-white bg-[#FFFFFF1A] px-3 max-w-fit py-1">
                <span>{thread?.category?.name}</span>
              </div>
              <div className="flex flex-col justify-items-start">
                <LibraryItemTitle>{thread?.title}</LibraryItemTitle>
                <div className="flex gap-3 text-[#ECECEC] pt-4 text-sm">
                    <span>{thread?.data}</span>
                    <p className="uppercase border-l-2 border-l-[#ECECEC] pl-3">By <span className="font-semibold text-[#E9F0FF]">{thread?.author}</span></p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 border-y-[1px] border-y-[#272A2E] py-6 text-[#E9F0FF]">
              <div className="flex items-center justify-between w-full">
                <div className="flex justify-between gap-6">
                  <div className="flex gap-3">
                    <ThumbUpAltOutlinedIcon />
                    <span>111</span>
                  </div>
                  <div className="flex gap-3">
                    <ChatBubbleOutlineRoundedIcon />
                    <span>9</span>
                  </div>
                </div>
                <div className="flex gap-3">
                    <button className="rounded-full p-3 bg-[#d9e5ff] bg-opacity-10">
                        <MoreHorizOutlinedIcon sx={{color: "#AAAAAA"}}/>
                    </button>
                </div>
              </div>
            </div>

            <div id={thread.id} className="mt-8 text-white">
              <h3 className="text-2xl font-bold mb-8">{thread.title}</h3>
              <div
                className="flex flex-col gap-4 leading-8 border-b-[0.5px] border-b-[#040A17] pb-5"
                dangerouslySetInnerHTML={{ __html: thread.description }}
              />
              <div className="flex justify-end pt-5">
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col gap-1">
                    <span className="font-light text-[#ECECEC] text-base">
                      Next Post
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => handleNextChapterClick()}
                      className={
                        "pl-3 pr-7 py-3 rounded-full border-2 border-[#ECECEC] ease-in-out duration-300 group hover:bg-[#ECECEC]"
                      }
                    >
                      <EastIcon
                        sx={{
                          color: "#ECECEC",
                          transition: "transform 0.3s ease",
                          ".group:hover &": {
                            color: "#F4AA5A",
                            transform: "translateX(50%)",
                          },
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ThreadInfo>
        </Wrapper>
      </ForumPostArea>
    </>
  );
};

export default ThreadPage;
