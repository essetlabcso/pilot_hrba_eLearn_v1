import type { ReactNode } from 'react';
import './design-system.css';

export type CardVariant = 'default' | 'soft';
export type CardElement = 'section' | 'article' | 'div';

export interface CardProps {
  variant?: CardVariant;
  title?: ReactNode;
  eyebrow?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  as?: CardElement;
}

export function Card({
  variant = 'default',
  title,
  eyebrow,
  children,
  footer,
  className = '',
  as,
}: CardProps) {
  const Component = as ?? (title ? 'section' : 'div');
  const classNames = ['cso-card', `cso-card--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames}>
      {eyebrow ? <div className="cso-card__eyebrow">{eyebrow}</div> : null}
      {title ? <div className="cso-card__title">{title}</div> : null}
      <div className="cso-card__content">{children}</div>
      {footer ? <div className="cso-card__footer">{footer}</div> : null}
    </Component>
  );
}
