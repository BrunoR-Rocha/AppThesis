import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  BooleanField,
  CreateButton,
  ExportButton,
  TopToolbar,
} from "react-admin";
import CustomGenerateButton from "../../components/general/CustomGenerateButton";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";

const ListActions = () => (
  <TopToolbar>
    <CustomGenerateButton
      label={"Update News"}
      endpoint={"/news/autoUpdate"}
      icon={<CloudSyncOutlinedIcon />}
    />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const EmptyList = () => (
  <div style={{ textAlign: 'center', marginTop: '2em' }}>
      <p>No records found.</p>
      <CustomGenerateButton
          label="Generate News"
          endpoint="/news/autoUpdate"
          icon={<CloudSyncOutlinedIcon />}
      />
  </div>
);

export default function NewsList(props) {
  return (
    <List perPage={25} actions={<ListActions />} {...props} empty={<EmptyList />}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <BooleanField source="enabled" />
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
