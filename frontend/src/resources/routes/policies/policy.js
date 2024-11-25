import React, { useEffect, useState } from "react";
import { ReactComponent as Flower } from "../../media/general/flower.svg";
import Wrapper from "../../components/general/Wrapper";
import { BannerArea, BannerDisplay } from "../profile/style";
import axiosConfig from "../../../providers/axiosConfig";
import { useTranslation } from "react-i18next";
import Skeleton from "../../components/general/Skeleton";

const Policy = ({ tag }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    setContent(null);
    setLoading(true);
    axiosConfig
      .get(`/static-contents/${tag}`, {
        params: {
          locale: currentLanguage,
        },
      })
      .then((res) => {
        setContent(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tag, currentLanguage]);

  return (
    <>
      <BannerArea>
        {loading ? (
          <>
            <Skeleton height="100px" width="50%" />
            <Skeleton height="100px" />
          </>
        ) : content ? (
          <>
            <BannerDisplay className="relative overflow-hidden">
              <Flower className="absolute mix-blend-screen -right-1/3 -top-3/4 object-cover z-0 -rotate-[160deg]" />
              <Wrapper>
                <div className="flex flex-col gap-11 pb-10 pt-24 sm:pt-40 sm:pb-24">
                  <div className="flex items-center justify-center gap-5">
                    <h3 className="text-5xl font-semibold text-[#FFF]">
                      {content?.title}
                    </h3>
                  </div>
                </div>
              </Wrapper>
            </BannerDisplay>
            <div className="py-24">
              <Wrapper>
                <div className="flex flex-1 bg-[#6078DF26] p-7 gap-4 rounded-xl border border-[#6078DF] items-center backdrop-blur-xl text-[#ECECEC] leading-10">
                  <p dangerouslySetInnerHTML={{ __html: content?.content }}></p>
                </div>
              </Wrapper>
            </div>
          </>
        ) : (
          <>
            <BannerDisplay className="relative overflow-hidden">
              <Wrapper>
                <div className="flex flex-col gap-11 pb-10 pt-24 sm:pt-40 sm:pb-24">
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-xl font-semibold text-[#FFF]">
                      No content to display
                    </p>
                  </div>
                </div>
              </Wrapper>
            </BannerDisplay>
          </>
        )}
      </BannerArea>
    </>
  );
};

export default Policy;
