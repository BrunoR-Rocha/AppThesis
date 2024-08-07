import * as React from "react";
import { List, Datagrid, TextField, ShowButton, EditButton, BooleanField } from "react-admin";

export default function CourseContentTypeList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <BooleanField source="enabled" />
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
