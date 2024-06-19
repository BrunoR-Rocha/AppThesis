import * as React from "react";
import { List, Datagrid, TextField, ShowButton, EditButton, ReferenceField, RichTextField, BooleanField } from "react-admin";

export default function QuestionOptionList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid>
        <ReferenceField source="question_id" reference="questions" label="Question">
            <RichTextField source="title" />
        </ReferenceField>
        <RichTextField source="option_text" />
        <BooleanField source="is_correct" />
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
