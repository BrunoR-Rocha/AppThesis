import * as React from "react";
import { SimpleForm, TextInput, required, NumberInput, BooleanInput } from "react-admin";

const JsonInput = ({ source, ...props }) => {
  return (
    <TextInput
      source={source}
      {...props}
      format={(value) => (value ? JSON.stringify(value) : '')}
      parse={(value) => {
        try {
          return JSON.parse(value);
        } catch (error) {
          return value;
        }
      }}
    />
  );
};

export default function JournalForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="title" validate={required()} label="Título" />
      <TextInput source="publisher" label="Editor"/>
      <TextInput source="link" label="Link"/>
      <NumberInput source="cite_score" />
      <TextInput source="coverage_start" />
      <TextInput source="coverage_end" />

      {/* TODO: Improve the json display and inputs */}
      <JsonInput source="subject_area" />
      <JsonInput source="issn" />
      <JsonInput source="doi_breakdown_by_year" />
      {/*  */}
      
      <BooleanInput source="enabled" />
    </SimpleForm>
  );
}
