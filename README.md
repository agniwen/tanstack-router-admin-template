# TanStack Router Admin Template

English | [简体中文](./README_zh.md)

A modern admin dashboard template built with React 19 + TanStack Router + Ant Design Pro Components.

## Tech Stack

### Core Framework
- **React 19** - Latest React version
- **React Compiler** - Automatic memoization optimization (babel-plugin-react-compiler)
- **TypeScript** - Type-safe JavaScript
- **Vite 7** - Fast build tool
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Powerful data fetching and caching

### UI Framework
- **Ant Design 6** - Enterprise-level UI component library
- **Ant Design Pro Components** - Advanced business components
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### State Management
- **Jotai** - Lightweight atomic state management
- **nuqs** - URL state management

### Internationalization
- **i18next** - i18n solution
- **react-i18next** - React i18n integration

### Utilities
- **Axios** - HTTP client
- **Day.js** - Lightweight date library (pre-configured with common plugins)
- **Lodash-es** - Utility library
- **js-cookie** - Cookie management

### Development Tools
- **ESLint** - Code linting (using @antfu/eslint-config)
- **Commitlint** - Git commit message linting
- **Lefthook** - Git hooks management
- **Vitest** - Unit testing framework
- **Testing Library** - React testing utilities

## Quick Start

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The app will run at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Lint Code

```bash
pnpm lint
```

### Type Check

```bash
pnpm typecheck
```

### Run Tests

```bash
pnpm test
```

## Project Structure

```
src/
├── atom/              # Jotai state management
├── components/        # Components directory
│   ├── features/      # Business feature components
│   ├── layouts/       # Page layout components
│   ├── modals/        # Reusable modal components
│   ├── providers/     # Context Providers
│   └── ui/            # Reusable UI components (including Ant Design wrappers)
├── const/             # Constants and configurations
├── hooks/             # Reusable React Hooks
├── i18n/              # i18n configuration
│   └── locales/       # Language files (using flat keys)
├── lib/               # Utility functions and third-party library configs
│   ├── request.ts     # Axios instance with interceptors
│   ├── hey-api.ts     # Hey API client configuration
│   └── api-utils.ts   # API response utility functions
├── routes/            # Route configuration (file-based routing)
├── services/          # API services
│   └── generated/     # Auto-generated API SDK (by @hey-api/openapi-ts)
│       └── @tanstack/  # Generated TanStack Query hooks
└── scripts/           # Script files
```

## Routing System

This project uses TanStack Router's file-based routing system. Route files are located in the `src/routes` directory.

### Adding New Routes

Create new files in the `src/routes` directory, and TanStack Router will automatically generate the route configuration.

### Navigation with Link

```tsx
import { Link } from '@tanstack/react-router'

<Link to="/about">About</Link>
```

### Layout System

The root layout is located at `src/routes/__root.tsx`. All route content is rendered through the `<Outlet />` component.

For more information, check out the [TanStack Router documentation](https://tanstack.com/router/latest/docs).

## API Services

### Overview

The project uses [@hey-api/openapi-ts](https://heyapi.dev/) to generate type-safe API SDK from OpenAPI/Swagger specifications. The generated code is located in `src/services/generated/`.

### Generate API SDK

```bash
pnpm openapi-ts
```

This command reads `src/services/swagger.json` and generates type-safe SDK functions.

### Configuration

The Hey API client is configured to use a custom Axios instance with interceptors. Configuration files:

- `src/lib/request.ts` - Axios instance with request/response interceptors
- `src/lib/hey-api.ts` - Hey API client configuration
- `openapi-ts.config.ts` - Code generation configuration

### Using Generated SDK

#### Basic Usage

```tsx
import { postApiUserLogin } from '~/services/generated';

// Returns AxiosResponse with full response structure
const response = await postApiUserLogin({
  body: { email: 'test@example.com', password: '123456' },
});

// Access data: response.data = { code, message, data }
const userData = response.data.data;
```

#### Using Utility Functions (Recommended)

The project provides utility functions in `src/lib/api-utils.ts` to simplify API responses:

**`unwrap<T>()` - Extract business data directly**

```tsx
import { unwrap } from '~/lib/api-utils';
import { postApiUserLogin } from '~/services/generated';

// Directly get the data field content
const loginData = await unwrap(postApiUserLogin({
  body: { email: 'test@example.com', password: '123456' },
}));
// loginData is of type UserLoginResponse
```

**`unwrapResponse<T>()` - Get full response body**

```tsx
import { unwrapResponse } from '~/lib/api-utils';

const response = await unwrapResponse(postApiUserLogin({ body: { ... } }));
// response = { code: 0, message: 'success', data: {...} }
```

**`safeUnwrap<T>()` - No-throw error handling**

```tsx
import { safeUnwrap } from '~/lib/api-utils';

const [data, error] = await safeUnwrap(postApiUserLogin({ body: { ... } }));
if (error) {
  console.error('Login failed:', error.message);
  return;
}
console.log('Login successful:', data);
```

### Request Interceptors

The Axios instance includes built-in interceptors:

- **Request Interceptor**: Auto-injects Bearer token from localStorage
- **Response Interceptor**: Handles business error codes and HTTP errors
- **Error Handling**: 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error)

### Custom Request Options

```tsx
import { request } from '~/lib/request';

// Skip error handler for specific request
const response = await request.get('/api/data', {}, { skipErrorHandler: true });

// Skip auth token injection
const publicData = await request.get('/api/public', {}, { skipAuth: true });

// Custom error message
const data = await request.post('/api/action', body, { errorMessage: 'Custom error' });
```

### TanStack Query Integration

The project also generates TanStack Query hooks from the OpenAPI spec. Generated hooks are located in `src/services/generated/@tanstack/react-query.gen.ts`.

#### Query Options (for GET requests)

Use `*Options` functions with `useQuery`:

```tsx
import { useQuery } from '@tanstack/react-query';
import { getApiUserGetUserInfoOptions } from '~/services/generated/@tanstack/react-query.gen';

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery(
    getApiUserGetUserInfoOptions({ query: { user_id: userId } })
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.data?.nickname}</div>;
}
```

#### Query Keys

Use `*QueryKey` functions for cache invalidation:

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

#### Mutations (for POST/PUT/DELETE requests)

Use `*Mutation` functions with `useMutation`:

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApiUserLoginMutation } from '~/services/generated/@tanstack/react-query.gen';

function LoginForm() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    ...postApiUserLoginMutation(),
    onSuccess: (data) => {
      // Handle successful login
      localStorage.setItem('token', data.data?.token || '');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
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
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

#### Generated Hook Naming Convention

| HTTP Method | Generated Function | Usage |
|-------------|-------------------|-------|
| GET | `get*Options` | `useQuery(get*Options(...))` |
| GET | `get*QueryKey` | Cache key for invalidation |
| POST/PUT/DELETE | `post*Mutation` / `put*Mutation` / `delete*Mutation` | `useMutation(post*Mutation())` |

## Data Fetching

### Using TanStack Query

The project comes pre-configured with TanStack Query:

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

### Using Router Loader

You can also use route loaders to fetch data before rendering:

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

For more information, check out the [TanStack Query documentation](https://tanstack.com/query/latest/docs).

## Internationalization

### i18n Configuration Rules

Language files use flat keys:

```json
{
  "page.settings.title": "Settings",
  "page.settings.description": "System Settings"
}
```

**Avoid nested structures:**

```json
{
  "page": {
    "settings": {
      "title": "Settings"
    }
  }
}
```

### Usage Example

```tsx
import { useTranslation } from 'react-i18next'

function Component() {
  const { t } = useTranslation()
  return <h1>{t('page.settings.title')}</h1>
}
```

## State Management

The project uses Jotai for state management. Atom definitions are stored in the `src/atom` directory.

```tsx
import { atom, useAtom } from 'jotai'

const countAtom = atom(0)

function Counter() {
  const [count, setCount] = useAtom(countAtom)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

## Date Handling

Day.js is pre-configured with the following common plugins:
- UTC and timezone support
- Relative time (e.g., "3 hours ago")
- Duration calculations
- Time range checks
- Custom format parsing
- Week and quarter support
- Default Chinese locale

```tsx
import { dayjs } from '@/lib/dayjs'

const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
```

## Development Guidelines

### Git Commit Convention

The project uses Commitlint to enforce Git commit messages, following the [Conventional Commits](https://www.conventionalcommits.org/) standard:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation update
- `style:` Code formatting
- `refactor:` Code refactoring
- `test:` Test-related
- `chore:` Build/tooling changes

### Code Standards

The project uses [@antfu/eslint-config](https://github.com/antfu/eslint-config) for code linting, which is an out-of-the-box ESLint flat config with the following features:

#### Core Features

- **Auto Formatting** - No Prettier needed, ESLint auto-fixes code formatting
- **Reasonable Defaults** - Follows best practices, works out of the box
- **TypeScript First** - Full TypeScript support
- **React Support** - React and React Hooks rules enabled
- **Consistent Style** - Minimizes reading burden, keeps diff stable

#### Code Style

**Basic Rules:**
- Use single quotes (`'`)
- Semicolons required (`;`)
- 2-space indentation
- Single quotes in JSX
- Auto-sorted imports
- Trailing commas

**Example:**
```tsx
import { useState } from 'react';
import type { FC } from 'react';

export const Component: FC = () => {
  const [count, setCount] = useState(0);
  
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
};
```

#### Configuration

The ESLint configuration is located at [eslint.config.js](eslint.config.js), with these main settings:

- ✅ React support enabled
- ✅ Ignores build output directories (`.next/`, `out/`, `build/`)
- ⚠️  `no-console` set to warning (allowed but warned)
- ⚠️  `unused-imports/no-unused-vars` set to warning (unused variables warned)
- ⚠️  `eqeqeq` set to warning (recommends `===` over `==`)

#### Common Commands

**Auto-fix code:**
```bash
pnpm lint
```

**Check code (without fixing):**
```bash
pnpm exec eslint .
```

**View enabled rules:**
```bash
npx @eslint/config-inspector
```

This visual tool helps you see which rules are enabled in your project and which files they apply to.

#### Editor Integration

It's recommended to install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and enable auto-fix on save in VS Code settings:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

#### Custom Rules

To override rules, add them to the `rules` object in [eslint.config.js](eslint.config.js):

```js
export default antfu({
  react: true,
  rules: {
    'no-console': 'off',  // Disable console check
    'style/semi': ['error', 'never'],  // Change to no semicolons
  },
})
```

## React Compiler

This project has **React Compiler** enabled, which automatically optimizes your React components by handling memoization for you.

### What is React Compiler?

React Compiler is a build-time optimization tool that automatically memoizes components and hooks, eliminating the need for manual `useMemo`, `useCallback`, and `React.memo`.

### Key Benefits

- ✨ **Automatic Memoization** - No need to manually wrap components with `React.memo` or use `useMemo`/`useCallback`
- 🚀 **Performance Optimization** - Automatically optimizes component re-renders
- 📦 **Zero Runtime Overhead** - All optimizations happen at build time
- 🔍 **DevTools Integration** - Optimized components show "Memo ✨" badge in React DevTools

### How to Verify

1. Install [React Developer Tools](https://react.dev/learn/react-developer-tools) browser extension
2. Open your app at http://localhost:3000
3. Open React DevTools
4. Look for the "✨" emoji next to component names - this indicates the component has been optimized by React Compiler

### Important Notes

⚠️ **Follow the Rules of React**

React Compiler requires your code to follow the [Rules of React](https://react.dev/reference/rules):

- Components and Hooks must be pure
- Props and state are immutable
- Values are immutable after being passed to JSX
- React APIs must be called correctly

If your component violates these rules, the compiler will skip optimization for that specific component.

⚠️ **ESLint Integration**

The project uses `eslint-plugin-react-hooks@7.0.1` which includes React Compiler rules. When ESLint reports an error:

- The compiler will skip optimizing that specific component or hook
- Other components will continue to be optimized
- You don't need to fix all violations immediately
- Address them at your own pace to gradually increase optimization coverage

⚠️ **Opt-out Mechanism**

If a component causes issues after compilation, you can temporarily opt it out using the `"use no memo"` directive:

```tsx
function ProblematicComponent() {
  "use no memo";
  // Component code here
}
```

**Note:** This is a temporary solution. You should fix the underlying issue and remove the directive once resolved.

### Configuration

The React Compiler is configured in [vite.config.ts](vite.config.ts):

```typescript
viteReact({
  babel: {
    plugins: ['babel-plugin-react-compiler'],
  },
})
```

For advanced configuration options, refer to the [React Compiler Configuration Reference](https://react.dev/reference/react-compiler/configuration).

### Learn More

- [React Compiler Documentation](https://react.dev/learn/react-compiler)
- [React Compiler Installation Guide](https://react.dev/learn/react-compiler/installation)
- [Debugging React Compiler](https://react.dev/learn/react-compiler/debugging)
- [Rules of React](https://react.dev/reference/rules)

## Learn More

- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Query](https://tanstack.com/query/latest)
- [Ant Design](https://ant.design/)
- [Ant Design Pro Components](https://procomponents.ant.design/)
- [Jotai](https://jotai.org/)
- [Vite](https://vitejs.dev/)

## License

Private
