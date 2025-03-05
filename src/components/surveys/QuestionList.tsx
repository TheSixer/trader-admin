import {
  List,
  Datagrid,
  TextField,
  SelectField,
  BooleanField,
  EditButton,
  DeleteButton,
  usePermissions,
  useRecordContext,
} from "react-admin";

const questionTypes = [
  { id: 'single', name: '单选' },
  { id: 'multiple', name: '多选' },
  { id: 'text', name: '文本' },
];

// 自定义布尔字段组件，确保正确处理数值型布尔值
const BooleanNumField = ({ source, label }: { source: string; label?: string }) => {
  const record = useRecordContext();
  return (
    <BooleanField 
      source={source} 
      label={label}
      looseValue 
      valueLabelTrue="是"
      valueLabelFalse="否"
      record={{ ...record, [source]: Boolean(record?.[source]) }}
    />
  );
};

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
        <BooleanNumField source="is_required" label="是否必填" />
        <TextField source="sort_order" label="排序" />
        {permissions === 'admin' && <EditButton />}
        {permissions === 'admin' && <DeleteButton />}
      </Datagrid>
    </List>
  );
}; 