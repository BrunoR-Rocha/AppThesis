import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  BooleanInput,
  NumberInput,
  SelectInput,
  ReferenceInput,
} from "react-admin";

export default function QuestionnaireQuestionForm(props) {
  return (
    <SimpleForm {...props}>
      <ReferenceInput source="questionnaire_id" reference="questionnaires">
        <SelectInput
          optionText="title"
          label="Question"
          validate={required()}
        />
      </ReferenceInput>
      <TextInput source="question" validate={required()} />
      <NumberInput source="order" />
      <BooleanInput source="enabled" validate={required()} />
    </SimpleForm>
  );
}
