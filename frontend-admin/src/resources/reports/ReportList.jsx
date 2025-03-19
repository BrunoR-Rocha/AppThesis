import * as React from "react";
import { List, Datagrid, TextField, ShowButton, DateField, BooleanField } from "react-admin";

export default function ReportList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="subject" />
        <TextField source="name" />
        <BooleanField source="anonymous" />
        <DateField source="report_date" />
        <ShowButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
