import * as React from "react";
import { SimpleForm, TextInput, required, NumberInput, FileInput, SelectInput, ReferenceInput, FileField, ImageInput, ImageField, useRedirect, useNotify } from "react-admin";
import { generateDifficultyChoices } from "../../utils/helpers";
import apiUrl from "../../providers/apiUrl";
import { httpClient } from "../../providers/dataProvider";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

const difficultyChoices = generateDifficultyChoices(1, 10);

export default function CourseForm(props) {
  const redirect = useRedirect();
  const notify = useNotify();

  const submit = (data) => {
    let formData = new FormData();

    if (data.image && data.image.rawFile) {
      formData.append("image", data.image.rawFile);
    }

    for (let key in data) {
      if (key === "tags")
        formData.append(key, JSON.stringify(data[key]));
      else if (key !== "image") formData.append(key, data[key]);
    }
    let requestUrl = apiUrl + "/courses";

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
        redirect("list", "courses");
      })
      .catch((err) => notify(err.message, { type: "error" }));
  };

  return (
    <SimpleForm {...props} onSubmit={submit}>
      <TextInput source="title" validate={required()} />
      <RichTextInput source="description" validate={required()}/>

      <ReferenceInput source="topic_id" reference="question_topics">
        <SelectInput optionText="name" />
      </ReferenceInput>

      <NumberInput source="average_time" helperText="In minutes" step={1}/>
      <SelectInput source="difficulty" choices={difficultyChoices} helperText="Average course difficulty" /> 

      <ImageInput source="image" label="Related Image">
        <ImageField source="src" title="title" />
      </ImageInput>

    </SimpleForm>
  );
}
