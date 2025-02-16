import { ReactNode } from 'react';
import { IArticle } from './models';

// 组件 Props 类型
export interface IMarkdownPreviewProps {
  text: string;
}

export interface ITruncatedTextFieldProps {
  source: keyof IArticle;
  record?: IArticle;
  maxLength?: number;
  label?: string;
}

export interface ITagsFieldProps {
  label?: string;
}

export interface IAdminOnlyProps {
  children: ReactNode;
  permissions: 'admin' | 'editor' | 'user';
} 