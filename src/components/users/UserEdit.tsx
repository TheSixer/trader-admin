import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  email,
} from "react-admin";

const roleChoices = [
  { id: 'admin', name: '管理员' },
  { id: 'editor', name: '编辑' },
  { id: 'user', name: '普通用户' },
];

const statusChoices = [
  { id: 'pending', name: '待审核' },
  { id: 'approved', name: '已通过' },
  { id: 'rejected', name: '已拒绝' },
];

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" validate={[required()]} label="用户名" />
      <TextInput source="email" validate={[email()]} label="邮箱" />
      <TextInput source="phone" label="电话" />
      <SelectInput source="role" choices={roleChoices} label="角色" />
      <SelectInput source="status" choices={statusChoices} label="状态" />
      <TextInput source="description" multiline label="描述" />
      <TextInput source="password" type="password" label="密码（留空则不修改）" />
    </SimpleForm>
  </Edit>
); 