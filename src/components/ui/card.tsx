import { Card as AntdCard } from 'antd';

export interface CardProps extends React.ComponentProps<typeof AntdCard> {}
function BaseCard(props: CardProps) {
  return <AntdCard variant='outlined' {...props} />;
}

// Card.Grid
export interface CardGridProps extends React.ComponentProps<typeof AntdCard.Grid> {}
function CardGrid(props: CardGridProps) {
  return <AntdCard.Grid {...props} />;
}

// Card.Meta
export interface CardMetaProps extends React.ComponentProps<typeof AntdCard.Meta> {}
function CardMeta(props: CardMetaProps) {
  return <AntdCard.Meta {...props} />;
}

export const Card = Object.assign(BaseCard, {
  Grid: CardGrid,
  Meta: CardMeta,
});
