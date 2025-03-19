import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  ReferenceField,
  FunctionField,
} from "react-admin";
import CustomGenerateButton from "../../components/general/CustomGenerateButton";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";

export default function QuizList(props) {
  return (
    <List perPage={25} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <ReferenceField
          source="topic_id"
          reference="question_topics"
          label="Topic"
        >
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          label="Assessment"
          render={(record) => (
            <CustomGenerateButton
              label="Assessment for quiz"
              method="POST"
              endpoint={`/quiz/${record.id}/assessment`}
              icon={<CloudSyncOutlinedIcon />}
            />
          )}
        />
        <ShowButton basePath={props.basePath} />
        <EditButton basePath={props.basePath} />
      </Datagrid>
    </List>
  );
}
