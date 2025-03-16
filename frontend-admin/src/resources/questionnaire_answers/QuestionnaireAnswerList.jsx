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

export default function QuestionnaireAnswerList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid>
        <TextField source="id" />

        <ReferenceField
          source="questionnaire_submission_id"
          reference="questionnaire_submissions"
          label="Questionnaire Submission"
        >
          <TextField source="id" />
        </ReferenceField>

        <ReferenceField
          source="questionnaire_question_id"
          reference="questionnaire_questions"
          label="Questionnaire Question"
        >
          <TextField source="question" />
        </ReferenceField>

        <NumberField source="answer" />
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
