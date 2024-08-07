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

export default function CourseInteractiveElementForm(props) {
  return (
    <SimpleForm {...props}>

      <ReferenceInput source="content_id" reference="course_contents">
        <SelectInput optionText="title" />
      </ReferenceInput>

      <SelectInput source="type" choices={[
        { id: 'flashcard', name: 'Flashcard' },
        { id: 'drag-and-drop', name: 'Drag and Drop' },
        { id: 'fill-in-the-blank', name: 'Fill in the Blank' }
      ]}/>
      <RichTextInput source="data" />
    </SimpleForm>
  );
}
