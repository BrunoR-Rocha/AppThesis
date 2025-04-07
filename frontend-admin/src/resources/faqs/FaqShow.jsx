import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  BooleanField,
  RichTextField,
  ArrayField,
  Datagrid,
} from "react-admin";

export default function FaqShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="tag" />
          <BooleanField source="enabled" />
          <ArrayField source="translations" label="Translations">
            <Datagrid bulkActionButtons={false}>
              <TextField source="locale" label="Locale" />
              <TextField source="title" label="Title" />
              <RichTextField source="body" label="Content" />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
