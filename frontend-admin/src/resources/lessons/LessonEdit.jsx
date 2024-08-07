import * as React from "react";
import { Edit } from "react-admin";
import LessonForm from "./LessonForm";

export default function LessonEdit(props) {
  return (
    <Edit {...props}>
      <LessonForm {...props} />
    </Edit>
  );
}
