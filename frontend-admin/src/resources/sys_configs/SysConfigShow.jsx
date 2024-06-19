import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  BooleanField,
  RichTextField,
} from "react-admin";

export default function SysConfigShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Detalhes">
          <TextField source="tag" />
          <RichTextField source="description" label="Descrição"/>
          <TextField source="value" label="Valor" />
          <TextField source="input_type" label="Tipo de input" />
          <BooleanField source="input_rules" label="Regras associadas" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
