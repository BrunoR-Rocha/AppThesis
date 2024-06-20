import * as React from "react";
import { Create } from "react-admin";
import QuizForm from "./QuizForm";

export default function QuizCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <QuizForm {...props} />
    </Create>
  );
}
