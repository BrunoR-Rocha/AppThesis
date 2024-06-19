import React from "react";
import { TextField, Show, TabbedShowLayout, Tab, BooleanField, ReferenceField, RichTextField } from "react-admin";

export default function QuestionOptionShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Detalhes">
          <ReferenceField source="question_id" reference="questions" label="Question">
            <RichTextField source="title" />
          </ReferenceField>
          <TextField source="option_text" />
          <BooleanField source="is_correct" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
