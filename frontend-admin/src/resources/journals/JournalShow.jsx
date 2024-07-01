import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  RichTextField,
  BooleanField,
} from "react-admin";

export default function JournalShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="title" />
          <TextField source="publisher" />
          <TextField source="link" />
          <TextField source="cite_score" />
          <TextField source="subject_area" />
          <TextField source="issn" />
          <TextField source="coverage_start" />
          <TextField source="coverage_end" />
          <TextField source="doi_breakdown_by_year" />
          <BooleanField source="enabled" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
