import * as React from "react";
import { Edit } from "react-admin";
import QuestionTypeForm from "./QuestionTypeForm";

export default function QuestionTypeEdit(props) {
  return (
    <Edit {...props}>
      <QuestionTypeForm {...props} />
    </Edit>
  );
}
