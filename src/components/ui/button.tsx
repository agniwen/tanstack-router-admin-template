import type { ButtonProps } from 'antd';
import { Button as AntdButton } from 'antd';
import { useState } from 'react';

export type { ButtonProps } from 'antd';

export function Button({ children, loading: _loading, onClick, ...props }: ButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = _loading || internalLoading;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const p = onClick?.(e) as Promise<void> | undefined;
    if (p instanceof Promise) {
      setInternalLoading(true);
      p.finally(() => {
        setInternalLoading(false);
      });
    }
  }

  return <AntdButton {...props} loading={loading} onClick={handleClick}>{children}</AntdButton>;
}
