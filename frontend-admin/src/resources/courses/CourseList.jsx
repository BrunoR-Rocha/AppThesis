import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
} from "react-admin";

export default function CourseList(props) {
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
