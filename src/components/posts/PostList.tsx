import { ReactElement } from "react";
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
  BooleanField,
  ImageField,
} from "react-admin";
import { Typography, Tooltip, Chip, Box } from "@mui/material";
import { ITruncatedTextFieldProps, ITagsFieldProps } from "../../types/props";

// 自定义字段组件，用于截断长文本
const TruncatedTextField = ({
  source,
  maxLength = 100,
}: Omit<ITruncatedTextFieldProps, "record">): ReactElement | null => {
  const record = useRecordContext();

  if (!record || !record[source]) {
    return <Typography>-</Typography>; // 返回空占位符而不是 null
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
        <Chip key={tag} label={tag} size="small" />
      ))}
    </Box>
  );
};

// 自定义布尔字段组件
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

const postFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <ReferenceInput key="category" source="category_id" reference="categories">
    <SelectInput optionText="name" label="分类" />
  </ReferenceInput>,
];

export const PostList = (): ReactElement => {
  const { permissions } = usePermissions();

  return (
    <List
      filters={postFilters}
      filterDefaultValues={{ q: "", category_id: "" }}
    >
      <Datagrid>
        <ImageField source="cover_image" label="封面" />
        <TextField source="title" label="标题" />
        <TextField source="category_name" label="分类" />
        <TagsField label="标签" />
        <BooleanNumField source="is_recommended" label="推荐" />
        <BooleanNumField source="is_top" label="置顶" />
        <DateField source="created_at" label="创建时间" showTime />
        <TextField source="views" label="浏览量" />
        <TextField source="likes" label="点赞数" />
        <TextField source="comment_count" label="评论数" />
        <EditButton />
        {permissions === "admin" && <DeleteButton />}
      </Datagrid>
    </List>
  );
};
