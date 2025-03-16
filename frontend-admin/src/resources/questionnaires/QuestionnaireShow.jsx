import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  BooleanField,
  ArrayField,
  Datagrid,
  NumberField,
} from "react-admin";
import { generateDifficultyChoices } from "../../utils/helpers";

export default function QuestionnaireShow(props) {
  const difficultyChoices = generateDifficultyChoices(1, 10);

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="title" />
          <TextField source="description" />
          <BooleanField source="enabled" />
        </Tab>
        <Tab label="Questions">
          <ArrayField source="questions" label="">
            <Datagrid bulkActionButtons={false}>
              <TextField source="question" label="Question" />
              <NumberField source="order" label="Order" />
              <BooleanField source="enabled" label="Active?" />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
