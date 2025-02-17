import * as React from "react";
import { List, Datagrid, TextField, ShowButton, EditButton, ReferenceField, SelectField, RichTextField, TopToolbar, CreateButton, ExportButton } from "react-admin";
import CustomGenerateButton from "../../components/general/CustomGenerateButton";
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';

const ListActions = () => (
  <TopToolbar>
      <CustomGenerateButton 
        label={'Generate Questions'} 
        endpoint={'/llm/question'} 
        icon={<CloudSyncOutlinedIcon />}
      />
      <CreateButton/>
      <ExportButton/>
  </TopToolbar>
);

const EmptyList = () => (
  <div style={{ textAlign: 'center', marginTop: '2em' }}>
      <p>No records found.</p>
      <CustomGenerateButton
          label={'Generate Questions'} 
          endpoint={'/llm/question'} 
          icon={<CloudSyncOutlinedIcon />}
      />
  </div>
);

export default function QuestionList(props) {
  return (
    <List perPage={25} actions={<ListActions />} {...props} empty={<EmptyList />}>
      <Datagrid>
        <TextField source="id" />
        <RichTextField source="title" />
        <SelectField source="status" choices={[
            { id: 'active', name: 'Active' },
            { id: 'inactive', name: 'Inactive' },
            { id: 'pending', name: 'Pending' },
        ]} />
        <ReferenceField source="type_id" reference="question_types" label="Question Type">
          <TextField source="name" />
        </ReferenceField>

        <ReferenceField source="user_id" reference="users" label="Author">
          <TextField source="name" />  
        </ReferenceField>
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
