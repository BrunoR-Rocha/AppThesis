import * as React from "react";
import { Create } from "react-admin";
import CourseContentTypeForm from "./CourseContentTypeForm";

export default function CourseContentTypeCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <CourseContentTypeForm {...props} />
    </Create>
  );
}
