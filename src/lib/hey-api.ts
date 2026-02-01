import type { CreateClientConfig } from '~/services/generated/client.gen';
import { axiosInstance } from './request';

/**
 * hey-api 客户端配置
 * 使用自定义的 axios 实例，复用现有的拦截器和配置
 */
export const createClientConfig: CreateClientConfig = config => ({
  ...config,
  axios: axiosInstance,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
