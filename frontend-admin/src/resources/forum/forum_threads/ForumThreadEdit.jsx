import * as React from "react";
import { Edit } from "react-admin";
import ForumThreadForm from "./ForumThreadForm";

export default function ForumThreadEdit(props) {
  return (
    <Edit {...props}>
      <ForumThreadForm {...props} />
    </Edit>
  );
}
