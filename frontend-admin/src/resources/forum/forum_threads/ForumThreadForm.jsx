import * as React from "react";
import { SimpleForm, TextInput, required, SelectInput, useGetList } from "react-admin";
import { useLocation } from "react-router-dom";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);



export default function ForumThreadForm(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get('category_id');
  const { data, isLoading } = useGetList('forum_categories');

  return (
    <SimpleForm {...props}>
      <TextInput source="title" validate={required()} />
      <RichTextInput source="description" validate={required()} />
      <SelectInput choices={data} isLoading={isLoading} source="forum_category_id" defaultValue={categoryId}/>
    </SimpleForm>
  );
}
