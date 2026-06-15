import type { ReactNode } from 'react';
import { ConceptExplanationBlock, KeyMessageBlock } from '../blocks';
import '../design-system.css';

export type ConceptIntroductionTemplateProps = {
  screenTitle: ReactNode;
  eyebrow?: ReactNode;
  conceptTitle: ReactNode;
  summary?: ReactNode;
  children: ReactNode;
  keyMessage?: ReactNode;
  keyMessageTitle?: ReactNode;
  className?: string;
};

export function ConceptIntroductionTemplate({
  screenTitle,
  eyebrow,
  conceptTitle,
  summary,
  children,
  keyMessage,
  keyMessageTitle,
  className = '',
}: ConceptIntroductionTemplateProps) {
  const classNames = [
    'cso-screen-template',
    'cso-concept-introduction-template',
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
        <div className="cso-screen-template__blocks">
          <ConceptExplanationBlock title={conceptTitle} summary={summary}>
            {children}
          </ConceptExplanationBlock>
          {keyMessage ? (
            <KeyMessageBlock title={keyMessageTitle} message={keyMessage} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
