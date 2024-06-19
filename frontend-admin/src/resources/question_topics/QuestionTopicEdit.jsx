import * as React from "react";
import { Edit } from "react-admin";
import QuestionTopicForm from "./QuestionTopicForm";

export default function QuestionTopicEdit(props) {
  return (
    <Edit {...props}>
      <QuestionTopicForm {...props} />
    </Edit>
  );
}
