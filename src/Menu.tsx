import { Menu as RaMenu, MenuItemLink, usePermissions } from 'react-admin';
import {
  Article as ArticleIcon,
  Comment as CommentIcon,
  Category as CategoryIcon,
  Person as UserIcon
} from '@mui/icons-material';

export const Menu = () => {
  const { permissions } = usePermissions();

  return (
    <RaMenu>
      <MenuItemLink 
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
      />
      {permissions === 'admin' && (
        <MenuItemLink 
          to="/users"
          primaryText="用户管理"
          leftIcon={<UserIcon />}
        />
      )}
    </RaMenu>
  );
}; 