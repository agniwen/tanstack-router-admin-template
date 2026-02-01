import type { MenuDataItem } from '@ant-design/pro-components';
import {
  AppstoreFilled,
} from '@ant-design/icons';

export const menus: Array<Omit<MenuDataItem, 'routes'>> = [
  {
    path: '/example',
    name: 'examples',
    icon: <AppstoreFilled />,
    routes: [
      {
        path: '/example/table',
        name: 'table',
      },
      {
        path: '/example/form',
        name: 'form',
      },
      {
        path: '/example/modal',
        name: 'modal',
      },
    ],
  },
];
