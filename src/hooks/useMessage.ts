import { App } from 'antd';

/**
 * 全局消息提示 Hook
 * 封装 Ant Design 的 message 方法
 *
 * @example
 * ```tsx
 * const message = useMessage();
 * message.success('操作成功');
 * message.error('操作失败');
 * ```
 */
export function useMessage() {
  const { message } = App.useApp();
  return message;
}
