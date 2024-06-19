import * as React from "react";
import { List, Datagrid, TextField, ShowButton, EditButton, ReferenceField, SelectField } from "react-admin";

export default function QuestionList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <SelectField source="status" choices={[
            { id: 'active', name: 'Active' },
            { id: 'inactive', name: 'Inactive' },
            { id: 'pending', name: 'Pending' },
        ]} />
        <ReferenceField source="type_id" reference="question_types" label="Question Type">
          <TextField source="name" />
        </ReferenceField>

        <ReferenceField source="user_id" reference="users" label="Author" />
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
