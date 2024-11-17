import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Wrapper from "../../../components/general/Wrapper";
import EastIcon from "@mui/icons-material/East";
import { ForumPostArea, ThreadInfo } from "../styles/forum_styles";
import { LibraryItemTitle } from "../../library/styles/library_styles";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Tooltip, IconButton, Box, Button } from "@mui/material";
import PostSection from "../post";
import BackButton from "../../../components/general/BackButton";
import axiosConfig from "../../../../providers/axiosConfig";
import Skeleton from "../../../components/general/Skeleton";

const ThreadPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState();
  const [loading, setLoading] = useState();
  const [isCommentSectionOpen, setCommentSectionOpen] = useState(false);

  useEffect(() => {
    setLoading(true);

    axiosConfig
      .get(`/front/forum/threads/${id}`)
      .then((res) => {
        setThread(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleNextChapterClick = () => {
    if (thread?.next_thread_id) {
      navigate(`/posts/${thread.next_thread_id}`);
    }
  };

  const [open, setOpen] = useState(false);

  const handleTooltipToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleShareClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleReportClick = () => {
    alert("Report action triggered");
  };

  const handleCommentIconClick = () => {
    setCommentSectionOpen(true);
  };

  const handleCloseCommentSection = () => {
    setCommentSectionOpen(false);
  };

  return (
    <>
      <ForumPostArea>
        <Wrapper className={"flex items-start gap-14 flex-wrap sm:flex-nowrap"}>
          {loading ? (
            <ThreadInfo className="flex flex-col gap-10">
              <Skeleton width="50%" />
              <Skeleton height="50px" />
            </ThreadInfo>
          ) : (
            <>
              <BackButton />
              <ThreadInfo className="flex flex-col w-full">
                <div className="flex flex-col gap-4 pb-6">
                  <div className="flex rounded-full items-center text-white bg-[#FFFFFF1A] px-3 max-w-fit py-1">
                    <span>{thread?.category?.name}</span>
                  </div>
                  <div className="flex flex-col justify-items-start">
                    <LibraryItemTitle>{thread?.title}</LibraryItemTitle>
                    <div className="flex gap-3 text-[#ECECEC] pt-4 text-sm">
                      <span>{thread?.data}</span>
                      <p className="uppercase border-l-2 border-l-[#ECECEC] pl-3">
                        By{" "}
                        <span className="font-semibold text-[#E9F0FF]">
                          {thread?.author}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 border-y-[1px] border-y-[#272A2E] py-6 text-[#E9F0FF]">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex justify-between gap-6">
                      <div className="flex gap-3">
                        <ThumbUpAltOutlinedIcon />
                        <span>{thread?.likes_count}</span>
                      </div>
                      <div
                        className="flex gap-3 cursor-pointer"
                        onClick={handleCommentIconClick}
                      >
                        <ChatBubbleOutlineRoundedIcon />
                        <span>{thread?.posts_count}</span>
                      </div>

                      {isCommentSectionOpen && (
                        <div
                          className="fixed inset-0 bg-[#030C1F80] z-10"
                          onClick={handleCloseCommentSection}
                        />
                      )}
                      {thread && (
                        <PostSection
                          isOpen={isCommentSectionOpen}
                          onClose={handleCloseCommentSection}
                          posts_count={thread?.posts_count}
                          thread={thread}
                        />
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Tooltip
                        open={open}
                        onClose={handleTooltipClose}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={
                          <Box
                            sx={{
                              backgroundColor: "white",
                              padding: "8x 16px",
                              borderRadius: "8px",
                              display: "inline-flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              justifyContent: "center",
                              border: "1px solid #0000001A",
                              width: "100px",
                              fontSize: "15px",
                            }}
                          >
                            <Button
                              onClick={handleShareClick}
                              fullWidth
                              sx={{
                                padding: "8px 8px",
                                display: "flex",
                                alignItems: "flex-start",
                                color: "#1A184C",
                                fontStyle: "normal",
                                fontFamily: "Montserrat",
                                fontWeight: "500",
                                textTransform: "none",
                                "&:hover": {
                                  color: "#6078DF",
                                  backgroundColor: "#E9F0FF",
                                },
                              }}
                            >
                              Share
                            </Button>
                            <Button
                              onClick={handleReportClick}
                              fullWidth
                              sx={{
                                padding: "8px 8px",
                                display: "flex",
                                alignItems: "flex-start",
                                color: "#1A184C",
                                fontStyle: "normal",
                                fontFamily: "Montserrat",
                                fontWeight: "500",
                                textTransform: "none",
                                "&:hover": {
                                  color: "#6078DF",
                                  backgroundColor: "#E9F0FF",
                                },
                              }}
                            >
                              Report
                            </Button>
                          </Box>
                        }
                        placement="top-end"
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: "white",
                              padding: 0,
                              boxShadow: "none",
                            },
                          },
                          arrow: {
                            sx: {
                              color: "white",
                            },
                          },
                        }}
                      >
                        <IconButton
                          onClick={handleTooltipToggle}
                          className="rounded-full p-3 bg-[#d9e5ff] bg-opacity-10"
                        >
                          <MoreHorizOutlinedIcon sx={{ color: "#AAAAAA" }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                <div id={thread?.id} className="mt-8 text-white">
                  <h3 className="text-2xl font-bold mb-8">{thread?.title}</h3>
                  <div
                    className="flex flex-col gap-4 leading-8 border-b-[0.5px] border-b-[#040A17] pb-5"
                    dangerouslySetInnerHTML={{ __html: thread?.description }}
                  />
                  {thread?.next_thread_id && (
                    <div className="flex justify-end pt-5">
                      <div className="flex gap-4 items-center">
                        <div className="flex flex-col gap-1">
                          <span className="font-light text-[#ECECEC] text-base">
                            Next Post
                          </span>
                        </div>
                        <div>
                          <button
                            onClick={handleNextChapterClick}
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
                  )}
                </div>
              </ThreadInfo>
            </>
          )}
        </Wrapper>
      </ForumPostArea>
    </>
  );
};

export default ThreadPage;
