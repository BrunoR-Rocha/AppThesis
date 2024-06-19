import * as React from "react";
import { SimpleForm, required, SelectInput, ReferenceInput } from "react-admin";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function ForumPostForm(props) {
  return (
    <SimpleForm {...props}>
      <RichTextInput source="body" validate={required()} />
      <ReferenceInput reference="forum_threads" source="forum_thread_id">
        <SelectInput
          label="Thread"
          source="forum_thread_id"
          optionText="title"
        />
      </ReferenceInput>
    </SimpleForm>
  );
}
