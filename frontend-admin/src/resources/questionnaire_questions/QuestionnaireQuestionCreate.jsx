import * as React from "react";
import { Create } from "react-admin";
import QuestionnaireQuestionForm from "./QuestionnaireQuestionForm";

export default function QuestionnaireQuestionCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <QuestionnaireQuestionForm {...props} />
    </Create>
  );
}
