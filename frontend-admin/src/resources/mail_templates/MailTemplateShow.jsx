import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  BooleanField,
  RichTextField,
} from "react-admin";

export default function MailTemplateShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="tag" />
          <TextField source="description" />
          <RichTextField source="content" />
          <BooleanField source="enabled" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
