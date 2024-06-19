import * as React from "react";
import { Edit } from "react-admin";
import FaqForm from "./FaqForm";

export default function FaqEdit(props) {
  return (
    <Edit {...props}>
      <FaqForm {...props} />
    </Edit>
  );
}
