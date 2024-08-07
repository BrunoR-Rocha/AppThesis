import React from "react";
import { TextField, Show, TabbedShowLayout, Tab, BooleanField } from "react-admin";

export default function CourseContentTypeShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="name" />
          <TextField source="tag" />
          <BooleanField source="enabled" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
