// 状态管理相关类型
import { IUser } from './models';

export interface IAuthState {
  isAuthenticated: boolean;
  user: Pick<IUser, 'id' | 'username' | 'role'> | null;
  token: string | null;
} 