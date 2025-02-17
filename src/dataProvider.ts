import { DataProvider, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = import.meta.env.VITE_API_URL;
console.log('Current API URL:', apiUrl); // 添加日志以便调试

const resourceMap: { [key: string]: string } = {
    posts: 'posts',
    categories: 'categories',
    users: 'users',
    comments: 'comments',
};

// 自定义 httpClient 添加 token
const httpClient = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
        const { filter } = params;

        const query = {
            page,
            limit: perPage,
            ...filter,
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        const { json } = await httpClient(url);

        return {
            data: json.data || [],
            total: json.pagination?.total || 0,
        };
    },

    getOne: async (resource, params) => {
        const mappedResource = resourceMap[resource] || resource;
        const { json } = await httpClient(`${apiUrl}/${mappedResource}/${params.id}`);
        return {
            data: json,
        };
    },

    getMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url);
        return {
            data: json.data || [],
        };
    },

    getManyReference: async (resource, params) => {
        const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
        const query = {
            ...params.filter,
            [params.target]: params.id,
            page,
            limit: perPage,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        const { json } = await httpClient(url);
        return {
            data: json.data || [],
            total: json.pagination?.total || 0,
        };
    },

    create: async <RecordType extends { id: number | string }>(resource: string, params: any) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });
        return {
            data: { ...params.data, id: json.id } as RecordType,
        };
    },

    update: async (resource, params) => {
        const mappedResource = resourceMap[resource] || resource;
        const { json } = await httpClient(`${apiUrl}/${mappedResource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        
        return {
            data: {
                ...params.data,
                id: params.id,
                ...json,
            }
        };
    },

    updateMany: async (resource, params) => {
        return { data: params.ids };
    },

    delete: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        });
        return { data: json };
    },

    deleteMany: async (resource, params) => {
        return { data: params.ids };
    },

    // 自定义方法
    approveUser: async (userId: string, status: 'approved' | 'rejected') => {
        const { json } = await httpClient(`${apiUrl}/auth/approve/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
        return json;
    },

    incrementViews: async (articleId: string) => {
        const { json } = await httpClient(`${apiUrl}/articles/${articleId}/view`, {
            method: 'POST',
        });
        return json;
    },

    likeArticle: async (articleId: string) => {
        const { json } = await httpClient(`${apiUrl}/articles/${articleId}/like`, {
            method: 'POST',
        });
        return json;
    },

    uploadImage: async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        const { json } = await httpClient(`${apiUrl}/upload`, {
            method: 'POST',
            body: formData,
        });
        return json;
    },
};

export interface MyDataProvider extends DataProvider {
    approveUser: (userId: string, status: 'approved' | 'rejected') => Promise<unknown>;
    incrementViews: (articleId: string) => Promise<unknown>;
    likeArticle: (articleId: string) => Promise<unknown>;
    uploadImage: (file: File) => Promise<unknown>;
}

export default dataProvider;