import * as React from "react";
import { Edit } from "react-admin";
import MailTemplateForm from "./MailTemplateForm";

export default function MailTemplateEdit(props) {
  return (
    <Edit {...props}>
      <MailTemplateForm {...props} />
    </Edit>
  );
}
