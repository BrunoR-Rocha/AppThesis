import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  BooleanField,
  RichTextField,
} from "react-admin";

export default function FaqShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="title" />
          <RichTextField source="body" />
          <TextField source="section" />
          <BooleanField source="enabled" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
