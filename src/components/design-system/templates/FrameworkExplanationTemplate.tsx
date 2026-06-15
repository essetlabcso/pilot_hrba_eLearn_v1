import type { ReactNode } from 'react';
import { ConceptExplanationBlock, KeyMessageBlock } from '../blocks';
import '../design-system.css';

export type FrameworkExplanationConcept = {
  title: ReactNode;
  summary?: ReactNode;
  body: ReactNode;
  keyPoint?: ReactNode;
  support?: ReactNode;
};

export type FrameworkExplanationTemplateProps = {
  screenTitle: ReactNode;
  eyebrow?: ReactNode;
  introduction?: ReactNode;
  concepts: [FrameworkExplanationConcept] | [FrameworkExplanationConcept, FrameworkExplanationConcept];
  keyMessage?: ReactNode;
  keyMessageTitle?: ReactNode;
  className?: string;
};

export function FrameworkExplanationTemplate({
  screenTitle,
  eyebrow,
  introduction,
  concepts,
  keyMessage,
  keyMessageTitle,
  className = '',
}: FrameworkExplanationTemplateProps) {
  const classNames = [
    'cso-screen-template',
    'cso-framework-explanation-template',
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
        {introduction ? (
          <div className="cso-screen-template__summary">{introduction}</div>
        ) : null}
        <div className="cso-screen-template__blocks">
          {concepts.map((concept, index) => (
            <ConceptExplanationBlock
              key={index}
              title={concept.title}
              summary={concept.summary}
              keyPoint={concept.keyPoint}
              support={concept.support}
            >
              {concept.body}
            </ConceptExplanationBlock>
          ))}
          {keyMessage ? (
            <KeyMessageBlock title={keyMessageTitle} message={keyMessage} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
