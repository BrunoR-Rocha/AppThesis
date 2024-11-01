import { useEffect, useState } from "react";
import axiosConfig from "../../../providers/axiosConfig";
import Wrapper from "../../components/general/Wrapper";
import Skeleton from "../../components/general/Skeleton";
import LibraryCard from "../../components/app/library/LibraryCard";

const Favorites = () => {
  const [loading, setLoading] = useState();
  const [recentFavorites, setRecentFavorites] = useState([]);
  const [favorites, setFavorites] = useState();
  const [savedPages, setSavedPages] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`/profile/favorites`)
      .then((res) => {
        const data = res.data;

        setRecentFavorites(data.slice(0, 3));
        setFavorites(data);
        setLoading(false);

        const initialSavedPages = data.reduce((acc, page) => {
          acc[page.id] = page.is_favorite;
          return acc;
        }, {});

        setSavedPages(initialSavedPages);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleBookmark = async (pageId) => {
    const isCurrentlyFavorite = savedPages[pageId];

    await axiosConfig
      .post(`/library/favorites`, { content_id: pageId })
      .then((res) => {
        setSavedPages((prev) => ({ ...prev, [pageId]: !isCurrentlyFavorite }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <div className="flex flex-col gap-11 pb-10 pt-24">
        {loading ? (
          <>
            <Skeleton width="30%" height="50px" />
            <Skeleton width="100%" height="50px" />
          </>
        ) : (
          <>
            <div className="d-flex flex-col">
              <h5 className="text-white font-semibold text-lg">
                Recently Saved
              </h5>
              <div className="flex gap-4 mt-4">
                {recentFavorites && recentFavorites.length > 0 ? (
                  recentFavorites.map((favorite) => (
                    <LibraryCard
                      key={favorite.id}
                      page={favorite}
                      savedPages={savedPages}
                      handleBookmark={handleBookmark}
                    />
                  ))
                ) : (
                  <p className="text-white font-medium text-base">
                    No recent favorites found.
                  </p>
                )}
              </div>
            </div>

            <div className="d-flex flex-col">
              <h5 className="text-white text-lg font-semibold mt-8">
                All Favorites
              </h5>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {favorites && favorites.length > 0 ? (
                  favorites.map((favorite) => (
                    <LibraryCard
                      key={favorite.id}
                      page={favorite}
                      savedPages={savedPages}
                      handleBookmark={handleBookmark}
                    />
                  ))
                ) : (
                  <p className="text-white font-medium text-base">
                    No favorites saved yet.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Favorites;
