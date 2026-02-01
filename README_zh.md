# TanStack Router Admin Template

[English](./README.md) | 简体中文

基于 React 19 + TanStack Router + Ant Design Pro Components 构建的现代化后台管理系统模板。

## 技术栈

### 核心框架
- **React 19** - 最新的 React 版本
- **React Compiler** - 自动记忆化优化（babel-plugin-react-compiler）
- **TypeScript** - 类型安全的 JavaScript
- **Vite 7** - 快速的构建工具
- **TanStack Router** - 类型安全的路由管理
- **TanStack Query** - 强大的数据获取和缓存

### UI 框架
- **Ant Design 6** - 企业级 UI 组件库
- **Ant Design Pro Components** - 高级业务组件
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **Lucide React** - 精美的图标库

### 状态管理
- **Jotai** - 轻量级的原子化状态管理
- **nuqs** - URL 状态管理

### 国际化
- **i18next** - 国际化解决方案
- **react-i18next** - React i18n 集成

### 工具库
- **Axios** - HTTP 客户端
- **Day.js** - 轻量级日期处理库（已配置常用插件）
- **Lodash-es** - 实用工具库
- **js-cookie** - Cookie 操作

### 开发工具
- **ESLint** - 代码规范检查（使用 @antfu/eslint-config）
- **Commitlint** - Git 提交信息规范
- **Lefthook** - Git hooks 管理
- **Vitest** - 单元测试框架
- **Testing Library** - React 测试工具

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发环境

```bash
pnpm dev
```

应用将运行在 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint
```

### 类型检查

```bash
pnpm typecheck
```

### 运行测试

```bash
pnpm test
```

## 项目结构

```
src/
├── atom/              # Jotai 状态管理
├── components/        # 组件目录
│   ├── features/      # 业务需求组件
│   ├── layouts/       # 页面布局组件
│   ├── modals/        # 可复用弹窗组件
│   ├── providers/     # Context Providers
│   └── ui/            # 可复用 UI 组件（包含 Ant Design 二次封装）
├── const/             # 常量配置
├── hooks/             # 可复用 React Hooks
├── i18n/              # 国际化配置
│   └── locales/       # 多语言文件（使用扁平化 key）
├── lib/               # 工具函数和第三方库配置
│   ├── request.ts     # Axios 实例及拦截器配置
│   ├── hey-api.ts     # Hey API 客户端配置
│   └── api-utils.ts   # API 响应工具函数
├── routes/            # 路由配置（文件路由系统）
├── services/          # API 服务
│   └── generated/     # 自动生成的 API SDK（由 @hey-api/openapi-ts 生成）
│       └── @tanstack/  # 生成的 TanStack Query hooks
└── scripts/           # 脚本文件
```

## 路由系统

本项目使用 TanStack Router 的文件路由系统。路由文件位于 `src/routes` 目录下。

### 添加新路由

在 `src/routes` 目录下创建新文件，TanStack Router 会自动生成路由配置。

### 使用 Link 导航

```tsx
import { Link } from '@tanstack/react-router'

<Link to="/about">关于</Link>
```

### 布局系统

根布局位于 `src/routes/__root.tsx`，所有路由内容通过 `<Outlet />` 组件渲染。

更多信息请查阅 [TanStack Router 文档](https://tanstack.com/router/latest/docs)。

## API 服务

### 概述

项目使用 [@hey-api/openapi-ts](https://heyapi.dev/) 从 OpenAPI/Swagger 规范生成类型安全的 API SDK。生成的代码位于 `src/services/generated/` 目录。

### 生成 API SDK

```bash
pnpm openapi-ts
```

此命令会读取 `src/services/swagger.json` 并生成类型安全的 SDK 函数。

### 配置说明

Hey API 客户端配置使用自定义的 Axios 实例（包含拦截器）。相关配置文件：

- `src/lib/request.ts` - Axios 实例及请求/响应拦截器
- `src/lib/hey-api.ts` - Hey API 客户端配置
- `openapi-ts.config.ts` - 代码生成配置

### 使用生成的 SDK

#### 基本用法

```tsx
import { postApiUserLogin } from '~/services/generated';

// 返回 AxiosResponse，包含完整响应结构
const response = await postApiUserLogin({
  body: { email: 'test@example.com', password: '123456' },
});

// 访问数据：response.data = { code, message, data }
const userData = response.data.data;
```

#### 使用工具函数（推荐）

项目在 `src/lib/api-utils.ts` 中提供了工具函数来简化 API 响应处理：

**`unwrap<T>()` - 直接提取业务数据**

```tsx
import { unwrap } from '~/lib/api-utils';
import { postApiUserLogin } from '~/services/generated';

// 直接获取 data 字段内容
const loginData = await unwrap(postApiUserLogin({
  body: { email: 'test@example.com', password: '123456' },
}));
// loginData 类型为 UserLoginResponse
```

**`unwrapResponse<T>()` - 获取完整响应体**

```tsx
import { unwrapResponse } from '~/lib/api-utils';

const response = await unwrapResponse(postApiUserLogin({ body: { ... } }));
// response = { code: 0, message: 'success', data: {...} }
```

**`safeUnwrap<T>()` - 不抛异常的错误处理**

```tsx
import { safeUnwrap } from '~/lib/api-utils';

const [data, error] = await safeUnwrap(postApiUserLogin({ body: { ... } }));
if (error) {
  console.error('登录失败:', error.message);
  return;
}
console.log('登录成功:', data);
```

### 请求拦截器

Axios 实例包含内置拦截器：

- **请求拦截器**：自动从 localStorage 注入 Bearer token
- **响应拦截器**：处理业务错误码和 HTTP 错误
- **错误处理**：401（未授权）、403（禁止访问）、404（未找到）、500（服务器错误）

### 自定义请求选项

```tsx
import { request } from '~/lib/request';

// 跳过错误处理
const response = await request.get('/api/data', {}, { skipErrorHandler: true });

// 跳过 token 注入
const publicData = await request.get('/api/public', {}, { skipAuth: true });

// 自定义错误消息
const data = await request.post('/api/action', body, { errorMessage: '自定义错误提示' });
```

### TanStack Query 集成

项目同时从 OpenAPI 规范生成 TanStack Query hooks。生成的 hooks 位于 `src/services/generated/@tanstack/react-query.gen.ts`。

#### Query Options（用于 GET 请求）

使用 `*Options` 函数配合 `useQuery`：

```tsx
import { useQuery } from '@tanstack/react-query';
import { getApiUserGetUserInfoOptions } from '~/services/generated/@tanstack/react-query.gen';

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery(
    getApiUserGetUserInfoOptions({ query: { user_id: userId } })
  );

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return <div>{data?.data?.nickname}</div>;
}
```

#### Query Keys（查询键）

使用 `*QueryKey` 函数进行缓存失效：

```tsx
import { useQueryClient } from '@tanstack/react-query';
import { getApiUserGetUserInfoQueryKey } from '~/services/generated/@tanstack/react-query.gen';

function useInvalidateUser() {
  const queryClient = useQueryClient();

  const invalidateUser = (userId: string) => {
    queryClient.invalidateQueries({
      queryKey: getApiUserGetUserInfoQueryKey({ query: { user_id: userId } }),
    });
  };

  return invalidateUser;
}
```

#### Mutations（用于 POST/PUT/DELETE 请求）

使用 `*Mutation` 函数配合 `useMutation`：

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApiUserLoginMutation } from '~/services/generated/@tanstack/react-query.gen';

function LoginForm() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    ...postApiUserLoginMutation(),
    onSuccess: (data) => {
      // 处理登录成功
      localStorage.setItem('token', data.data?.token || '');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('登录失败:', error.message);
    },
  });

  const handleSubmit = (email: string, password: string) => {
    loginMutation.mutate({
      body: { email, password },
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit('test@example.com', '123456'); }}>
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? '登录中...' : '登录'}
      </button>
    </form>
  );
}
```

#### 生成的 Hook 命名规则

| HTTP 方法 | 生成的函数 | 用法 |
|-----------|-----------|------|
| GET | `get*Options` | `useQuery(get*Options(...))` |
| GET | `get*QueryKey` | 用于缓存失效的查询键 |
| POST/PUT/DELETE | `post*Mutation` / `put*Mutation` / `delete*Mutation` | `useMutation(post*Mutation())` |

## 数据获取

### 使用 TanStack Query

项目已配置 TanStack Query，可直接使用：

```tsx
import { useQuery } from '@tanstack/react-query'

function Component() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
  
  // ...
}
```

### 使用 Router Loader

也可以使用路由加载器在渲染前获取数据：

```tsx
export const Route = createFileRoute('/users')({
  loader: async () => {
    const response = await fetch('/api/users')
    return response.json()
  },
  component: () => {
    const data = Route.useLoaderData()
    // ...
  },
})
```

更多信息请查阅 [TanStack Query 文档](https://tanstack.com/query/latest/docs)。

## 国际化

### i18n 配置规则

多语言文件使用扁平化 key：

```json
{
  "page.settings.title": "设置",
  "page.settings.description": "系统设置"
}
```

**避免使用嵌套结构：**

```json
{
  "page": {
    "settings": {
      "title": "设置"
    }
  }
}
```

### 使用示例

```tsx
import { useTranslation } from 'react-i18next'

function Component() {
  const { t } = useTranslation()
  return <h1>{t('page.settings.title')}</h1>
}
```

## 状态管理

项目使用 Jotai 进行状态管理，atom 定义存放在 `src/atom` 目录。

```tsx
import { atom, useAtom } from 'jotai'

const countAtom = atom(0)

function Counter() {
  const [count, setCount] = useAtom(countAtom)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

## 时间处理

Day.js 已配置以下常用插件：
- UTC 和时区支持
- 相对时间（如"3小时前"）
- 时间段计算
- 时间范围判断
- 自定义格式解析
- 星期和季度支持
- 默认中文语言

```tsx
import { dayjs } from '@/lib/dayjs'

const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
```

## 开发规范

### Git 提交规范

项目使用 Commitlint 规范 Git 提交信息，遵循 [Conventional Commits](https://www.conventionalcommits.org/) 标准：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具相关

### 代码规范

项目使用 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 进行代码规范检查，这是一个开箱即用的 ESLint 扁平化配置方案，具有以下特点：

#### 核心特性

- **自动格式化** - 无需 Prettier，ESLint 自动修复代码格式
- **合理的默认值** - 遵循最佳实践，开箱即用
- **TypeScript 优先** - 完整的 TypeScript 支持
- **React 支持** - 已启用 React、React Hooks 相关规则
- **风格一致** - 最小化阅读负担，保持 diff 稳定

#### 代码风格

**基本规则：**
- 使用单引号（`'`）
- 必须使用分号结尾（`;`）
- 2 空格缩进
- JSX 使用单引号
- 导入自动排序
- 使用尾随逗号

**示例：**
```tsx
import { useState } from 'react';
import type { FC } from 'react';

export const Component: FC = () => {
  const [count, setCount] = useState(0);
  
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
};
```

#### 配置说明

项目的 ESLint 配置位于 [eslint.config.js](eslint.config.js)，主要配置：

- ✅ 启用 React 支持
- ✅ 忽略构建产物目录（`.next/`, `out/`, `build/`）
- ⚠️  `no-console` 设为警告（允许使用但会提示）
- ⚠️  `unused-imports/no-unused-vars` 设为警告（未使用的变量会提示）
- ⚠️  `eqeqeq` 设为警告（建议使用 `===` 而非 `==`）

#### 常用命令

**自动修复代码：**
```bash
pnpm lint
```

**检查代码（不修复）：**
```bash
pnpm exec eslint .
```

**查看启用的规则：**
```bash
npx @eslint/config-inspector
```

这个可视化工具可以帮助你查看项目中启用了哪些规则，以及它们应用于哪些文件。

#### 在编辑器中使用

推荐安装 [ESLint 扩展](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)，并在 VS Code 设置中启用保存时自动修复：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

#### 自定义规则

如需覆盖规则，可在 [eslint.config.js](eslint.config.js) 中的 `rules` 对象添加：

```js
export default antfu({
  react: true,
  rules: {
    'no-console': 'off',  // 关闭 console 检查
    'style/semi': ['error', 'never'],  // 改为不使用分号
  },
})
```

## React Compiler

本项目已启用 **React Compiler**，它会自动优化你的 React 组件，处理记忆化逻辑。

### 什么是 React Compiler？

React Compiler 是一个构建时优化工具，能够自动对组件和 hooks 进行记忆化处理，无需手动使用 `useMemo`、`useCallback` 和 `React.memo`。

### 主要优势

- ✨ **自动记忆化** - 无需手动使用 `React.memo` 包裹组件或使用 `useMemo`/`useCallback`
- 🚀 **性能优化** - 自动优化组件重渲染
- 📦 **零运行时开销** - 所有优化都在构建时完成
- 🔍 **开发工具集成** - 优化后的组件在 React DevTools 中显示 "Memo ✨" 标记

### 如何验证

1. 安装 [React Developer Tools](https://react.dev/learn/react-developer-tools) 浏览器扩展
2. 访问应用 http://localhost:3000
3. 打开 React DevTools
4. 查找组件名称旁边的 "✨" 标记 - 这表示该组件已被 React Compiler 优化

### 重要注意事项

⚠️ **遵循 React 规则**

React Compiler 要求代码遵循 [React 规则](https://react.dev/reference/rules)：

- 组件和 Hooks 必须是纯函数
- Props 和 state 是不可变的
- 传递给 JSX 的值在传递后不可变
- React API 必须正确调用

如果组件违反了这些规则，编译器将跳过对该特定组件的优化。

⚠️ **ESLint 集成**

项目使用 `eslint-plugin-react-hooks@7.0.1`，其中包含 React Compiler 规则。当 ESLint 报告错误时：

- 编译器将跳过对该特定组件或 hook 的优化
- 其他组件将继续被优化
- 你不需要立即修复所有违规
- 可以按自己的节奏逐步修复，以逐渐增加优化覆盖率

⚠️ **退出机制**

如果某个组件在编译后出现问题，可以使用 `"use no memo"` 指令临时退出优化：

```tsx
function ProblematicComponent() {
  "use no memo";
  // 组件代码
}
```

**注意：** 这只是临时解决方案。你应该修复根本问题，并在解决后移除该指令。

### 配置说明

React Compiler 在 [vite.config.ts](vite.config.ts) 中配置：

```typescript
viteReact({
  babel: {
    plugins: ['babel-plugin-react-compiler'],
  },
})
```

如需高级配置选项，请参考 [React Compiler 配置参考](https://react.dev/reference/react-compiler/configuration)。

### 了解更多

- [React Compiler 文档](https://react.dev/learn/react-compiler)
- [React Compiler 安装指南](https://react.dev/learn/react-compiler/installation)
- [React Compiler 调试](https://react.dev/learn/react-compiler/debugging)
- [React 规则](https://react.dev/reference/rules)

## 了解更多

- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Query](https://tanstack.com/query/latest)
- [Ant Design](https://ant.design/)
- [Ant Design Pro Components](https://procomponents.ant.design/)
- [Jotai](https://jotai.org/)
- [Vite](https://vitejs.dev/)

## License

Private
