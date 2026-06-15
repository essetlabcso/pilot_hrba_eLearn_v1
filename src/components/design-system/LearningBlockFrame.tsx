import type { ReactNode } from 'react';
import './design-system.css';

export type LearningBlockFrameVariant = 'default' | 'soft';
export type LearningBlockFrameElement = 'section' | 'div';

export interface LearningBlockFrameProps {
  variant?: LearningBlockFrameVariant;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  support?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  className?: string;
  as?: LearningBlockFrameElement;
}

export function LearningBlockFrame({
  variant = 'default',
  eyebrow,
  title,
  description,
  children,
  support,
  actions,
  footer,
  className = '',
  as: Component = 'section',
}: LearningBlockFrameProps) {
  const classNames = ['cso-learning-block-frame', `cso-learning-block-frame--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames}>
      {eyebrow ? <div className="cso-learning-block-frame__eyebrow">{eyebrow}</div> : null}
      {title ? <div className="cso-learning-block-frame__title">{title}</div> : null}
      {description ? (
        <div className="cso-learning-block-frame__description">{description}</div>
      ) : null}
      <div className="cso-learning-block-frame__body">{children}</div>
      {support ? <div className="cso-learning-block-frame__support">{support}</div> : null}
      {actions ? <div className="cso-learning-block-frame__actions">{actions}</div> : null}
      {footer ? <div className="cso-learning-block-frame__footer">{footer}</div> : null}
    </Component>
  );
}
