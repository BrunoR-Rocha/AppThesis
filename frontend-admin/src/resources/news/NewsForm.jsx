import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  BooleanInput
} from "react-admin";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function NewsForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="title" validate={required()} />
      <RichTextInput source="body" />
      <TextInput source="doi" />
      <TextInput source="journal_title" validate={required()} />
      <BooleanInput source="enabled" validate={required()} />
    </SimpleForm>
  );
}
