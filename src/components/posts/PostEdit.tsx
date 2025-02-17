import { Edit, SimpleForm, TextInput, required, ReferenceInput, SelectInput, BooleanInput, ImageInput, ImageField } from "react-admin";
import { MarkdownInput } from "./MarkdownInput";
import { TagInput } from "./TagInput";
import { CoverImageInput } from "./CoverImageInput";

export const PostEdit = () => (
  <Edit
    transform={(data) => ({
      ...data,
      tags: data.tags || [],
      is_recommended: data.is_recommended || false,
      is_top: data.is_top || false,
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
      <CoverImageInput source="cover_image" label="封面图片" />
      <BooleanInput source="is_recommended" label="推荐文章" />
      <BooleanInput source="is_top" label="置顶文章" />
      <MarkdownInput 
        source="content" 
        validate={[required()]} 
        label="文章内容"
      />
    </SimpleForm>
  </Edit>
); 