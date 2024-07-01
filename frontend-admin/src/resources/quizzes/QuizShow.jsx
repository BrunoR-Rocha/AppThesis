import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  RichTextField,
  NumberField,
  ReferenceField,
  SelectField,
  DateField,
  BooleanField,
  ArrayField,
  Datagrid,
} from "react-admin";
import { generateDifficultyChoices } from "../../utils/helpers";

export default function QuizShow(props) {
  const difficultyChoices = generateDifficultyChoices(1, 10);

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="title" />
          <RichTextField source="description" />

          <ReferenceField
            source="topic_id"
            reference="question_topics"
            label="Topic"
          >
            <TextField source="name" />
          </ReferenceField>

          <ReferenceField source="user_id" reference="users" label="User">
            <TextField source="name" />
          </ReferenceField>

          <SelectField source="difficulty" choices={difficultyChoices} />
          <NumberField source="time_limit" />

          <BooleanField source="is_complete" />
          <DateField
            source="start_time"
            showTime
            options={{ hourCycle: "h24" }}
          />
          <DateField source="end_time" showTime />
          <NumberField source="score" />
        </Tab>
        <Tab label="Questions">
          <ArrayField source="questions" label="">
            <Datagrid bulkActionButtons={false}>
              <ReferenceField
                source="id"
                reference="questions"
                label="Question Title"
              >
                <TextField source="title" />
              </ReferenceField>
              <SelectField source="difficulty" choices={difficultyChoices} />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
