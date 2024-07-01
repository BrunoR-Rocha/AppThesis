import React from "react";
import { TextField, Show, TabbedShowLayout, Tab } from "react-admin";

export default function QuestionTopicShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="name" />
          <TextField source="tag" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
