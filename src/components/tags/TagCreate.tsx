import {
  Create,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const TagCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} label="名称" />
      <TextInput source="slug" validate={[required()]} label="标识符" />
      <TextInput source="type" label="类型" />
    </SimpleForm>
  </Create>
); 