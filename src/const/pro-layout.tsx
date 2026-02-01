import type { ProLayoutProps } from '@ant-design/pro-components';
import { menus } from './menus';

export const defaultProLayoutProps: ProLayoutProps = {
  layout: 'mix',
  title: 'Admin Template',
  headerTitleRender: (logo) => {
    return (
      <a>
        {logo}
        <h1>Admin</h1>
      </a>
    );
  },
  route: {
    path: '/',
    routes: menus,
  },
};
