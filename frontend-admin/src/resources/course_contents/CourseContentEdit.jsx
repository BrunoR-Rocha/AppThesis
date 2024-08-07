import * as React from "react";
import { Edit } from "react-admin";
import CourseContentForm from "./CourseContentForm";

export default function CourseContentEdit(props) {
  return (
    <Edit {...props}>
      <CourseContentForm {...props} />
    </Edit>
  );
}
