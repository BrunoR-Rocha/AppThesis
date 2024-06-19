import * as React from "react";
import { 
    List, 
    Datagrid, 
    TextField, 
    ShowButton,
    EditButton,
    BooleanField,
    SelectField
} from "react-admin";

export default function NewsList(props) {
    return (
      <List perPage={25} {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="title" />
          <BooleanField source="enabled" />
          <ShowButton basePath={props.basePath} />
          <EditButton basePath={props.basePath} />
        </Datagrid>
      </List>
    );
  }