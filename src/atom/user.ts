import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface User {
  id: string
  name: string
}

export const userAtom = atomWithStorage<User | undefined>('user', undefined);

export const userIdAtom = atom((get) => {
  return get(userAtom)?.id || '';
});
