import * as React from "react";
import { Edit } from "react-admin";
import QuestionnaireForm from "./QuestionnaireForm";

export default function QuestionnaireEdit(props) {
  return (
    <Edit {...props}>
      <QuestionnaireForm {...props} />
    </Edit>
  );
}
