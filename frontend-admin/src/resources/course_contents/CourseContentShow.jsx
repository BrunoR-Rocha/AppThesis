import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  RichTextField,
  ReferenceField,
} from "react-admin";


export default function CourseContentShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="title" />
          <RichTextField source="content" />
          <ReferenceField source="lesson_id" reference="lessons" label="Lesson">
            <TextField source="title" />
          </ReferenceField>
          <ReferenceField source="content_type_id" reference="course_content_types" label="Content Type">
            <TextField source="name" />
          </ReferenceField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
