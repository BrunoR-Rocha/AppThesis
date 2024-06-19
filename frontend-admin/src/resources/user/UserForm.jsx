import * as React from "react";
import { SimpleForm, TextInput, DateInput, required, SelectInput, PasswordInput } from "react-admin";

export default function UserForm(props) {
  return (
    <SimpleForm {...props}>
      <TextInput source="name" validate={required()} />
      <TextInput source="email" validate={required()} />
      <TextInput source="phone_number" validate={required()} />
      <DateInput source="birth_date" validate={required()} />
      <PasswordInput source="password" />
      <SelectInput source ="role" validate={required()} choices={[
        {id: 'admin', name: 'Admin'},
        {id: 'user', name: 'Utilizador'},
      ]} defaultValue={'user'}/>
    </SimpleForm>
  );
}