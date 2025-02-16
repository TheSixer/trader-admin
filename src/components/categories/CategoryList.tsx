import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  usePermissions,
} from "react-admin";

export const CategoryList = () => {
  const { permissions } = usePermissions();
  
  return (
    <List>
      <Datagrid>
        <TextField source="name" label="名称" />
        <TextField source="description" label="描述" />
        <DateField source="created_at" label="创建时间" showTime />
        <DateField source="updated_at" label="更新时间" showTime />
        {permissions === 'admin' && <EditButton />}
        {permissions === 'admin' && <DeleteButton />}
      </Datagrid>
    </List>
  );
}; 