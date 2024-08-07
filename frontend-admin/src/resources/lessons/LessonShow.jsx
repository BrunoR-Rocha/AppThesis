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
  ArrayField,
  Datagrid,
} from "react-admin";
import { generateDifficultyChoices } from "../../utils/helpers";

const difficultyChoices = generateDifficultyChoices(1, 10);

export default function LessonShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="title" />
          <RichTextField source="content" />
          <ReferenceField
            source="course_id"
            reference="courses"
            label="Course"
          >
            <TextField source="title" />
          </ReferenceField>
        </Tab>
        <Tab label="Contents Modules">
          <ArrayField source="contents" label="">
            <Datagrid bulkActionButtons={false}>
              <TextField source="title" label="Content" />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
