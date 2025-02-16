import {
  Create,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} label="名称" />
      <TextInput source="description" multiline label="描述" />
    </SimpleForm>
  </Create>
); 