import * as React from "react";
import { Create } from "react-admin";
import QuestionnaireForm from "./QuestionnaireForm";

export default function QuestionnaireCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <QuestionnaireForm {...props} />
    </Create>
  );
}
