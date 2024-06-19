import * as React from "react";
import { SimpleForm, TextInput, required } from "react-admin";

export default function QuestionTopicForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="name" validate={required()} />
      <TextInput source="tag" validate={required()} />
    </SimpleForm>
  );
}
