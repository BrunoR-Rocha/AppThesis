import * as React from "react";
import { Create } from "react-admin";
import NewsForm from "./NewsForm";

export default function NewsCreate(props) {
  return (
    <Create title="Adicionar novo" {...props}>
      <NewsForm {...props} />
    </Create>
  );
}
