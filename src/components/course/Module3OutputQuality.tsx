import type { ReactNode } from 'react';
import './module3-output-quality.css';

type SurfaceProps = {
  children: ReactNode;
  className?: string;
  labelledBy?: string;
};

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export function OutputQualityCanvas({ children, className, labelledBy }: SurfaceProps) {
  return (
    <article
      className={classes('m3-oq-canvas', className)}
      aria-labelledby={labelledBy}
    >
      <span className="m3-oq-decoration" aria-hidden="true" />
      <div className="m3-oq-canvas__content">{children}</div>
    </article>
  );
}

export function InteractionSurface({ children, className, labelledBy }: SurfaceProps) {
  return (
    <section
      className={classes('m3-oq-interaction', className)}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}

export function GeneratedOutputSurface({
  children,
  className,
  labelledBy,
}: SurfaceProps) {
  return (
    <section
      className={classes('m3-oq-output', className)}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}

export function GeneratedStatus({
  children,
  testId,
}: {
  children: ReactNode;
  testId?: string;
}) {
  return (
    <p
      className="m3-oq-status"
      role="status"
      aria-live="polite"
      data-testid={testId}
    >
      {children}
    </p>
  );
}

export type EvidenceChainItem = {
  id: string;
  label: string;
  value: ReactNode;
  kind?: 'evidence' | 'interpretation' | 'verify' | 'implication';
};

export function EvidenceChain({
  items,
  label,
}: {
  items: EvidenceChainItem[];
  label: string;
}) {
  return (
    <ol className="m3-oq-chain" aria-label={label}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`m3-oq-chain__item is-${item.kind || 'interpretation'}`}
        >
          <span className="m3-oq-chain__number">{index + 1}</span>
          <div>
            <strong>{item.label}</strong>
            <p>{item.value}</p>
          </div>
          {index < items.length - 1 && (
            <span className="m3-oq-chain__arrow" aria-hidden="true">→</span>
          )}
        </li>
      ))}
    </ol>
  );
}

export type LegendItem = {
  id: string;
  label: string;
  symbol: ReactNode;
};

export function VisualizationLegend({
  items,
  label = 'Visualization legend',
}: {
  items: LegendItem[];
  label?: string;
}) {
  return (
    <ul className="m3-oq-legend" aria-label={label}>
      {items.map((item) => (
        <li key={item.id}>
          <span aria-hidden="true">{item.symbol}</span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function AccessibleSpatialAlternative({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <section className="m3-oq-spatial-alternative" aria-label={label}>
      {children}
    </section>
  );
}

export function BeforeAfterComparison({
  before,
  after,
  reasoning,
}: {
  before: ReactNode;
  after: ReactNode;
  reasoning: ReactNode;
}) {
  return (
    <div className="m3-oq-before-after">
      <section className="m3-oq-before-after__before" aria-label="Before — original weakness">
        <h3>Before — original weakness</h3>
        {before}
      </section>
      <section className="m3-oq-before-after__after" aria-label="Repaired design">
        <h3>Repaired design</h3>
        {after}
      </section>
      <section className="m3-oq-before-after__reasoning" aria-label="Why this is stronger">
        <h3>Why this is stronger</h3>
        {reasoning}
      </section>
    </div>
  );
}
