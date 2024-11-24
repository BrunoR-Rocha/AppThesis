import * as React from "react";
import { Edit } from "react-admin";
import StaticForm from "./StaticForm";

export default function StaticEdit(props) {
  return (
    <Edit {...props}>
      <StaticForm {...props} />
    </Edit>
  );
}
