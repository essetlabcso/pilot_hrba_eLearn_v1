import type { ReactNode } from 'react';
import { KeyMessageBlock, type KeyMessageBlockVariant } from '../blocks';
import '../design-system.css';

export type KeyMessageSummaryTemplateProps = {
  screenTitle: ReactNode;
  eyebrow?: ReactNode;
  variant?: KeyMessageBlockVariant;
  messageTitle?: ReactNode;
  message: ReactNode;
  explanation?: ReactNode;
  className?: string;
};

export function KeyMessageSummaryTemplate({
  screenTitle,
  eyebrow,
  variant = 'info',
  messageTitle,
  message,
  explanation,
  className = '',
}: KeyMessageSummaryTemplateProps) {
  const classNames = [
    'cso-screen-template',
    'cso-key-message-summary-template',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classNames}>
      <div className="cso-screen-template__header">
        {eyebrow ? <div className="cso-screen-template__eyebrow">{eyebrow}</div> : null}
        <h2 className="cso-screen-template__title">{screenTitle}</h2>
      </div>
      <div className="cso-screen-template__body">
        <KeyMessageBlock
          variant={variant}
          title={messageTitle}
          message={message}
          explanation={explanation}
        />
      </div>
    </section>
  );
}
