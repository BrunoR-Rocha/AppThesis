import * as React from "react";
import { Create } from "react-admin";
import LibraryPageForm from "./LibraryPageForm";

export default function LibraryPageCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <LibraryPageForm {...props} />
    </Create>
  );
}
