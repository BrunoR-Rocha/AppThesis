import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  RichTextField,
  DateField,
  BooleanField,
} from "react-admin";

export default function NewsShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <BooleanField source="anonymous" />
          <TextField source="name" />
          <TextField source="email" />
          <TextField source="phone" />
          <TextField source="subject" />
          <RichTextField source="description" />
          <DateField source="report_date" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
