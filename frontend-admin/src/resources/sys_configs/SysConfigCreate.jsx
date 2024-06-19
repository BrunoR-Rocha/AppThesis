import * as React from "react";
import { Create } from "react-admin";
import SysConfigForm from "./SysConfigForm";

export default function SysConfigCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <SysConfigForm {...props} />
    </Create>
  );
}
