// 基础类型
interface BaseModel {
  id: number;
  created_at: string;
  updated_at: string;
}

// 用户相关
export interface IUser extends BaseModel {
  username: string;
  password?: string;
  is_root: boolean;
  status: 'pending' | 'approved' | 'rejected';
  nickname: string | null;
  avatar: string | null;
  email: string | null;
  phone: string | null;
  role: 'admin' | 'editor' | 'user';
  last_login: string | null;
  description: string | null;
}

// 文章相关
export interface IArticle extends BaseModel {
  title: string;
  content: string;
  user_id: number;
  category_id: number | null;
  views: number;
  likes: number;
  tags: string[];
  username?: string;
  category_name?: string;
  comment_count?: number;
}

// 分类相关
export interface ICategory extends BaseModel {
  name: string;
  description: string | null;
}

// 评论相关
export interface IComment extends BaseModel {
  content: string;
  user_id: number;
  article_id: number;
  parent_id: number | null;
  username?: string;
} 