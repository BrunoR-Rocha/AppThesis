import * as React from "react";
import { SimpleForm, TextInput, required } from "react-admin";

export default function LibraryPageForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="title" validate={required()} />
    </SimpleForm>
  );
}
