import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { usePermissions } from 'react-admin';

export const CustomerList = () => {
  const { permissions } = usePermissions();
  
  return (
    <List>
      <Datagrid>
        <TextField source="username" label="用户名" />
        <EmailField source="email" label="邮箱" />
        <TextField source="phone" label="电话" />
        <TextField source="remark" label="备注" />
        <DateField source="created_at" label="创建时间" showTime />
        <DateField source="last_login" label="最后登录" showTime />
        {permissions === 'admin' && <EditButton />}
        {permissions === 'admin' && <DeleteButton />}
      </Datagrid>
    </List>
  );
}; 