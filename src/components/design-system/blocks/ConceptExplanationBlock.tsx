import type { ReactNode } from 'react';
import { Callout } from '../Callout';
import { LearningBlockFrame } from '../LearningBlockFrame';
import '../design-system.css';

export interface ConceptExplanationBlockProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  summary?: ReactNode;
  children: ReactNode;
  keyPoint?: ReactNode;
  support?: ReactNode;
  className?: string;
}

export function ConceptExplanationBlock({
  eyebrow,
  title,
  summary,
  children,
  keyPoint,
  support,
  className = '',
}: ConceptExplanationBlockProps) {
  const classNames = ['cso-concept-explanation-block', className].filter(Boolean).join(' ');
  const supportContent =
    keyPoint || support ? (
      <div className="cso-concept-explanation-block__support">
        {keyPoint ? (
          <Callout className="cso-concept-explanation-block__key-point">{keyPoint}</Callout>
        ) : null}
        {support ? (
          <div className="cso-concept-explanation-block__support-note">{support}</div>
        ) : null}
      </div>
    ) : undefined;

  return (
    <LearningBlockFrame
      className={classNames}
      eyebrow={eyebrow}
      title={title}
      description={
        summary ? <div className="cso-concept-explanation-block__summary">{summary}</div> : undefined
      }
      support={supportContent}
    >
      <div className="cso-concept-explanation-block__body">{children}</div>
    </LearningBlockFrame>
  );
}
