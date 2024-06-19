import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  ReferenceField,
} from "react-admin";

export default function ForumPostShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Detalhes">
          <TextField source="body" />
          <ReferenceField source="forum_thread_id" reference="forum_threads" link="show">
            <TextField source="title" />
          </ReferenceField>
          <ReferenceField source="user_id" reference="users" link="show">
            <TextField source="name" />
          </ReferenceField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
