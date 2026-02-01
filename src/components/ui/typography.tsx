import { Typography as AntdTypography } from 'antd';

export type TypographyProps = React.ComponentProps<typeof AntdTypography>;

function InnerTypography(props: TypographyProps) {
  return <AntdTypography {...props} />;
}

export const Typography = Object.assign(InnerTypography, {
  Text: AntdTypography.Text,
  Paragraph: AntdTypography.Paragraph,
  Title: AntdTypography.Title,
  Link: AntdTypography.Link,
});
