import * as React from "react";
import { Create } from "react-admin";
import QuestionTypeForm from "./QuestionTypeForm";

export default function QuestionTypeCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <QuestionTypeForm {...props} />
    </Create>
  );
}
