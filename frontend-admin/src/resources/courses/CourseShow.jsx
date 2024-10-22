import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  RichTextField,
  ReferenceField,
  NumberField,
  SelectField,
  ImageField,
  Datagrid,
  ArrayField,
  BooleanField,
} from "react-admin";
import { generateDifficultyChoices } from "../../utils/helpers";

const difficultyChoices = generateDifficultyChoices(1, 10);

export default function CourseShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="title" />
          <TextField source="short_description" />
          <RichTextField source="description" />
          <ReferenceField
            source="topic_id"
            reference="question_topics"
            label="Topic"
          >
            <TextField source="name" />
          </ReferenceField>
          <NumberField source="average_time" label="Average Time (minutes)" />
          <SelectField source="difficulty" choices={difficultyChoices} />

          <ImageField source="image" label="Image" />
          <BooleanField source="enabled" label="Active" />
        </Tab>
        <Tab label="Lessons">
          <ArrayField source="lessons" label="">
            <Datagrid bulkActionButtons={false}>
              <TextField source="title" label="Lesson Title" />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
