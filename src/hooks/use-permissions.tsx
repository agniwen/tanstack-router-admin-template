import type { PermissionMode } from '~/atom/auth';
import { useAtomValue } from 'jotai';
import {
  checkPermission,
  permissionCheckerAtom,
  permissionsSetAtom,
} from '~/atom/auth';

export interface UsePermissionsOptions {
  /**
   * 权限检查模式
   * - 'and': 必须拥有所有指定的权限码
   * - 'or': 只需拥有其中一个权限码（默认）
   */
  mode?: PermissionMode
}

/**
 * 检查当前用户是否拥有指定权限
 * @param codes 权限码或权限码数组
 * @param options 配置选项
 * @returns 是否拥有权限
 *
 * @example
 * ```tsx
 * // 检查单个权限
 * const canCreate = usePermissions('user:create');
 *
 * // 检查多个权限（满足其一即可）
 * const canManage = usePermissions(['user:edit', 'user:delete']);
 *
 * // 检查多个权限（必须全部满足）
 * const canFullAccess = usePermissions(['user:edit', 'user:delete'], { mode: 'and' });
 * ```
 */
export function usePermissions(
  codes: string | string[],
  options?: UsePermissionsOptions,
): boolean {
  const { mode = 'or' } = options ?? {};
  const permissionsSet = useAtomValue(permissionsSetAtom);

  return checkPermission(permissionsSet, codes, mode);
}

/**
 * 获取权限检查函数
 * 适用于需要在回调或条件中检查权限的场景
 *
 * @example
 * ```tsx
 * const checkPermission = usePermissionChecker();
 *
 * const handleClick = () => {
 *   if (checkPermission('user:delete')) {
 *     // 执行删除操作
 *   }
 * };
 * ```
 */
export function usePermissionChecker() {
  return useAtomValue(permissionCheckerAtom);
}
