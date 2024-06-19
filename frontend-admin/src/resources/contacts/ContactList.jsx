import * as React from "react";
import { 
    List, 
    Datagrid, 
    TextField, 
    ShowButton,
    BooleanField
} from "react-admin";

export default function ContactList(props) {
    return (
      <List perPage={25} {...props}>
        <Datagrid bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="subject" />
          <BooleanField source="archived" />
          <ShowButton basePath={props.basePath} />
        </Datagrid>
      </List>
    );
  }