import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate} from 'react-router-dom';
import { LibraryArea, LibraryItemTitle, PageInfo } from '../styles/library_styles';
import Wrapper from '../../../components/general/Wrapper';
import EastIcon from '@mui/icons-material/East';

const LibraryPage = () => {
    
    const { id } = useParams();
    const location = useLocation(); 
    const page = location.state?.page;
    const navigate = useNavigate();

    // In case of inexistence of modules, request information and add info to modules var
    let year = page?.date ? new Date(page.date).getFullYear() : '';

    const [selectedModule, setSelectedModule] = useState(page?.modules[0]);

    useEffect(() => {
        if (location.hash) {
            const moduleId = location.hash.substring(1);
            const module = page?.modules.find(mod => mod.id === moduleId);
            if (module) {
                setSelectedModule(module);
            }
        }
    }, [location.hash, page?.modules]);

    const handleButtonClick = (module) => {
        setSelectedModule(module);
    };

    const handleNextChapterClick = () => {
        
        const currentIndex = page?.modules.findIndex(mod => mod.id === selectedModule.id);
        if (currentIndex !== -1 && currentIndex < page.modules.length - 1 && page) {
            const nextModule = page.modules[currentIndex + 1];
            setSelectedModule(nextModule);
        }
    };

    const currentIndex = page?.modules.findIndex(mod => mod.id === selectedModule.id);
    const hasNextModule = currentIndex !== -1 && currentIndex < page.modules.length - 1;

    return (
        <>
            <LibraryArea>
                <Wrapper className={'flex items-start gap-14 flex-wrap sm:flex-nowrap'}>
                    <button className='flex items-center gap-3 pt-24 sm:pt-40 group' onClick={() => navigate(-1)}>
                        <div className='rounded-full border-[1px] border-[#272A2E] p-2 group-hover:border-[#F4AA5A]'>
                            <EastIcon sx={{ 
                                    color: "#ECECEC", 
                                    transition: 'transform 0.3s ease',
                                    rotate: '180deg',
                                    ".group:hover &": {
                                        color: '#F4AA5A',
                                    }
                                }}
                            />
                        </div>
                        
                        <span className='text-[#ECECEC]'>Back</span>
                    </button>
                    <PageInfo className='flex flex-col w-full'>
                        <div className='flex flex-col gap-4 pb-6'>
                            <div className="flex rounded-full items-center text-white bg-[#FFFFFF1A] px-3 max-w-fit py-1">
                                <span>{page?.tag}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <LibraryItemTitle>{page?.title}</LibraryItemTitle>
                                <p className="text-sm font-semibold uppercase text-white">{page?.author} • {year}</p>
                            </div>
                        </div>
                        <div className='flex gap-4 border-t-[1px] border-t-[#272A2E] pt-6'>
                            {page && page?.modules.sort((a, b) => a.position - b.position).map((module, index) => (
                                <>
                                    <button
                                        key={module.id}
                                        onClick={() => handleButtonClick(module)}
                                        className={`px-4 py-1 rounded-full ${selectedModule.id === module.id ? 'bg-white text-[#6078DF] border-4 border-solid border-[#FFFFFF1A]' : 'bg-transparent text-[#BABABA] border-2 border-solid border-[#272A2E]'}`}
                                    >
                                        {module.title}
                                    </button>
                                </>
                            ))}
                            
                        </div>

                        <div id={selectedModule.id} className="mt-8 text-white">
                            <h3 className="text-2xl font-bold mb-8">{selectedModule.title}</h3>
                            <div 
                                className="flex flex-col gap-4 leading-8 border-b-[0.5px] border-b-[#040A17] pb-5"
                                dangerouslySetInnerHTML={{ __html: selectedModule.content }}
                            />
                            {hasNextModule && (
                                <div className='flex justify-end pt-5'>
                                    <div className='flex gap-4 items-center'>
                                        <div className='flex flex-col gap-1'>
                                            <span className='font-light text-[#ECECEC] text-base'>Next Chapter</span>
                                            <span className='font-semibold text-[#ECECEC] text-base'>{page?.modules[currentIndex + 1].title}</span>
                                        </div>
                                        <div>
                                            <button onClick={() => handleNextChapterClick()} className={"pl-3 pr-7 py-3 rounded-full border-2 border-[#ECECEC] ease-in-out duration-300 group hover:bg-[#ECECEC]"}>
                                                <EastIcon sx={{ 
                                                    color: "#ECECEC", 
                                                    transition: 'transform 0.3s ease',
                                                    ".group:hover &": {
                                                        color: '#F4AA5A',
                                                        transform: 'translateX(50%)',
                                                    }
                                                }}
                                                />
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>    
                            )}
                        </div>
                    </PageInfo>
                </Wrapper>
            </LibraryArea>
        </>
    );
};

export default LibraryPage;