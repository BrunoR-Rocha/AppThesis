import * as React from "react";
import { Create } from "react-admin";
import QuestionForm from "./QuestionForm";

export default function QuestionCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <QuestionForm {...props} />
    </Create>
  );
}
