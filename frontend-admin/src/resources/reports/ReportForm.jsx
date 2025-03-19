import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  BooleanInput,
} from "react-admin";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function ReportForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="subject" validate={required()} />
      <RichTextInput source="description" validate={required()} />
    </SimpleForm>
  );
}
