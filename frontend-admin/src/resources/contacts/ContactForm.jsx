import * as React from "react";
import { SimpleForm, TextInput, required, BooleanInput, SelectInput } from "react-admin";

const RichTextInput = React.lazy(() => 
  import('ra-input-rich-text').then(module => ({
    default: module.RichTextInput,
  }))
);

export default function ContactForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="name" validate={required()}/>
      <TextInput source="subject" validate={required()} />
      <TextInput source="email" validate={required()} />
      <RichTextInput source="message" validate={required()} />
      <BooleanInput source="archived" validate={required()} />
    </SimpleForm>
  );
}