import React from "react";
import { 
  TextField, 
  Show, 
  TabbedShowLayout, 
  Tab, 
  ArrayField, 
  ImageField, 
  SingleFieldList, 
  ChipField 
} from "react-admin";

export default function QuestionShow(props) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Detalhes">
          <TextField source="title" />

          <ReferenceField source="type_id" reference="question_types" label="Question Type">
            <TextField source="name" />
          </ReferenceField>

          <ReferenceField source="user_id" reference="users" label="Author" />

          <SelectField source="status" choices={[
              { id: 'active', name: 'Active' },
              { id: 'inactive', name: 'Inactive' },
              { id: 'pending', name: 'Pending' },
          ]} />

          <TextField source="explanation" />
          <TextField source="hint" />

          <ImageField source="image_path" title="Imagem descritiva" />

          <ArrayField source="tags">
            <SingleFieldList linkType={false}>
              <ChipField source="name" size="small" />
            </SingleFieldList>
          </ArrayField>

        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
