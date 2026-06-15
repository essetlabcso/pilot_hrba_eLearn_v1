import type { ReactNode } from 'react';
import './design-system.css';

export type CalloutVariant = 'info' | 'success' | 'warning';
export type CalloutElement = 'aside' | 'div';

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  as?: CalloutElement;
}

export function Callout({
  variant = 'info',
  title,
  children,
  icon,
  className = '',
  as: Component = 'div',
}: CalloutProps) {
  const classNames = ['cso-callout', `cso-callout--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames}>
      {icon ? (
        <span className="cso-callout__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <div className="cso-callout__body">
        {title ? <div className="cso-callout__title">{title}</div> : null}
        <div className="cso-callout__content">{children}</div>
      </div>
    </Component>
  );
}
