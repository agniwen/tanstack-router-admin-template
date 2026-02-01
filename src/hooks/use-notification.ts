import { App } from 'antd';

export function useNotification() {
  const { notification } = App.useApp();
  return notification;
}
