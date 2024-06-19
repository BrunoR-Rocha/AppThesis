import React from "react";
import { 
  TextField, 
  Show, 
  TabbedShowLayout, 
  Tab, 
  ArrayField, 
  ImageField, 
  SingleFieldList, 
  ChipField, 
  ReferenceField,
  SelectField,
  RichTextField,
  Datagrid,
  BooleanField,
  useRecordContext,
  TopToolbar,
  CreateButton
} from "react-admin";
import { generateDifficultyChoices } from "../../utils/helpers";

const OptionToolbar = () => {
  const record = useRecordContext();
  return (
    <TopToolbar>
      <CreateButton resource="question_options" label="Add Option" record={{ question_id: record.id }} />
    </TopToolbar>
  );
};

export default function QuestionShow(props) {
  const difficultyChoices = generateDifficultyChoices(1, 10);

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Detalhes">
          <RichTextField source="title" />

          <ReferenceField source="type_id" reference="question_types" label="Question Type">
            <TextField source="name" />
          </ReferenceField>

          <ReferenceField source="user_id" reference="users" label="Author">
            <TextField source="name" />  
          </ReferenceField>

          <SelectField source="status" choices={[
              { id: 'active', name: 'Active' },
              { id: 'inactive', name: 'Inactive' },
              { id: 'pending', name: 'Pending' },
          ]} />

          <SelectField source="difficulty" choices={difficultyChoices} />

          <RichTextField source="explanation" />
          <RichTextField source="hint" />

          <ImageField source="image" label="Imagem descritiva" />

          <ArrayField source="tags">
            <SingleFieldList linkType={false}>
              <ChipField source="title" size="small" />
            </SingleFieldList>
          </ArrayField>

        </Tab>
        <Tab label="Opções">
          <OptionToolbar />
          <ArrayField source="options" label="">
            <Datagrid optimized bulkActionButtons={false}>
              <TextField source="option_text" label="Opção" />
              <BooleanField source="is_correct" label="Correto?" />
            </Datagrid>
          </ArrayField>
        </Tab>
        <Tab label="Tópicos Relacionados">
          <ArrayField source="topics" label="">
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
