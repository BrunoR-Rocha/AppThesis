import * as React from "react";
import { Create } from "react-admin";
import ContactForm from "./ContactForm";

export default function ContactCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <ContactForm {...props} />
    </Create>
  );
}
