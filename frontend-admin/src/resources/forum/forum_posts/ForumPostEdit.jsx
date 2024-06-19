import * as React from "react";
import { Edit } from "react-admin";
import ForumPostForm from "./ForumPostForm";

export default function ForumPostEdit(props) {
  return (
    <Edit {...props}>
      <ForumPostForm {...props} />
    </Edit>
  );
}
