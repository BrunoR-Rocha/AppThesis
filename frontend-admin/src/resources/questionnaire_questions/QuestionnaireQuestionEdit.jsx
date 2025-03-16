import * as React from "react";
import { Edit } from "react-admin";
import QuestionnaireQuestionForm from "./QuestionnaireQuestionForm";

export default function QuestionnaireQuestionEdit(props) {
  return (
    <Edit {...props}>
      <QuestionnaireQuestionForm {...props} />
    </Edit>
  );
}
