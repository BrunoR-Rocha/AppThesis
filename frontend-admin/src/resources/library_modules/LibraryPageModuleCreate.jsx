import * as React from "react";
import { Create } from "react-admin";
import LibraryPageModuleForm from "./LibraryPageModuleForm";

export default function LibraryPageModuleCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <LibraryPageModuleForm {...props} />
    </Create>
  );
}
