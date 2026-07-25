import type { ReactNode } from 'react';
import './module4-enhanced.css';

export function Module4EnhancedScreenFrame({
  titleId,
  eyebrow,
  title,
  introduction,
  context,
  activity,
  status,
}: {
  titleId: string;
  eyebrow: string;
  title: string;
  introduction: ReactNode;
  context: ReactNode;
  activity: ReactNode;
  status?: ReactNode;
}) {
  return (
    <main className="m4-enhanced-screen" aria-labelledby={titleId}>
      <header className="m4-enhanced-screen__header">
        <p className="m4-enhanced-screen__eyebrow">{eyebrow}</p>
        <h1 id={titleId}>{title}</h1>
        <div className="m4-enhanced-screen__introduction">{introduction}</div>
      </header>
      <div className="m4-enhanced-screen__workspace">
        <aside className="m4-enhanced-screen__context" aria-label="Jiru Amba context">
          {context}
        </aside>
        <section className="m4-enhanced-screen__activity" aria-label={`${title} activity`}>
          {activity}
        </section>
      </div>
      {status && (
        <div className="m4-enhanced-status" role="status" aria-live="polite">
          {status}
        </div>
      )}
    </main>
  );
}

export function Module4EnhancedStageList({
  label,
  stages,
  activeStage,
}: {
  label: string;
  stages: readonly { id: string; label: string; complete: boolean }[];
  activeStage: string;
}) {
  return (
    <ol className="m4-enhanced-stages" aria-label={label}>
      {stages.map((stage, index) => (
        <li
          key={stage.id}
          className={[
            'm4-enhanced-stages__item',
            stage.id === activeStage ? 'is-active' : '',
            stage.complete ? 'is-complete' : '',
          ].filter(Boolean).join(' ')}
          aria-current={stage.id === activeStage ? 'step' : undefined}
        >
          <span className="m4-enhanced-stages__number" aria-hidden="true">{index + 1}</span>
          <span>{stage.label}</span>
          {stage.complete && <span className="m4-enhanced-stages__state">Complete</span>}
        </li>
      ))}
    </ol>
  );
}

export function Module4EnhancedActionBar({
  secondary,
  primary,
}: {
  secondary?: ReactNode;
  primary: ReactNode;
}) {
  return (
    <div className="m4-enhanced-actions">
      <div className="m4-enhanced-actions__secondary">{secondary}</div>
      <div className="m4-enhanced-actions__primary">{primary}</div>
    </div>
  );
}
