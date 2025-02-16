import {
  Edit,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} label="名称" />
      <TextInput source="description" multiline label="描述" />
    </SimpleForm>
  </Edit>
); 