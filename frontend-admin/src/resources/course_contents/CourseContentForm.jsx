import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  SelectInput,
  ReferenceInput,
} from "react-admin";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function CourseContentForm(props) {
  return (
    <SimpleForm {...props}>

      <ReferenceInput source="lesson_id" reference="lessons">
        <SelectInput optionText="title" />
      </ReferenceInput>

      <ReferenceInput source="content_type_id" reference="course_content_types">
        <SelectInput optionText="name" />
      </ReferenceInput>

      <TextInput source="title" validate={required()} />
      <RichTextInput source="content" />
      
    </SimpleForm>
  );
}
