import * as React from "react";
import { Edit } from "react-admin";
import CourseContentTypeForm from "./CourseContentTypeForm";

export default function CourseContentTypeEdit(props) {
  return (
    <Edit {...props}>
      <CourseContentTypeForm {...props} />
    </Edit>
  );
}
