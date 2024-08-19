import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/general/Wrapper";
import axiosConfig from "../../../providers/axiosConfig";
import {
    CircularProgress,
  } from "@mui/material";
import { ForumPostArea, ForumPostList } from "./styles/forum_styles";
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { useNavigate } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PostModal from "../../components/modals/post";

function Threads() {
    const [loading, setLoading] = useState();
    const [loading2, setLoading2] = useState();
    const [threads, setThreads] = useState();
    const [categories, setCategories] = useState();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        setLoading2(true);

        axiosConfig
          .get(`/forum_threads`)
          .then((res) => {
            setThreads(res.data);
            setLoading(false);
          })
          .catch(() => setLoading(false));

        axiosConfig
          .get(`/forum_categories`)
          .then((res) => {
            setCategories(res.data);
            setLoading2(false);
          })
          .catch(() => setLoading2(false));
    }, []);

    const handleThread = (thread) => {
        navigate(`/posts/${thread.id}`, { state: { thread: thread } });
    };

  return (
    <>
    <ForumPostArea>
        <Wrapper>
            <ForumPostList className="flex flex-col w-full min-h-screen gap-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-[#ECECEC] text-3xl lg:text-4xl font-semibold">Forums</h1>
                    <button className="rounded-full flex items-center gap-3 bg-white py-3 px-6" onClick={handleOpenModal}>
                        <AddOutlinedIcon sx={{color: "#6078DF"}} />
                        <p className="text-[#6078DF] font-semibold">Create post</p>
                    </button>
                    <PostModal open={isModalOpen} handleClose={handleCloseModal} />
                </div>
                

                <div className='flex gap-4 text-[#AAA]'>
                    {loading2 ? (
                        <CircularProgress className="mx-auto" sx={{ color: "#FFF" }} />
                    ) : ( categories && categories?.map((category, index) => (
                            <>
                                <button
                                    key={category.id}
                                    // onClick={() => handleButtonClick(module)}
                                    className={"px-5 py-2 rounded-full border-[1px] border-solid border-[#272A2E]"}
                                >
                                    {category.name}
                                </button>
                            </>
                        ))
                    )}
                    
                </div>
                <div className="flex flex-wrap w-full gap-5">
                    {loading ? (
                        <CircularProgress className="mx-auto" sx={{ color: "#FFF" }} />
                    ) : (
                        threads && threads.map((thread, index) => {
                            return (
                                <div className="flex flex-col flex-1 items-start ease-in-out duration-500 gap-6 p-6 rounded-xl bg-[#1A181C7F] border-[1px] border-[#1A181C8B] text-[#ECECEC] hover:border-[#6078DF] hover:bg-[#6473DF] hover:cursor-pointer" onClick={() => handleThread(thread)}>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-white font-semibold text-lg">{thread.title}</p>
                                        <div className="font-normal text-base" dangerouslySetInnerHTML={{ __html: thread.description}} />
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex gap-3">
                                            {/* Adicionar imagem do utilizador aqui */}
                                            <div>
                                                <p>Nome Autor</p>
                                                <p>data criação</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between gap-6">
                                            <div className="flex gap-3">
                                                <ThumbUpAltOutlinedIcon />
                                                <span>{thread.likes_count}</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <ChatBubbleOutlineRoundedIcon />
                                                <span>{thread.posts}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </ForumPostList>
        </Wrapper>
        
    </ForumPostArea>
    </>
  );
}

export default Threads;
