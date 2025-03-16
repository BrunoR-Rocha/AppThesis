import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  BooleanField,
  ReferenceField,
} from "react-admin";

export default function QuestionnaireSubmissionList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid>
        <TextField source="id" />

        <ReferenceField
          source="questionnaire_id"
          reference="questionnaires"
          label="Questionnaire"
        >
          <TextField source="title" />
        </ReferenceField>
        <TextField source="question" />
        <BooleanField source="enabled" />
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
