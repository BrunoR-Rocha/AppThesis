import * as React from "react";
import { List, Datagrid, TextField, ShowButton, EditButton, ReferenceField } from "react-admin";

export default function LessonList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <ReferenceField source="course_id" reference="courses" link="show">
            <TextField source="title" />
          </ReferenceField>
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
