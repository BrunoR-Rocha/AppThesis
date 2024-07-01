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
        <Tab label="Details">
          <TextField source="name" />
          <TextField source="email" />
          <TextField source="subject" />
          <RichTextField source="message" />
          <BooleanField source="archived" />
          <BooleanField source="email_sent" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
