import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { ProLayout } from '~/components/layouts/pro-layout';

export const Route = createFileRoute('/_admin/_auth')({
  component: AuthLayout,
});

const auth = true;

function AuthLayout() {
  if (!auth) {
    return <Navigate to='/login' />;
  }
  return (
    <ProLayout>
      <Outlet />
    </ProLayout>
  );
}
