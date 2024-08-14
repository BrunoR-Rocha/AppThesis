import * as React from "react";
import { DateInput, SimpleForm, TextInput, required } from "react-admin";

export default function LibraryPageForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" />
      <TextInput source="author" />
      <TextInput source="tag" />
      <DateInput source="date" />
    </SimpleForm>
  );
}
