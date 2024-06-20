import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  BooleanField,
  RichTextField,
} from "react-admin";

export default function NewsShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Detalhes">
          <TextField source="title" />
          <RichTextField source="body" />
          <TextField source="doi" />
          <TextField source="journal_title" />
          <BooleanField source="enabled" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
