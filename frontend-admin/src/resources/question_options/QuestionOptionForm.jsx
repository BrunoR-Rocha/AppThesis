import * as React from "react";
import { BooleanInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";

export default function QuestionOptionForm(props) {
  return (
    <SimpleForm {...props}>
      <ReferenceInput source="question_id" reference="questions" >
        <SelectInput optionText="title" label="Question" validate={required()}/>
      </ReferenceInput>
      <TextInput source="option_text" validate={required()} />
      <BooleanInput source="is_correct" validate={required()} />
    </SimpleForm>
  );
}
