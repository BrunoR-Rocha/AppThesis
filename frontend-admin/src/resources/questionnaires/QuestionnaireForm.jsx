import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  BooleanInput,
} from "react-admin";

export default function QuestionnaireForm(props) {

  return (
    <SimpleForm {...props}>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" />
      <BooleanInput source="enabled" validate={required()} />
    </SimpleForm>
  );
}
