import * as React from "react";
import { BooleanInput, SimpleForm, TextInput, required } from "react-admin";

export default function CourseContentTypeForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="name" validate={required()} />
      <TextInput source="tag" validate={required()} />
      <BooleanInput source="enabled" validate={required()} />
    </SimpleForm>
  );
}
