import * as React from "react";
import { Edit } from "react-admin";
import LibraryPageForm from "./LibraryPageForm";

export default function LibraryPageEdit(props) {
  return (
    <Edit {...props}>
      <LibraryPageForm {...props} />
    </Edit>
  );
}
