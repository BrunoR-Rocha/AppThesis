import * as React from "react";
import { NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";

const RichTextInput = React.lazy(() => 
  import('ra-input-rich-text').then(module => ({
    default: module.RichTextInput,
  }))
);

export default function LibraryPageModuleForm(props) {
  return (
    <SimpleForm {...props}>
      <ReferenceInput source="library_page_id" reference="library_pages" >
        <SelectInput optionText="title" label="Page" validate={required()}/>
      </ReferenceInput>
      <TextInput source="title" />
      <RichTextInput source="content" />
      <NumberInput source="position" step={1}/>
    </SimpleForm>
  );
}
