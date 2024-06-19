import * as React from "react";
import { Create } from "react-admin";
import ForumCategoryForm from "./ForumCategoryForm";

export default function ForumCategoryCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <ForumCategoryForm {...props} />
    </Create>
  );
}
