import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  ReferenceField,
} from "react-admin";

export default function CourseInteractiveElementList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <ReferenceField source="lesson_id" reference="lessons" link="show">
          <TextField source="title" />
        </ReferenceField>
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
