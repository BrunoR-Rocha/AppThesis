import * as React from "react";
import { SimpleForm, TextInput, required, BooleanInput } from "react-admin";

const RichTextInput = React.lazy(() => 
  import('ra-input-rich-text').then(module => ({
    default: module.RichTextInput,
  }))
);

export default function MailTemplateForm(props) {
  return (
    <SimpleForm {...props}>
      
      <TextInput source="tag" validate={required()} />
      <TextInput source="description" validate={required()} fullWidth/>
      <RichTextInput source="content" />
      <BooleanInput source="enabled" validate={required()} />

    </SimpleForm>
  );
}