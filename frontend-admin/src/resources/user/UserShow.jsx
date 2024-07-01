import React from "react";
import { TextField, Show, TabbedShowLayout, Tab, DateField } from "react-admin";
import { UserTitle } from "./UserTitle";

export default function UserShow(props) {
  return (
    <Show title={<UserTitle />} {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <TextField source="name" />
          <TextField source="email" />
          <DateField source="birth_date" />
          <TextField source="phone_number" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
