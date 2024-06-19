import * as React from "react";
import { Edit } from "react-admin";
import JournalForm from "./JournalForm";

export default function JournalEdit(props) {
  return (
    <Edit {...props}>
      <JournalForm {...props} />
    </Edit>
  );
}
