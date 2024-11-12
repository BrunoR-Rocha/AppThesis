import React from 'react';

const VideoContent = ({ content }) => {
  return (
    <div className="video-content mb-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        {content.title}
      </h3>
      <video controls className="w-full">
        <source src={content.content} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoContent;
