import * as React from "react";
import { Edit } from "react-admin";
import { UserTitle } from "./UserTitle";
import UserForm from "./UserForm";

export default function UserEdit(props) {
  return (
    <Edit title={<UserTitle />} {...props}>
      <UserForm {...props} />
    </Edit>
  );
}
