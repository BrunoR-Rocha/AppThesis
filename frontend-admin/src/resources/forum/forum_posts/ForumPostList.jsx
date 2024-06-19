import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton
} from "react-admin";

export default function ForumPostList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="body" />
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
