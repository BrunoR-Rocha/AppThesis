import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  ReferenceField,
} from "react-admin";

export default function QuizList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <ReferenceField
          source="topic_id"
          reference="question_topics"
          label="Topic"
        >
          <TextField source="name" />
        </ReferenceField>
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
