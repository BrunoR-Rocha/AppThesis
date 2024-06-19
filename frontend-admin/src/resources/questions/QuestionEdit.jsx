import * as React from "react";
import { Edit } from "react-admin";
import QuestionForm from "./QuestionForm";

export default function QuestionEdit(props) {
  return (
    <Edit {...props}>
      <QuestionForm {...props} />
    </Edit>
  );
}
