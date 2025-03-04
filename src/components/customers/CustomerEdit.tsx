import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  email,
} from "react-admin";

export const CustomerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" validate={[required()]} label="用户名" />
      <TextInput source="email" validate={[email()]} label="邮箱" />
      <TextInput source="phone" label="电话" />
      <TextInput source="remark" multiline label="备注" />
      <TextInput source="password" type="password" label="密码（留空则不修改）" />
    </SimpleForm>
  </Edit>
); 