import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export interface RequestConfig<D = unknown> extends AxiosRequestConfig<D> {
  skipErrorHandler?: boolean
  skipAuth?: boolean
  errorMessage?: string
}

export class RequestError extends Error {
  code: number;
  response?: AxiosResponse;

  constructor(message: string, code: number, response?: AxiosResponse) {
    super(message);
    this.name = 'RequestError';
    this.code = code;
    this.response = response;
  }
}

const DEFAULT_CONFIG: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const SUCCESS_CODE = 0;

const axiosInstance = axios.create(DEFAULT_CONFIG);

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig & RequestConfig) => {
    // 注入 token
    if (!config.skipAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data, config } = response;
    const requestConfig = config as RequestConfig;

    if (requestConfig.skipErrorHandler) {
      return response;
    }

    // 业务逻辑错误处理
    if (data.code !== SUCCESS_CODE) {
      const errorMessage = requestConfig.errorMessage || data.message || '请求失败';
      // TODO: 可以在这里添加全局错误提示，如 message.error(errorMessage)
      return Promise.reject(new RequestError(errorMessage, data.code, response));
    }

    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    const { response, config } = error;
    const requestConfig = config as RequestConfig | undefined;

    // 跳过错误处理
    if (requestConfig?.skipErrorHandler) {
      return Promise.reject(error);
    }

    // HTTP 错误处理
    let errorMessage = requestConfig?.errorMessage || '网络请求失败';

    if (response) {
      const { status, data } = response;

      switch (status) {
        case 401:
          errorMessage = '登录已过期，请重新登录';
          // TODO: 可以在这里处理登录过期逻辑，如跳转登录页
          break;
        case 403:
          errorMessage = '没有权限访问该资源';
          break;
        case 404:
          errorMessage = '请求的资源不存在';
          break;
        case 500:
          errorMessage = '服务器内部错误';
          break;
        default:
          errorMessage = data?.message || `请求失败 (${status})`;
      }
    }
    else if (error.code === 'ECONNABORTED') {
      errorMessage = '请求超时，请稍后重试';
    }
    else if (!navigator.onLine) {
      errorMessage = '网络连接已断开';
    }

    return Promise.reject(new RequestError(errorMessage, response?.status || -1, response));
  },
);

// 导出 axios 实例，供 hey-api 客户端使用
export { axiosInstance };
