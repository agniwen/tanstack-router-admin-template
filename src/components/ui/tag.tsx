import { Tag as AntdTag } from 'antd';

export interface TagProps extends React.ComponentProps<typeof AntdTag> {}

export function Tag(props: TagProps) {
  return <AntdTag {...props} />;
}
