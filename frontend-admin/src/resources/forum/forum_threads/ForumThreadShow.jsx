import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  BooleanField,
  ReferenceField,
} from "react-admin";

export default function ForumThreadShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="title" />
          <TextField source="description" />
          <ReferenceField
            source="forum_category_id"
            reference="forum_categories"
            link="show"
          >
            <TextField source="name" />
          </ReferenceField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
