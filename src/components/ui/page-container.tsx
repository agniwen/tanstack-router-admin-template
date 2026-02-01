import type { PageContainerProps } from '@ant-design/pro-components';
import type { PropsWithChildren } from 'react';
import { PageContainer as AntdProPageContainer } from '@ant-design/pro-components';

export type { PageContainerProps } from '@ant-design/pro-components';

export function PageContainer({ children, ...restProps }: PropsWithChildren<PageContainerProps>) {
  return <AntdProPageContainer {...restProps}>{children}</AntdProPageContainer>;
}
