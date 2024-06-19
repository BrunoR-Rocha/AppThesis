import * as React from "react";
import { Create } from "react-admin";
import UserForm from "./UserForm";

export default function UserCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <UserForm {...props} />
    </Create>
  );
}