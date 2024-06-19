import * as React from "react";
import { Create } from "react-admin";
import ForumThreadForm from "./ForumThreadForm";

export default function ForumThreadCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <ForumThreadForm {...props} />
    </Create>
  );
}
