import * as React from "react";
import { SimpleForm, TextInput, required, BooleanInput } from "react-admin";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function ForumCategoryForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="tag" validate={required()} />
      <TextInput source="name" validate={required()} />
      <BooleanInput source="active" validate={required()} />
    </SimpleForm>
  );
}
