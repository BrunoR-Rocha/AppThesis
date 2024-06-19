import * as React from "react";
import { Create } from "react-admin";
import ForumPostForm from "./ForumPostForm";

export default function ForumPostCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <ForumPostForm {...props} />
    </Create>
  );
}
