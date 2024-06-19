import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  BooleanInput,
  SelectInput,
} from "react-admin";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function FaqForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="title" validate={required()} />
      <RichTextInput source="body" validate={required()} />
      <SelectInput
        source="section"
        validate={required()}
        choices={[
          { id: "general", name: "Gerais" },
          { id: "quiz", name: "Quizzes" },
        ]}
      />

      <BooleanInput source="enabled" validate={required()} />
    </SimpleForm>
  );
}
