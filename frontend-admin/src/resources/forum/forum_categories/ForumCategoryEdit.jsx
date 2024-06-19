import * as React from "react";
import { Edit } from "react-admin";
import ForumCategoryForm from "./ForumCategoryForm";

export default function ForumCategoryEdit(props) {
  return (
    <Edit {...props}>
      <ForumCategoryForm {...props} />
    </Edit>
  );
}
