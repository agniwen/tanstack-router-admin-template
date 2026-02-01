import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppProviders } from '~/components/providers/app-providers';

export const Route = createFileRoute('/_admin')({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className='admin-layout'>
      <AppProviders>
        <Outlet />
      </AppProviders>
    </div>
  );
}
