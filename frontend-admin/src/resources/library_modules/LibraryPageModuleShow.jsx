import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  BooleanField,
  RichTextField,
  NumberField,
  ReferenceField,
} from "react-admin";

export default function LibraryPageModuleShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <ReferenceField
            source="library_page_id"
            reference="library_pages"
            link="show"
          >
            <TextField source="title" />
          </ReferenceField>
          <TextField source="title" />
          <RichTextField source="content" />
          <NumberField source="position" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
