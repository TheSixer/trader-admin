import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  SelectField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { usePermissions } from 'react-admin';

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

export const UserList = () => {
  const { permissions } = usePermissions();
  
  return (
    <List>
      <Datagrid>
        <TextField source="username" label="用户名" />
        <EmailField source="email" label="邮箱" />
        <TextField source="phone" label="电话" />
        <SelectField source="role" choices={roleChoices} label="角色" />
        <SelectField source="status" choices={statusChoices} label="状态" />
        <DateField source="created_at" label="创建时间" showTime />
        <DateField source="last_login" label="最后登录" showTime />
        {permissions === 'admin' && <EditButton />}
        {permissions === 'admin' && <DeleteButton />}
      </Datagrid>
    </List>
  );
}; 