import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  BooleanField,
  Button
} from "react-admin";

export default function JournalList(props) {
  return (
    <List perPage={25} {...props} >
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="publisher" />
        <TextField source="cite_score" />
        <BooleanField source="enabled" />
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
