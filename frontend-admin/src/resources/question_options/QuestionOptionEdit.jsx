import * as React from "react";
import { Edit } from "react-admin";
import QuestionOptionForm from "./QuestionOptionForm";

export default function QuestionOptionEdit(props) {
  return (
    <Edit {...props}>
      <QuestionOptionForm {...props} />
    </Edit>
  );
}
