import * as React from "react";
import { Edit } from "react-admin";
import SysConfigForm from "./SysConfigForm";

export default function SysConfigEdit(props) {
  return (
    <Edit {...props}>
      <SysConfigForm {...props} />
    </Edit>
  );
}
