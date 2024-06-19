import * as React from "react";
import { Edit } from "react-admin";
import NewsForm from "./NewsForm";

export default function NewsEdit(props) {
  return (
    <Edit {...props}>
      <NewsForm {...props} />
    </Edit>
  );
}
