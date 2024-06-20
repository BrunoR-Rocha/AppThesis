import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  SelectInput,
  NumberInput,
  ReferenceInput,
} from "react-admin";
import { generateDifficultyChoices } from "../../utils/helpers";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function QuizForm(props) {
  const difficultyChoices = generateDifficultyChoices(1, 10);

  return (
    <SimpleForm {...props}>
      <TextInput source="title" validate={required()} />
      <RichTextInput source="description" />
      <ReferenceInput source="topic_id" reference="question_topics">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <SelectInput source="difficulty" choices={difficultyChoices} />
      <NumberInput source="time_limit" label="Time Limit (minutes)" min={1}/>
    </SimpleForm>
  );
}
