import * as React from "react";
import { Create } from "react-admin";
import LessonForm from "./LessonForm";

export default function LessonCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <LessonForm {...props} />
    </Create>
  );
}
