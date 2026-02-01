import type { PropsWithChildren } from 'react';
import { Provider } from '@ebay/nice-modal-react';

export function NiceModalProvider({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>;
}
