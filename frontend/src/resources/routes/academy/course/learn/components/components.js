// import QuizContent from './QuizContent';
// import ArticleContent from './ArticleContent';
// import AssignmentContent from './AssignmentContent';
// import InteractiveVideoContent from './InteractiveVideoContent';

import GenericContent from "./GenericContent";
import TextContent from "./TextContent";
import VideoContent from "./VideoContent";

const contentTypeComponents = {
  Video: VideoContent,
  Text: TextContent,
  // Quiz: QuizContent,
  // Article: ArticleContent,
  // Assignment: AssignmentContent,
  // 'Interactive Video': InteractiveVideoContent,
  default: GenericContent,
};

export default contentTypeComponents;
