import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  SelectInput,
  ReferenceInput,
  NumberInput,
} from "react-admin";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function LessonForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="title" validate={required()} />
      <RichTextInput source="content" />

      <ReferenceInput source="course_id" reference="courses">
        <SelectInput optionText="title" />
      </ReferenceInput>

      <TextInput source="short_description" />
      <NumberInput
        source="estimated_duration"
        label="Estimated duration (minutes)"
        min={1}
      />
    </SimpleForm>
  );
}
