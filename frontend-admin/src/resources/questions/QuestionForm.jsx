import * as React from "react";
import { ArrayInput, AutocompleteInput, ImageField, ImageInput, ReferenceInput, SelectInput, SimpleForm, SimpleFormIterator, TextInput, required } from "react-admin";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);
export default function QuestionForm(props) {
  return (
    <SimpleForm {...props}>
      <RichTextInput source="title" validate={required()} />

      <ReferenceInput source="type_id" reference="question_types">
        <SelectInput optionText="name"/>
      </ReferenceInput>

      <ReferenceInput source="user_id" reference="users">
        <SelectInput optionText="name"/>
      </ReferenceInput>

      <RichTextInput source="explanation" />
      <RichTextInput source="hint" />

      <SelectInput source="status" choices={[
          { id: 'active', name: 'Active' },
          { id: 'inactive', name: 'Inactive' },
          { id: 'pending', name: 'Pending' },
      ]} />

      <ImageInput source="pictures" label="Related pictures">
        <ImageField source="src" title="title" />
      </ImageInput>

      <ArrayInput source="tags">
        <SimpleFormIterator inline>
            <TextInput source="title" helperText={false} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
}
