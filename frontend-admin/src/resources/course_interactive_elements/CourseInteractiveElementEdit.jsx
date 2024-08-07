import * as React from "react";
import { Edit } from "react-admin";
import CourseInteractiveElementForm from "./CourseInteractiveElementForm";

export default function CourseInteractiveElementEdit(props) {
  return (
    <Edit {...props}>
      <CourseInteractiveElementForm {...props} />
    </Edit>
  );
}
