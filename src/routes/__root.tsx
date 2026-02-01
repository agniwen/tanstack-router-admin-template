import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ForbiddenPage, NotFoundPage, ServerErrorPage } from '~/components/features/exception-pages';
import '../style.css';

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFoundPage,
  errorComponent: ({ error }) => {
    // 根据错误类型返回不同的错误页面
    if (error instanceof Error) {
      // 可以根据错误消息或自定义错误类型判断
      if (error.message.includes('403') || error.message.includes('Forbidden')) {
        return <ForbiddenPage />;
      }
      if (error.message.includes('500') || error.message.includes('Server Error')) {
        return <ServerErrorPage />;
      }
    }
    // 默认返回 500 错误页面
    return <ServerErrorPage />;
  },
});

function Root() {
  return (
    <Outlet />
  );
}
