import * as React from "react";
import { Edit } from "react-admin";
import CourseForm from "./CourseForm";

export default function CourseEdit(props) {
  return (
    <Edit {...props}>
      <CourseForm {...props} />
    </Edit>
  );
}
