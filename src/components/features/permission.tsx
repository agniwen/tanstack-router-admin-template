import type { PropsWithChildren, ReactNode } from 'react';

import type { PermissionMode } from '~/atom/auth';
import { usePermissions } from '~/hooks/use-permissions';

export interface PermissionProps extends PropsWithChildren {
  /**
   * 权限码或权限码数组
   */
  code: string | string[]
  /**
   * 权限检查模式
   * - 'and': 必须拥有所有指定的权限码
   * - 'or': 只需拥有其中一个权限码（默认）
   */
  mode?: PermissionMode
  /**
   * 无权限时显示的内容
   */
  fallback?: ReactNode
}

/**
 * 权限控制组件
 * 根据用户权限决定是否渲染子组件
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Permission code="user:create">
 *   <Button>创建用户</Button>
 * </Permission>
 *
 * // 多权限检查（满足其一）
 * <Permission code={['user:edit', 'user:delete']}>
 *   <Button>管理用户</Button>
 * </Permission>
 *
 * // 多权限检查（全部满足）
 * <Permission code={['user:edit', 'user:delete']} mode="and">
 *   <Button>编辑并删除</Button>
 * </Permission>
 *
 * // 带 fallback
 * <Permission code="admin:dashboard" fallback={<span>无权限访问</span>}>
 *   <AdminPanel />
 * </Permission>
 * ```
 */
export function Permission(props: PermissionProps) {
  const { code, mode = 'or', fallback = null, children } = props;

  const hasPermission = usePermissions(code, { mode });

  if (!hasPermission) {
    return fallback;
  }

  return children;
}
