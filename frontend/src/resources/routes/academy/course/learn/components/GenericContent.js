import React from 'react';

const GenericContent = ({ content }) => {
  return (
    <div className="generic-content mb-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        {content.title}
      </h3>
      <p className="text-white">{content.content}</p>
    </div>
  );
};

export default GenericContent;
