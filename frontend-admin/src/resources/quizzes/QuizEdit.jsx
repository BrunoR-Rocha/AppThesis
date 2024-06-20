import * as React from "react";
import { Edit } from "react-admin";
import QuizForm from "./QuizForm";

export default function QuizEdit(props) {
  return (
    <Edit {...props}>
      <QuizForm {...props} />
    </Edit>
  );
}
