import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  EditButton,
  DeleteButton,
  usePermissions,
  ReferenceInput,
  SelectInput,
  SearchInput,
} from "react-admin";
import { Box, Typography } from '@mui/material';

// 自定义空数据展示组件
const CustomEmpty = () => (
  <Box textAlign="center" p={3}>
    <Typography variant="body1" color="textSecondary">
      暂无评论数据
    </Typography>
  </Box>
);

const commentFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <ReferenceInput key="article" source="article_id" reference="posts" label="文章">
    <SelectInput optionText="title" />
  </ReferenceInput>,
];

export const CommentList = () => {
  const { permissions } = usePermissions();
  
  return (
    <List 
      filters={commentFilters}
      filterDefaultValues={{ q: '', article_id: '' }}
      empty={<CustomEmpty />}
      sort={{ field: 'created_at', order: 'DESC' }}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="content" label="评论内容" />
        <ReferenceField 
          source="article_id" 
          reference="posts" 
          label="文章"
          link="show"
        >
          <TextField source="title" />
        </ReferenceField>
        <TextField source="user_id" label="评论者ID" />
        <TextField source="likes" label="点赞数" />
        <TextField source="dislikes" label="踩数" />
        <TextField source="reply_count" label="回复数" />
        <DateField source="created_at" label="创建时间" showTime />
        {permissions === 'admin' && (
          <>
            <EditButton />
            <DeleteButton />
          </>
        )}
      </Datagrid>
    </List>
  );
}; 