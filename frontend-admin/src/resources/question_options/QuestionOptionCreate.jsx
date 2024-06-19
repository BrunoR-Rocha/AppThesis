import * as React from "react";
import { Create } from "react-admin";
import QuestionOptionForm from "./QuestionOptionForm";

export default function QuestionOptionCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <QuestionOptionForm {...props} />
    </Create>
  );
}
