import * as React from "react";
import { 
    List, 
    Datagrid, 
    TextField, 
    EmailField, 
    ShowButton,
    EditButton,
    DateField
} from "react-admin";

export default function UserList(props) {
    return (
      <List perPage={25} {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="phone_number" />
          <DateField source="birth_date" />
          <ShowButton basePath={props.basePath} />
          <EditButton basePath={props.basePath} />
        </Datagrid>
      </List>
    );
  }