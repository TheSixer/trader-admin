import { Menu as RaMenu, MenuItemLink, usePermissions } from 'react-admin';
import {
  Article as ArticleIcon,
  Comment as CommentIcon,
  Category as CategoryIcon,
  Person as UserIcon,
  QuestionMark as QuestionMarkIcon,
  PersonPin as PersonPinIcon
} from '@mui/icons-material';

export const Menu = () => {
  const { permissions } = usePermissions();

  return (
    <RaMenu>
      <MenuItemLink 
        to="/customers"
        primaryText="客户管理"
        leftIcon={<PersonPinIcon   />}
      />
      <MenuItemLink 
        to="/survey/questions"
        primaryText="问卷管理"
        leftIcon={<QuestionMarkIcon />}
      />
      {/* <MenuItemLink 
        to="/posts"
        primaryText="文章管理"
        leftIcon={<ArticleIcon />}
      />
      <MenuItemLink 
        to="/comments"
        primaryText="评论管理"
        leftIcon={<CommentIcon />}
      />
      <MenuItemLink 
        to="/categories"
        primaryText="分类管理"
        leftIcon={<CategoryIcon />}
      /> */}
      {permissions === 'admin' && (
        <MenuItemLink 
          to="/users"
          primaryText="系统用户管理"
          leftIcon={<UserIcon />}
        />
      )}
    </RaMenu>
  );
}; 