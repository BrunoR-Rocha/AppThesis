import React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  BooleanField,
  Datagrid,
  ReferenceManyField,
  CreateButton,
  TopToolbar,
  useRecordContext
} from "react-admin";

export default function ForumCategoryShow(props) {
  const ThreadCreateButton = () => {
    const record = useRecordContext();
    return (
      <CreateButton
          basePath="/forum_threads"
          label="Adicionar thread"
          variant="contained"
          to={`/forum_threads/create?category_id=${record.id}`}
      />
    );
  };

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Detalhes">
          <TextField source="tag" />
          <TextField source="name" />
          <BooleanField source="active" />
        </Tab>

        <Tab label="Threads">
          <ReferenceManyField reference="forum_threads" target="forum_category_id" addLabel={false}>
            <TopToolbar>
              <ThreadCreateButton />
            </TopToolbar>
            <Datagrid bulkActionButtons={false}>
              <TextField source="title" />
              <TextField source="description" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
