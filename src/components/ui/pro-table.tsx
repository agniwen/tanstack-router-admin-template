'use client';
import type { ParamsType, ProTableProps as ProTablePropsBase } from '@ant-design/pro-components';
import { ProTable as AntdProTable } from '@ant-design/pro-components';

const defaultScrollProps = {
  x: 1200,
};

export interface ProTableProps<DataSource extends Record<string, any>, U extends ParamsType = ParamsType, ValueType = 'text'> extends ProTablePropsBase<DataSource, U, ValueType> {

}
export function ProTable<DataSource extends Record<string, any>, U extends ParamsType = ParamsType, ValueType = 'text'>(props: ProTableProps<DataSource, U, ValueType>) {
  const { ...restProps } = props;
  return <AntdProTable<DataSource, U, ValueType> rowKey='id' cardBordered scroll={defaultScrollProps} {...restProps} />;
}
