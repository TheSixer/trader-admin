import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ReferenceField,
  NumberField,
  useRecordContext,
} from "react-admin";
import { MarkdownPreview } from "./MarkdownEditor";
import "./PostShow.css";

export const PostShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" label="标题" />
      <ReferenceField source="user_id" reference="users" label="作者">
        <TextField source="username" />
      </ReferenceField>
      <NumberField source="views" label="浏览量" />
      <NumberField source="likes" label="点赞数" />
      <TextField source="category" label="分类" />
      <DateField source="created_at" label="创建时间" showTime />
      <DateField source="updated_at" label="更新时间" showTime />
      <MarkdownField source="content" label="详情" />
    </SimpleShowLayout>
  </Show>
);

// 自定义 Markdown 渲染字段
const MarkdownField = ({ source }: { source: string; label?: string }) => {
  const record = useRecordContext();

  if (!record || !record[source]) return null;

  return (
    <div className="markdown-content">
      <MarkdownPreview text={record[source]} />
    </div>
  );
};
