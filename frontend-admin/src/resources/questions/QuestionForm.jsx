import * as React from "react";
import {
  ArrayInput,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  required,
  useNotify,
  useRedirect,
} from "react-admin";
import apiUrl from "../../providers/apiUrl";
import { httpClient } from "../../providers/dataProvider";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

export default function QuestionForm(props) {
  const redirect = useRedirect();
  const notify = useNotify();

  const submit = (data) => {
    let formData = new FormData();

    if (data.image && data.image.rawFile) {
      formData.append("image", data.image.rawFile);
    }

    for (let key in data) {
      if (key === "tags") {
        data[key].forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag);
        });
      } else if (key !== "image") {
        formData.append(key, data[key]);
      }
    }
    let requestUrl = apiUrl + "/questions";

    if (data.id) {
      requestUrl = requestUrl + "/" + data.id;
    }

    httpClient(requestUrl, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        notify("Atualizado com sucesso", {
          type: "success",
        });
        redirect("list", "questions");
      })
      .catch((err) => notify(err.message, { type: "error" }));
  };

  return (
    <SimpleForm {...props} onSubmit={submit}>
      <RichTextInput source="title" validate={required()} />

      <ReferenceInput source="type_id" reference="question_types">
        <SelectInput optionText="name" label="Question Type" />
      </ReferenceInput>

      <ReferenceInput source="user_id" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>

      <RichTextInput source="explanation" />
      <RichTextInput source="hint" />

      <SelectInput
        source="status"
        choices={[
          { id: "pending", name: "Pending" },
          { id: "active", name: "Active" },
          { id: "inactive", name: "Inactive" },
        ]}
      />
      <NumberInput source="difficulty" min={1} max={100} step={1} />

      <ImageInput source="image" label="Related Image">
        <ImageField source="src" title="title" />
      </ImageInput>

      <ArrayInput source="tags">
        <SimpleFormIterator inline>
          <TextInput source="" helperText={false} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
}
