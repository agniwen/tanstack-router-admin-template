import { atomWithStorage } from 'jotai/utils';

export const sidebarCollapsedAtom = atomWithStorage<boolean>('sidebar-collapsed', true);
