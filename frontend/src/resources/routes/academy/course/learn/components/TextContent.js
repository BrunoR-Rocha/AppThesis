import React from "react";
import { CourseText } from "../../../style/academy_style";

const TextContent = ({ content }) => {
  return (
    <div className="text-content mb-6">
      <h3 className="text-xl font-semibold text-white mb-2">{content.title}</h3>
      <CourseText
        dangerouslySetInnerHTML={{ __html: content?.content }}
      ></CourseText>
    </div>
  );
};

export default TextContent;
