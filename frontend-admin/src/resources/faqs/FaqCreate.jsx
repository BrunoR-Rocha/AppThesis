import * as React from "react";
import { Create } from "react-admin";
import FaqForm from "./FaqForm";

export default function FaqCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <FaqForm {...props} />
    </Create>
  );
}
