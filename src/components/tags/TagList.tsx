import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  usePermissions,
} from "react-admin";

export const TagList = () => {
  const { permissions } = usePermissions();
  
  return (
    <List>
      <Datagrid>
        <TextField source="name" label="名称" />
        <TextField source="slug" label="标识符" />
        <TextField source="type" label="类型" />
        <DateField source="created_at" label="创建时间" showTime />
        {permissions === 'admin' && <EditButton />}
        {permissions === 'admin' && <DeleteButton />}
      </Datagrid>
    </List>
  );
}; 