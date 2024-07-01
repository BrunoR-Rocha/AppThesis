import * as React from "react";
import { Edit } from "react-admin";
import LibraryPageModuleForm from "./LibraryPageModuleForm";

export default function LibraryPageModuleEdit(props) {
  return (
    <Edit {...props}>
      <LibraryPageModuleForm {...props} />
    </Edit>
  );
}
