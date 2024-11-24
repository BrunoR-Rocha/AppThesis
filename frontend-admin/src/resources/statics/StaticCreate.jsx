import * as React from "react";
import { Create } from "react-admin";
import StaticForm from "./StaticForm";

export default function StaticCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <StaticForm {...props} />
    </Create>
  );
}
