import { AuthProvider } from 'react-admin';

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const response = await fetch(`${apiUrl}/admin/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '登录失败');
        }

        const { token } = await response.json();
        localStorage.setItem('token', token);
        
        // 解析 JWT 获取用户信息
        const payload = JSON.parse(atob(token.split('.')[1]));
        const user = {
            id: payload.id,
            username: payload.username,
            isRoot: payload.isRoot,
        };
        localStorage.setItem('user', JSON.stringify(user));
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.resolve();
    },

    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: () => {
        const token = localStorage.getItem('token');
        return token ? Promise.resolve() : Promise.reject();
    },

    getPermissions: () => {
        const user = localStorage.getItem('user');
        const parsedUser = user ? JSON.parse(user) : null;
        return Promise.resolve(parsedUser?.isRoot ? 'admin' : 'user');
    },

    getIdentity: () => {
        const persistedUser = localStorage.getItem('user');
        const user = persistedUser ? JSON.parse(persistedUser) : null;

        return Promise.resolve({
            id: user.id,
            fullName: user.username,
            avatar: undefined,
        });
    },
};

export default authProvider;

