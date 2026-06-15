import type { ReactNode } from 'react';
import { Callout } from '../Callout';
import '../design-system.css';

export type KeyMessageBlockVariant = 'info' | 'success' | 'warning';

export interface KeyMessageBlockProps {
  variant?: KeyMessageBlockVariant;
  title?: ReactNode;
  message: ReactNode;
  explanation?: ReactNode;
  className?: string;
}

export function KeyMessageBlock({
  variant = 'info',
  title,
  message,
  explanation,
  className = '',
}: KeyMessageBlockProps) {
  const classNames = ['cso-key-message-block', className].filter(Boolean).join(' ');

  return (
    <Callout variant={variant} title={title} className={classNames}>
      <div className="cso-key-message-block__message">{message}</div>
      {explanation ? (
        <div className="cso-key-message-block__explanation">{explanation}</div>
      ) : null}
    </Callout>
  );
}
