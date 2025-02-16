import { IUser } from "./models";

// API 响应类型
export interface IPaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface IApiError extends Error {
  status?: number;
}

export interface IAuthResponse {
  token: string;
  user: Pick<IUser, 'id' | 'username' | 'role'>;  // 使用 Pick 工具类型
} 