import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  BooleanField,
} from "react-admin";

export default function LibraryPageList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
