import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  ArrayField,
  RichTextField,
  Datagrid,
} from "react-admin";

export default function StaticShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="tag" />
          <ArrayField source="translations" label="Translations">
            <Datagrid bulkActionButtons={false}>
              <TextField source="locale" label="Locale" />
              <TextField source="title" label="Title" />
              <RichTextField source="content" label="Content" />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
