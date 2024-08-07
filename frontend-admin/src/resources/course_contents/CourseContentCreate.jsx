import * as React from "react";
import { Create } from "react-admin";
import CourseContentForm from "./CourseContentForm";

export default function CourseContentCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <CourseContentForm {...props} />
    </Create>
  );
}
