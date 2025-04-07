import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function FaqForm(props) {
  return (
    <SimpleForm {...props}>
      <BooleanInput source="enabled" validate={required()} />
      <TextInput source="tag" />
      <ArrayInput source="translations">
        <SimpleFormIterator>
          <TextInput source="locale" />
          <TextInput source="title" />
          <RichTextInput source="body" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
}
