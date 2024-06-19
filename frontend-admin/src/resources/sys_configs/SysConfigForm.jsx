import * as React from "react";
import { SimpleForm, TextInput, required, SelectInput } from "react-admin";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function SysConfigForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="tag" validate={required()} />
      <RichTextInput source="description" />
      <TextInput source="value" validate={required()}/>
      <SelectInput 
        source="input_type" 
        label="Tipo de input" 
        choices={[
          {id: 'boolean', name: 'Booleano'},
          {id: 'checkbox', name: 'CheckBox'},
          {id: 'text', name: 'Texto'}
        ]} 
      />
      <TextInput source="input_rules" />
    </SimpleForm>
  );
}
