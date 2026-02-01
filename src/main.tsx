import { createRouter, RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { axiosInstance } from '~/lib/request';
// 配置 hey-api 客户端使用自定义 axios 实例
import { client } from '~/services/generated/client.gen';

import { routeTree } from './routeTree.gen';
import './i18n';

client.setConfig({
  axios: axiosInstance,
});

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
});

// 注册Tanstack Router路由实例类型，让 TypeScript 能够推断路由类型
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!;
const root = ReactDOM.createRoot(rootElement);
//
root.render(<RouterProvider router={router} />);
