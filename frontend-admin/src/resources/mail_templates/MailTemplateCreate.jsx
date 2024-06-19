import * as React from "react";
import { Create } from "react-admin";
import MailTemplateForm from "./MailTemplateForm";

export default function MailTemplateCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <MailTemplateForm {...props} />
    </Create>
  );
}
