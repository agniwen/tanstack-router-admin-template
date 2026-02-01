import { App } from 'antd';

export function useApp() {
  const { modal } = App.useApp();
  return modal;
}
