import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  BooleanField,
  ReferenceField,
  NumberField,
  ArrayField,
  Datagrid,
} from "react-admin";

export default function QuestionnaireAnswerShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <ReferenceField
            source="questionnaire_id"
            reference="questionnaires"
            label="Questionnaire"
          >
            <TextField source="title" />
          </ReferenceField>
          <TextField source="question" />
          <NumberField source="order" />
          <BooleanField source="enabled" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
