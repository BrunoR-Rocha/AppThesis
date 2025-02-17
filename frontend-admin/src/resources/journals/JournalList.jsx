import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  BooleanField,
  Button,
  TopToolbar,
  CreateButton,
  ExportButton
} from "react-admin";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
import CustomGenerateButton from "../../components/general/CustomGenerateButton";

const EmptyList = () => (
  <div style={{ textAlign: 'center', marginTop: '2em' }}>
      <p>No records found.</p>
      <CustomGenerateButton
          label="Generate Journals"
          endpoint="/journals/autoUpdate"
          icon={<CloudSyncOutlinedIcon />}
      />
  </div>
);

const ListActions = () => (
  <TopToolbar>
    <CustomGenerateButton
      label={"Update Journals"}
      endpoint={"/journals/autoUpdate"}
      icon={<CloudSyncOutlinedIcon />}
    />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export default function JournalList(props) {
  return (
    <List perPage={25} actions={<ListActions />} {...props} empty={<EmptyList />}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="publisher" />
        <TextField source="cite_score" />
        <BooleanField source="enabled" />
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
