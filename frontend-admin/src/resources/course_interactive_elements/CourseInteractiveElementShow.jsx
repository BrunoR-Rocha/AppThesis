import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  BooleanField,
  RichTextField,
  ReferenceField,
  NumberField,
  SelectField,
  ImageField,
} from "react-admin";
import { generateDifficultyChoices } from "../../utils/helpers";

const difficultyChoices = generateDifficultyChoices(1, 10);

export default function CourseInteractiveElementShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="title" />
          <RichTextField source="content" />
          <ReferenceField source="lesson_id" reference="lessons" label="Lesson">
            <TextField source="title" />
          </ReferenceField>
          <ReferenceField
            source="content_type_id"
            reference="course_content_types"
            label="Content Type"
          >
            <TextField source="name" />
          </ReferenceField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
