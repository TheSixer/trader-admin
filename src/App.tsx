import { Admin, Resource, EditProps, CreateProps } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { PostCreate } from "./components/posts/PostCreate";
import { PostList } from "./components/posts/PostList";
import { PostEdit } from "./components/posts/PostEdit";
import { PostShow } from "./components/posts/PostShow";
import { UserList } from "./components/users/UserList";
import { UserEdit } from "./components/users/UserEdit";
import { UserCreate } from "./components/users/UserCreate";
import { CategoryList } from "./components/categories/CategoryList";
import { CategoryEdit } from "./components/categories/CategoryEdit";
import { CategoryCreate } from "./components/categories/CategoryCreate";
import { usePermissions } from "react-admin";
import { CommentList } from "./components/comments/CommentList";
import { CustomerList } from "./components/customers/CustomerList";
import { CustomerEdit } from "./components/customers/CustomerEdit";
import { QuestionList } from "./components/surveys/QuestionList";
import { QuestionCreate } from "./components/surveys/QuestionCreate";
import { QuestionEdit } from "./components/surveys/QuestionEdit";

const AdminOnlyCategoryEdit = (props: EditProps) => {
  const { permissions } = usePermissions();
  return permissions === "admin" ? <CategoryEdit {...props} /> : null;
};

const AdminOnlyCategoryCreate = (props: CreateProps) => {
  const { permissions } = usePermissions();
  return permissions === "admin" ? <CategoryCreate {...props} /> : null;
};

const AdminOnlyUserEdit = (props: EditProps) => {
  const { permissions } = usePermissions();
  return permissions === "admin" ? <UserEdit {...props} /> : null;
};

const AdminOnlyUserCreate = (props: CreateProps) => {
  const { permissions } = usePermissions();
  return permissions === "admin" ? <UserCreate {...props} /> : null;
};

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      show={PostShow}
      create={PostCreate}
    />
    <Resource name="comments" list={CommentList} />
    <Resource
      name="categories"
      list={CategoryList}
      edit={AdminOnlyCategoryEdit}
      create={AdminOnlyCategoryCreate}
    />
    <Resource
      name="users"
      list={UserList}
      edit={AdminOnlyUserEdit}
      create={AdminOnlyUserCreate}
    />
    <Resource
      name="customers"
      list={CustomerList}
      edit={CustomerEdit}
    />
    <Resource
      name="survey/questions"
      list={QuestionList}
      create={QuestionCreate}
      edit={QuestionEdit}
    />
  </Admin>
);
