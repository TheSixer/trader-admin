import { Edit, SimpleForm, TextInput, required, ReferenceInput, SelectInput } from "react-admin";
import { MarkdownInput } from "./MarkdownInput";
import { TagInput } from "./TagInput";

export const PostEdit = () => (
  <Edit
    transform={(data) => ({
      title: data.title,
      content: data.content,
      category_id: data.category_id,
      tags: data.tags || [],  // 确保标签数据被传递到后端
    })}
  >
    <SimpleForm>
      <TextInput 
        source="title" 
        validate={[required()]} 
        fullWidth 
        label="文章标题"
      />
      <ReferenceInput source="category_id" reference="categories" label="分类">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TagInput 
        source="tags"
        label="标签"
      />
      <MarkdownInput 
        source="content" 
        validate={[required()]} 
        label="文章内容"
      />
    </SimpleForm>
  </Edit>
); 