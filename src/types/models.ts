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
  is_recommended: boolean;
  is_top: boolean;
  cover_image: string | null;
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

export interface ISurveyQuestionOption {
  id: number;
  content: string;
  sort_order?: number;
}

export interface ISurveyQuestion extends BaseModel {
  title: string;
  type: 'single' | 'multiple' | 'text';
  is_required: boolean;
  sort_order: number;
  options?: ISurveyQuestionOption[];
}

export interface ISurveyResponse extends BaseModel {
  id: number;
  question_id: number;
  question_title: string;
  question_type: 'single' | 'multiple' | 'text';
  response_text: string | null;
  selected_option_ids: string | null;
  selected_options?: ISurveyQuestionOption[];
} 