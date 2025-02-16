import {
  Create,
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

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" validate={[required()]} label="用户名" />
      <TextInput 
        source="password" 
        type="password" 
        validate={[required()]} 
        label="密码" 
      />
      <TextInput source="email" validate={[email()]} label="邮箱" />
      <TextInput source="phone" label="电话" />
      <SelectInput 
        source="role" 
        choices={roleChoices} 
        defaultValue="user"
        label="角色" 
      />
      <TextInput source="description" multiline label="描述" />
    </SimpleForm>
  </Create>
); 