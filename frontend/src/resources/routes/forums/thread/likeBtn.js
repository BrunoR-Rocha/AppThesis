import React, { useState } from 'react';
import axiosConfig from '../../../../providers/axiosConfig';

const LikeButton = ({ thread }) => {
    const [isLiked, setIsLiked] = useState(thread.isLikedByUser); // Assuming you send this in your API response
    const [likeCount, setLikeCount] = useState(thread.likesCount); // Same as above

    const toggleLike = () => {
        if (isLiked) {
            axiosConfig.delete(`/threads/${thread.id}/like`)
                .then(response => {
                    setIsLiked(false);
                    setLikeCount(likeCount - 1);
                });
        } else {
            axiosConfig.post(`/threads/${thread.id}/like`)
                .then(response => {
                    setIsLiked(true);
                    setLikeCount(likeCount + 1);
                });
        }
    };

    return (
        <button onClick={toggleLike}>
            {isLiked ? 'Unlike' : 'Like'} ({likeCount})
        </button>
    );
};

export default LikeButton;
