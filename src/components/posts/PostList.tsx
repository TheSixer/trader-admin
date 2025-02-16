import { ReactElement } from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  ReferenceField,
  usePermissions,
  useRecordContext,
  SearchInput,
  ReferenceInput,
  SelectInput,
  FilterButton,
  FilterForm,
} from "react-admin";
import { Typography, Tooltip, Chip, Box } from '@mui/material';
import { ITruncatedTextFieldProps, ITagsFieldProps } from '../../types/props';

// 自定义字段组件，用于截断长文本
const TruncatedTextField = ({ 
  source,
  maxLength = 100,
}: Omit<ITruncatedTextFieldProps, 'record'>): ReactElement | null => {
  const record = useRecordContext();
  
  if (!record || !record[source]) {
    return <Typography>-</Typography>;  // 返回空占位符而不是 null
  }
  
  const text = String(record[source]);
  const shouldTruncate = text.length > maxLength;
  
  return (
    <Tooltip title={shouldTruncate ? text : ""} placement="top">
      <Typography>
        {shouldTruncate ? `${text.substring(0, maxLength)}...` : text}
      </Typography>
    </Tooltip>
  );
};

// 标签展示组件
const TagsField: React.FC<ITagsFieldProps> = (): ReactElement => {
  const record = useRecordContext();
  
  if (!record?.tags?.length) {
    return <Typography>-</Typography>;
  }
  
  return (
    <Box display="flex" gap={1} flexWrap="wrap">
      {record.tags.map((tag: string) => (
        <Chip 
          key={tag} 
          label={tag}
          size="small"
        />
      ))}
    </Box>
  );
};

const postFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput source="category_id" reference="categories">
    <SelectInput optionText="name" label="分类" />
  </ReferenceInput>,
];

export const PostList = (): ReactElement => {
  const { permissions } = usePermissions();
  
  return (
    <List 
      filters={postFilters}
      filterDefaultValues={{ q: '', category_id: '' }}
    >
      <Datagrid>
        <TruncatedTextField source="title" maxLength={30} label="标题" />
        <TruncatedTextField source="content" maxLength={50} label="内容" />
        <TextField source="category_name" label="分类" />
        <TagsField label="标签" />
        <ReferenceField source="user_id" reference="users" label="作者">
          <TextField source="username" />
        </ReferenceField>
        <DateField source="created_at" label="创建时间" showTime />
        <TextField source="views" label="浏览量" />
        <TextField source="likes" label="点赞数" />
        <TextField source="comment_count" label="评论数" />
        <EditButton />
        {permissions === 'admin' && <DeleteButton />}
      </Datagrid>
    </List>
  );
}; 