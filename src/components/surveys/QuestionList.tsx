import {
  List,
  Datagrid,
  TextField,
  SelectField,
  BooleanField,
  EditButton,
  DeleteButton,
  usePermissions,
} from "react-admin";

const questionTypes = [
  { id: 'single', name: '单选' },
  { id: 'multiple', name: '多选' },
  { id: 'text', name: '文本' },
];

export const QuestionList = () => {
  const { permissions } = usePermissions();
  
  return (
    <List>
      <Datagrid>
        <TextField source="title" label="问题标题" />
        <SelectField 
          source="type" 
          label="问题类型" 
          choices={questionTypes}
        />
        <BooleanField source="is_required" label="是否必填" />
        <TextField source="sort_order" label="排序" />
        {permissions === 'admin' && <EditButton />}
        {permissions === 'admin' && <DeleteButton />}
      </Datagrid>
    </List>
  );
}; 