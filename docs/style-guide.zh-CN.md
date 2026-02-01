# 风格指南

本文档说明项目中采用的编码规范及其设计决策。

## 目录

- [文件命名规范](#文件命名规范)
- [组件目录组织](#组件目录组织)
- [页面级组织](#页面级组织)

---

## 文件命名规范

### 规范

所有文件和文件夹使用 **kebab-case**（小写字母 + 连字符 `-`）命名。

```bash
# ✅ 正确示例
user-profile/
my-component.tsx
api-service.ts
use-demo-data.ts

# ❌ 错误示例
UserProfile/           # PascalCase
myComponent.tsx        # camelCase
api_service.ts         # snake_case
```

### 为什么使用 kebab-case？

#### 1. URL 友好
1
kebab-case 与 URL 路径天然一致，Web 开发中经常需要将文件路径映射到 URL：

```tsx
// 文件路径: user-profile/settings.tsx
// URL: /user-profile/settings

// 文件路径: api/user-service.ts
// API 路由: /api/user-service
```

#### 2. 跨平台一致性

不同操作系统对大小写敏感性不同：

- **Linux**：区分大小写 (`UserProfile.ts` ≠ `userprofile.ts`)
- **Windows**：不区分大小写 (`UserProfile.ts` = `userprofile.ts`)
- **macOS**：默认不区分，可配置

kebab-case 全小写，避免了跨平台开发时的路径问题。

#### 3. 与包名规范一致

npm 包名推荐使用 kebab-case：

```json
{
  "name": "my-awesome-lib",
  "dependencies": {
    "react-query": "^5.0.0"
  }
}
```

保持文件命名与包命名一致，减少认知负担。

#### 4. 可读性

连字符比驼峰命名更易快速扫视：

```
use-demo-data.ts      vs  useDemoData.ts
user-profile-list.tsx vs  UserProfileList.tsx
```

#### 5. 工具链支持主流做法

主流前端工具和框架的默认约定：

| 工具/框架          | 默认命名约定 |
| ----------------- | ----------- |
| Vite              | kebab-case  |
| Vue.js            | kebab-case  |
| Next.js App Router| kebab-case  |
| Remix             | kebab-case  |
| Svelte            | kebab-case  |

---

## 组件目录组织

组件根据复杂度采用两种组织方式：

### 方式一：多文件组件（文件夹组织）

当组件包含多个文件时，使用文件夹 + `index.ts` 导出：

```bash
list/
├── index.ts           # 统一导出
├── list.tsx           # 主组件
└── list-item.tsx      # 子组件
```

```tsx
// list/index.ts
export { List } from './list';
export { ListItem } from './list-item';

// 使用
import { List, ListItem } from './list';
```

### 方式二：单文件组件

当组件只需一个文件时，直接创建文件：

```bash
button.tsx
card.tsx
input.tsx
```

```tsx
// 使用
import { Button } from './button';
```

### 选择原则

| 场景                    | 组织方式           |
| ---------------------- | ----------------- |
| 单一组件，无子组件       | 单文件             |
| 组件 + 子组件           | 文件夹 + index.ts  |
| 组件 + hooks + 样式     | 文件夹 + index.ts  |
| 共享类型定义            | 文件夹 + index.ts  |

---

## 页面级组织

项目使用 [TanStack Router](https://tanstack.com/router) 的文件系统路由，路由目录下的文件和文件夹会自动映射为路由路径。

### 非路由文件约定

根据 TanStack Router 的[文件命名约定](https://tanstack.com/router/latest/docs/framework/react/routing/file-naming-conventions)，**以 `-` 前缀开头的文件和文件夹会被排除在路由树之外**，不会生成路由。

我们利用这一特性来存放页面级别的私有文件（不会复用的情况）：

| 文件夹           | 用途                     |
| ---------------- | ------------------------ |
| `-components/`   | 页面级组件               |
| `-atom/`         | 页面级状态（Jotai atom）  |
| `-utils/`        | 页面级工具函数           |
| `-hooks/`        | 页面级自定义 hooks       |
| `-types.ts`      | 页面级类型定义           |

### 目录结构示例

```bash
routes/
├── __root.tsx                    # 根路由
├── index.tsx                     # 首页 /
└── _admin/                        # 布局路由（不参与 URL）
    ├── route.tsx                  # 布局组件
    ├── dashboard/
    │   ├── index.tsx              # /dashboard
    │   ├── -components/           # ❗ 页面级组件（不生成路由）
    │   │   ├── stat-card.tsx
    │   │   └── recent-activity.tsx
    │   ├── -atom/                 # ❗ 页面级状态
    │   │   └── dashboard.ts
    │   └── -utils/                # ❗ 页面级工具
    │       └── chart-helpers.ts
    └── users/
        ├── index.tsx              # /users
        ├── $userId/
        │   └── index.tsx          # /users/:userId
        ├── -components/           # ❗ users 页面的组件
        │   ├── user-table.tsx
        │   ├── user-form.tsx
        │   └── user-filters.tsx
        ├── -atom/
        │   └── user-filters.ts
        └── -types.ts              # ❗ 也可以是单文件
```

### 使用说明

```tsx
// routes/_admin/users/index.tsx
import { UserTable } from './-components/user-table';
import { UserFilters } from './-components/user-filters';
import { userFiltersAtom } from './-atom/user-filters';

export function UsersPage() {
  // ...
}
```

### 选择原则

| 场景                          | 存放位置                        |
| ----------------------------- | ------------------------------- |
| 仅当前页面使用的组件          | `routes/xxx/-components/`       |
| 多个页面共享的组件            | `src/components/`               |
| 仅当前页面使用的状态          | `routes/xxx/-atom/`             |
| 全局共享的状态                | `src/atom/`                     |
| 仅当前页面使用的工具/hooks    | `routes/xxx/-utils/` 或 `-hooks/` |
| 全局共享的工具/hooks          | `src/lib/` 或 `src/hooks/`      |
