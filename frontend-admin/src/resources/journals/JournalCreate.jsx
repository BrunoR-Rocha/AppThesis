import * as React from "react";
import { Create } from "react-admin";
import JournalForm from "./JournalForm";

export default function JournalCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <JournalForm {...props} />
    </Create>
  );
}
