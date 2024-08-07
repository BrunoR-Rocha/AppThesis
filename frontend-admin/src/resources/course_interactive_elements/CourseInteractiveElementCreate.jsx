import * as React from "react";
import { Create } from "react-admin";
import CourseInteractiveElementForm from "./CourseInteractiveElementForm";

export default function CourseInteractiveElementCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <CourseInteractiveElementForm {...props} />
    </Create>
  );
}
