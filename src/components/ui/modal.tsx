import { Modal as AntdModal } from 'antd';
import { useTransition } from 'react';

export interface ModalProps extends Omit<React.ComponentProps<typeof AntdModal>, 'onOk'> {
  footerExtra?: React.ReactNode
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void
}
export function Modal({ onOk, footerExtra, okButtonProps, loading, footer, ...props }: ModalProps) {
  const [isPending, startTransition] = useTransition();
  function handleOk(e: React.MouseEvent<HTMLButtonElement>) {
    startTransition(async () => {
      await onOk?.(e);
    });
  }
  return (
    <AntdModal
      footer={footer || ((dom) => {
        return (
          <div className='flex justify-between items-end'>
            <div>{footerExtra}</div>
            <div className='space-x-2'>{dom}</div>
          </div>
        );
      })}
      okText='Submit'
      maskClosable={false}
      {...props}
      okButtonProps={{ loading: loading || isPending, ...okButtonProps }}
      onOk={handleOk}
    />
  );
}
