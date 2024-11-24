import * as React from "react";
import { SimpleForm, TextInput, required, SelectInput, ArrayInput, SimpleFormIterator } from "react-admin";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function StaticForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="tag" />
      <ArrayInput source="translations">
        <SimpleFormIterator>
          <TextInput source="locale" />
          <TextInput source="title" />
          <RichTextInput source="content" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
}
