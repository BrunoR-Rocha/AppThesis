import * as React from "react";
import { Create } from "react-admin";
import CourseForm from "./CourseForm";

export default function CourseCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <CourseForm {...props} />
    </Create>
  );
}
