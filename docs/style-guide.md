# Style Guide

This document outlines the coding standards and design decisions adopted in this project.

## Table of Contents

- [File Naming Convention](#file-naming-convention)
- [Component Organization](#component-organization)
- [Page-Level Organization](#page-level-organization)

---

## File Naming Convention

### Rule

All files and folders use **kebab-case** (lowercase letters + hyphens).

```bash
# ✅ Correct
user-profile/
my-component.tsx
api-service.ts
use-demo-data.ts

# ❌ Incorrect
UserProfile/           # PascalCase
myComponent.tsx        # camelCase
api_service.ts         # snake_case
```

### Why kebab-case?

#### 1. URL Friendly

kebab-case naturally aligns with URL paths. In web development, file paths often map directly to URLs:

```tsx
// File path: user-profile/settings.tsx
// URL: /user-profile/settings

// File path: api/user-service.ts
// API route: /api/user-service
```

#### 2. Cross-Platform Consistency

Different operating systems handle case sensitivity differently:

- **Linux**: Case-sensitive (`UserProfile.ts` ≠ `userprofile.ts`)
- **Windows**: Case-insensitive (`UserProfile.ts` = `userprofile.ts`)
- **macOS**: Case-insensitive by default, configurable

kebab-case uses all lowercase, avoiding path issues in cross-platform development.

#### 3. Consistent with Package Names

npm packages recommend kebab-case naming:

```json
{
  "name": "my-awesome-lib",
  "dependencies": {
    "react-query": "^5.0.0"
  }
}
```

Keeping file naming consistent with package naming reduces cognitive load.

#### 4. Readability

Hyphens are easier to scan quickly than camelCase:

```
use-demo-data.ts      vs  useDemoData.ts
user-profile-list.tsx vs  UserProfileList.tsx
```

#### 5. Industry Standard

Major frontend tools and frameworks use kebab-case by default:

| Tool/Framework    | Default Naming Convention |
| ----------------- | ------------------------- |
| Vite              | kebab-case                |
| Vue.js            | kebab-case                |
| Next.js App Router| kebab-case                |
| Remix             | kebab-case                |
| Svelte            | kebab-case                |

---

## Component Organization

Components are organized in two ways based on complexity:

### Pattern 1: Multi-file Components (Folder Organization)

When a component contains multiple files, use a folder with `index.ts` for exports:

```bash
list/
├── index.ts           # Unified exports
├── list.tsx           # Main component
└── list-item.tsx      # Sub-component
```

```tsx
// list/index.ts
export { List } from './list';
export { ListItem } from './list-item';

// Usage
import { List, ListItem } from './list';
```

### Pattern 2: Single-file Components

When a component only needs one file, create the file directly:

```bash
button.tsx
card.tsx
input.tsx
```

```tsx
// Usage
import { Button } from './button';
```

### Selection Criteria

| Scenario                          | Organization Pattern    |
| --------------------------------- | ----------------------- |
| Single component, no sub-components | Single file           |
| Component + sub-components        | Folder + index.ts       |
| Component + hooks + styles        | Folder + index.ts       |
| Shared type definitions           | Folder + index.ts       |

---

## Page-Level Organization

This project uses [TanStack Router](https://tanstack.com/router) file-based routing, where files and folders in the routes directory automatically map to URL paths.

### Non-Route File Convention

According to TanStack Router's [file naming conventions](https://tanstack.com/router/latest/docs/framework/react/routing/file-naming-conventions), **files and folders prefixed with `-` are excluded from the route tree** and will not generate routes.

We use this feature to store page-level private files (when not intended for reuse):

| Folder           | Purpose                    |
| ---------------- | -------------------------- |
| `-components/`   | Page-level components      |
| `-atom/`         | Page-level state (Jotai)   |
| `-utils/`        | Page-level utility functions |
| `-hooks/`        | Page-level custom hooks    |
| `-types.ts`      | Page-level type definitions |

### Directory Structure Example

```bash
routes/
├── __root.tsx                    # Root route
├── index.tsx                     # Home page /
└── _admin/                        # Layout route (not in URL)
    ├── route.tsx                  # Layout component
    ├── dashboard/
    │   ├── index.tsx              # /dashboard
    │   ├── -components/           # ❗ Page-level components (no route)
    │   │   ├── stat-card.tsx
    │   │   └── recent-activity.tsx
    │   ├── -atom/                 # ❗ Page-level state
    │   │   └── dashboard.ts
    │   └── -utils/                # ❗ Page-level utilities
    │       └── chart-helpers.ts
    └── users/
        ├── index.tsx              # /users
        ├── $userId/
        │   └── index.tsx          # /users/:userId
        ├── -components/           # ❗ Components for users page
        │   ├── user-table.tsx
        │   ├── user-form.tsx
        │   └── user-filters.tsx
        ├── -atom/
        │   └── user-filters.ts
        └── -types.ts              # ❗ Can also be a single file
```

### Usage Example

```tsx
// routes/_admin/users/index.tsx
import { UserTable } from './-components/user-table';
import { UserFilters } from './-components/user-filters';
import { userFiltersAtom } from './-atom/user-filters';

export function UsersPage() {
  // ...
}
```

### Selection Criteria

| Scenario                              | Location                        |
| ------------------------------------- | ------------------------------- |
| Components used only by current page  | `routes/xxx/-components/`       |
| Components shared across pages        | `src/components/`               |
| State used only by current page       | `routes/xxx/-atom/`             |
| Globally shared state                 | `src/atom/`                     |
| Utils/hooks for current page only     | `routes/xxx/-utils/` or `-hooks/` |
| Globally shared utils/hooks           | `src/lib/` or `src/hooks/`      |
