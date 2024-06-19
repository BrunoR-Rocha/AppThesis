import * as React from "react";
import { Create } from "react-admin";
import QuestionTopicForm from "./QuestionTopicForm";

export default function QuestionTopicCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <QuestionTopicForm {...props} />
    </Create>
  );
}
