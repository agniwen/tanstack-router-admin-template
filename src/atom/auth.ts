import { atom } from 'jotai';

/**
 * 权限码存储 atom
 * 存储当前用户拥有的所有权限码
 */
export const permissionsAtom = atom<string[]>([]);

/**
 * 派生 atom：将权限码数组转换为 Set，提供 O(1) 查找性能
 * 仅在 permissionsAtom 变化时重新计算
 */
export const permissionsSetAtom = atom(get => new Set(get(permissionsAtom)));

/**
 * 权限检查模式
 * - 'and': 必须拥有所有指定的权限码
 * - 'or': 只需拥有其中一个权限码
 */
export type PermissionMode = 'and' | 'or';

/**
 * 检查是否拥有指定权限（使用 Set 进行 O(1) 查找）
 * @param permissionsSet 用户拥有的权限码 Set
 * @param codes 需要检查的权限码
 * @param mode 检查模式，默认 'or'
 */
export function checkPermission(
  permissionsSet: Set<string>,
  codes: string | string[],
  mode: PermissionMode = 'or',
): boolean {
  const codeList = Array.isArray(codes) ? codes : [codes];

  if (codeList.length === 0) {
    return true;
  }

  if (mode === 'and') {
    return codeList.every(code => permissionsSet.has(code));
  }

  return codeList.some(code => permissionsSet.has(code));
}

/**
 * 派生 atom：返回权限检查函数
 */
export const permissionCheckerAtom = atom((get) => {
  const permissionsSet = get(permissionsSetAtom);
  return (codes: string | string[], mode: PermissionMode = 'or') =>
    checkPermission(permissionsSet, codes, mode);
});
