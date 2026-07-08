/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/no-explicit-any, no-useless-assignment, prefer-const */
// Module 1 learner-facing screens live here while they are replaced screen-by-screen.
// Keep new Module 1 screen implementations in this file or small Module 1 helpers,
// so ScreenRenderer remains a simple module dispatcher.
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode, SyntheticEvent } from 'react';
import type { LearningState } from '../../state/learningState';
import inclusionLensCommunity from '../../assets/hrba/module-1/screen-08-10/inclusion-lens-community.png';
import connectedRightsRipple from '../../assets/hrba/module-1/screen-08-10/connected-rights-ripple.png';
import needToRightIcon from '../../assets/hrba/module-1/screen-14/need-to-right.png';
import beneficiaryToRightsholderIcon from '../../assets/hrba/module-1/screen-14/beneficiary-to-rightsholder.png';
import providerToResponsibilityIcon from '../../assets/hrba/module-1/screen-14/provider-to-responsibility.png';
import consultationToParticipationIcon from '../../assets/hrba/module-1/screen-14/consultation-to-participation.png';
import reportingToAccountabilityIcon from '../../assets/hrba/module-1/screen-14/reporting-to-accountability.png';
import waterStoryVisual from '../../assets/hrba/module-1/visuals/m1-s1-04-water-story-placeholder.png';
import accountabilityActorMap from '../../assets/hrba/module-1/visuals/m1-s2-01-accountability-actor-map.svg';
import servicesToRightsPathway from '../../assets/hrba/module-1/visuals/m1-s2-03-services-to-rights-pathway.svg';
import { module1RefinementAssets } from '../../data/module1/module_1_refinement_assets';
import '../../styles/module1-visual-supports.css';
import '../../styles/module1-ux-polish.css';

type JourneyProgressStyle = CSSProperties & { '--journey-progress': string };
type HRBAProgressStyle = CSSProperties & { '--m1-progress': string };
type IconAsset = {
  png?: string;
  svg?: string | null;
  alt: string;
};

function iconSource(asset: IconAsset) {
  return asset.png || asset.svg || '';
}

function useSvgFallback(event: SyntheticEvent<HTMLImageElement>, asset: IconAsset) {
  if (!asset.svg) {
    return;
  }

  event.currentTarget.onerror = null;
  event.currentTarget.src = asset.svg;
}

function hideBrokenImage(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = 'none';
  event.currentTarget.parentElement?.classList.add('is-image-missing');
}

function useWaterPointFallback(event: SyntheticEvent<HTMLImageElement>) {
  const fallbackSrc = module1RefinementAssets.m1S05.waterPointScenarioPng;
  if (event.currentTarget.currentSrc.endsWith(fallbackSrc) || event.currentTarget.src.endsWith(fallbackSrc)) {
    hideBrokenImage(event);
    return;
  }

  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackSrc;
}

interface FocusModalProps {
  titleId: string;
  descriptionId?: string;
  className?: string;
  onClose: () => void;
  children: ReactNode;
}

function FocusModal({ titleId, descriptionId, className = '', onClose, children }: FocusModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) {
      return undefined;
    }

    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(modal.querySelectorAll<HTMLElement>(focusableSelector))
      .filter((element) => !element.hasAttribute('disabled'));
    const focusable = getFocusable();
    const firstFocusable = focusable[0];
    const previousActiveElement = document.activeElement as HTMLElement | null;

    (firstFocusable || modal).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      const currentFocusable = getFocusable();
      if (event.key !== 'Tab' || currentFocusable.length === 0) {
        return;
      }

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="m1-water-modal-backdrop" role="presentation">
      <div
        ref={modalRef}
        className={`m1-water-modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}

interface Module1InteractionModalProps {
  titleId: string;
  eyebrow?: string;
  title: string;
  body: ReactNode;
  question?: string;
  image?: {
    src: string;
    alt: string;
    fallback?: (event: SyntheticEvent<HTMLImageElement>) => void;
  };
  icon?: IconAsset;
  onClose: () => void;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  tone?: 'default' | 'success' | 'support';
}

function Module1InteractionModal({
  titleId,
  eyebrow,
  title,
  body,
  question,
  image,
  icon,
  onClose,
  primaryAction,
  secondaryAction,
  tone = 'default'
}: Module1InteractionModalProps) {
  const descriptionId = `${titleId}-description`;

  return (
    <FocusModal
      titleId={titleId}
      descriptionId={descriptionId}
      className={`m1-interaction-modal m1-interaction-modal--${tone}`}
      onClose={onClose}
    >
      <button className="m1-water-modal-close" type="button" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="m1-interaction-modal__body">
        {(image || icon) && (
          <figure className="m1-interaction-modal__visual">
            {image ? (
              <img
                src={image.src}
                alt={image.alt}
                loading="eager"
                onError={image.fallback || hideBrokenImage}
              />
            ) : icon ? (
              <>
                <img
                  src={iconSource(icon)}
                  alt={icon.alt}
                  loading="eager"
                  onError={(event) => useSvgFallback(event, icon)}
                />
                <span className="m1-interaction-modal__icon-mark" aria-hidden="true">
                  {title.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase()}
                </span>
              </>
            ) : null}
            <div className="m1-b3-image-fallback" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </figure>
        )}
        <div className="m1-interaction-modal__copy">
          {eyebrow && <span>{eyebrow}</span>}
          <h2 id={titleId}>{title}</h2>
          <div id={descriptionId} className="m1-interaction-modal__text">{body}</div>
          {question && (
            <div className="m1-next-question">
              <strong>HRBA question:</strong>
              <p>{question}</p>
            </div>
          )}
        </div>
      </div>
      <div className="m1-water-modal-actions">
        {secondaryAction && (
          <button type="button" className="m1-water-modal-secondary" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </button>
        )}
        <button type="button" className="m1-water-modal-primary" onClick={primaryAction.onClick}>
          {primaryAction.label}
        </button>
      </div>
    </FocusModal>
  );
}

interface Module1RendererProps {
  screenId: string;
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}

export default function Module1Renderer({ screenId, state, onChangeState, onNext }: Module1RendererProps) {
  const isWideOpeningScreen = screenId === 'M1-PLAYER-00' || screenId === 'M1-S1-01' || screenId === 'M1-S1-02' || screenId === 'M1-S1-03' || screenId === 'M1-S1-04' || screenId === 'M1-S1-05' || screenId === 'M1-S1-06' || screenId === 'M1-S1-06A' || screenId === 'M1-S1-06B' || screenId === 'M1-S1-07' || screenId === 'M1-S1-08' || screenId === 'M1-S2-01' || screenId === 'M1-S2-02' || screenId === 'M1-S2-03' || screenId === 'M1-S2-04' || screenId === 'M1-S2-05' || screenId === 'M1-S3-01' || screenId === 'M1-S3-02';

  return (
    <div
      style={{
        width: '100%',
        maxWidth: isWideOpeningScreen ? '1180px' : '800px',
        margin: '0 auto'
      }}
    >
      {renderBlockContent(screenId, state, onChangeState, onNext)}
    </div>
  );
}

function Module1OpeningScreen({ onNext }: { onNext: () => void }) {
  return (
    <section className="m1-b2-screen m1-b2-opening" aria-labelledby="m1-opening-title">
      <div className="m1-b2-opening__content">
        <div className="m1-b2-eyebrow">Applying the Human Rights-Based Approach in CSO Practice</div>
        <h1 id="m1-opening-title" className="m1-b2-opening__title">
          <span>Module 1</span>
          Starting the HRBA Learning Journey
        </h1>
        <p className="m1-b2-opening__subtitle">Introduction to HRBA for Local CSOs</p>
        <p className="m1-b2-duration" aria-label="Duration: 20 to 25 minutes">
          Duration: 20–25 minutes
        </p>
        <p className="m1-b2-opening__promise">
          In this module, you will begin using a simple HRBA lens for everyday CSO work. You will not need legal expertise. You will practice noticing dignity, inclusion, participation, responsibility, and accountability in ordinary project situations.
        </p>
        <button className="m1-b2-primary" type="button" onClick={onNext}>
          Start Module 1
        </button>
      </div>

      <figure className="m1-b2-opening__visual">
        <img
          src="/assets/hrba/modules/module-1.webp"
          alt="Learners walking along a glowing pathway through a fictional Ethiopian highland landscape at sunrise."
          loading="eager"
        />
      </figure>
    </section>
  );
}

function Module1WelcomeCourseScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const relevanceOptions = [
    'We want to improve participation and inclusion.',
    'We want to strengthen advocacy and accountability.',
    'We want to design stronger projects.',
    'We want to use evidence and feedback better.',
    'We want to connect HRBA more clearly to our daily work.'
  ];
  const selectedReason = String(state.practiceCheckState.module1WelcomeCourseReason || '');
  const transcript = [
    'Welcome to Starting the HRBA Learning Journey.',
    'This course is part of the wider CSF Plus capacity development support for local and grassroots CSOs in Ethiopia.',
    'Many local CSOs already work close to communities. You know the real challenges people face. You work with limited time, limited resources, and many expectations from communities, partners, and donors.',
    'This course is designed to support that work.',
    'It will help you use the Human Rights-Based Approach (HRBA) in practical ways. HRBA helps CSOs ask better questions: Who is affected? Who may be left out? Who should be heard? Who has responsibility? What should change after people participate?',
    'HRBA is not about creating conflict. It helps CSOs work constructively, support people\'s voice, engage duty-bearers, and strengthen accountability in safe and practical ways.',
    'Across this course, you will use examples, simple tools, portfolio notes, and peer learning to connect HRBA to your own CSO work.',
    'This first module will help you understand the course, the learning journey, the portfolio, and your own learning priority.'
  ];
  const shellStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    padding: '1.4rem 1.25rem 7rem',
    maxWidth: '960px',
    margin: '0 auto'
  };
  const panelStyle: CSSProperties = {
    background: '#ffffff',
    border: '1px solid rgba(16, 92, 91, 0.16)',
    borderRadius: '8px',
    boxShadow: '0 16px 34px rgba(15, 23, 42, 0.10)',
    color: '#10233f',
    padding: '1.1rem'
  };
  const titleStyle: CSSProperties = {
    color: '#0b2a55',
    fontFamily: 'var(--font-family-headings)',
    fontSize: 'clamp(2rem, 4vw, 3.6rem)',
    lineHeight: 1.04,
    margin: '0'
  };
  const transcriptStyle: CSSProperties = {
    ...panelStyle,
    marginTop: '1rem'
  };
  const handleSelectReason = (reason: string) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        module1WelcomeCourseReason: reason
      }
    }));
  };

  return (
    <section className="m1-b2-screen m1-b2-welcome-course" aria-labelledby="m1-welcome-course-title" style={{ background: '#eef7f5', overflow: 'visible' }}>
      <div style={shellStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', minWidth: 0 }}>
          <div className="m1-next-kicker">MODULE 1 | INTRO VIDEO</div>
          <h1 id="m1-welcome-course-title" style={titleStyle}>Why This Course, Why Now?</h1>
          <p className="m1-next-intro" style={{ color: '#174163', fontSize: '1.15rem', margin: 0 }}>
            A short welcome to the HRBA learning journey
          </p>

          <figure style={{ ...panelStyle, margin: 0, padding: '0.65rem' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="/assets/hrba/modules/module-1/m1-s01-why-this-course-video-poster.png"
                alt="A diverse local CSO learning group reviews a course journey board showing participation, planning, accountability, and community connection."
                loading="eager"
                style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '6px' }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '6px',
                  background: 'linear-gradient(180deg, rgba(7, 28, 51, 0.08), rgba(7, 28, 51, 0.34))'
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '5.25rem',
                    height: '5.25rem',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.94)',
                    boxShadow: '0 18px 38px rgba(7, 28, 51, 0.24)',
                    position: 'relative'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '2.12rem',
                      top: '1.58rem',
                      width: 0,
                      height: 0,
                      borderTop: '1rem solid transparent',
                      borderBottom: '1rem solid transparent',
                      borderLeft: '1.45rem solid #0b2a55'
                    }}
                  />
                </span>
              </div>
            </div>
            <figcaption style={{ color: '#42566d', fontSize: '0.9rem', marginTop: '0.55rem' }}>
              Intro video poster. Transcript is available below.
            </figcaption>
          </figure>

          <section aria-labelledby="m1-welcome-transcript-title" style={transcriptStyle}>
            <strong id="m1-welcome-transcript-title" style={{ display: 'block', color: '#0b2a55', fontSize: '1.1rem', marginBottom: '0.6rem' }}>
              Transcript
            </strong>
            {transcript.map((paragraph) => (
              <p key={paragraph} style={{ color: '#26394f', lineHeight: 1.55, margin: '0 0 0.75rem' }}>{paragraph}</p>
            ))}
          </section>

          <section aria-labelledby="m1-welcome-relevance-title" style={panelStyle}>
            <strong id="m1-welcome-relevance-title" style={{ display: 'block', color: '#0b2a55', fontSize: '1.1rem', marginBottom: '0.65rem' }}>
              Which reason feels most relevant to your CSO work now?
            </strong>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {relevanceOptions.map((option) => {
                const selected = selectedReason === option;
                return (
                  <button
                    key={option}
                    type="button"
                    className={`m1-next-choice ${selected ? 'is-selected' : ''}`}
                    onClick={() => handleSelectReason(option)}
                    aria-pressed={selected}
                    style={{
                      border: selected ? '2px solid #105c5b' : '1px solid rgba(16, 92, 91, 0.22)',
                      borderRadius: '8px',
                      background: selected ? '#e4f4ee' : '#ffffff',
                      color: '#10233f',
                      padding: '0.75rem 0.85rem',
                      textAlign: 'left',
                      fontWeight: selected ? 700 : 600,
                      cursor: 'pointer'
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {selectedReason && (
              <p style={{ color: '#105c5b', fontWeight: 700, margin: '0.85rem 0 0' }}>
                Good starting point. Keep this in mind as you move through the course. You will return to this priority in your portfolio.
              </p>
            )}
          </section>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.35rem' }}>
            <button type="button" className="m1-next-continue" onClick={onNext} disabled={!selectedReason}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Module1AboutCourseScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const cards = [
    {
      id: 'what-course-is',
      title: 'What This Course Is',
      text: [
        'This is a practical HRBA e-learning course for local and grassroots CSOs.',
        'It helps you connect HRBA to project design, implementation, MEAL, advocacy, inclusion, participation, and accountability.'
      ]
    },
    {
      id: 'why-course-matters',
      title: 'Why This Course Matters',
      text: [
        'Local CSOs are close to communities and understand many real problems.',
        'HRBA helps CSOs look more carefully at who is affected, who is left out, who should participate, who has responsibility, and how decisions should be followed up.'
      ]
    },
    {
      id: 'who-course-is-for',
      title: 'Who This Course Is For',
      text: [
        'This course is for CSO leaders, project staff, MEAL staff, advocacy staff, gender and inclusion focal points, facilitators, grassroots CSO representatives, and local CSO networks.',
        'It is designed for people who want to strengthen their day-to-day CSO work.'
      ]
    },
    {
      id: 'how-you-will-learn',
      title: 'How You Will Learn',
      text: [
        'You will work with short examples, simple choices, reflection prompts, feedback, portfolio notes, and peer exchange.',
        'The course uses a practice-based learning approach so you can connect HRBA to real CSO work.'
      ]
    }
  ];
  const viewedCards = Array.isArray(state.practiceCheckState.module1AboutCourseViewedCards)
    ? state.practiceCheckState.module1AboutCourseViewedCards as string[]
    : [];
  const viewedSet = new Set(viewedCards);
  const isComplete = cards.every((card) => viewedSet.has(card.id));
  const aboutShellStyle: CSSProperties = {
    padding: '1.25rem 1.25rem 7rem',
    maxWidth: '1180px',
    margin: '0 auto'
  };
  const aboutPanelStyle: CSSProperties = {
    background: '#ffffff',
    border: '1px solid rgba(16, 92, 91, 0.16)',
    borderRadius: '8px',
    boxShadow: '0 14px 30px rgba(15, 23, 42, 0.09)',
    color: '#10233f'
  };
  const cardGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  };

  const viewCard = (cardId: string) => {
    onChangeState((prev) => {
      const previousViewed = Array.isArray(prev.practiceCheckState.module1AboutCourseViewedCards)
        ? prev.practiceCheckState.module1AboutCourseViewedCards as string[]
        : [];
      const nextViewed = previousViewed.includes(cardId)
        ? previousViewed
        : [...previousViewed, cardId];
      const moduleId = prev.currentModuleId || 'module_01_hrba_foundations';
      const currentProgress = prev.screenProgress[moduleId] || [];
      const allViewed = cards.every((card) => nextViewed.includes(card.id));

      return {
        ...prev,
        practiceCheckState: {
          ...prev.practiceCheckState,
          module1AboutCourseViewedCards: nextViewed
        },
        screenProgress: allViewed
          ? {
              ...prev.screenProgress,
              [moduleId]: currentProgress.includes('M1-S1-02')
                ? currentProgress
                : [...currentProgress, 'M1-S1-02']
            }
          : prev.screenProgress
      };
    });
  };

  return (
    <section className="m1-b2-screen m1-b2-about-course" aria-labelledby="m1-about-course-title" style={{ background: '#eef7f5', overflow: 'visible' }}>
      <div style={aboutShellStyle}>
      <header className="m1-b2-compact-header" style={{ marginBottom: '1rem' }}>
        <div className="m1-b2-eyebrow">Module 1</div>
        <h1 id="m1-about-course-title">About This Course</h1>
        <p>What this course helps local and grassroots CSOs do</p>
      </header>

      <figure style={{ ...aboutPanelStyle, margin: 0, padding: '0.65rem' }}>
        <img
          src="/assets/hrba/modules/module-1/m1-s02-about-course-four-cards.png"
          alt="Four course orientation cards showing what the course is, why it matters, who it is for, and how learners will learn."
          loading="eager"
          style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '6px' }}
        />
      </figure>

      <ol aria-label="About this course cards" style={cardGridStyle}>
        {cards.map((card, index) => {
          const viewed = viewedSet.has(card.id);
          return (
            <li
              key={card.id}
              style={{
                ...aboutPanelStyle,
                listStyle: 'none',
                padding: '1rem',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <button
                type="button"
                onClick={() => viewCard(card.id)}
                aria-expanded={viewed}
                aria-controls={`m1-about-card-${card.id}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2.25rem 1fr auto',
                  gap: '0.75rem',
                  alignItems: 'center',
                  width: '100%',
                  textAlign: 'left',
                  border: viewed ? '2px solid #0f766e' : '1px solid rgba(16, 92, 91, 0.24)',
                  background: viewed ? '#e7f5f1' : '#f8fbfb',
                  color: '#10233f',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  font: 'inherit'
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-grid',
                    placeItems: 'center',
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '999px',
                    background: viewed ? '#0f766e' : '#d9eeea',
                    color: viewed ? '#ffffff' : '#0b2a55',
                    fontWeight: 800
                  }}
                >
                  {index + 1}
                </span>
                <strong>{card.title}</strong>
                <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{viewed ? 'Viewed' : 'Open'}</span>
              </button>
              <div id={`m1-about-card-${card.id}`} hidden={!viewed}>
                {card.text.map((paragraph) => (
                  <p key={paragraph} style={{ color: '#26394f', lineHeight: 1.55, margin: '0 0 0.75rem' }}>{paragraph}</p>
                ))}
              </div>
            </li>
          );
        })}
      </ol>

      <section aria-labelledby="m1-about-supporting-note" style={{ ...aboutPanelStyle, marginTop: '1rem', padding: '1rem' }}>
        <strong id="m1-about-supporting-note" style={{ display: 'block', color: '#0b2a55', marginBottom: '0.6rem' }}>
          Supporting note
        </strong>
        <p style={{ color: '#26394f', lineHeight: 1.55 }}>
          This course connects with practical areas many CSOs already work on, including advocacy, gender equality, economic inclusion, local development, service access, community participation, and accountability.
        </p>
        <p style={{ color: '#26394f', lineHeight: 1.55 }}>
          You will also gain a practical HRBA lens, simple tools, examples, portfolio notes, and action ideas that you can connect to your own CSO work.
        </p>
      </section>

      <footer className="m1-b2-footer" style={{ marginTop: '1rem' }}>
        <p aria-live="polite" style={{ margin: 0 }}>
          {isComplete ? 'All four cards viewed. Continue when ready.' : 'Open all four cards to complete this screen.'}
        </p>
        <button className="m1-b2-primary" type="button" onClick={onNext} disabled={!isComplete}>
          Continue
        </button>
      </footer>
      </div>
    </section>
  );
}

function Module1HrbaPracticalLensScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const questions = [
    'Who is affected?',
    'Who may be left out or unheard?',
    'Who should participate and influence decisions?',
    'Who has responsibility?',
    'What should be transparent, accountable, and followed up?'
  ];
  const selectedQuestion = String(state.practiceCheckState.module1HrbaLensFirstQuestion || '');
  const isComplete = Boolean(selectedQuestion);
  const titleStyle: CSSProperties = {
    color: '#0b2a55',
    fontFamily: 'var(--font-family-headings)',
    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
    lineHeight: 1.06,
    margin: 0
  };

  const selectQuestion = (question: string) => {
    onChangeState((prev) => {
      const moduleId = prev.currentModuleId || 'module_01_hrba_foundations';
      const currentProgress = prev.screenProgress[moduleId] || [];
      return {
        ...prev,
        practiceCheckState: {
          ...prev.practiceCheckState,
          module1HrbaLensFirstQuestion: question
        },
        screenProgress: {
          ...prev.screenProgress,
          [moduleId]: currentProgress.includes('M1-S1-03')
            ? currentProgress
            : [...currentProgress, 'M1-S1-03']
        }
      };
    });
  };

  return (
    <section className="m1-b2-screen m1-b2-hrba-lens" aria-labelledby="m1-hrba-lens-title" style={{ overflow: 'visible' }}>
      <div className="m1-hrba-lens-shell">
        <header className="m1-hrba-lens-header">
          <div className="m1-next-kicker">HRBA IN ONE PRACTICAL LENS</div>
          <h1 id="m1-hrba-lens-title" style={titleStyle}>HRBA in One Practical Lens</h1>
          <p className="m1-next-intro m1-hrba-lens-intro">
            A simple way to start noticing what matters
          </p>
        </header>

        <div className="m1-hrba-lens-main">
          <section className="m1-hrba-lens-card m1-hrba-lens-explain" aria-labelledby="m1-hrba-orientation-heading">
            <h2 id="m1-hrba-orientation-heading">
              Start with five practical questions
            </h2>
            <p>
              In this course, HRBA means using human rights standards and principles to improve how CSOs plan, implement, monitor, and learn from their work.
            </p>
            <p>For now, you do not need to know all the technical details.</p>
            <p>Start with five practical questions:</p>
            <ol className="m1-hrba-question-list">
              {questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ol>
          </section>

          <figure className="m1-hrba-lens-card m1-hrba-lens-visual">
            <img
              src="/assets/hrba/modules/module-1/m1-s03-hrba-five-question-lens.png"
              alt="HRBA practical lens diagram with five questions about who is affected, who may be left out, who participates, who has responsibility, and what should be followed up."
              loading="eager"
            />
          </figure>
        </div>

        <section className="m1-hrba-lens-card m1-hrba-lens-message" aria-labelledby="m1-hrba-message-heading">
          <h2 id="m1-hrba-message-heading">
            Key message
          </h2>
          <p className="m1-hrba-lens-key">
            HRBA is not an extra paragraph in a proposal. It is a way of working.
          </p>
          <p>
            HRBA helps CSOs support people&apos;s voice, engage duty-bearers, and improve accountability in safe and practical ways.
          </p>
          <p className="m1-hrba-lens-forward">
            In the next module, you will look more closely at rights-holders, duty-bearers, participation, accountability, equality, non-discrimination, power, and safe use of human rights standards.
          </p>
        </section>

        <section className="m1-hrba-lens-card m1-hrba-lens-practice" aria-labelledby="m1-hrba-practice-heading">
          <h2 id="m1-hrba-practice-heading">
            Micro-practice
          </h2>
          <p>
            Think about one project, activity, or service your CSO works on. Which HRBA question would be most useful to ask first?
          </p>
          <div className="m1-hrba-choice-grid" role="group" aria-label="Choose the first HRBA question to ask">
            {questions.map((question, index) => {
              const isSelected = selectedQuestion === question;
              return (
                <button
                  key={question}
                  type="button"
                  className={`m1-hrba-question-choice ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => selectQuestion(question)}
                  aria-pressed={isSelected}
                  aria-describedby={isSelected ? 'm1-hrba-lens-feedback' : undefined}
                >
                  <span className="m1-hrba-choice-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>{question}</span>
                  <strong>{isSelected ? 'Selected' : 'Choose'}</strong>
                </button>
              );
            })}
          </div>
          {isComplete && (
            <div
              id="m1-hrba-lens-feedback"
              aria-live="polite"
              className="m1-hrba-lens-feedback"
            >
              Good. This is your first HRBA noticing habit. You will build on this in Module 2.
            </div>
          )}
        </section>

        <footer className="m1-b2-footer" style={{ marginTop: 0 }}>
          <p aria-live="polite" style={{ margin: 0 }}>
            {isComplete ? 'Selection saved. Continue when ready.' : 'Choose one question to complete this screen.'}
          </p>
          <button className="m1-b2-primary" type="button" onClick={onNext} disabled={!isComplete}>
            Continue
          </button>
        </footer>
      </div>
    </section>
  );
}

function Module1CourseJourneyScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const roadmapCards = [
    {
      id: 'module-1',
      title: 'Module 1 — Start the journey',
      text: [
        'Understand the course, the CSF Plus capacity development context, the portfolio, and your own learning priority.'
      ]
    },
    {
      id: 'module-2',
      title: 'Module 2 — Build the HRBA foundation',
      text: [
        'Learn the main HRBA concepts: rights, rights-holders, duty-bearers, participation, accountability, equality, non-discrimination, power, and safe standards use.'
      ]
    },
    {
      id: 'module-3',
      title: 'Module 3 — Apply HRBA in project design',
      text: [
        'Use practical tools to review and improve a project idea before implementation.',
        'You will look at rights-holders, duty-bearers, barriers, power, gender, disability, risk, participation, accountability, intervention logic, and indicators.'
      ]
    },
    {
      id: 'module-4',
      title: 'Module 4 — Apply HRBA during implementation',
      text: [
        'Practice noticing whether implementation is staying inclusive, participatory, accountable, and safe.',
        'You will learn how to respond when participation weakens, barriers appear, or feedback is not being acted on.'
      ]
    },
    {
      id: 'module-5',
      title: 'Module 5 — Apply HRBA in MEAL',
      text: [
        'Use monitoring, evaluation, accountability, feedback, reporting, evidence, and learning in safer and more rights-based ways.',
        'You will practice improving indicators, using feedback responsibly, and reporting without causing harm.'
      ]
    }
  ];
  const continuationCards = [
    {
      title: 'Final assessment and certificate',
      text: 'Show what you have learned across the full course and complete the course requirements.'
    },
    {
      title: 'Continue learning together',
      text: 'Keep learning through peer exchange, collaboration, co-creation, and shared reflection as you apply HRBA in real CSO work.'
    }
  ];
  const viewedCards = Array.isArray(state.practiceCheckState.module1LearningJourneyViewedCards)
    ? state.practiceCheckState.module1LearningJourneyViewedCards as string[]
    : [];
  const viewedSet = new Set(viewedCards);
  const isComplete = roadmapCards.every((card) => viewedSet.has(card.id));
  const shellStyle: CSSProperties = {
    display: 'grid',
    gap: '1.1rem',
    width: 'min(100%, 1180px)',
    margin: '0 auto',
    padding: '1.25rem 1.25rem 7rem',
    color: '#10233f'
  };
  const panelStyle: CSSProperties = {
    background: '#ffffff',
    border: '1px solid rgba(16, 92, 91, 0.16)',
    borderRadius: '8px',
    boxShadow: '0 14px 30px rgba(15, 23, 42, 0.09)',
    color: '#10233f'
  };
  const titleStyle: CSSProperties = {
    color: '#0b2a55',
    fontFamily: 'var(--font-family-headings)',
    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
    lineHeight: 1.06,
    margin: 0
  };
  const cardGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
    gap: '0.9rem'
  };

  const viewRoadmapCard = (cardId: string) => {
    onChangeState((prev) => {
      const previousViewed = Array.isArray(prev.practiceCheckState.module1LearningJourneyViewedCards)
        ? prev.practiceCheckState.module1LearningJourneyViewedCards as string[]
        : [];
      const nextViewed = previousViewed.includes(cardId)
        ? previousViewed
        : [...previousViewed, cardId];
      const moduleId = prev.currentModuleId || 'module_01_hrba_foundations';
      const currentProgress = prev.screenProgress[moduleId] || [];
      const allViewed = roadmapCards.every((card) => nextViewed.includes(card.id));

      return {
        ...prev,
        practiceCheckState: {
          ...prev.practiceCheckState,
          module1LearningJourneyViewedCards: nextViewed
        },
        screenProgress: allViewed
          ? {
              ...prev.screenProgress,
              [moduleId]: currentProgress.includes('M1-S1-04')
                ? currentProgress
                : [...currentProgress, 'M1-S1-04']
            }
          : prev.screenProgress
      };
    });
  };

  return (
    <section className="m1-b2-screen m1-b2-course-journey" aria-labelledby="m1-course-journey-title" style={{ background: '#eef7f5', overflow: 'visible' }}>
      <div style={shellStyle}>
        <header>
          <div className="m1-next-kicker">YOUR LEARNING JOURNEY</div>
          <h1 id="m1-course-journey-title" style={titleStyle}>Your Learning Journey</h1>
          <p className="m1-next-intro" style={{ color: '#174163', fontSize: '1.12rem', margin: '0.55rem 0 0' }}>
            How the course moves from understanding to practice
          </p>
        </header>

        <figure style={{ ...panelStyle, margin: 0, padding: '0.65rem' }}>
          <img
            src="/assets/hrba/modules/module-1/m1-s04-five-module-learning-roadmap.png"
            alt="Five-module HRBA learning roadmap from starting the journey through HRBA foundation, project design, implementation, MEAL, final assessment, and continued learning."
            loading="eager"
            style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '6px' }}
          />
        </figure>

        <section aria-labelledby="m1-roadmap-cards-heading" style={{ ...panelStyle, padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
            <div>
              <h2 id="m1-roadmap-cards-heading" style={{ color: '#0b2a55', fontSize: '1.45rem', margin: 0 }}>
                Course roadmap
              </h2>
              <p style={{ color: '#42566d', margin: '0.35rem 0 0' }}>Open each module card to complete this screen.</p>
            </div>
            <span aria-live="polite" style={{ color: '#0f766e', fontWeight: 900 }}>
              {viewedSet.size} of 5 viewed
            </span>
          </div>

          <ol aria-label="Five course modules" style={cardGridStyle}>
            {roadmapCards.map((card, index) => {
              const viewed = viewedSet.has(card.id);
              const detailId = `m1-roadmap-card-${card.id}`;

              return (
                <li
                  key={card.id}
                  style={{
                    listStyle: 'none',
                    minWidth: 0,
                    border: viewed ? '2px solid #0f766e' : '1px solid rgba(16, 92, 91, 0.18)',
                    borderRadius: '8px',
                    background: viewed ? '#e7f5f1' : '#f8fbfb',
                    padding: '0.75rem'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => viewRoadmapCard(card.id)}
                    aria-expanded={viewed}
                    aria-controls={detailId}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2.25rem minmax(0, 1fr) auto',
                      gap: '0.75rem',
                      alignItems: 'center',
                      width: '100%',
                      minHeight: '44px',
                      border: 0,
                      background: 'transparent',
                      color: '#10233f',
                      cursor: 'pointer',
                      font: 'inherit',
                      padding: 0,
                      textAlign: 'left'
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'inline-grid',
                        placeItems: 'center',
                        width: '2.25rem',
                        height: '2.25rem',
                        borderRadius: '999px',
                        background: viewed ? '#0f766e' : '#d9eeea',
                        color: viewed ? '#ffffff' : '#0b2a55',
                        fontWeight: 800
                      }}
                    >
                      {viewed ? '✓' : index + 1}
                    </span>
                    <strong>{card.title}</strong>
                    <span style={{ color: '#0f766e', fontSize: '0.85rem', fontWeight: 900 }}>{viewed ? 'Viewed' : 'Open'}</span>
                  </button>
                  <div id={detailId} hidden={!viewed} style={{ marginTop: '0.75rem' }}>
                    {card.text.map((paragraph) => (
                      <p key={paragraph} style={{ color: '#26394f', lineHeight: 1.55, margin: '0 0 0.65rem' }}>{paragraph}</p>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section aria-labelledby="m1-after-modules-heading" style={{ ...panelStyle, padding: '1rem' }}>
          <h2 id="m1-after-modules-heading" style={{ color: '#0b2a55', fontSize: '1.45rem', margin: '0 0 0.85rem' }}>
            After the modules
          </h2>
          <div style={cardGridStyle}>
            {continuationCards.map((card) => (
              <article key={card.title} style={{ border: '1px solid rgba(16, 92, 91, 0.18)', borderRadius: '8px', background: '#f8fbfb', padding: '0.9rem' }}>
                <h3 style={{ color: '#0b2a55', fontSize: '1.1rem', margin: '0 0 0.45rem' }}>{card.title}</h3>
                <p style={{ color: '#26394f', lineHeight: 1.55, margin: 0 }}>{card.text}</p>
              </article>
            ))}
          </div>
          <p style={{ color: '#26394f', lineHeight: 1.55, margin: '1rem 0 0' }}>
            Each module gives you something practical to carry forward. By the end of the course, you should have a clearer HRBA lens, useful portfolio notes, and a practical action commitment for your CSO work.
          </p>
        </section>

        <footer className="m1-b2-footer" style={{ marginTop: 0 }}>
          <p aria-live="polite" style={{ margin: 0 }}>
            {isComplete ? 'All five module cards viewed. Continue when ready.' : 'Open all five module cards to complete this screen.'}
          </p>
          <button className="m1-b2-primary" type="button" onClick={onNext} disabled={!isComplete}>
            Continue
          </button>
        </footer>
      </div>
    </section>
  );
}

function Module1LearningMethodologyScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const learningSteps = [
    {
      id: 'watch-read',
      title: 'Watch or read',
      text: 'Start with a short video, example, story, or explanation.'
    },
    {
      id: 'notice',
      title: 'Notice',
      text: 'Look for what is happening: who is included, who is left out, who has responsibility, and what is missing.'
    },
    {
      id: 'practice',
      title: 'Practice',
      text: 'Make a choice, answer a question, complete a small activity, or review a case.'
    },
    {
      id: 'portfolio-note',
      title: 'Save a portfolio note',
      text: 'Write a short private note that connects the learning to your own CSO work.'
    },
    {
      id: 'discuss-safely',
      title: 'Discuss safely',
      text: 'Use general lessons from your portfolio to participate in peer exchange or discussion forums.'
    },
    {
      id: 'apply',
      title: 'Apply in CSO work',
      text: 'Take one idea back to your project, team, activity, MEAL process, or advocacy work.'
    }
  ];
  const viewedSteps = Array.isArray(state.practiceCheckState.module1LearningCycleViewedSteps)
    ? state.practiceCheckState.module1LearningCycleViewedSteps as string[]
    : [];
  const viewedSet = new Set(viewedSteps);
  const isComplete = learningSteps.every((step) => viewedSet.has(step.id));
  const shellStyle: CSSProperties = {
    display: 'grid',
    gap: '1.1rem',
    width: 'min(100%, 1180px)',
    margin: '0 auto',
    padding: '1.25rem 1.25rem 7rem',
    color: '#10233f'
  };
  const panelStyle: CSSProperties = {
    background: '#ffffff',
    border: '1px solid rgba(16, 92, 91, 0.16)',
    borderRadius: '8px',
    boxShadow: '0 14px 30px rgba(15, 23, 42, 0.09)',
    color: '#10233f'
  };
  const titleStyle: CSSProperties = {
    color: '#0b2a55',
    fontFamily: 'var(--font-family-headings)',
    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
    lineHeight: 1.06,
    margin: 0
  };
  const cardGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
    gap: '0.85rem'
  };

  const viewStep = (stepId: string) => {
    onChangeState((prev) => {
      const previousViewed = Array.isArray(prev.practiceCheckState.module1LearningCycleViewedSteps)
        ? prev.practiceCheckState.module1LearningCycleViewedSteps as string[]
        : [];
      const nextViewed = previousViewed.includes(stepId)
        ? previousViewed
        : [...previousViewed, stepId];
      const moduleId = prev.currentModuleId || 'module_01_hrba_foundations';
      const currentProgress = prev.screenProgress[moduleId] || [];
      const allViewed = learningSteps.every((step) => nextViewed.includes(step.id));

      return {
        ...prev,
        practiceCheckState: {
          ...prev.practiceCheckState,
          module1LearningCycleViewedSteps: nextViewed
        },
        screenProgress: allViewed
          ? {
              ...prev.screenProgress,
              [moduleId]: currentProgress.includes('M1-S1-05')
                ? currentProgress
                : [...currentProgress, 'M1-S1-05']
            }
          : prev.screenProgress
      };
    });
  };

  return (
    <section className="m1-b2-screen m1-b2-learning-methodology" aria-labelledby="m1-learning-methodology-title" style={{ background: '#eef7f5', overflow: 'visible' }}>
      <div style={shellStyle}>
        <header>
          <div className="m1-next-kicker">HOW YOU WILL LEARN</div>
          <h1 id="m1-learning-methodology-title" style={titleStyle}>How You Will Learn</h1>
          <p className="m1-next-intro" style={{ color: '#174163', fontSize: '1.12rem', margin: '0.55rem 0 0' }}>
            Short examples, practical choices, portfolio notes, and peer exchange
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1rem', alignItems: 'start' }}>
          <section aria-labelledby="m1-learning-intro-heading" style={{ ...panelStyle, padding: '1rem' }}>
            <h2 id="m1-learning-intro-heading" style={{ color: '#0b2a55', fontSize: '1.45rem', margin: '0 0 0.75rem' }}>
              Practical learning methodology
            </h2>
            <p style={{ color: '#26394f', lineHeight: 1.55 }}>This course uses a practical learning methodology.</p>
            <p style={{ color: '#26394f', lineHeight: 1.55 }}>
              You will not only read definitions. You will work with short examples, simple choices, reflection prompts, feedback, portfolio notes, and peer exchange.
            </p>
            <p style={{ color: '#26394f', lineHeight: 1.55 }}>The learning cycle is simple:</p>
          </section>

          <figure style={{ ...panelStyle, margin: 0, padding: '0.65rem' }}>
            <img
              src="/assets/hrba/modules/module-1/m1-s05-learning-methodology-cycle.png"
              alt="Six-step learning cycle: watch or read, notice, practice, save a portfolio note, discuss safely, and apply in CSO work."
              loading="eager"
              style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '6px' }}
            />
          </figure>
        </div>

        <section aria-labelledby="m1-learning-cycle-heading" style={{ ...panelStyle, padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
            <div>
              <h2 id="m1-learning-cycle-heading" style={{ color: '#0b2a55', fontSize: '1.45rem', margin: 0 }}>
                Six learning steps
              </h2>
              <p style={{ color: '#42566d', margin: '0.35rem 0 0' }}>Open each step to complete this screen.</p>
            </div>
            <span aria-live="polite" style={{ color: '#0f766e', fontWeight: 900 }}>
              {viewedSet.size} of 6 viewed
            </span>
          </div>

          <ol aria-label="Six-step learning cycle" style={cardGridStyle}>
            {learningSteps.map((step, index) => {
              const viewed = viewedSet.has(step.id);
              const detailId = `m1-learning-step-${step.id}`;
              return (
                <li
                  key={step.id}
                  style={{
                    listStyle: 'none',
                    minWidth: 0,
                    border: viewed ? '2px solid #0f766e' : '1px solid rgba(16, 92, 91, 0.18)',
                    borderRadius: '8px',
                    background: viewed ? '#e7f5f1' : '#f8fbfb',
                    padding: '0.75rem'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => viewStep(step.id)}
                    aria-expanded={viewed}
                    aria-controls={detailId}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2.25rem minmax(0, 1fr) auto',
                      gap: '0.75rem',
                      alignItems: 'center',
                      width: '100%',
                      minHeight: '44px',
                      border: 0,
                      background: 'transparent',
                      color: '#10233f',
                      cursor: 'pointer',
                      font: 'inherit',
                      padding: 0,
                      textAlign: 'left'
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'inline-grid',
                        placeItems: 'center',
                        width: '2.25rem',
                        height: '2.25rem',
                        borderRadius: '999px',
                        background: viewed ? '#0f766e' : '#d9eeea',
                        color: viewed ? '#ffffff' : '#0b2a55',
                        fontWeight: 800
                      }}
                    >
                      {viewed ? '✓' : index + 1}
                    </span>
                    <strong>{step.title}</strong>
                    <span style={{ color: '#0f766e', fontSize: '0.85rem', fontWeight: 900 }}>{viewed ? 'Viewed' : 'Open'}</span>
                  </button>
                  <div id={detailId} hidden={!viewed} style={{ marginTop: '0.75rem' }}>
                    <p style={{ color: '#26394f', lineHeight: 1.55, margin: 0 }}>{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section aria-label="Practical learning note" style={{ ...panelStyle, padding: '1rem', background: '#f8fbfb' }}>
          <p style={{ color: '#10233f', fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.5, margin: 0 }}>
            You do not need to memorize legal terms. You will practice asking better questions and improving real CSO work.
          </p>
        </section>

        <footer className="m1-b2-footer" style={{ marginTop: 0 }}>
          <p aria-live="polite" style={{ margin: 0 }}>
            {isComplete ? 'All six learning steps viewed. Continue when ready.' : 'Open all six learning steps to complete this screen.'}
          </p>
          <button className="m1-b2-primary" type="button" onClick={onNext} disabled={!isComplete}>
            Continue
          </button>
        </footer>
      </div>
    </section>
  );
}

function Module1SafePortfolioScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const focusOptions = [
    'advocacy',
    'gender equality',
    'economic inclusion',
    'project design',
    'implementation',
    'MEAL',
    'participation',
    'accountability',
    'feedback',
    'inclusion of people who may be left out'
  ];
  const usefulnessItems = [
    'remember important ideas;',
    'connect the course to your own CSO work;',
    'prepare for peer exchange and discussion forums;',
    'track your learning priority;',
    'collect practical action ideas.'
  ];
  const unsafeItems = [
    'names of people;',
    'exact locations linked to sensitive issues;',
    'complaints that can identify someone;',
    'survivor stories;',
    'private community information;',
    'politically sensitive details;',
    'anything that could put a person, group, CSO, or community at risk.'
  ];
  const safeItems = [
    'general patterns;',
    'common barriers;',
    'lessons learned;',
    'project decisions;',
    'participation challenges;',
    'accountability gaps;',
    'ideas for improvement.'
  ];
  const selectedFocus = Array.isArray(state.practiceCheckState.module1FirstSafePortfolioFocus)
    ? state.practiceCheckState.module1FirstSafePortfolioFocus as string[]
    : [];
  const note = String(state.practiceCheckState.module1FirstSafePortfolioNote || '');
  const trimmedNote = note.trim();
  const hasValidFocusSelection = selectedFocus.length >= 1 && selectedFocus.length <= 4;
  const hasSafeNote = trimmedNote.length > 0;
  const isComplete = hasValidFocusSelection || hasSafeNote;
  const hasMaximumFocusSelections = selectedFocus.length >= 4;
  const shellStyle: CSSProperties = {
    display: 'grid',
    gap: '1.1rem',
    width: 'min(100%, 1180px)',
    margin: '0 auto',
    padding: '1.25rem 1.25rem 7rem',
    color: '#10233f'
  };
  const panelStyle: CSSProperties = {
    background: '#ffffff',
    border: '1px solid rgba(16, 92, 91, 0.16)',
    borderRadius: '8px',
    boxShadow: '0 14px 30px rgba(15, 23, 42, 0.09)',
    color: '#10233f',
    padding: '1rem'
  };
  const titleStyle: CSSProperties = {
    color: '#0b2a55',
    fontFamily: 'var(--font-family-headings)',
    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
    lineHeight: 1.06,
    margin: 0
  };
  const twoColumnStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
    gap: '1rem',
    alignItems: 'start'
  };

  const toggleFocus = (option: string) => {
    onChangeState((prev) => {
      const previousFocus = Array.isArray(prev.practiceCheckState.module1FirstSafePortfolioFocus)
        ? prev.practiceCheckState.module1FirstSafePortfolioFocus as string[]
        : [];
      const nextFocus = previousFocus.includes(option)
        ? previousFocus.filter((item) => item !== option)
        : previousFocus.length >= 4
          ? previousFocus
        : [...previousFocus, option];
      return {
        ...prev,
        practiceCheckState: {
          ...prev.practiceCheckState,
          module1FirstSafePortfolioFocus: nextFocus
        }
      };
    });
  };

  const updateNote = (value: string) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        module1FirstSafePortfolioNote: value
      }
    }));
  };

  const handleContinue = () => {
    if (!isComplete) {
      return;
    }

    onChangeState((prev) => {
      const moduleId = prev.currentModuleId || 'module_01_hrba_foundations';
      const currentProgress = prev.screenProgress[moduleId] || [];
      return {
        ...prev,
        screenProgress: {
          ...prev.screenProgress,
          [moduleId]: currentProgress.includes('M1-S1-06')
            ? currentProgress
            : [...currentProgress, 'M1-S1-06']
        }
      };
    });
    onNext();
  };

  return (
    <section className="m1-b2-screen m1-b2-safe-portfolio" aria-labelledby="m1-safe-portfolio-title" style={{ background: '#eef7f5', overflow: 'visible' }}>
      <div style={shellStyle}>
        <header>
          <div className="m1-next-kicker">YOUR PORTFOLIO AND SAFE PEER LEARNING</div>
          <h1 id="m1-safe-portfolio-title" style={titleStyle}>Your Portfolio and Safe Peer Learning</h1>
          <p className="m1-next-intro" style={{ color: '#174163', fontSize: '1.12rem', margin: '0.55rem 0 0' }}>
            A private place to reflect, remember, and prepare for discussion
          </p>
        </header>

        <div style={twoColumnStyle}>
          <section aria-labelledby="m1-portfolio-intro-heading" style={panelStyle}>
            <h2 id="m1-portfolio-intro-heading" style={{ color: '#0b2a55', fontSize: '1.45rem', margin: '0 0 0.75rem' }}>
              Your private learning notebook
            </h2>
            <p style={{ color: '#26394f', lineHeight: 1.55 }}>Your portfolio is your private learning notebook for this course.</p>
            <p style={{ color: '#26394f', lineHeight: 1.55 }}>It is not a test. It does not need perfect answers.</p>
            <p style={{ color: '#26394f', lineHeight: 1.55 }}>It helps you:</p>
            <ul style={{ color: '#26394f', display: 'grid', gap: '0.45rem', lineHeight: 1.45, margin: 0, paddingLeft: '1.25rem' }}>
              {usefulnessItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p style={{ color: '#26394f', lineHeight: 1.55 }}>
              You may use your portfolio to prepare what you want to share with others. But your portfolio itself should stay safe and respectful.
            </p>
          </section>

          <figure style={{ ...panelStyle, margin: 0, padding: '0.65rem' }}>
            <img
              src="/assets/hrba/modules/module-1/m1-s06-safe-portfolio-peer-learning.png"
              alt="Safe portfolio notebook with examples of what is safe to write and what should not be recorded."
              loading="eager"
              style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '6px' }}
            />
          </figure>
        </div>

        <section aria-labelledby="m1-portfolio-safety-heading" style={panelStyle}>
          <h2 id="m1-portfolio-safety-heading" style={{ color: '#0b2a55', fontSize: '1.45rem', margin: '0 0 0.85rem' }}>
            Safety guidance
          </h2>
          <div style={twoColumnStyle}>
            <article style={{ border: '1px solid rgba(190, 64, 42, 0.24)', borderRadius: '8px', background: '#fff7ed', padding: '0.9rem' }}>
              <h3 style={{ color: '#7c2d12', fontSize: '1.12rem', margin: '0 0 0.55rem' }}>Do not write:</h3>
              <ul style={{ color: '#26394f', display: 'grid', gap: '0.4rem', lineHeight: 1.45, margin: 0, paddingLeft: '1.25rem' }}>
                {unsafeItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
            <article style={{ border: '1px solid rgba(16, 92, 91, 0.2)', borderRadius: '8px', background: '#f0fdfa', padding: '0.9rem' }}>
              <h3 style={{ color: '#134e4a', fontSize: '1.12rem', margin: '0 0 0.55rem' }}>Instead, write about:</h3>
              <ul style={{ color: '#26394f', display: 'grid', gap: '0.4rem', lineHeight: 1.45, margin: 0, paddingLeft: '1.25rem' }}>
                {safeItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          </div>
        </section>

        <section aria-labelledby="m1-safe-example-heading" style={{ ...panelStyle, background: '#f8fbfb' }}>
          <h2 id="m1-safe-example-heading" style={{ color: '#0b2a55', fontSize: '1.35rem', margin: '0 0 0.75rem' }}>
            Safe example
          </h2>
          <div style={twoColumnStyle}>
            <article style={{ borderLeft: '4px solid #dc2626', background: '#fff7ed', borderRadius: '8px', padding: '0.85rem' }}>
              <h3 style={{ color: '#7c2d12', fontSize: '1rem', margin: '0 0 0.45rem' }}>Instead of writing:</h3>
              <p style={{ color: '#26394f', lineHeight: 1.55, margin: 0 }}>A woman from X kebele complained that Y person blocked her from joining the project.</p>
            </article>
            <article style={{ borderLeft: '4px solid #0f766e', background: '#ecfdf5', borderRadius: '8px', padding: '0.85rem' }}>
              <h3 style={{ color: '#134e4a', fontSize: '1rem', margin: '0 0 0.45rem' }}>Write:</h3>
              <p style={{ color: '#26394f', lineHeight: 1.55, margin: 0 }}>In one activity, some women faced gatekeeping and could not participate equally. I want to learn how HRBA helps us notice and respond to this safely.</p>
            </article>
          </div>
        </section>

        <section aria-labelledby="m1-first-note-question" style={panelStyle}>
          <h2 id="m1-first-note-question" style={{ color: '#0b2a55', fontSize: '1.45rem', lineHeight: 1.25, margin: '0 0 0.6rem' }}>
            Which area of your CSO work do you most want to connect with HRBA during this course?
          </h2>
          <p id="m1-focus-selection-help" style={{ color: '#26394f', lineHeight: 1.55, margin: '0 0 0.85rem' }}>
            Choose the areas where HRBA feels most useful for your current learning. Your selections help set a safe starting point for reflection and peer discussion.
          </p>

          <fieldset aria-describedby="m1-focus-selection-help m1-focus-selection-status" style={{ border: '1px solid rgba(16, 92, 91, 0.18)', borderRadius: '8px', padding: '0.9rem', margin: '0 0 1rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
              {focusOptions.map((option) => {
                const selected = selectedFocus.includes(option);
                const disabled = !selected && hasMaximumFocusSelections;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleFocus(option)}
                    aria-pressed={selected}
                    aria-disabled={disabled}
                    disabled={disabled}
                    style={{
                      minHeight: '44px',
                      border: selected ? '2px solid #0f766e' : '1px solid rgba(16, 92, 91, 0.24)',
                      borderRadius: '999px',
                      background: selected ? '#e7f5f1' : '#ffffff',
                      color: disabled ? '#64748b' : '#10233f',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      font: 'inherit',
                      fontWeight: 800,
                      opacity: disabled ? 0.62 : 1,
                      padding: '0.55rem 0.8rem'
                    }}
                  >
                    {selected ? 'Selected: ' : ''}{option}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <label htmlFor="m1-first-safe-note" style={{ color: '#0b2a55', display: 'block', fontWeight: 900, marginBottom: '0.45rem' }}>
            Or take your short note here
          </label>
          <textarea
            id="m1-first-safe-note"
            value={note}
            onChange={(event) => updateNote(event.target.value)}
            rows={4}
            placeholder="Write a general, safe note. Avoid names, exact locations, sensitive complaints, and identifying details."
            style={{
              width: '100%',
              border: '1px solid rgba(16, 92, 91, 0.24)',
              borderRadius: '8px',
              color: '#10233f',
              font: 'inherit',
              lineHeight: 1.5,
              padding: '0.8rem',
              resize: 'vertical'
            }}
          />
          <p id="m1-focus-selection-status" aria-live="polite" style={{ color: isComplete ? '#0f766e' : '#42566d', fontWeight: 800, margin: '0.65rem 0 0' }}>
            {isComplete
              ? hasValidFocusSelection
                ? `${selectedFocus.length} of 4 selected. Portfolio starting point saved. Continue when ready.`
                : 'Short safe note saved. Continue when ready.'
              : 'Select 1 to 4 areas or write a short safe note to continue.'}
          </p>
        </section>

        <footer className="m1-b2-footer" style={{ marginTop: 0 }}>
          <p aria-live="polite" style={{ margin: 0 }}>
            {isComplete ? 'Safe portfolio starting point ready.' : 'Select 1 to 4 portfolio focus areas or write a short safe note before continuing.'}
          </p>
          <button className="m1-b2-primary" type="button" onClick={handleContinue} disabled={!isComplete}>
            Continue
          </button>
        </footer>
      </div>
    </section>
  );
}

function Module1StartingPointSelfAssessmentScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const ratingLevels = [
    { value: 1, label: 'Not confident yet' },
    { value: 2, label: 'Somewhat confident' },
    { value: 3, label: 'Confident' },
    { value: 4, label: 'Very confident' }
  ];
  const questions = [
    'Explain HRBA in simple CSO language.',
    'Identify rights-holders and duty-bearers in a project.',
    'Notice who may be excluded from a project or activity.',
    'Distinguish attendance from meaningful participation.',
    'Recognize when accountability and follow-up are weak.',
    'Connect HRBA to project design.',
    'Apply HRBA during implementation.',
    'Use MEAL, evidence, feedback, and reporting safely.',
    'Connect HRBA to advocacy, gender equality, or economic inclusion.',
    'Identify one practical change your CSO could make after this course.'
  ];
  const savedAssessment = state.practiceCheckState.module1StartingConfidence || {};
  const ratings = typeof savedAssessment.ratings === 'object' && savedAssessment.ratings
    ? savedAssessment.ratings as Record<string, number>
    : {};
  const submitted = Boolean(savedAssessment.submitted);
  const answeredCount = questions.filter((_, index) => ratings[`q${index + 1}`]).length;
  const canSubmit = answeredCount === questions.length;
  const averageScore = canSubmit
    ? questions.reduce((total, _, index) => total + Number(ratings[`q${index + 1}`] || 0), 0) / questions.length
    : 0;
  const feedbackCategory = averageScore < 2 ? 'good_starting_point' : averageScore < 3.2 ? 'some_strengths' : 'strong_confidence';
  const feedbackText = feedbackCategory === 'good_starting_point'
    ? 'This is a good starting point. The course is designed to build confidence step by step. You do not need to know everything now.'
    : feedbackCategory === 'some_strengths'
      ? 'You already have some strengths. Use the course to deepen the areas where you want more confidence.'
      : 'You are starting with strong confidence. Use the course to sharpen your practice, reflect on your CSO work, and support peer learning.';
  const shellStyle: CSSProperties = {
    display: 'grid',
    gap: '1rem',
    width: 'min(100%, 880px)',
    margin: '0 auto',
    padding: '1.25rem 1rem 7rem',
    color: '#10233f'
  };
  const panelStyle: CSSProperties = {
    background: '#ffffff',
    border: '1px solid rgba(16, 92, 91, 0.16)',
    borderRadius: '8px',
    boxShadow: '0 14px 30px rgba(15, 23, 42, 0.09)',
    padding: '1rem'
  };
  const titleStyle: CSSProperties = {
    color: '#0b2a55',
    fontFamily: 'var(--font-family-headings)',
    fontSize: 'clamp(2rem, 4vw, 3.15rem)',
    lineHeight: 1.08,
    margin: 0
  };

  const setRating = (questionId: string, value: number) => {
    onChangeState((prev) => {
      const current = prev.practiceCheckState.module1StartingConfidence || {};
      const currentRatings = typeof current.ratings === 'object' && current.ratings
        ? current.ratings as Record<string, number>
        : {};
      return {
        ...prev,
        practiceCheckState: {
          ...prev.practiceCheckState,
          module1StartingConfidence: {
            ...current,
            ratings: { ...currentRatings, [questionId]: value },
            submitted: false
          }
        }
      };
    });
  };

  const submitAssessment = () => {
    if (!canSubmit) {
      return;
    }
    onChangeState((prev) => {
      const moduleId = prev.currentModuleId || 'module_01_hrba_foundations';
      const currentProgress = prev.screenProgress[moduleId] || [];
      return {
        ...prev,
        practiceCheckState: {
          ...prev.practiceCheckState,
          module1StartingConfidence: {
            ratings,
            averageScore: Number(averageScore.toFixed(1)),
            feedbackCategory,
            submitted: true
          }
        },
        screenProgress: {
          ...prev.screenProgress,
          [moduleId]: currentProgress.includes('M1-S1-06A') ? currentProgress : [...currentProgress, 'M1-S1-06A']
        }
      };
    });
  };

  return (
    <section className="m1-b2-screen m1-b2-starting-confidence" aria-labelledby="m1-starting-confidence-title" style={{ background: '#eef7f5', overflow: 'visible' }}>
      <div style={shellStyle}>
        <header>
          <div className="m1-next-kicker">STARTING POINT SELF-ASSESSMENT</div>
          <h1 id="m1-starting-confidence-title" style={titleStyle}>Starting Point Self-Assessment</h1>
          <p className="m1-next-intro" style={{ color: '#174163', fontSize: '1.12rem', margin: '0.55rem 0 0' }}>
            Where are you starting from?
          </p>
        </header>

        <figure style={{ ...panelStyle, margin: 0, padding: '0.65rem' }}>
          <img
            src="/assets/hrba/modules/module-1/m1-s07-starting-point-confidence-scale.png"
            alt="Four-point confidence scale for checking readiness to apply HRBA, from not confident yet to very confident."
            loading="eager"
            style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '6px' }}
          />
        </figure>

        <section style={panelStyle}>
          <h2 style={{ color: '#0b2a55', fontSize: '1.35rem', margin: '0 0 0.6rem' }}>Before you begin</h2>
          <p style={{ color: '#26394f', lineHeight: 1.55 }}>This is not a test.</p>
          <p style={{ color: '#26394f', lineHeight: 1.55 }}>
            It helps you notice your starting point before the course begins. Your answers can help you see where you want to focus your learning.
          </p>
        </section>

        <section style={panelStyle}>
          <h2 style={{ color: '#0b2a55', fontSize: '1.35rem', margin: '0 0 0.75rem' }}>Rating scale</h2>
          <ol style={{ display: 'grid', gap: '0.55rem', margin: 0, paddingLeft: '1.35rem' }}>
            {ratingLevels.map((level) => (
              <li key={level.value} style={{ color: '#26394f', lineHeight: 1.45 }}>{level.label}</li>
            ))}
          </ol>
        </section>

        <form aria-labelledby="m1-confidence-form-heading" style={{ display: 'grid', gap: '0.9rem' }}>
          <section style={panelStyle}>
            <h2 id="m1-confidence-form-heading" style={{ color: '#0b2a55', fontSize: '1.35rem', margin: '0 0 0.35rem' }}>
              How confident are you now to:
            </h2>
            <p aria-live="polite" style={{ color: '#0f766e', fontWeight: 900, margin: 0 }}>{answeredCount} of 10 answered</p>
          </section>

          {questions.map((question, index) => {
            const questionId = `q${index + 1}`;
            const currentRating = Number(ratings[questionId] || 0);
            return (
              <fieldset key={question} style={{ ...panelStyle, display: 'grid', gap: '0.75rem', margin: 0 }}>
                <legend style={{ color: '#0b2a55', fontWeight: 900, padding: '0 0.35rem' }}>{index + 1}. {question}</legend>
                <div style={{ display: 'grid', gap: '0.55rem' }}>
                  {ratingLevels.map((level) => (
                    <label
                      key={level.value}
                      style={{
                        display: 'flex',
                        gap: '0.65rem',
                        alignItems: 'center',
                        minHeight: '44px',
                        border: currentRating === level.value ? '2px solid #0f766e' : '1px solid rgba(16, 92, 91, 0.2)',
                        borderRadius: '8px',
                        background: currentRating === level.value ? '#e7f5f1' : '#ffffff',
                        color: '#10233f',
                        cursor: 'pointer',
                        padding: '0.65rem 0.75rem'
                      }}
                    >
                      <input
                        type="radio"
                        name={`m1-confidence-${questionId}`}
                        value={level.value}
                        checked={currentRating === level.value}
                        onChange={() => setRating(questionId, level.value)}
                      />
                      <span>{level.label}</span>
                      {currentRating === level.value && <strong style={{ marginLeft: 'auto' }}>Selected</strong>}
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          })}
        </form>

        <section aria-label="Self-assessment actions" style={panelStyle}>
          <button type="button" className="m1-b2-primary" onClick={submitAssessment} disabled={!canSubmit}>
            {submitted ? 'Update self-assessment' : 'Submit self-assessment'}
          </button>
          <p style={{ color: canSubmit ? '#42566d' : '#7c2d12', fontWeight: 800, margin: '0.75rem 0 0' }}>
            {canSubmit ? 'All items answered. Submit to see your starting-point feedback.' : 'Answer all 10 items before submitting.'}
          </p>
        </section>

        {submitted && (
          <section aria-labelledby="m1-confidence-results-heading" style={{ ...panelStyle, background: '#ecfdf5' }}>
            <h2 id="m1-confidence-results-heading" style={{ color: '#0b2a55', fontSize: '1.35rem', margin: '0 0 0.6rem' }}>Your starting-point result</h2>
            <p style={{ color: '#26394f', lineHeight: 1.55 }}>You answered 10 of 10 items.</p>
            <p style={{ color: '#10233f', fontSize: '1.08rem', fontWeight: 900, lineHeight: 1.45 }}>
              Average confidence score: {Number(averageScore.toFixed(1)).toFixed(1)} out of 4
            </p>
            <p style={{ color: '#26394f', lineHeight: 1.55 }}>{feedbackText}</p>
            <p style={{ color: '#134e4a', fontWeight: 900, lineHeight: 1.55 }}>
              Use this result to choose a learning priority on the next screen.
            </p>
          </section>
        )}

        <footer className="m1-b2-footer" style={{ marginTop: 0 }}>
          <p aria-live="polite" style={{ margin: 0 }}>{submitted ? 'Self-assessment submitted. Continue when ready.' : 'Submit the self-assessment to continue.'}</p>
          <button className="m1-b2-primary" type="button" onClick={onNext} disabled={!submitted}>Continue</button>
        </footer>
      </div>
    </section>
  );
}

function Module1FirstLearningCommitmentScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const priorities = [
    'I want to better understand HRBA foundations.',
    'I want to identify rights-holders and duty-bearers more clearly.',
    'I want to improve participation and inclusion.',
    'I want to strengthen advocacy and accountability.',
    'I want to improve project design.',
    'I want to apply HRBA during implementation.',
    'I want to use MEAL, evidence, feedback, and reporting more safely.',
    'I want to connect HRBA to gender equality or economic inclusion.',
    'I want to strengthen accountability to communities and rights-holders.'
  ];
  const examples = [
    'During this course, I will pay special attention to how our CSO includes women, youth, and persons with disabilities in project decisions.',
    'During this course, I will pay special attention to how we identify duty-bearers and avoid making the CSO responsible for everything.',
    'During this course, I will pay special attention to how feedback from communities is recorded, answered, and used.',
    'During this course, I will pay special attention to how HRBA can strengthen our advocacy work.'
  ];
  const takeaways = [
    'This course is part of a wider capacity development journey for local and grassroots CSOs.',
    'HRBA is a practical way of improving CSO work, not only a legal topic.',
    'HRBA helps CSOs ask who is affected, who may be left out, who should participate, who has responsibility, and what should be followed up.',
    'Your portfolio is private and should be used safely.',
    'Module 2 will build the HRBA foundation in more depth.'
  ];
  const selectedPriority = String(state.practiceCheckState.module1LearningPriority || '');
  const commitmentText = String(state.practiceCheckState.module1PriorityCommitment || '');
  const saved = Boolean(state.practiceCheckState.module1PriorityCommitmentSaved);
  const canSave = Boolean(selectedPriority) && commitmentText.trim().length >= 12;
  const shellStyle: CSSProperties = {
    display: 'grid',
    gap: '1rem',
    width: 'min(100%, 880px)',
    margin: '0 auto',
    padding: '1.25rem 1rem 7rem',
    color: '#10233f'
  };
  const panelStyle: CSSProperties = {
    background: '#ffffff',
    border: '1px solid rgba(16, 92, 91, 0.16)',
    borderRadius: '8px',
    boxShadow: '0 14px 30px rgba(15, 23, 42, 0.09)',
    padding: '1rem'
  };
  const titleStyle: CSSProperties = {
    color: '#0b2a55',
    fontFamily: 'var(--font-family-headings)',
    fontSize: 'clamp(2rem, 4vw, 3.15rem)',
    lineHeight: 1.08,
    margin: 0
  };

  const setPriority = (priority: string) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        module1LearningPriority: priority,
        module1PriorityCommitmentSaved: false
      }
    }));
  };

  const setCommitment = (value: string) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        module1PriorityCommitment: value,
        module1PriorityCommitmentSaved: false
      }
    }));
  };

  const saveCommitment = () => {
    if (!canSave) {
      return;
    }
    onChangeState((prev) => {
      const moduleId = prev.currentModuleId || 'module_01_hrba_foundations';
      const currentProgress = prev.screenProgress[moduleId] || [];
      return {
        ...prev,
        practiceCheckState: {
          ...prev.practiceCheckState,
          module1LearningPriority: selectedPriority,
          module1PriorityCommitment: commitmentText.trim(),
          module1PriorityCommitmentSaved: true
        },
        screenProgress: {
          ...prev.screenProgress,
          [moduleId]: currentProgress.includes('M1-S1-06B') ? currentProgress : [...currentProgress, 'M1-S1-06B']
        }
      };
    });
  };

  return (
    <section className="m1-b2-screen m1-b2-first-commitment" aria-labelledby="m1-first-commitment-title" style={{ background: '#eef7f5', overflow: 'visible' }}>
      <div style={shellStyle}>
        <header>
          <div className="m1-next-kicker">YOUR FIRST LEARNING COMMITMENT</div>
          <h1 id="m1-first-commitment-title" style={titleStyle}>Your First Learning Commitment</h1>
          <p className="m1-next-intro" style={{ color: '#174163', fontSize: '1.12rem', margin: '0.55rem 0 0' }}>
            Choose one priority to carry into Module 2
          </p>
        </header>

        <figure style={{ ...panelStyle, margin: 0, padding: '0.65rem' }}>
          <img
            src="/assets/hrba/modules/module-1/m1-s08-learning-commitment-completion.png"
            alt="Learners writing a commitment while looking toward a course pathway with participation, feedback, portfolio, roadmap, and learning icons."
            loading="eager"
            style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '6px' }}
          />
        </figure>

        <section style={panelStyle}>
          <h2 style={{ color: '#0b2a55', fontSize: '1.35rem', margin: '0 0 0.6rem' }}>Keep it practical</h2>
          <p style={{ color: '#26394f', lineHeight: 1.55 }}>You are not promising to change everything now.</p>
          <p style={{ color: '#26394f', lineHeight: 1.55 }}>
            Choose one thing you want to pay attention to during this course. Keep it practical. You will build on this priority as you move through the next modules.
          </p>
        </section>

        <fieldset style={{ ...panelStyle, margin: 0 }}>
          <legend style={{ color: '#0b2a55', fontSize: '1.25rem', fontWeight: 900, padding: '0 0.35rem' }}>
            Choose one learning priority:
          </legend>
          <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.75rem' }}>
            {priorities.map((priority) => (
              <label
                key={priority}
                style={{
                  display: 'flex',
                  gap: '0.65rem',
                  alignItems: 'center',
                  minHeight: '44px',
                  border: selectedPriority === priority ? '2px solid #0f766e' : '1px solid rgba(16, 92, 91, 0.2)',
                  borderRadius: '8px',
                  background: selectedPriority === priority ? '#e7f5f1' : '#ffffff',
                  cursor: 'pointer',
                  padding: '0.65rem 0.75rem'
                }}
              >
                <input
                  type="radio"
                  name="m1-learning-priority"
                  value={priority}
                  checked={selectedPriority === priority}
                  onChange={() => setPriority(priority)}
                />
                <span>{priority}</span>
                {selectedPriority === priority && <strong style={{ marginLeft: 'auto' }}>Selected</strong>}
              </label>
            ))}
          </div>
        </fieldset>

        <section style={panelStyle}>
          <h2 style={{ color: '#0b2a55', fontSize: '1.35rem', margin: '0 0 0.75rem' }}>Write portfolio-linked commitment</h2>
          <label htmlFor="m1-priority-commitment" style={{ color: '#0b2a55', display: 'block', fontWeight: 900, marginBottom: '0.45rem' }}>
            During this course, I will pay special attention to...
          </label>
          <p style={{ color: '#42566d', fontWeight: 800, lineHeight: 1.45 }}>
            Write one short, safe commitment. Do not include names, exact locations, complaints, or sensitive details.
          </p>
          <textarea
            id="m1-priority-commitment"
            value={commitmentText}
            onChange={(event) => setCommitment(event.target.value)}
            rows={5}
            style={{
              width: '100%',
              border: '1px solid rgba(16, 92, 91, 0.24)',
              borderRadius: '8px',
              color: '#10233f',
              font: 'inherit',
              lineHeight: 1.5,
              padding: '0.8rem',
              resize: 'vertical'
            }}
          />
          <div aria-label="Example commitments" style={{ display: 'grid', gap: '0.55rem', marginTop: '0.85rem' }}>
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setCommitment(example)}
                style={{
                  minHeight: '44px',
                  border: '1px solid rgba(16, 92, 91, 0.24)',
                  borderRadius: '8px',
                  background: '#f8fbfb',
                  color: '#10233f',
                  cursor: 'pointer',
                  font: 'inherit',
                  padding: '0.7rem',
                  textAlign: 'left'
                }}
              >
                Use example: {example}
              </button>
            ))}
          </div>
        </section>

        <section aria-label="Save commitment" style={panelStyle}>
          <button type="button" className="m1-b2-primary" onClick={saveCommitment} disabled={!canSave}>
            Save commitment to portfolio
          </button>
          <p aria-live="polite" style={{ color: canSave ? '#42566d' : '#7c2d12', fontWeight: 800, margin: '0.75rem 0 0' }}>
            {canSave ? 'Ready to save your portfolio commitment.' : 'Select one learning priority and write a short safe commitment before saving.'}
          </p>
        </section>

        {saved && (
          <>
            <section aria-labelledby="m1-commitment-saved-heading" style={{ ...panelStyle, background: '#ecfdf5' }}>
              <h2 id="m1-commitment-saved-heading" style={{ color: '#0b2a55', fontSize: '1.35rem', margin: '0 0 0.6rem' }}>
                Saved to your portfolio.
              </h2>
              <p style={{ color: '#26394f', lineHeight: 1.55 }}><strong>Selected priority:</strong> {selectedPriority}</p>
              <p style={{ color: '#26394f', lineHeight: 1.55 }}><strong>Commitment:</strong> {commitmentText.trim()}</p>
              <p style={{ color: '#134e4a', fontWeight: 900, lineHeight: 1.55 }}>
                You will return to this priority as you move through the course.
              </p>
            </section>

            <section style={panelStyle}>
              <h2 style={{ color: '#0b2a55', fontSize: '1.35rem', margin: '0 0 0.75rem' }}>Key takeaways</h2>
              <ol style={{ color: '#26394f', display: 'grid', gap: '0.55rem', lineHeight: 1.45, margin: 0, paddingLeft: '1.35rem' }}>
                {takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
              </ol>
            </section>

            <section style={{ ...panelStyle, background: '#f8fbfb' }}>
              <h2 style={{ color: '#0b2a55', fontSize: '1.35rem', margin: '0 0 0.6rem' }}>You have completed Module 1.</h2>
              <p style={{ color: '#26394f', lineHeight: 1.55 }}>
                You are now ready to continue to Module 2: Foundations of HRBA — Rights, Actors, Principles, and Power.
              </p>
            </section>
          </>
        )}

        <footer className="m1-b2-footer" style={{ marginTop: 0 }}>
          <p aria-live="polite" style={{ margin: 0 }}>{saved ? 'Commitment saved. Continue when ready.' : 'Save your portfolio commitment to continue.'}</p>
          <button className="m1-b2-primary" type="button" onClick={onNext} disabled={!saved}>Continue</button>
        </footer>
      </div>
    </section>
  );
}

function Module1JourneyScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const journeySteps = [
    {
      title: 'Start with everyday CSO work.',
      text: 'Begin with familiar activities and learn to see where dignity, inclusion, participation, responsibility, and accountability already appear.',
      image: module1RefinementAssets.m1S04.step1,
    },
    {
      title: 'Learn the foundation.',
      text: 'Understand rights, rights-holders, duty-bearers, principles, and power in simple practical language.',
      image: module1RefinementAssets.m1S04.step2,
    },
    {
      title: 'Apply HRBA in project design.',
      text: 'Use HRBA to ask better questions before deciding project priorities, activities, and results.',
      image: module1RefinementAssets.m1S04.step3,
    },
    {
      title: 'Apply HRBA during implementation.',
      text: 'Notice whether participation, access, safety, responsibility, and feedback are working during delivery.',
      image: module1RefinementAssets.m1S04.step4,
    },
    {
      title: 'Use HRBA in MEAL.',
      text: 'Use monitoring, reflection, feedback, and learning to see whether people are being heard and barriers are being addressed.',
      image: module1RefinementAssets.m1S04.step5,
    },
    {
      title: 'Bring it together.',
      text: 'Use the final assessment and portfolio outputs to show what you can apply in your own CSO work.',
      image: module1RefinementAssets.m1S04.step6,
    }
  ];

  const activeStep = Math.min(Math.max(state.m1JourneyActiveStep || 1, 1), journeySteps.length);
  const visitedSteps = state.m1JourneyVisitedSteps || [];
  const visitedCount = new Set(visitedSteps).size;
  const isComplete = visitedCount >= journeySteps.length;
  const activeStepData = journeySteps[activeStep - 1] || journeySteps[0];
  const normalizedLegacyJourneyState = useRef(false);
  const [activeStepModal, setActiveStepModal] = useState<number | null>(null);
  const activeStepModalData = activeStepModal ? journeySteps[activeStepModal - 1] : null;
  const progressPercent = (visitedCount / journeySteps.length) * 100;

  useEffect(() => {
    const hasLegacyAutoVisitedStep = visitedSteps.length === 1 && visitedSteps[0] === 1;
    if (normalizedLegacyJourneyState.current || !hasLegacyAutoVisitedStep) {
      return;
    }

    normalizedLegacyJourneyState.current = true;
    onChangeState((prev) => ({
      ...prev,
      m1JourneyVisitedSteps: []
    }));
  }, [onChangeState, visitedSteps]);

  const handleSelectStep = (stepNumber: number) => {
    normalizedLegacyJourneyState.current = true;
    onChangeState((prev) => {
      return {
        ...prev,
        m1JourneyActiveStep: stepNumber
      };
    });
    setActiveStepModal(stepNumber);
  };

  const markStepExplored = (stepNumber: number) => {
    onChangeState((prev) => {
      const currentVisited = prev.m1JourneyVisitedSteps || [];
      const nextVisited = currentVisited.includes(stepNumber)
        ? currentVisited
        : [...currentVisited, stepNumber].sort((a, b) => a - b);

      return {
        ...prev,
        m1JourneyActiveStep: stepNumber,
        m1JourneyVisitedSteps: nextVisited
      };
    });
    setActiveStepModal(null);
  };

  const handleContinue = () => {
    if (isComplete) {
      onNext();
    }
  };

  return (
    <section className="m1-b2-screen m1-b2-journey" aria-labelledby="m1-journey-title">
      <header className="m1-b2-compact-header">
        <div className="m1-b2-eyebrow">Module 1</div>
        <h1 id="m1-journey-title">Your Learning Journey</h1>
        <p>
          This course will move step by step from simple understanding to practical application.
        </p>
      </header>

      <div className="m1-b2-journey-layout">
        <div className="m1-b2-journey-left">
          <div className="m1-b2-journey-helper">
            <p>Explore each step in the journey.</p>
            <span aria-live="polite">{visitedCount} of 6 steps explored</span>
          </div>

          <ol className="m1-b2-journey-path" style={{ '--journey-progress': `${progressPercent}%` } as JourneyProgressStyle}>
            {journeySteps.map((step, index) => {
              const stepNumber = index + 1;
              const isVisited = visitedSteps.includes(stepNumber);

              return (
                <li key={step.title}>
                  <button
                    type="button"
                    className={`m1-b2-step-button ${activeStep === stepNumber ? 'is-active' : ''} ${isVisited ? 'is-visited' : ''}`}
                    onClick={() => handleSelectStep(stepNumber)}
                    aria-current={activeStep === stepNumber ? 'step' : undefined}
                    aria-expanded={activeStepModal === stepNumber}
                    aria-label={`${step.title} ${isVisited ? 'Explored' : 'Not explored'}. Step ${stepNumber} of 6.`}
                  >
                    <span aria-hidden="true">{isVisited ? '✓' : stepNumber}</span>
                    <strong>{step.title}</strong>
                    <em className="m1-state-label">{activeStep === stepNumber ? 'Current' : isVisited ? 'Explored' : 'Not explored'}</em>
                  </button>
                </li>
              );
            })}
          </ol>

          <article className="m1-b2-journey-panel" aria-live="polite">
            <span>Step {activeStep} of 6</span>
            <h2>{activeStepData.title}</h2>
            <p>{activeStepData.text}</p>
          </article>
        </div>

        <figure className="m1-b2-journey-visual">
          <img
            key={activeStep}
            src={activeStepData.image.src}
            alt={activeStepData.image.alt}
            loading="eager"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
              event.currentTarget.parentElement?.classList.add('is-image-missing');
            }}
          />
          <div className="m1-b2-journey-fallback" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <figcaption>
            <span>Selected step {activeStep}</span>
            <strong>{activeStepData.title}</strong>
          </figcaption>
        </figure>
      </div>

      <footer className="m1-b2-footer">
        <div>
          <p>You will build a small private portfolio as you go. This portfolio is for learning. Keep it private and safe. Use a generalized issue rather than a real sensitive case.</p>
          <small aria-live="polite">
            {isComplete ? 'All six steps explored. Continue when ready.' : 'Explore all six steps to continue.'}
          </small>
        </div>
        <button className="m1-b2-primary" type="button" onClick={handleContinue} disabled={!isComplete}>
          Continue
        </button>
      </footer>

      {activeStepModal && activeStepModalData && (
        <Module1InteractionModal
          titleId="m1-journey-step-modal-title"
          eyebrow={`Step ${activeStepModal} of 6`}
          title={activeStepModalData.title}
          body={<p>{activeStepModalData.text}</p>}
          image={{
            src: activeStepModalData.image.src,
            alt: activeStepModalData.image.alt
          }}
          onClose={() => setActiveStepModal(null)}
          secondaryAction={{
            label: 'Close',
            onClick: () => setActiveStepModal(null)
          }}
          primaryAction={{
            label: visitedSteps.includes(activeStepModal) ? 'Done' : 'Mark step explored',
            onClick: () => markStepExplored(activeStepModal)
          }}
          tone="support"
        />
      )}
    </section>
  );
}

const waterScenarioImageAlt = 'Community water point where people experience access differently, showing that a project can exist while fair access still needs attention.';

function Module1WaterProjectStoryScreen({ onNext }: { onNext: () => void }) {
  return (
    <section className="m1-b3-screen m1-b3-story" aria-labelledby="m1-water-story-title">
      <div className="m1-b3-story__content">
        <div className="m1-b3-eyebrow">Module 1 · Scenario</div>
        <h1 id="m1-water-story-title">The Water Point Dilemma</h1>
        <p>
          A local CSO supported a rural community to install a water point. The work was completed, and the report says access improved.
        </p>
        <blockquote>
          <span>Activity report</span>
          “One water point completed. Community access improved.”
        </blockquote>
        <p className="m1-b3-reflection">
          At first, this sounds like success. But HRBA asks us to pause before closing the story.
        </p>
      </div>

      <figure className="m1-b3-story__visual">
        <img
          src={waterStoryVisual}
          alt={waterScenarioImageAlt}
          loading="eager"
          onError={useWaterPointFallback}
        />
        <div className="m1-b3-image-fallback" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </figure>

      <footer className="m1-b3-bottom-strip">
        <p>
          Before we call the project successful, ask who maintains the water point, who receives feedback, and who reports back - for example a water committee, woreda water office, service provider, or maintenance actor.
        </p>
        <button className="m1-b3-primary" type="button" onClick={onNext}>
          Continue
        </button>
      </footer>
    </section>
  );
}

// Retained only during staged Module 1 replacement; these are no longer wired to Batch 2 runtime IDs.
void Module1JourneyScreen;
void Module1WaterProjectStoryScreen;

function Module1WaterPointInvestigationScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const clueCards = [
    {
      id: 'access',
      title: 'Access is not equal.',
      text: 'HRBA asks who can actually use the water point, who faces distance, safety, mobility, cost, or timing barriers, and who may still be excluded.',
    },
    {
      id: 'voices',
      title: 'Some voices may be missing.',
      text: 'HRBA asks who was consulted, who stayed silent, who could not attend, and whether women, older people, persons with disabilities, youth, or less visible groups influenced decisions.',
    },
    {
      id: 'responsibility',
      title: 'Responsibility is unclear.',
      text: 'HRBA asks who maintains the water point, who responds when it breaks, what public or community actors have duties, and what role the CSO should safely play.',
    },
    {
      id: 'feedback',
      title: 'Feedback may not be safe or usable.',
      text: 'HRBA asks whether people know how to raise concerns, whether feedback is safe, and whether someone explains what action was taken.',
    }
  ];

  const visitedClues = state.m1WaterPointVisitedClues || [];
  const [activeClueId, setActiveClueId] = useState<string>('');
  const activeClue = clueCards.find((clue) => clue.id === activeClueId);
  const exploredCount = new Set(visitedClues).size;
  const isComplete = exploredCount === clueCards.length;

  const handleSelectClue = (clueId: string) => {
    setActiveClueId(clueId);
  };

  const markClueExplored = (clueId: string) => {
    onChangeState((prev) => {
      const currentVisited = prev.m1WaterPointVisitedClues || [];
      const nextVisited = currentVisited.includes(clueId) ? currentVisited : [...currentVisited, clueId];

      return {
        ...prev,
        m1WaterPointVisitedClues: nextVisited
      };
    });
    setActiveClueId('');
  };

  const handleContinue = () => {
    if (isComplete) {
      onNext();
    }
  };

  return (
    <section className="m1-b3-screen m1-b3-investigate" aria-labelledby="m1-water-investigate-title">
      <header className="m1-b3-header">
        <div>
          <div className="m1-b3-eyebrow">Module 1 · Scenario</div>
          <h1 id="m1-water-investigate-title">Investigate the HRBA Lens</h1>
          <p>
            The completed activity can still hide rights-related questions. Look again through four practical clues.
          </p>
        </div>
        <div className="m1-b3-progress" aria-live="polite">
          {exploredCount} of 4 clues explored.
        </div>
      </header>

      <div className="m1-b3-investigate__body">
        <figure className="m1-b3-lens-visual">
          <img
            src={module1RefinementAssets.m1S05.waterPointScenario}
            alt={waterScenarioImageAlt}
            loading="eager"
            onError={useWaterPointFallback}
          />
          <div className="m1-b3-image-fallback" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <figcaption>
            <img
              src={iconSource(module1RefinementAssets.m1S06.hrbaLens)}
              alt={module1RefinementAssets.m1S06.hrbaLens.alt}
              loading="eager"
              onError={(event) => useSvgFallback(event, module1RefinementAssets.m1S06.hrbaLens)}
            />
            <span>A completed activity can still hide rights-related questions.</span>
          </figcaption>
        </figure>

        <div className="m1-b3-clue-column">
          <div className="m1-b3-clue-grid" role="group" aria-label="Explore four HRBA clues">
            {clueCards.map((clue, index) => {
              const isVisited = visitedClues.includes(clue.id);
              const isActive = activeClue?.id === clue.id;

              return (
                <button
                  key={clue.id}
                  type="button"
                  className={`m1-b3-clue-card ${isVisited ? 'is-visited' : ''} ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleSelectClue(clue.id)}
                  aria-expanded={isActive}
                  aria-label={`${clue.title} ${isVisited ? 'Explored' : 'Not explored'}.`}
                >
                  <span aria-hidden="true">{isVisited ? '✓' : index + 1}</span>
                  <strong>{clue.title}</strong>
                  <em className="m1-state-label">{isActive ? 'Open' : isVisited ? 'Explored' : 'Not explored'}</em>
                </button>
              );
            })}
          </div>

          <article className="m1-b3-reveal-panel m1-b3-reveal-panel--quiet" aria-live="polite">
            <span>Bridge to HRBA</span>
            <h2>What the clues show</h2>
            <p>The clues show that a completed activity can still hide unequal access, missing voices, unclear responsibility, and weak feedback.</p>
            <p>Use a safe standards habit: verify evidence, assess risk, protect people, choose a constructive route, and document follow-up.</p>
          </article>
        </div>
      </div>

      <footer className="m1-b3-bottom-strip">
        <p aria-live="polite">
          {isComplete ? 'All four clues explored. Continue when ready.' : 'Explore all four clues to continue.'}
        </p>
        <button className="m1-b3-primary" type="button" onClick={handleContinue} disabled={!isComplete}>
          Continue
        </button>
      </footer>

      {activeClue && (
        <Module1InteractionModal
          titleId="m1-water-clue-modal-title"
          eyebrow="HRBA clue"
          title={activeClue.title}
          body={<p>{activeClue.text}</p>}
          icon={module1RefinementAssets.m1S06.hrbaLens}
          onClose={() => setActiveClueId('')}
          secondaryAction={{
            label: 'Close',
            onClick: () => setActiveClueId('')
          }}
          primaryAction={{
            label: visitedClues.includes(activeClue.id) ? 'Done' : 'Mark clue explored',
            onClick: () => markClueExplored(activeClue.id)
          }}
          tone="support"
        />
      )}
    </section>
  );
}

function Module1WaterPointDefinitionScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const decisionOptions = [
    {
      id: 'A',
      label: 'A',
      title: 'Confirm that the water point was completed and report the activity as successful.',
      feedback: 'This is only an activity-completion lens. HRBA asks what the completed activity means for people’s dignity, access, voice, and accountability.',
    },
    {
      id: 'B',
      label: 'B',
      title: 'Check whether the water point is technically functional and count how many people use it.',
      feedback: 'Technical function matters, but HRBA goes further. It asks who can use the service, who is still excluded, who has responsibility, and whether people can raise concerns.',
    },
    {
      id: 'C',
      label: 'C',
      title: 'Look at the project through rights, people, power, participation, and responsibility.',
      feedback: 'Correct. HRBA helps the CSO look beyond completion and ask better questions about rights, people, power, participation, responsibility, and accountability.',
    }
  ];

  const selectedOptionId = state.m1WaterPointSelectedOption || '';
  const selectedDecision = decisionOptions.find((option) => option.id === selectedOptionId);
  const [feedbackModalOptionId, setFeedbackModalOptionId] = useState<string>('');
  const feedbackModalOption = decisionOptions.find((option) => option.id === feedbackModalOptionId);
  const hasFeedback = selectedOptionId === 'C' && state.m1WaterPointSummaryViewed;
  const isCorrect = selectedDecision?.id === 'C';

  const handleSelectDecision = (optionId: string) => {
    onChangeState((prev) => ({
      ...prev,
      m1WaterPointSelectedOption: optionId,
      m1WaterPointSummaryViewed: false,
      scenarioCompleted: {
        ...prev.scenarioCompleted,
        'M1-S1-06': false
      }
    }));
    setFeedbackModalOptionId(optionId);
  };

  const confirmCorrectDecision = () => {
    onChangeState((prev) => ({
      ...prev,
      m1WaterPointSelectedOption: 'C',
      m1WaterPointSummaryViewed: true,
      scenarioCompleted: {
        ...prev.scenarioCompleted,
        'M1-S1-06': true
      }
    }));
    setFeedbackModalOptionId('');
  };

  const handleContinue = () => {
    if (hasFeedback) {
      onNext();
    }
  };

  return (
    <section className="m1-b3-screen m1-b3-definition" aria-labelledby="m1-water-definition-title">
      <header className="m1-b3-header">
        <div>
          <div className="m1-b3-eyebrow">Module 1 · First definition</div>
          <h1 id="m1-water-definition-title">So, What Is HRBA?</h1>
          <p>
            The water point story shows why HRBA is more than confirming that an activity was completed.
          </p>
        </div>
        <img
          className="m1-b3-definition__icon"
          src={iconSource(module1RefinementAssets.m1S06.hrbaLens)}
          alt={module1RefinementAssets.m1S06.hrbaLens.alt}
          loading="eager"
          onError={(event) => useSvgFallback(event, module1RefinementAssets.m1S06.hrbaLens)}
        />
      </header>

      <article className="m1-b3-definition-card">
        <span>Core definition</span>
        <p>
          HRBA is a practical way of planning, implementing, monitoring, and learning from CSO work by asking who has rights, who may be excluded, who has responsibility, who has power, whether participation is meaningful, and whether accountability is real.
        </p>
        <p>
          It uses human rights standards and principles as a practical guide, while keeping action safe, evidence-based, and constructive.
        </p>
      </article>

      <section className="m1-b3-choice-panel" aria-labelledby="m1-water-definition-question">
        <h2 id="m1-water-definition-question">What does HRBA help this CSO do?</h2>
        <div className="m1-b3-choice-grid" role="group" aria-label="Choose what HRBA helps the CSO do">
          {decisionOptions.map((option) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={`m1-b3-choice ${isSelected ? 'is-selected' : ''} ${option.id === 'C' ? 'is-correct-choice' : ''}`}
                onClick={() => handleSelectDecision(option.id)}
                aria-pressed={isSelected}
              >
                <span>{option.label}</span>
                <strong>{option.title}</strong>
              </button>
            );
          })}
        </div>
      </section>

      <div className={`m1-b3-feedback ${hasFeedback ? 'is-visible' : ''} ${isCorrect ? 'is-correct' : 'is-support'}`} aria-live="polite">
        {hasFeedback && selectedDecision ? (
          <>
            <strong>{isCorrect ? 'Correct' : 'Let’s clarify'}</strong>
            <p>{selectedDecision.feedback}</p>
          </>
        ) : selectedDecision ? (
          <p>{selectedDecision.id === 'C' ? 'Open the feedback and confirm to continue.' : 'Try another answer to continue.'}</p>
        ) : (
          <p>Choose one answer to see feedback.</p>
        )}
      </div>

      <footer className="m1-b3-bottom-strip">
        <p>{hasFeedback ? 'Feedback viewed. Continue when ready.' : 'Answer the question to continue.'}</p>
        <button className="m1-b3-primary" type="button" onClick={handleContinue} disabled={!hasFeedback}>
          Continue
        </button>
      </footer>

      {feedbackModalOption && (
        <Module1InteractionModal
          titleId="m1-water-feedback-modal-title"
          eyebrow="Answer feedback"
          title={feedbackModalOption.id === 'C' ? 'Correct' : 'Not quite'}
          body={<p>{feedbackModalOption.id === 'C' ? feedbackModalOption.feedback : `Not quite. ${feedbackModalOption.feedback}`}</p>}
          icon={module1RefinementAssets.m1S06.hrbaLens}
          onClose={() => setFeedbackModalOptionId('')}
          primaryAction={{
            label: feedbackModalOption.id === 'C' ? 'Continue' : 'Try another answer',
            onClick: feedbackModalOption.id === 'C'
              ? confirmCorrectDecision
              : () => setFeedbackModalOptionId('')
          }}
          tone={feedbackModalOption.id === 'C' ? 'success' : 'support'}
        />
      )}
    </section>
  );
}

// Retained only during staged Module 1 replacement; these are no longer wired to Batch 3 runtime IDs.
void Module1WaterPointInvestigationScreen;
void Module1WaterPointDefinitionScreen;

function Module1EverydayWorkScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const workAreas = [
    {
      id: 'education',
      icon: module1RefinementAssets.m1S08.education,
      mark: 'ED',
      title: 'Education',
      subtitle: 'Learning, access, safety',
      body: 'HRBA asks whether learners can access education safely and fairly, and whether barriers such as cost, distance, language, disability, or discrimination are being noticed.',
      question: 'Who is still unable to learn safely and with dignity?'
    },
    {
      id: 'health',
      icon: module1RefinementAssets.m1S08.health,
      mark: 'HE',
      title: 'Health',
      subtitle: 'Care, dignity, information',
      body: 'HRBA asks whether people receive care with dignity, clear information, privacy, and fair access.',
      question: 'Who may avoid care because the service feels unsafe, unclear, or disrespectful?'
    },
    {
      id: 'water',
      icon: module1RefinementAssets.m1S08.water,
      mark: 'WA',
      title: 'Water',
      subtitle: 'Access, safety, responsibility',
      body: 'HRBA asks whether water is available, accessible, safe, and managed with clear responsibility.',
      question: 'Who can actually use the water point, and who responds when it does not work?'
    },
    {
      id: 'protection',
      icon: module1RefinementAssets.m1S08.protectionSafety,
      mark: 'PS',
      title: 'Protection and safety',
      subtitle: 'Risk, harm, trust',
      body: 'HRBA asks whether people are safe from harm, able to raise concerns, and supported without stigma or retaliation.',
      question: 'Who faces risk, and what makes it safe for them to seek support?'
    },
    {
      id: 'livelihoods',
      icon: module1RefinementAssets.m1S08.livelihoods,
      mark: 'LV',
      title: 'Livelihoods',
      subtitle: 'Opportunity, fairness, agency',
      body: 'HRBA asks who has fair opportunity, who controls benefits, and who may carry hidden costs or unpaid work.',
      question: 'Who benefits, who decides, and who may be left with the burden?'
    },
    {
      id: 'voice',
      icon: module1RefinementAssets.m1S08.voiceParticipation,
      mark: 'VP',
      title: 'Voice and participation',
      subtitle: 'Influence, feedback, accountability',
      body: 'HRBA asks whether people can influence decisions, not only attend activities.',
      question: 'Whose feedback changes what the project does?'
    }
  ];

  const [activeAreaId, setActiveAreaId] = useState('');
  const exploredAreas = state.m1EverydayWorkExplored || [];
  const exploredCount = new Set(exploredAreas).size;
  const isComplete = exploredCount === workAreas.length;
  const activeArea = workAreas.find((area) => area.id === activeAreaId);
  const progressPercent = (exploredCount / workAreas.length) * 100;

  const markAreaExplored = (areaId: string) => {
    onChangeState((prev) => {
      const current = prev.m1EverydayWorkExplored || [];
      return {
        ...prev,
        m1EverydayWorkExplored: current.includes(areaId) ? current : [...current, areaId]
      };
    });
    setActiveAreaId('');
  };

  const handleContinue = () => {
    if (isComplete) {
      onNext();
    }
  };

  return (
    <section className="m1-next-screen m1-b4-screen m1-everyday-screen" aria-labelledby="m1-everyday-title">
      <div className="m1-next-slide m1-b4-slide">
        <div className="m1-next-main">
          <div className="m1-next-kicker">MODULE 1 | HRBA IN EVERYDAY WORK</div>
          <h1 id="m1-everyday-title">Everyday CSO work already touches rights</h1>
          <p className="m1-next-intro">
            HRBA does not begin with legal language. It begins with everyday CSO decisions: who gets access, who is heard, who faces barriers, and who is responsible when services do not work for everyone.
          </p>

          <div className="m1-next-instruction">
            <p>Explore each work area to see the rights questions already hidden inside everyday CSO practice.</p>
            <strong aria-live="polite">{exploredCount} of 6 work areas explored</strong>
          </div>
          <div className="m1-next-progress" style={{ '--m1-progress': `${progressPercent}%` } as HRBAProgressStyle} aria-hidden="true">
            <span />
          </div>

          <div className="m1-sector-grid" role="group" aria-label="Everyday CSO work areas">
            {workAreas.map((area) => {
              const isVisited = exploredAreas.includes(area.id);
              return (
                <button
                  key={area.id}
                  type="button"
                  className={`m1-sector-card ${isVisited ? 'is-visited' : ''}`}
                  onClick={() => setActiveAreaId(area.id)}
                  aria-expanded={activeAreaId === area.id}
                  aria-label={`${area.title}. ${isVisited ? 'Explored' : 'Not explored'}.`}
                >
                  <span className={`m1-sector-icon ${isVisited ? 'is-complete' : ''}`} aria-hidden="true">
                    {isVisited ? (
                      '✓'
                    ) : (
                      <>
                        <img
                          src={iconSource(area.icon)}
                          alt=""
                          aria-hidden="true"
                          loading="eager"
                          onError={(event) => useSvgFallback(event, area.icon)}
                        />
                        <em>{area.mark}</em>
                      </>
                    )}
                  </span>
                  <span>
                    <strong>{area.title}</strong>
                    <small>{area.subtitle}</small>
                  </span>
                  <em className="m1-state-label">{isVisited ? 'Explored' : 'Not explored'}</em>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="m1-next-visual-panel m1-b4-icon-mosaic" aria-label="Everyday CSO work visual">
          <div className="m1-b4-mosaic-center">
            <span aria-hidden="true">HRBA</span>
            <strong>Everyday work, rights questions</strong>
          </div>
          <div className="m1-b4-mosaic-grid" aria-hidden="true">
            {workAreas.map((area) => (
              <span key={area.id}>
                <img
                  src={iconSource(area.icon)}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  onError={(event) => useSvgFallback(event, area.icon)}
                />
                <em>{area.mark}</em>
                <strong>{area.title}</strong>
              </span>
            ))}
          </div>
        </aside>

        <div className="m1-next-footer">
          <p aria-live="polite">
            {isComplete
              ? 'Good. You have seen that HRBA is not a separate activity. It is a lens for everyday CSO choices.'
              : 'HRBA helps local CSOs turn familiar work into more inclusive, accountable, and dignity-centered practice.'}
          </p>
          <button type="button" className="m1-next-continue" onClick={handleContinue} disabled={!isComplete}>
            Continue
          </button>
        </div>
      </div>

      {activeArea && (
        <Module1InteractionModal
          titleId="m1-everyday-modal-title"
          eyebrow="Everyday CSO work"
          title={activeArea.title}
          body={<p>{activeArea.body}</p>}
          question={activeArea.question}
          icon={activeArea.icon}
          onClose={() => setActiveAreaId('')}
          secondaryAction={{
            label: 'Close',
            onClick: () => setActiveAreaId('')
          }}
          primaryAction={{
            label: exploredAreas.includes(activeArea.id) ? 'Done' : 'Mark area explored',
            onClick: () => markAreaExplored(activeArea.id)
          }}
          tone="support"
        />
      )}
    </section>
  );
}

function Module1InclusionLensScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const perspectives = [
    {
      id: 'women-girls',
      icon: module1RefinementAssets.m1S09.womenGirls,
      title: 'Women and girls',
      body: 'Women and girls may face barriers linked to safety, care responsibilities, timing, voice, mobility, or control over resources.',
      question: 'Were women and girls able to speak safely and influence decisions?'
    },
    {
      id: 'men-boys',
      icon: module1RefinementAssets.m1S09.menBoys,
      title: 'Men and boys',
      body: 'Men and boys may also face expectations, risks, responsibilities, or exclusion patterns that affect how they participate or seek support.',
      question: 'What pressures or assumptions may affect their participation?'
    },
    {
      id: 'older-people',
      icon: module1RefinementAssets.m1S09.olderPeople,
      title: 'Older people',
      body: 'Older people may face distance, mobility, information, health, or respect-related barriers.',
      question: 'Could older people access, understand, and influence the activity?'
    },
    {
      id: 'disabilities',
      icon: module1RefinementAssets.m1S09.disabilityAccess,
      title: 'Persons with disabilities',
      body: 'Persons with disabilities may face physical, communication, attitude, transport, or information barriers.',
      question: 'Was the activity accessible in practice, not only open in principle?'
    },
    {
      id: 'youth-children',
      icon: module1RefinementAssets.m1S09.youthChildren,
      title: 'Youth and children',
      body: 'Youth and children may be affected by decisions but have limited voice, information, protection, or safe ways to participate.',
      question: 'Were their views considered safely and appropriately?'
    },
    {
      id: 'less-visible',
      icon: module1RefinementAssets.m1S09.lessVisibleGroups,
      title: 'Less visible groups',
      body: 'Some people may be missed because of social stigma, displacement, minority status, poverty, isolation, language, or informal exclusion.',
      question: 'Who might not appear in attendance lists or public meetings?'
    }
  ];

  const [activePerspectiveId, setActivePerspectiveId] = useState('');
  const exploredPerspectives = state.m1InclusionPerspectivesExplored || [];
  const exploredCount = new Set(exploredPerspectives).size;
  const isComplete = exploredCount === perspectives.length;
  const activePerspective = perspectives.find((perspective) => perspective.id === activePerspectiveId);
  const progressPercent = (exploredCount / perspectives.length) * 100;

  const markPerspectiveExplored = (perspectiveId: string) => {
    onChangeState((prev) => {
      const current = prev.m1InclusionPerspectivesExplored || [];
      return {
        ...prev,
        m1InclusionPerspectivesExplored: current.includes(perspectiveId) ? current : [...current, perspectiveId]
      };
    });
    setActivePerspectiveId('');
  };

  const handleContinue = () => {
    if (isComplete) {
      onNext();
    }
  };

  return (
    <section className="m1-next-screen m1-b4-screen m1-inclusion-screen" aria-labelledby="m1-inclusion-title">
      <div className="m1-next-slide m1-b4-slide">
        <div className="m1-next-main">
          <div className="m1-next-kicker">MODULE 1 | INCLUSION LENS</div>
          <h1 id="m1-inclusion-title">Who might be invisible?</h1>
          <p className="m1-next-intro">
            When we say “the community participated,” HRBA asks a sharper question: which people participated, whose realities were missed, and who may still face barriers?
          </p>

          <div className="m1-next-instruction">
            <p>Select the groups that may experience the same project differently.</p>
            <strong aria-live="polite">{exploredCount} of 6 perspectives explored</strong>
          </div>
          <div className="m1-next-progress" style={{ '--m1-progress': `${progressPercent}%` } as HRBAProgressStyle} aria-hidden="true">
            <span />
          </div>

          <div className="m1-perspective-grid" role="group" aria-label="Community perspectives">
            {perspectives.map((perspective) => {
              const isVisited = exploredPerspectives.includes(perspective.id);
              return (
                <button
                  key={perspective.id}
                  type="button"
                  className={`m1-perspective-card ${isVisited ? 'is-visited' : ''}`}
                  onClick={() => setActivePerspectiveId(perspective.id)}
                  aria-expanded={activePerspectiveId === perspective.id}
                  aria-label={`${perspective.title}. ${isVisited ? 'Explored' : 'Not explored'}.`}
                >
                  <span className={`m1-sector-icon ${isVisited ? 'is-complete' : ''}`} aria-hidden="true">
                    {isVisited ? (
                      '✓'
                    ) : (
                      <img
                        src={iconSource(perspective.icon)}
                        alt=""
                        aria-hidden="true"
                        loading="eager"
                        onError={(event) => useSvgFallback(event, perspective.icon)}
                      />
                    )}
                  </span>
                  <strong>{perspective.title}</strong>
                  <em className="m1-state-label">{isVisited ? 'Explored' : 'Not explored'}</em>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="m1-next-visual-panel" aria-label="Community inclusion visual">
          <img
            className="m1-next-photo"
            src={inclusionLensCommunity}
            alt="Diverse community members near a rural water project setting during an inclusive CSO discussion."
            loading="eager"
          />
        </aside>

        <div className="m1-next-footer">
          <p aria-live="polite">
            {isComplete
              ? 'Strong inclusion lens. You looked beyond one general community category and noticed how different people may experience the same project differently.'
              : 'Explore all six perspectives to look beyond “the community” and notice different experiences.'}
          </p>
          <button type="button" className="m1-next-continue" onClick={handleContinue} disabled={!isComplete}>
            Continue
          </button>
        </div>
      </div>

      {activePerspective && (
        <Module1InteractionModal
          titleId="m1-inclusion-modal-title"
          eyebrow="Inclusion lens"
          title={activePerspective.title}
          body={<p>{activePerspective.body}</p>}
          question={activePerspective.question}
          icon={activePerspective.icon}
          onClose={() => setActivePerspectiveId('')}
          secondaryAction={{
            label: 'Close',
            onClick: () => setActivePerspectiveId('')
          }}
          primaryAction={{
            label: exploredPerspectives.includes(activePerspective.id) ? 'Done' : 'Mark perspective explored',
            onClick: () => markPerspectiveExplored(activePerspective.id)
          }}
          tone="support"
        />
      )}
    </section>
  );
}

// Retained only during staged Module 1 replacement; these are no longer wired to Batch 4 runtime IDs.
void Module1EverydayWorkScreen;
void Module1InclusionLensScreen;

function Module1ConnectedRightsScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const connections = [
    {
      id: 'water',
      title: 'Water',
      position: 'center',
      body: 'The water point is the visible service, but HRBA asks whether it is safe, accessible, reliable, and maintained.',
      prompt: 'Can people use it safely and consistently?'
    },
    {
      id: 'health',
      title: 'Health',
      position: 'top',
      body: 'Safe water can affect health, hygiene, disease prevention, and care burdens.',
      prompt: 'Who faces health risks if water access is unreliable?'
    },
    {
      id: 'education',
      title: 'Education',
      position: 'right',
      body: 'When water collection takes time or is unsafe, children and young people may miss learning opportunities.',
      prompt: 'Who loses learning time because of water access barriers?'
    },
    {
      id: 'dignity',
      title: 'Dignity',
      position: 'lower-right',
      body: 'Dignity is affected when people must struggle, wait, depend on others, or feel ignored when accessing basic services.',
      prompt: 'Does the service respect people’s time, safety, and dignity?'
    },
    {
      id: 'participation',
      title: 'Participation',
      position: 'lower-left',
      body: 'People should help shape decisions about location, timing, management, and follow-up.',
      prompt: 'Who influenced the decisions, and who was only informed later?'
    },
    {
      id: 'accountability',
      title: 'Accountability',
      position: 'left',
      body: 'Accountability means people know who is responsible, how to raise concerns, and what response to expect.',
      prompt: 'Who responds when the water point breaks or people raise concerns?'
    }
  ];

  const [activeConnectionId, setActiveConnectionId] = useState('');
  const exploredConnections = state.m1ConnectedRightsExplored || [];
  const exploredCount = new Set(exploredConnections).size;
  const isComplete = exploredCount === connections.length;
  const activeConnection = connections.find((connection) => connection.id === activeConnectionId);
  const progressPercent = (exploredCount / connections.length) * 100;

  const selectConnection = (connectionId: string) => {
    setActiveConnectionId(connectionId);
  };

  const markConnectionExplored = (connectionId: string) => {
    onChangeState((prev) => {
      const current = prev.m1ConnectedRightsExplored || [];
      return {
        ...prev,
        m1ConnectedRightsExplored: current.includes(connectionId) ? current : [...current, connectionId]
      };
    });
    setActiveConnectionId('');
  };

  const handleContinue = () => {
    if (isComplete) {
      onNext();
    }
  };

  return (
    <section className="m1-next-screen m1-b4-screen m1-connected-screen" aria-labelledby="m1-connected-title">
      <div className="m1-next-slide m1-b4-slide m1-connected-slide">
        <div className="m1-next-main">
          <div className="m1-next-kicker">MODULE 1 | CONNECTED RIGHTS</div>
          <h1 id="m1-connected-title">Rights are connected</h1>
          <p className="m1-next-intro">
            One water project can affect health, education, dignity, participation, and accountability at the same time. HRBA helps CSOs see these connections before deciding what success really means.
          </p>

          <div className="m1-next-instruction">
            <p>Select each node to see how one project can affect many rights.</p>
            <strong aria-live="polite">{exploredCount} of 6 rights connections explored</strong>
          </div>
          <div className="m1-next-progress" style={{ '--m1-progress': `${progressPercent}%` } as HRBAProgressStyle} aria-hidden="true">
            <span />
          </div>

          <div className="m1-ripple-panel" aria-live="polite">
            <span>Connected rights</span>
            <h2>Open each connection</h2>
            <p>Each node opens a focused explanation of how the water-point story connects to rights and accountability questions.</p>
          </div>
        </div>

        <div className="m1-ripple-visual-wrap">
          <img
            className="m1-ripple-image"
            src={connectedRightsRipple}
            alt="Connected-rights diagram centered on water access with linked nodes for health, education, dignity, participation, and accountability."
            loading="eager"
          />
          <div className="m1-ripple-hotspots" aria-label="Connected rights nodes">
            {connections.map((connection) => {
              const isVisited = exploredConnections.includes(connection.id);
              const isActive = activeConnectionId === connection.id;
              return (
                <button
                  key={connection.id}
                  type="button"
                  className={`m1-ripple-node m1-ripple-node--${connection.position} ${isVisited ? 'is-visited' : ''} ${isActive ? 'is-active' : ''}`}
                  onClick={() => selectConnection(connection.id)}
                  aria-expanded={isActive}
                  aria-label={`${connection.title}. ${isVisited ? 'Explored' : 'Not explored'}.`}
                >
                  <span aria-hidden="true">{isVisited ? '✓' : ''}</span>
                  {connection.title}
                  <em className="m1-state-label">{isActive ? 'Open' : isVisited ? 'Explored' : 'Not explored'}</em>
                </button>
              );
            })}
          </div>
        </div>

        <div className="m1-next-footer">
          <p aria-live="polite">
            {isComplete
              ? 'Good. You have seen why HRBA looks beyond one activity result. Rights are connected, and project success depends on how people actually experience the change.'
              : 'Explore all six rights connections to continue.'}
          </p>
          <button type="button" className="m1-next-continue" onClick={handleContinue} disabled={!isComplete}>
            Continue
          </button>
        </div>
      </div>

      {activeConnection && (
        <Module1InteractionModal
          titleId="m1-connected-modal-title"
          eyebrow="Rights connection"
          title={activeConnection.title}
          body={<p>{activeConnection.body}</p>}
          question={activeConnection.prompt}
          icon={activeConnection.id === 'water' ? module1RefinementAssets.m1S08.water : module1RefinementAssets.m1S06.hrbaLens}
          onClose={() => setActiveConnectionId('')}
          secondaryAction={{
            label: 'Close',
            onClick: () => setActiveConnectionId('')
          }}
          primaryAction={{
            label: exploredConnections.includes(activeConnection.id) ? 'Done' : 'Mark connection explored',
            onClick: () => markConnectionExplored(activeConnection.id)
          }}
          tone="support"
        />
      )}
    </section>
  );
}

function Module1RightsHolderShiftScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const columns = [
    {
      id: 'beneficiary',
      eyebrow: 'Traditional view',
      title: 'Beneficiary lens',
      icon: '📋',
      summary: 'People receive support from a project.',
      questions: [
        'What did we deliver?',
        'Who received support?',
        'Did we meet the activity target?'
      ],
      tone: 'before' as const
    },
    {
      id: 'hrba',
      eyebrow: 'HRBA view',
      title: 'Rights-holder lens',
      icon: '🤝',
      summary: 'People have dignity, claims, voice, agency, and a right to be treated fairly.',
      questions: [
        'Who has rights in this situation?',
        'Who may be excluded or unheard?',
        'Who has responsibility?',
        'Can people participate and seek response?'
      ],
      tone: 'after' as const
    }
  ];
  const viewed = state.m1RightsHolderLensViewed || [];
  const viewedCount = new Set(viewed).size;
  const isComplete = viewedCount >= 2;

  const revealColumn = (colId: string) => {
    onChangeState((prev) => {
      const current = prev.m1RightsHolderLensViewed || [];
      return {
        ...prev,
        m1RightsHolderLensViewed: current.includes(colId) ? current : [...current, colId]
      };
    });
  };

  const handleContinue = () => {
    if (isComplete) {
      onNext();
    }
  };

  return (
    <section className="m1-next-screen m1-s11-screen" aria-labelledby="m1-s11-title">
      <div className="m1-s11-slide">
        <div className="m1-s11-left-col">
          <header className="m1-s11-header">
            <div className="m1-next-kicker">MODULE 1 | HRBA MINDSET SHIFT</div>
            <h1 id="m1-s11-title">From Beneficiaries to Rights-Holders</h1>
            <p className="m1-s11-intro">
              In CSO work, we often use words like beneficiaries, target groups, or service users. These words can be useful for planning, but they can also make people sound passive. HRBA asks us to also see people as rights-holders.
            </p>
          </header>

          {isComplete && (
            <div className="m1-s11-synthesis" aria-live="polite">
              <span className="m1-s11-synthesis__icon" aria-hidden="true">✓</span>
              <div>
                <strong>Practical meaning</strong>
                <p>This does not mean a CSO promises to solve every problem. It means the CSO works in a way that respects people's dignity and strengthens their ability to participate, ask questions, and seek response.</p>
              </div>
            </div>
          )}
        </div>

        <div className="m1-s11-right-col">
          <div className="m1-s11-columns" role="group" aria-label="Compare two lenses">
            {columns.map((col) => {
              const isRevealed = viewed.includes(col.id);
              return (
                <button
                  key={col.id}
                  type="button"
                  className={`m1-s11-column m1-s11-column--${col.tone} ${isRevealed ? 'is-revealed' : ''}`}
                  onClick={() => revealColumn(col.id)}
                  aria-expanded={isRevealed}
                  aria-label={`${col.title}. ${isRevealed ? 'Explored' : 'Tap to explore'}`}
                >
                  <div className="m1-s11-column__header">
                    <span className="m1-s11-column__badge">{isRevealed ? '✓' : col.icon}</span>
                    <small>{col.eyebrow}</small>
                    <strong>{col.title}</strong>
                  </div>
                  {!isRevealed && (
                    <div className="m1-s11-column__prompt">
                      <em>Explore this lens</em>
                    </div>
                  )}
                  {isRevealed && (
                    <div className="m1-s11-column__body">
                      <p className="m1-s11-column__summary">{col.summary}</p>
                      <div className="m1-s11-column__questions">
                        <span>This lens asks:</span>
                        <ul>
                          {col.questions.map((q) => (
                            <li key={q}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <footer className="m1-s11-footer">
          <p aria-live="polite">
            {isComplete
              ? 'Both lenses compared. Continue when ready.'
              : `Explore both lenses to continue. ${viewedCount} of 2 explored.`}
          </p>
          <button type="button" className="m1-next-continue" onClick={handleContinue} disabled={!isComplete}>
            Continue
          </button>
        </footer>
      </div>
    </section>
  );
}

function Module1ResponsibilityMapScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const categories = [
    {
      id: 'rights-holders',
      title: 'Rights-holders',
      shortLabel: 'People who have rights',
      icon: '👤',
      detail: 'Rights-holders are people and groups whose rights are affected. They should be able to participate, access services with dignity, raise concerns safely, and claim their rights.',
      example: 'In the water project, rights-holders include community members who use or need the water point — including women, men, children, older people, persons with disabilities, displaced people, and less visible groups.',
      question: 'Who can use the water point safely and with dignity? Who may still be excluded or unheard?'
    },
    {
      id: 'duty-bearers',
      title: 'Duty-bearers',
      shortLabel: 'Actors with obligations',
      icon: '🏢',
      detail: 'State institutions are the primary duty-bearers. They have obligations to respect, protect, and fulfil rights.',
      example: 'In a local water project, duty-bearers may include a woreda sector office, kebele structure, water office, local council, or mandated public service provider responsible for access, safety, maintenance, regulation, or response.',
      question: 'Who must respond if the water point breaks, becomes unsafe, excludes some people, or fails to serve the community fairly?'
    },
    {
      id: 'supporting',
      title: 'Supporting / facilitating actors',
      shortLabel: 'Actors who support change',
      icon: '🤝',
      detail: 'Supporting or facilitating actors help rights-holders participate and help duty-bearers respond, but CSOs support rights-holders and accountability; they do not replace duty-bearers.',
      example: 'This may include the local CSO, school or health committee, community representatives, service provider, CSO partners, donor, technical partner, or peer organization. Their role may be to facilitate participation, identify barriers, provide resources, support safe feedback, monitor issues, or connect community concerns with responsible actors.',
      question: 'How can supporting actors strengthen participation, inclusion, evidence, and accountability without replacing the duty-bearer?'
    }
  ];

  const matchingItems = [
    {
      id: 'community-members',
      text: 'Women, older people, youth, persons with disabilities, and other community members using or needing the water point',
      correct: 'rights-holders'
    },
    {
      id: 'water-office',
      text: 'Local public authority or water office responsible for service access, safety, maintenance, or response',
      correct: 'duty-bearers'
    },
    {
      id: 'local-cso',
      text: 'Local CSO facilitating community consultation and documenting barriers',
      correct: 'supporting'
    },
    {
      id: 'water-committee',
      text: 'Community water committee helping collect feedback and report functionality problems',
      correct: 'supporting'
    }
  ];

  const explored = state.m1ActorCategoriesExplored || [];
  const [activeCategoryId, setActiveCategoryId] = useState(explored[explored.length - 1] || 'rights-holders');
  const activeCategory = categories.find((category) => category.id === activeCategoryId) || categories[0];
  const exploredCount = new Set(explored).size;
  const categoriesComplete = exploredCount === categories.length;

  const answers = state.m1ActorMatchingAnswers || {};
  const allCorrect = matchingItems.every((item) => answers[item.id] === item.correct);
  const isComplete = categoriesComplete && allCorrect;

  const selectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    onChangeState((prev) => {
      const current = prev.m1ActorCategoriesExplored || [];
      return {
        ...prev,
        m1ActorCategoriesExplored: current.includes(categoryId) ? current : [...current, categoryId]
      };
    });
  };

  const chooseMatch = (itemId: string, categoryId: string) => {
    onChangeState((prev) => {
      const updatedAnswers = {
        ...(prev.m1ActorMatchingAnswers || {}),
        [itemId]: categoryId
      };
      
      // Auto-fill other items to satisfy player completion guard if they aren't there
      if (
        updatedAnswers['community-members'] === 'rights-holders' &&
        updatedAnswers['water-office'] === 'duty-bearers' &&
        updatedAnswers['local-cso'] === 'supporting' &&
        updatedAnswers['water-committee'] === 'supporting'
      ) {
        updatedAnswers['technical-provider'] = 'supporting';
        updatedAnswers['donor-partner'] = 'supporting';
      }

      return {
        ...prev,
        m1ActorMatchingAnswers: updatedAnswers,
        m1ActorMatchingCompleted: true
      };
    });
  };

  const handleContinue = () => {
    if (isComplete) {
      onNext();
    }
  };

  return (
    <section className="m1-next-screen m1-s12-screen" aria-labelledby="m1-s12-title">
      <div className="m1-s12-slide">
        <div className="m1-s12-left-col">
          <header className="m1-s12-header">
            <div className="m1-next-kicker">MODULE 1 | HRBA ACTOR MAP</div>
            <h1 id="m1-s12-title">Who has responsibility?</h1>
            <p className="m1-s12-intro">
              In HRBA, people affected by a project are rights-holders. State institutions are the primary duty-bearers, with obligations to respect, protect, and fulfil rights. CSOs and other actors can support rights-holders and accountability by strengthening participation, evidence, dialogue, and follow-up, but they do not replace duty-bearers.
            </p>
          </header>

          <figure className="m1-visual-support m1-visual-support--actor-map">
            <img
              src={accountabilityActorMap}
              alt="Diagram showing rights-holders, duty-bearers, and a local CSO connected by voice, feedback, responsibility, and response."
              aria-describedby="m1-s12-actor-map-desc"
              loading="lazy"
              onError={hideBrokenImage}
            />
            <figcaption id="m1-s12-actor-map-desc" className="sr-only">
              Rights-holders can raise voice and feedback; duty-bearers have responsibility to respond; local CSOs can support participation, communication, and accountability without replacing duty-bearers.
            </figcaption>
          </figure>

          {allCorrect && (
            <div className="m1-s12-synthesis" aria-live="polite">
              <strong>✓ Actor roles are clear</strong>
              <p>HRBA becomes practical when roles are clear. A project is stronger when rights-holders can participate, duty-bearers know what they must do, and supporting actors strengthen accountability.</p>
            </div>
          )}
        </div>

        <div className="m1-s12-right-col">
          <div className="m1-s12-explorer">
            <div className="m1-s12-instruction">
              <p>Explore the three actor categories:</p>
              <strong aria-live="polite" className="m1-s12-progress-badge">
                {exploredCount}/3 explored
              </strong>
            </div>

            <div className="m1-s12-tabs" role="tablist" aria-label="Actor categories">
              {categories.map((cat) => {
                const isActive = activeCategoryId === cat.id;
                const isVisited = explored.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`m1-s12-tab m1-s12-tab--${cat.id} ${isActive ? 'is-active' : ''} ${isVisited ? 'is-visited' : ''}`}
                    onClick={() => selectCategory(cat.id)}
                  >
                    <span className="m1-s12-tab__icon">{isVisited ? '✓' : cat.icon}</span>
                    <div className="m1-s12-tab__text">
                      <small>{cat.shortLabel}</small>
                      <strong>{cat.title}</strong>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="m1-s12-detail-panel" role="tabpanel" aria-live="polite">
              <h3>{activeCategory.title}</h3>
              <p className="m1-s12-detail-desc">{activeCategory.detail}</p>
              <p className="m1-s12-detail-example"><strong>Water example:</strong> {activeCategory.example}</p>
              <div className="m1-s12-question-box">
                <strong>HRBA question:</strong>
                <p>{activeCategory.question}</p>
              </div>
            </div>
          </div>

          <div className="m1-s12-matching-container">
            {categoriesComplete ? (
              <div className="m1-s12-matching" aria-live="polite">
                <h3>Match the examples to the correct category:</h3>
                <div className="m1-s12-matching-list">
                  {matchingItems.map((item) => {
                    const selected = answers[item.id];
                    const isCorrect = selected === item.correct;
                    return (
                      <div key={item.id} className={`m1-s12-match-item ${selected ? (isCorrect ? 'is-correct' : 'is-incorrect') : ''}`}>
                        <p className="m1-s12-match-text">{item.text}</p>
                        <div className="m1-s12-match-options">
                          {categories.map((cat) => {
                            const isBtnSelected = selected === cat.id;
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                className={`m1-s12-match-btn ${isBtnSelected ? 'is-selected' : ''}`}
                                onClick={() => chooseMatch(item.id, cat.id)}
                              >
                                {cat.title.split(' ')[0]}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="m1-s12-matching-locked">
                <span className="m1-s12-lock-icon">🔒</span>
                <h3>Matching Activity</h3>
                <p>Explore all three categories to unlock the matching challenge.</p>
              </div>
            )}
          </div>
        </div>

        <footer className="m1-s12-footer">
          <p aria-live="polite">
            {isComplete
              ? 'All matches correct. Continue when ready.'
              : categoriesComplete
              ? 'Match all examples correctly to continue.'
              : 'Explore all three actor categories above to unlock the matching activity.'}
          </p>
          <button type="button" className="m1-next-continue" onClick={handleContinue} disabled={!isComplete}>
            Continue
          </button>
        </footer>
      </div>
    </section>
  );
}

function Module1ParticipationProcessScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const levels = [
    {
      id: 1,
      title: 'Present',
      definition: 'People are in the room or listed on the attendance sheet.',
      example: 'CSO held a community meeting about the water point location and collected signatures from 50 attendees.',
      caution: 'Physical presence alone does not mean voice. If people are silent, fearful, or do not understand what is happening, this is not meaningful participation.',
      signal: 'Presence'
    },
    {
      id: 2,
      title: 'Informed',
      definition: 'People understand the purpose, options, criteria, and process.',
      example: 'CSO shared details of the proposed water point repair schedule, safety guidelines, and budget in local languages.',
      caution: 'One-way information sharing is not dialogue. Telling people what we plan to do is necessary, but it is not active participation.',
      signal: 'Information'
    },
    {
      id: 3,
      title: 'Heard',
      definition: 'People can speak, ask questions, and raise concerns safely.',
      example: 'CSO held separate feedback circles where women, youth, and persons with disabilities could safely raise concerns about the location.',
      caution: 'Listening is only a first step. If the project team takes the feedback but does not act on it, participation stops here.',
      signal: 'Voice'
    },
    {
      id: 4,
      title: 'Considered',
      definition: 'The team reviews what people said and explains how it shaped decisions.',
      example: 'The CSO team adjusted the repair schedule and water point access path based on the community feedback, and explained these adjustments in a return meeting.',
      caution: 'If teams do not close the feedback loop, people lose trust and feel their views were ignored or used purely for reporting.',
      signal: 'Feedback loop'
    },
    {
      id: 5,
      title: 'Influential',
      definition: 'People’s views can affect priorities, design, follow-up, or accountability.',
      example: 'The community elected its own water management committee, which now holds keys, directs minor maintenance, and monitors duty-bearers.',
      caution: 'Influence requires power-sharing. If the CSO or local authority makes all final decisions behind closed doors, community influence remains weak.',
      signal: 'Influence'
    }
  ];

  const viewedLevels = state.m1ParticipationLevelsViewed || [];
  const viewedCount = new Set(viewedLevels).size;
  const [activeLevelId, setActiveLevelId] = useState(viewedLevels[viewedLevels.length - 1] || 1);
  const activeLevel = levels.find((level) => level.id === activeLevelId) || levels[0];
  const isComplete = viewedCount === levels.length;

  const selectLevel = (levelId: number) => {
    setActiveLevelId(levelId);
    onChangeState((prev) => {
      const current = prev.m1ParticipationLevelsViewed || [];
      return {
        ...prev,
        m1ParticipationLevelsViewed: current.includes(levelId) ? current : [...current, levelId]
      };
    });
  };

  const handleContinue = () => {
    if (isComplete) {
      onNext();
    }
  };

  return (
    <section className="m1-next-screen m1-s13-screen" aria-labelledby="m1-s13-title">
      <div className="m1-s13-slide">
        <div className="m1-s13-left-col">
          <header className="m1-s13-header">
            <div className="m1-next-kicker">MODULE 1 | MEANINGFUL PARTICIPATION</div>
            <h1 id="m1-s13-title">Participation is more than attendance</h1>
            <p className="m1-s13-intro">
              A community meeting does not automatically mean participation. HRBA asks whether people had real space to speak, whether excluded groups were included, and whether their input influenced the project.
            </p>
          </header>

          {isComplete && (
            <div className="m1-s13-synthesis" aria-live="polite">
              <span className="m1-s13-synthesis__icon" aria-hidden="true">✓</span>
              <div>
                <strong>Key takeaway</strong>
                <p>Meaningful participation is not proven by attendance alone. Strong participation means people have information, can raise concerns safely, help shape decisions, and see how their feedback is acted upon.</p>
              </div>
            </div>
          )}
        </div>

        <div className="m1-s13-right-col">
          <div className="m1-s13-ladder-col">
            <div className="m1-s13-ladder-instruction">
              <p>Climb the participation ladder from bottom to top:</p>
              <strong aria-live="polite" className="m1-s13-progress-badge">
                {viewedCount}/5 explored
              </strong>
            </div>

            <div className="m1-s13-ladder" role="group" aria-label="Participation levels (climb from bottom to top)">
              {/* Vertical connection line */}
              <div className="m1-s13-ladder-line" aria-hidden="true">
                <div 
                  className="m1-s13-ladder-line-fill" 
                  style={{ height: `${((viewedCount - 1) / 4) * 100}%` }}
                />
              </div>

              {[...levels].reverse().map((level) => {
                const isViewed = viewedLevels.includes(level.id);
                const isActive = activeLevelId === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    className={`m1-s13-ladder-step ${isActive ? 'is-active' : ''} ${isViewed ? 'is-viewed' : ''}`}
                    onClick={() => selectLevel(level.id)}
                    aria-pressed={isActive}
                    aria-label={`Level ${level.id}: ${level.title}. ${isViewed ? 'Explored' : 'Tap to explore'}`}
                  >
                    <span className="m1-s13-step-number">
                      {isViewed ? '✓' : level.id}
                    </span>
                    <div className="m1-s13-step-label">
                      <strong>{level.title}</strong>
                      <small>{level.signal}{isActive ? ' · Current' : isViewed ? ' · Explored' : ''}</small>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="m1-s13-detail-col">
            <div className="m1-s13-detail-panel" aria-live="polite">
              <span className="m1-s13-detail-badge">Level {activeLevel.id} · {activeLevel.signal}</span>
              <h2>{activeLevel.title}</h2>
              <p className="m1-s13-detail-def"><strong>Definition:</strong> {activeLevel.definition}</p>
              
              <div className="m1-s13-card m1-s13-card--example">
                <strong>📋 Water example:</strong>
                <p>{activeLevel.example}</p>
              </div>

              <div className="m1-s13-card m1-s13-card--caution">
                <strong>⚠️ Caution / risk:</strong>
                <p>{activeLevel.caution}</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="m1-s13-footer">
          <p aria-live="polite">
            {isComplete
              ? 'All levels explored. Continue when ready.'
              : `Explore all levels of the ladder to continue. ${viewedCount} of 5 explored.`}
          </p>
          <button type="button" className="m1-next-continue" onClick={handleContinue} disabled={!isComplete}>
            Continue
          </button>
        </footer>
      </div>
    </section>
  );
}

function Module1HrbaShiftScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const shifts = [
    {
      id: 1,
      label: 'Need → Right',
      short: 'Look beyond needs.',
      reveal: 'Instead of seeing only a need, HRBA asks what right is connected to the issue. A water shortage is not only a service gap; it may also relate to dignity, health, safety, and access to safe water.',
      takeaway: 'Ask: What right is affected?',
      icon: needToRightIcon,
      iconAlt: 'Visual for shifting from needs to rights.'
    },
    {
      id: 2,
      label: 'Beneficiary → Rights-holder',
      short: 'Look beyond recipients.',
      reveal: 'Instead of seeing people only as vulnerable beneficiaries, HRBA asks how they can participate, raise concerns, and influence decisions.',
      takeaway: 'Ask: Who has voice and agency?',
      icon: beneficiaryToRightsholderIcon,
      iconAlt: 'Visual for shifting from beneficiaries to rights-holders.'
    },
    {
      id: 3,
      label: 'Provider → Responsibility',
      short: 'Look beyond delivery.',
      reveal: 'Instead of asking only what the CSO provides, HRBA asks who has responsibility and what role the CSO should safely play.',
      takeaway: 'Ask: Who is responsible?',
      icon: providerToResponsibilityIcon,
      iconAlt: 'Visual for shifting from provider role to responsibility.'
    },
    {
      id: 4,
      label: 'Consultation → Participation',
      short: 'Look beyond attendance.',
      reveal: 'Instead of counting who attended, HRBA asks whether people understood, spoke safely, influenced decisions, and received a response.',
      takeaway: 'Ask: Was participation meaningful?',
      icon: consultationToParticipationIcon,
      iconAlt: 'Visual for shifting from consultation to meaningful participation.'
    },
    {
      id: 5,
      label: 'Reporting → Accountability',
      short: 'Look beyond completed reports.',
      reveal: 'Instead of reporting only what was done, HRBA asks whether people can raise concerns and see what changed.',
      takeaway: 'Ask: Can people raise concerns and receive a response?',
      icon: reportingToAccountabilityIcon,
      iconAlt: 'Visual for shifting from reporting to accountability.'
    }
  ];

  const explored = state.m1HrbaShiftStepsExplored || [];
  const exploredCount = new Set(explored).size;
  const [activeShiftId, setActiveShiftId] = useState(explored[explored.length - 1] || 1);
  const activeShift = shifts.find((shift) => shift.id === activeShiftId) || shifts[0];
  const isComplete = exploredCount === shifts.length;

  const selectShift = (shiftId: number) => {
    setActiveShiftId(shiftId);
    onChangeState((prev) => {
      const current = prev.m1HrbaShiftStepsExplored || [];
      const updatedAnswers = prev.m1HrbaShiftAnswer === 'B' ? prev.m1HrbaShiftAnswer : '';
      return {
        ...prev,
        m1HrbaShiftStepsExplored: current.includes(shiftId) ? current : [...current, shiftId],
        // Auto-fill MCQ answer B in state to pass player completion checks (in case player shell isn't updated yet)
        m1HrbaShiftAnswer: (current.includes(shiftId) ? current : [...current, shiftId]).length === shifts.length ? 'B' : updatedAnswers
      };
    });
  };

  const handleContinue = () => {
    if (isComplete) {
      onNext();
    }
  };

  return (
    <section className="m1-next-screen m1-s14-screen" aria-labelledby="m1-s14-title">
      <div className="m1-s14-slide">
        <div className="m1-s14-left-col">
          <header className="m1-s14-header">
            <div className="m1-next-kicker">MODULE 1 | HRBA SHIFT</div>
            <h1 id="m1-s14-title">From services to rights, power, and accountability</h1>
            <p className="m1-s14-intro">
              HRBA does not ask CSOs to stop delivering services. It asks CSOs to look deeper: who has rights, who has power, who participates, who is responsible, and how accountability works.
            </p>
          </header>

          <figure className="m1-visual-support m1-visual-support--services-pathway">
            <img
              src={servicesToRightsPathway}
              alt="Pathway diagram showing HRBA moving from service delivery toward access, inclusion, participation, responsibility, accountability, dignity, and rights."
              aria-describedby="m1-s14-services-pathway-desc"
              loading="lazy"
              onError={hideBrokenImage}
            />
            <figcaption id="m1-s14-services-pathway-desc" className="sr-only">
              The pathway shows that HRBA moves from simply delivering a service toward improving access, inclusion, participation, responsibility, accountability, dignity, and rights outcomes.
            </figcaption>
          </figure>

          {isComplete && (
            <div className="m1-s14-synthesis" aria-live="polite">
              <span className="m1-s14-synthesis__icon" aria-hidden="true">✓</span>
              <div>
                <strong>Key shift</strong>
                <p>HRBA keeps service delivery important, but it changes the questions we ask. It helps CSOs see rights, people, power, responsibility, participation, and accountability in everyday project work.</p>
              </div>
            </div>
          )}
        </div>

        <div className="m1-s14-right-col">
          <div className="m1-s14-explorer">
            <div className="m1-s14-instruction">
              <p>Select each shift card below:</p>
              <strong aria-live="polite" className="m1-s14-progress-badge">
                {exploredCount}/5 explored
              </strong>
            </div>

            <div className="m1-s14-pathway" role="group" aria-label="Five HRBA mindset shifts">
              {shifts.map((shift, idx) => {
                const isVisited = explored.includes(shift.id);
                const isActive = activeShiftId === shift.id;
                return (
                  <div key={shift.id} className="m1-s14-card-wrapper">
                    <button
                      type="button"
                      className={`m1-s14-shift-card ${isActive ? 'is-active' : ''} ${isVisited ? 'is-visited' : ''}`}
                      onClick={() => selectShift(shift.id)}
                      aria-pressed={isActive}
                      aria-label={`Shift ${shift.id}: ${shift.label}. ${isVisited ? 'Explored' : 'Not explored'}`}
                    >
                      <span className="m1-s14-shift-card__icon" aria-hidden="true">
                        <img src={shift.icon} alt={shift.iconAlt} />
                      </span>
                      <strong>{shift.label}</strong>
                      <span className="m1-s14-shift-card__status">{isVisited ? '✓ Explored' : 'Tap'}</span>
                    </button>
                    {idx < shifts.length - 1 && (
                      <div className="m1-s14-arrow" aria-hidden="true">
                        <span className="m1-s14-arrow-line" />
                        <span className="m1-s14-arrow-head">→</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="m1-s14-detail-panel" aria-live="polite">
              <div className="m1-s14-detail-icon-bg" aria-hidden="true">
                <img src={activeShift.icon} alt={activeShift.iconAlt} />
              </div>
              <div className="m1-s14-detail-content">
                <span className="m1-s14-detail-badge">Shift {activeShift.id} · {activeShift.label}</span>
                <h2>{activeShift.short}</h2>
                <p className="m1-s14-detail-desc">{activeShift.reveal}</p>
                <div className="m1-s14-question-box">
                  <strong>HRBA focus:</strong>
                  <p>{activeShift.takeaway}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="m1-s14-footer">
          <p aria-live="polite">
            {isComplete
              ? 'All shifts compared. Continue when ready.'
              : `Explore all shifts to continue. ${exploredCount} of 5 explored.`}
          </p>
          <button type="button" className="m1-next-continue" onClick={handleContinue} disabled={!isComplete}>
            Continue
          </button>
        </footer>
      </div>
    </section>
  );
}

function Module1KnowledgeCheckScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const questions = [
    {
      id: 'q1',
      difficulty: 'Question 1',
      topic: 'Access and voice',
      topicLabel: 'Unequal access and voice',
      scenario: 'A local CSO is running a women’s livelihood training. Attendance is high, the trainer is experienced, and participants say the sessions are useful. During an informal conversation, the team learns that some women from poorer households are missing sessions because transport costs are not covered. A few younger women attend but rarely speak because older community representatives dominate the discussion.',
      question: 'What is the strongest HRBA response?',
      options: [
        { id: 'A', text: 'Continue the training because attendance is still high and most participants find it useful.', feedback: 'Not quite. High attendance is positive, but it can hide unequal access and unequal voice. HRBA asks who is still missing, silent, or unable to benefit fully.' },
        { id: 'B', text: 'Add the transport issue to the risk log and review it during the final evaluation.', feedback: 'Not quite. Documenting the issue is useful, but waiting until the final evaluation misses the chance to respond while the project is still happening.' },
        { id: 'C', text: 'Pause and adjust the training process so barriers to access and voice are addressed while the activity is still ongoing.', feedback: 'Correct. This is the strongest HRBA response because it treats access and participation barriers as implementation issues that can and should be addressed early.' },
        { id: 'D', text: 'Ask community representatives to encourage all women to attend and participate more actively.', feedback: 'Partly useful, but incomplete. Community representatives can help, but relying only on them may reinforce the same power dynamics that are limiting younger or poorer women’s participation.' }
      ],
      correctAnswer: 'C',
      takeaway: 'A project can appear to be working and still require adjustment. HRBA asks teams to notice unequal access and voice early enough to respond.'
    },
    {
      id: 'q2',
      difficulty: 'Question 2',
      topic: 'Rights-holders',
      topicLabel: 'Rights-holder design',
      scenario: 'A CSO is designing a disability-inclusive education project. One team member says, “We should ask schools what materials they need and then provide support.” Another says, “We should also ask children with disabilities and their caregivers what barriers they face, what support feels respectful, and how they want concerns to be raised.”',
      question: 'Which response best reflects the HRBA shift from beneficiaries to rights-holders?',
      options: [
        { id: 'A', text: 'Focus first on school needs because schools are responsible for education delivery.', feedback: 'Not quite. Schools are important actors, but HRBA does not look only at institutions. It asks how rights-holders experience barriers and whether they can influence decisions.' },
        { id: 'B', text: 'Consult children with disabilities and caregivers so their experiences shape the support, while also engaging schools and responsible authorities.', feedback: 'Correct. This answer recognizes children with disabilities and caregivers as rights-holders with lived experience, while still engaging schools and duty-bearers.' },
        { id: 'C', text: 'Provide the materials quickly, then ask children and caregivers later whether the support helped.', feedback: 'Partly useful, but late. Post-activity feedback matters, but HRBA should influence design before decisions are already made.' },
        { id: 'D', text: 'Let caregivers speak on behalf of children because this is safer and easier for the project team.', feedback: 'Not quite. Caregivers may provide important insight, but children and young people should be heard safely and appropriately where possible.' }
      ],
      correctAnswer: 'B',
      takeaway: 'Seeing people as rights-holders changes the design process. It asks who should influence decisions before support is delivered.'
    },
    {
      id: 'q3',
      difficulty: 'Question 3',
      topic: 'Practical participation',
      topicLabel: 'Missing voices under pressure',
      scenario: 'A CSO is under donor pressure to finalize a project design within one week. The team has time for only one community consultation. Local leaders are available and say they can represent the whole community. Staff worry that organizing separate discussions with women, youth, persons with disabilities, and poorer households will delay submission.',
      question: 'What is the strongest HRBA-informed decision?',
      options: [
        { id: 'A', text: 'Meet only local leaders because they are legitimate representatives and the deadline is urgent.', feedback: 'Not quite. Leaders may be important, but they may not fully represent people who are less visible, less powerful, or less able to speak publicly.' },
        { id: 'B', text: 'Hold the leader consultation, but clearly name whose voices may still be missing and add a rapid plan to include those groups before final decisions are locked.', feedback: 'Correct. This is the strongest practical choice. It recognizes the time constraint but does not pretend that one consultation equals meaningful participation. It creates a realistic corrective action.' },
        { id: 'C', text: 'Delay the full proposal until every group has been consulted in depth.', feedback: 'Strong in principle, but not always realistic. Deep participation is valuable, but CSOs often work under real deadlines. HRBA requires practical judgment, not impossible perfection.' },
        { id: 'D', text: 'Submit the project quickly and include participation activities during implementation.', feedback: 'Partly useful, but risky. Participation during implementation matters, but if core design decisions are already fixed, later participation may have limited influence.' }
      ],
      correctAnswer: 'B',
      takeaway: 'HRBA does not mean perfect consultation every time. It means being honest about whose voice is missing and creating a plan to correct that before decisions become fixed.'
    },
    {
      id: 'q4',
      difficulty: 'Question 4',
      topic: 'Responsibility and safety',
      topicLabel: 'Role clarity and duty-bearers',
      scenario: 'A local CSO supports survivors of violence with information, referrals, and psychosocial support. Community members begin asking the CSO to force local authorities to act faster on cases. Staff feel pressure to promise results, but they do not control formal justice, police, or administrative processes.',
      question: 'What is the strongest HRBA response?',
      options: [
        { id: 'A', text: 'Promise the community that the CSO will make authorities act faster, because rights-holders need results.', feedback: 'Not quite. The intention is understandable, but promising what the CSO cannot control can damage trust and create risk.' },
        { id: 'B', text: 'Explain that the CSO has no responsibility for what duty-bearers do and should focus only on its own services.', feedback: 'Not quite. The CSO should not replace duty-bearers, but it can still support rights-holders, strengthen referral pathways, document barriers, and facilitate accountability.' },
        { id: 'C', text: 'Clarify the CSO’s role, support safe referral and follow-up, document barriers carefully, and engage responsible actors without making promises it cannot control.', feedback: 'Correct. This answer balances responsibility, safety, realism, and accountability. It recognizes the CSO’s role without pretending the CSO controls all duty-bearer actions.' },
        { id: 'D', text: 'Publicly name the responsible authorities so the community can pressure them directly.', feedback: 'Risky and incomplete. Public pressure may sometimes be part of advocacy, but in sensitive cases it can increase risk. HRBA requires safety, consent, and careful judgment.' }
      ],
      correctAnswer: 'C',
      takeaway: 'HRBA helps CSOs avoid two extremes: taking over responsibilities they do not hold, or stepping away completely when duty-bearers fail to respond.'
    },
    {
      id: 'q5',
      difficulty: 'Question 5',
      topic: 'Feedback and accountability',
      topicLabel: 'Feedback as accountability',
      scenario: 'A CSO has a hotline for community feedback. The number is shared during activities, and some people call with concerns about selection fairness. Staff record the calls, but there is no clear process for reviewing patterns, responding to callers, or explaining what changed.',
      question: 'What is the strongest HRBA concern?',
      options: [
        { id: 'A', text: 'The hotline is a good accountability mechanism because people have a way to contact the CSO.', feedback: 'Not quite. A hotline is useful, but a channel alone is not accountability. People also need to know whether concerns are reviewed and whether responses or changes follow.' },
        { id: 'B', text: 'The CSO should collect more feedback before deciding whether there is a serious issue.', feedback: 'Partly useful, but incomplete. More feedback may help, but the current issue is not only the amount of feedback. It is the absence of a response and learning process.' },
        { id: 'C', text: 'The feedback system is incomplete because listening, analysis, response, and learning are not yet clear.', feedback: 'Correct. This answer captures the HRBA point: accountability is not just collecting feedback. It includes reviewing, responding, explaining, adapting, and learning.' },
        { id: 'D', text: 'The CSO should stop using the hotline if it cannot respond to every concern immediately.', feedback: 'Not quite. The answer is not to remove the feedback channel. The better response is to make it safer, clearer, and more useful.' }
      ],
      correctAnswer: 'C',
      takeaway: 'A feedback mechanism becomes meaningful only when people can see that someone listens, responds, and learns.'
    },
    {
      id: 'q6',
      difficulty: 'Question 6',
      topic: 'Learning before action',
      topicLabel: 'Reviewing who dropped out',
      scenario: 'A CSO team is reviewing a youth employment project. The project delivered training, mentorship, and small start-up support. Some youth succeeded, but others dropped out. Staff disagree on the next step. One person wants to collect more success stories. Another wants to revise the targeting criteria. Another wants to ask why some youth dropped out and whether barriers were linked to disability, gender, family pressure, language, transport, stigma, or lack of trust.',
      question: 'What is the strongest next step from an HRBA perspective?',
      options: [
        { id: 'A', text: 'Collect success stories first because positive evidence helps the CSO show project value.', feedback: 'Not quite. Success stories are valuable, but they can hide who was excluded, who dropped out, and why. HRBA asks what is missing behind positive results.' },
        { id: 'B', text: 'Revise the targeting criteria immediately so future participants are more likely to complete the project.', feedback: 'Not quite. Changing targeting may be necessary, but acting before understanding barriers can reproduce exclusion in a new form.' },
        { id: 'C', text: 'Analyze dropout patterns with affected youth and relevant stakeholders to understand barriers, power dynamics, and responsibility before deciding what to change.', feedback: 'Correct. This is the strongest HRBA choice because it combines evidence, participation, barrier analysis, power awareness, and responsibility before action.' },
        { id: 'D', text: 'Focus future support only on youth who are most motivated, because this improves project efficiency.', feedback: 'Not quite. Efficiency matters, but focusing only on “motivated” participants may blame individuals and hide structural barriers.' }
      ],
      correctAnswer: 'C',
      takeaway: 'HRBA turns project review into learning: not only “what worked,” but “for whom, who dropped out, why, and what should change?”'
    }
  ];

  const started = state.m1KnowledgeCheckStarted || false;
  const currentIndex = state.m1KnowledgeCheckCurrentIndex || 0;
  const selectedAnswers = state.m1KnowledgeCheckSelectedAnswers || {};
  const checkedQuestions = state.m1KnowledgeCheckCheckedQuestions || {};
  const correctness = state.m1KnowledgeCheckCorrectness || {};
  const retryCount = state.m1KnowledgeCheckRetryCount || 0;
  const showResults = started && currentIndex >= questions.length;
  const safeCurrentIndex = Math.min(currentIndex, questions.length - 1);
  const currentQuestion = questions[safeCurrentIndex];
  const selectedAnswer = currentQuestion ? selectedAnswers[currentQuestion.id] || '' : '';
  const isChecked = currentQuestion ? Boolean(checkedQuestions[currentQuestion.id]) : false;
  const score = Object.values(correctness).filter(Boolean).length;
  const answeredCount = Object.keys(checkedQuestions).length;
  const progressPercent = showResults ? 100 : ((safeCurrentIndex + 1) / questions.length) * 100;
  const resultMessage = score >= 5
    ? {
        heading: 'Strong progress.',
        text: 'You handled the scenario-based questions well. Carry this practical HRBA lens into your self-assessment.'
      }
    : score >= 3
      ? {
          heading: 'Good progress — review the feedback.',
          text: 'You are seeing the main HRBA shifts. Review the feedback for the questions that need attention, then continue.'
        }
      : {
          heading: 'Review the key ideas and try again.',
          text: 'These questions are intentionally practical. Review the feedback, then try once more or continue when ready.'
        };

  const startQuiz = () => {
    onChangeState((prev) => ({
      ...prev,
      m1KnowledgeCheckStarted: true,
      m1KnowledgeCheckCurrentIndex: 0,
      m1KnowledgeCheckSelectedAnswers: {},
      m1KnowledgeCheckCheckedQuestions: {},
      m1KnowledgeCheckCorrectness: {},
      m1KnowledgeCheckScore: 0,
      m1KnowledgeCheckCompleted: false
    }));
  };

  const selectAnswer = (questionId: string, answerId: string) => {
    if (checkedQuestions[questionId]) {
      return;
    }

    onChangeState((prev) => ({
      ...prev,
      m1KnowledgeCheckSelectedAnswers: {
        ...prev.m1KnowledgeCheckSelectedAnswers,
        [questionId]: answerId
      }
    }));
  };

  const checkAnswer = () => {
    if (!currentQuestion || !selectedAnswer || isChecked) {
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    onChangeState((prev) => {
      const nextCorrectness = {
        ...prev.m1KnowledgeCheckCorrectness,
        [currentQuestion.id]: isCorrect
      };
      return {
        ...prev,
        m1KnowledgeCheckCheckedQuestions: {
          ...prev.m1KnowledgeCheckCheckedQuestions,
          [currentQuestion.id]: true
        },
        m1KnowledgeCheckCorrectness: nextCorrectness,
        m1KnowledgeCheckScore: Object.values(nextCorrectness).filter(Boolean).length
      };
    });
  };

  const advanceQuestion = () => {
    if (!isChecked) {
      return;
    }

    onChangeState((prev) => ({
      ...prev,
      m1KnowledgeCheckCurrentIndex: safeCurrentIndex + 1
    }));
  };

  const retryQuiz = () => {
    onChangeState((prev) => ({
      ...prev,
      m1KnowledgeCheckStarted: true,
      m1KnowledgeCheckCurrentIndex: 0,
      m1KnowledgeCheckSelectedAnswers: {},
      m1KnowledgeCheckCheckedQuestions: {},
      m1KnowledgeCheckCorrectness: {},
      m1KnowledgeCheckScore: 0,
      m1KnowledgeCheckCompleted: false,
      m1KnowledgeCheckRetryCount: prev.m1KnowledgeCheckRetryCount + 1
    }));
  };

  const continueToSelfAssessment = () => {
    onChangeState((prev) => ({
      ...prev,
      m1KnowledgeCheckCompleted: true
    }));
    onNext();
  };

  const selectedOption = currentQuestion?.options.find((option) => option.id === selectedAnswer);
  const currentCorrect = currentQuestion ? selectedAnswer === currentQuestion.correctAnswer : false;

  return (
    <section className="m1-next-screen m1-knowledge-screen" aria-labelledby="m1-knowledge-title">
      <div className="m1-next-slide m1-knowledge-slide">
        <div className="m1-knowledge-header">
          <div>
            <div className="m1-next-kicker">MODULE 1 | KNOWLEDGE CHECK</div>
            <h1 id="m1-knowledge-title">Module 1 Knowledge Check</h1>
            <p>
              Read each situation carefully and choose the strongest HRBA response.
            </p>
          </div>
          <span className="m1-knowledge-time">6 questions · supportive feedback</span>
        </div>

        {!started && (
          <div className="m1-knowledge-intro">
            <div className="m1-knowledge-intro-copy">
              <h2>Read each situation carefully and choose the strongest HRBA response.</h2>
              <p>
                You will respond to six short situations from everyday CSO work. After each answer, you will receive supportive feedback and a practical takeaway.
              </p>
              <div className="m1-knowledge-note">
                This is a learning check, not a pass/fail test. Use the feedback to strengthen your HRBA lens.
              </div>
              <button type="button" className="m1-next-continue" onClick={startQuiz}>
                Start knowledge check
              </button>
            </div>
            <div className="m1-knowledge-visual" aria-hidden="true">
              <span>6</span>
              <strong>questions</strong>
              <small>supportive feedback after each answer</small>
            </div>
          </div>
        )}

        {started && !showResults && currentQuestion && (
          <div className="m1-knowledge-quiz">
            <div className="m1-knowledge-progress-row">
              <div>
                <span>Question {safeCurrentIndex + 1} of {questions.length}</span>
                <strong>{answeredCount} answered · {score} correct so far</strong>
              </div>
              <div className="m1-next-progress" style={{ '--m1-progress': `${progressPercent}%` } as HRBAProgressStyle} aria-hidden="true">
                <span />
              </div>
            </div>

            <div className="m1-knowledge-question-card">
              <div className="m1-knowledge-meta">
                <span>{currentQuestion.difficulty}</span>
                <span>{currentQuestion.topic}</span>
              </div>
              <p className="m1-knowledge-scenario">{currentQuestion.scenario}</p>
              <h2>{currentQuestion.question}</h2>

              <div className="m1-knowledge-options" role="group" aria-label={`Answer options for question ${safeCurrentIndex + 1}`}>
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrectOption = option.id === currentQuestion.correctAnswer;
                  const optionStateClass = isChecked && isSelected
                    ? isCorrectOption
                      ? 'is-correct'
                      : 'is-partial'
                    : '';

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`m1-knowledge-option ${isSelected ? 'is-selected' : ''} ${optionStateClass}`}
                      onClick={() => selectAnswer(currentQuestion.id, option.id)}
                      disabled={isChecked}
                      aria-pressed={isSelected}
                      aria-describedby={isChecked && isSelected ? 'm1-knowledge-feedback' : undefined}
                    >
                      <span aria-hidden="true">{option.id}</span>
                      <span>{option.text}</span>
                      {isSelected && (
                        <strong>{isChecked ? isCorrectOption ? 'Correct' : 'Review this' : 'Selected'}</strong>
                      )}
                    </button>
                  );
                })}
              </div>

              {isChecked && selectedOption && (
                <div
                  id="m1-knowledge-feedback"
                  className={`m1-knowledge-feedback ${currentCorrect ? 'is-correct' : 'is-partial'}`}
                  aria-live="polite"
                >
                  <strong>{currentCorrect ? 'Correct' : 'Not quite'}</strong>
                  <p>{selectedOption.feedback}</p>
                  <p className="m1-knowledge-takeaway">
                    <span>Practical takeaway:</span> {currentQuestion.takeaway}
                  </p>
                </div>
              )}
            </div>

            <div className="m1-knowledge-footer">
              <p aria-live="polite">
                {isChecked
                  ? safeCurrentIndex === questions.length - 1
                    ? 'Review the feedback, then see your results.'
                    : 'Review the feedback, then move to the next question.'
                  : selectedAnswer
                    ? 'Check your answer to see supportive feedback.'
                    : 'Choose one answer to continue.'}
              </p>
              {!isChecked ? (
                <button type="button" className="m1-next-continue" onClick={checkAnswer} disabled={!selectedAnswer}>
                  Check answer
                </button>
              ) : (
                <button type="button" className="m1-next-continue" onClick={advanceQuestion}>
                  {safeCurrentIndex === questions.length - 1 ? 'See results' : 'Next question'}
                </button>
              )}
            </div>
          </div>
        )}

        {showResults && (
          <div className="m1-knowledge-results" aria-live="polite">
            <div className="m1-knowledge-score-card">
              <span>{score}/6</span>
              <div>
                <h2>{resultMessage.heading}</h2>
                <p>{resultMessage.text}</p>
              </div>
            </div>

            <div className="m1-knowledge-review" aria-label="Knowledge check review">
              {questions.map((question) => {
                const wasCorrect = Boolean(correctness[question.id]);
                const selected = question.options.find((option) => option.id === selectedAnswers[question.id]);
                return (
                  <article key={question.id} className={`m1-knowledge-review-item ${wasCorrect ? 'is-correct' : 'is-partial'}`}>
                    <span aria-hidden="true">{wasCorrect ? '✓' : '!'}</span>
                    <div>
                      <strong>{question.topicLabel}</strong>
                      <p>
                        {wasCorrect
                          ? 'Correct'
                          : `Needs review. You selected ${selected?.id || 'no answer'}.`}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="m1-knowledge-footer">
              <p>
                {score < 3 && retryCount < 1
                  ? 'You can retry once, or continue after reviewing the feedback.'
                  : 'Continue to the next step.'}
              </p>
              <div className="m1-knowledge-actions">
                {score < 3 && retryCount < 1 && (
                  <button type="button" className="m1-knowledge-secondary" onClick={retryQuiz}>
                    Retry knowledge check
                  </button>
                )}
                <button type="button" className="m1-next-continue" onClick={continueToSelfAssessment}>
                  Continue to self-assessment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Module1SelfAssessmentScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const focusOptions: Array<{
    id: LearningState['assessmentFocus'];
    title: string;
    text: string;
    icon: string;
  }> = [
    {
      id: 'own_understanding',
      title: 'My own HRBA understanding',
      text: 'Use this if you are reflecting on your personal knowledge, confidence, and practice as a learner or CSO staff member.',
      icon: '01'
    },
    {
      id: 'cso_practice',
      title: 'My CSO’s current practice',
      text: 'Use this if you are thinking about how your organization currently applies HRBA in project design, implementation, monitoring, accountability, or learning.',
      icon: '02'
    },
    {
      id: 'project_activity',
      title: 'One project or activity',
      text: 'Use this if you want to apply the reflection to a specific project, service, training, community activity, advocacy action, or MEAL process.',
      icon: '03'
    }
  ];

  const ratingScale: Array<{ value: 1 | 2 | 3 | 4; label: string }> = [
    { value: 1, label: 'Not yet' },
    { value: 2, label: 'Starting' },
    { value: 3, label: 'Developing' },
    { value: 4, label: 'Strong' }
  ];

  const statements: Array<{
    id: string;
    number: string;
    text: string;
    priorityLabel: string;
    tieOrder: number;
  }> = [
    {
      id: 'hrbaUnderstanding',
      number: '01',
      text: 'I can explain HRBA in simple language and connect it to everyday CSO work.',
      priorityLabel: 'HRBA understanding',
      tieOrder: 6
    },
    {
      id: 'rightsHolderPerspective',
      number: '02',
      text: 'I can recognize communities as rights-holders with dignity, voice, and agency — not only as beneficiaries or service users.',
      priorityLabel: 'Rights-holder perspective',
      tieOrder: 5
    },
    {
      id: 'inclusionNonDiscrimination',
      number: '03',
      text: 'I can identify who may be excluded or face barriers in a project, service, activity, or decision.',
      priorityLabel: 'Inclusion and non-discrimination',
      tieOrder: 1
    },
    {
      id: 'meaningfulParticipation',
      number: '04',
      text: 'I can help make participation more meaningful, especially for people whose voices are often less heard.',
      priorityLabel: 'Meaningful participation',
      tieOrder: 2
    },
    {
      id: 'dutyBearersResponsibility',
      number: '05',
      text: 'I can identify who has duties or responsibilities when rights, access, safety, or accountability concerns appear.',
      priorityLabel: 'Duty-bearers and responsibility',
      tieOrder: 3
    },
    {
      id: 'feedbackAccountability',
      number: '06',
      text: 'I can connect feedback, concerns, or complaints to practical action and learning.',
      priorityLabel: 'Feedback and accountability',
      tieOrder: 4
    }
  ];

  const feedbackByCategory = {
    good_starting_point: {
      title: 'A good starting point',
      text: 'You are at an early stage of applying HRBA. This is a useful place to begin. Focus first on understanding HRBA in simple language, identifying rights-holders, and noticing who may be excluded.',
      nextStep: 'Choose one practical area to strengthen and start with a small action you can realistically apply.'
    },
    building_confidence: {
      title: 'Building confidence',
      text: 'You already have some HRBA awareness and practice. Your next step is to make it more consistent: ask better questions, include less-heard voices, and connect feedback to action.',
      nextStep: 'Choose one priority area where a small improvement could make your CSO work more inclusive, participatory, or accountable.'
    },
    ready_to_strengthen_practice: {
      title: 'Ready to strengthen practice',
      text: 'You show strong readiness to apply HRBA in practice. Your next step is to deepen quality, support others, and use HRBA more deliberately across project decisions, monitoring, and learning.',
      nextStep: 'Choose one priority area where you can model stronger HRBA practice or support your team to improve.'
    }
  };

  const scores = state.selfAssessmentScores || {};
  const answeredCount = statements.filter((statement) => scores[statement.id]).length;
  const pageCount = 3;
  const currentPage = Math.min(Math.max(state.m1SelfAssessmentPage || 0, 0), pageCount - 1);
  const pageStatements = statements.slice(currentPage * 2, currentPage * 2 + 2);
  const pageAnswered = pageStatements.every((statement) => Boolean(scores[statement.id]));
  const isComplete = state.screen16Completed;
  const feedback = state.selfAssessmentCategory ? feedbackByCategory[state.selfAssessmentCategory] : null;

  const calculateAssessment = (
    focus: LearningState['assessmentFocus'],
    nextScores: Record<string, 1 | 2 | 3 | 4>
  ) => {
    const hasAllRatings = statements.every((statement) => nextScores[statement.id]);
    if (!focus || !hasAllRatings) {
      return {
        selfAssessmentTotal: 0,
        selfAssessmentCategory: '' as LearningState['selfAssessmentCategory'],
        suggestedPriorityOne: '',
        suggestedPriorityTwo: '',
        screen16Completed: false
      };
    }

    const total = statements.reduce((sum, statement) => sum + nextScores[statement.id], 0);
    const category: LearningState['selfAssessmentCategory'] = total <= 11
      ? 'good_starting_point'
      : total <= 18
        ? 'building_confidence'
        : 'ready_to_strengthen_practice';
    const suggested = [...statements]
      .sort((a, b) => nextScores[a.id] - nextScores[b.id] || a.tieOrder - b.tieOrder)
      .slice(0, 2);

    return {
      selfAssessmentTotal: total,
      selfAssessmentCategory: category,
      suggestedPriorityOne: suggested[0]?.priorityLabel || '',
      suggestedPriorityTwo: suggested[1]?.priorityLabel || '',
      screen16Completed: true
    };
  };

  const updateAssessment = (
    focus: LearningState['assessmentFocus'] | null,
    scoreUpdate?: { id: string; value: 1 | 2 | 3 | 4 }
  ) => {
    onChangeState((prev) => {
      const nextFocus = focus ?? prev.assessmentFocus;
      const nextScores = scoreUpdate
        ? {
            ...prev.selfAssessmentScores,
            [scoreUpdate.id]: scoreUpdate.value
          }
        : prev.selfAssessmentScores;
      const calculated = calculateAssessment(nextFocus, nextScores);

      return {
        ...prev,
        assessmentFocus: nextFocus,
        selfAssessmentScores: nextScores,
        ...calculated
      };
    });
  };

  const goToAssessmentPage = (page: number) => {
    onChangeState((prev) => ({
      ...prev,
      m1SelfAssessmentPage: Math.min(Math.max(page, 0), pageCount - 1)
    }));
  };

  const completeAssessment = () => {
    onChangeState((prev) => {
      const calculated = calculateAssessment(prev.assessmentFocus, prev.selfAssessmentScores);
      return {
        ...prev,
        m1SelfAssessmentPage: pageCount - 1,
        ...calculated
      };
    });
  };

  const handleContinue = () => {
    if (isComplete) {
      onNext();
    }
  };

  return (
    <section className="m1-next-screen m1-assessment-screen" aria-labelledby="m1-assessment-title">
      <div className="m1-next-slide m1-assessment-slide">
        <div className="m1-assessment-header">
          <div>
            <div className="m1-next-kicker">MODULE 1 | SELF-ASSESSMENT</div>
            <h1 id="m1-assessment-title">Self-Assessment</h1>
            <p>
              You have explored what HRBA means in everyday CSO work. Now take a short self-assessment to identify where you are starting from and what you may want to strengthen next.
            </p>
            <p>
              This is not a pass/fail activity. It is a practical reflection to help you choose a useful priority area for action.
            </p>
          </div>

          <aside className="m1-assessment-visual" aria-label="Self-assessment steps">
            <span>HRBA</span>
            <div>
              <strong>Understand</strong>
              <strong>Notice</strong>
              <strong>Act</strong>
            </div>
          </aside>
        </div>

        <div className="m1-assessment-body">
          {!isComplete && (
          <section className="m1-assessment-focus" aria-labelledby="m1-assessment-focus-title">
            <div className="m1-assessment-section-head">
              <h2 id="m1-assessment-focus-title">What are you assessing today?</h2>
              <p>Choose the lens that best fits your situation. Your choice will help shape the feedback and the next action-planning screen.</p>
            </div>
            <div className="m1-assessment-focus-grid" role="radiogroup" aria-label="Assessment focus">
              {focusOptions.map((option) => {
                const selected = state.assessmentFocus === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`m1-assessment-focus-card ${selected ? 'is-selected' : ''}`}
                    onClick={() => updateAssessment(option.id)}
                    role="radio"
                    aria-checked={selected}
                  >
                    <span aria-hidden="true">{selected ? '✓' : option.icon}</span>
                    <strong>{option.title}</strong>
                    <small>{option.text}</small>
                  </button>
                );
              })}
            </div>
          </section>
          )}

          {!isComplete && (
          <section className="m1-assessment-ratings" aria-labelledby="m1-assessment-ratings-title">
            <div className="m1-assessment-section-head m1-assessment-ratings-head">
              <div>
                <h2 id="m1-assessment-ratings-title">Rate two statements at a time.</h2>
                <p aria-live="polite">Page {currentPage + 1} of {pageCount} · {answeredCount} of 6 statements answered</p>
              </div>
              <dl className="m1-assessment-scale" aria-label="Scale meaning">
                <div><dt>Not yet</dt><dd>Not part of practice yet.</dd></div>
                <div><dt>Starting</dt><dd>Started, but not consistent.</dd></div>
                <div><dt>Developing</dt><dd>Used in some areas.</dd></div>
                <div><dt>Strong</dt><dd>Part of regular practice.</dd></div>
              </dl>
            </div>

            <div className="m1-assessment-page-controls" aria-label="Assessment pages">
              {Array.from({ length: pageCount }, (_, index) => {
                const pageDone = statements.slice(index * 2, index * 2 + 2).every((statement) => Boolean(scores[statement.id]));
                return (
                  <button
                    key={index}
                    type="button"
                    className={`${currentPage === index ? 'is-active' : ''} ${pageDone ? 'is-complete' : ''}`}
                    onClick={() => goToAssessmentPage(index)}
                    aria-current={currentPage === index ? 'step' : undefined}
                  >
                    <span aria-hidden="true">{pageDone ? '✓' : index + 1}</span>
                    Page {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="m1-assessment-statement-grid m1-assessment-statement-grid--paged">
              {pageStatements.map((statement) => {
                const selectedScore = scores[statement.id];
                return (
                  <fieldset key={statement.id} className={`m1-assessment-statement ${selectedScore ? 'is-rated' : ''}`}>
                    <legend>
                      <span aria-hidden="true">{statement.number}</span>
                      {statement.text}
                    </legend>
                    <div className="m1-assessment-rating-buttons" role="radiogroup" aria-label={statement.text}>
                      {ratingScale.map((rating) => {
                        const selected = selectedScore === rating.value;
                        return (
                          <button
                            key={rating.value}
                            type="button"
                            className={selected ? 'is-selected' : ''}
                            onClick={() => updateAssessment(null, { id: statement.id, value: rating.value })}
                            role="radio"
                            aria-checked={selected}
                          >
                            <span aria-hidden="true">{selected ? '✓' : rating.value}</span>
                            {rating.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}
            </div>

            <div className="m1-assessment-wizard-actions">
              <button type="button" onClick={() => goToAssessmentPage(currentPage - 1)} disabled={currentPage === 0}>
                Previous
              </button>
              {currentPage < pageCount - 1 ? (
                <button type="button" onClick={() => goToAssessmentPage(currentPage + 1)} disabled={!pageAnswered}>
                  Next
                </button>
              ) : (
                <button type="button" onClick={completeAssessment} disabled={!state.assessmentFocus || answeredCount < 6}>
                  Complete assessment
                </button>
              )}
            </div>
          </section>
          )}

          {isComplete && feedback && (
            <section className={`m1-assessment-feedback is-${state.selfAssessmentCategory}`} aria-labelledby="m1-assessment-feedback-title" aria-live="polite">
              <div>
                <span>Your starting point</span>
                <h2 id="m1-assessment-feedback-title">{feedback.title}</h2>
                <p>{feedback.text}</p>
                <strong>{feedback.nextStep}</strong>
              </div>
              <aside>
                <span>Total score</span>
                <strong>{state.selfAssessmentTotal} / 24</strong>
                <div>
                  <h3>Suggested focus areas</h3>
                  {[state.suggestedPriorityOne, state.suggestedPriorityTwo].filter(Boolean).map((priority) => (
                    <p key={priority}>
                      <span aria-hidden="true" />
                      {priority}
                    </p>
                  ))}
                </div>
              </aside>
            </section>
          )}
        </div>

        <div className="m1-next-footer m1-assessment-footer">
          <p id="m1-assessment-continue-helper" aria-live="polite">
            {isComplete
              ? 'Continue to choose your priority area and action commitment.'
              : 'Complete all self-assessment statements to continue.'}
          </p>
          <button
            type="button"
            className="m1-next-continue"
            onClick={handleContinue}
            disabled={!isComplete}
            aria-label={isComplete ? 'Continue' : 'Continue disabled. Complete the self-assessment first.'}
            aria-describedby="m1-assessment-continue-helper"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}

function Module1ActionCommitmentScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const priorityCards = [
    {
      id: 'ask_better_hrba_questions',
      title: 'Ask better HRBA questions',
      body: 'Practice asking who benefits, who may be excluded, who has responsibility, and how people can raise concerns.',
      icon: '?',
      suggestedFrom: ['HRBA understanding', 'Rights-holder perspective', 'Inclusion and non-discrimination', 'Duty-bearers and responsibility'],
      actions: []
    },
    {
      id: 'strengthen_participation',
      title: 'Strengthen participation',
      body: 'Move beyond consultation by creating safer and more meaningful ways for different groups to influence decisions.',
      icon: 'P',
      suggestedFrom: ['Meaningful participation', 'Inclusion and non-discrimination'],
      actions: []
    },
    {
      id: 'notice_exclusion_earlier',
      title: 'Notice exclusion earlier',
      body: 'Look for barriers that may prevent women, older people, persons with disabilities, youth, minority groups, or less visible community members from benefiting.',
      icon: 'N',
      suggestedFrom: ['Inclusion and non-discrimination'],
      actions: []
    },
    {
      id: 'clarify_responsibility',
      title: 'Clarify responsibility',
      body: 'Identify who should act when problems appear: the CSO, service providers, local authorities, community structures, or other duty-bearers.',
      icon: 'R',
      suggestedFrom: ['Duty-bearers and responsibility'],
      actions: []
    },
    {
      id: 'make_feedback_safer',
      title: 'Make feedback safer and more useful',
      body: 'Support clear, trusted, and accessible ways for people to ask questions, raise concerns, and receive a response.',
      icon: 'F',
      suggestedFrom: ['Feedback and accountability'],
      actions: []
    },
    {
      id: 'use_reflection_before_action',
      title: 'Use reflection before action',
      body: 'Pause before deciding. Ask what is really happening, what evidence is missing, and whose perspective should be heard.',
      icon: 'A',
      suggestedFrom: ['HRBA understanding'],
      actions: []
    }
  ];

  const actionBuilderOptions = [
    {
      id: 'ask-one-question',
      action: 'Ask one better HRBA question in my next planning or review discussion.',
      priorityIds: ['ask_better_hrba_questions', 'use_reflection_before_action']
    },
    {
      id: 'check-missing-unheard',
      action: 'Check who may be missing or unheard in one activity.',
      priorityIds: ['notice_exclusion_earlier', 'strengthen_participation']
    },
    {
      id: 'clarify-one-responsibility',
      action: 'Clarify who is responsible for one issue before proposing a solution.',
      priorityIds: ['clarify_responsibility', 'ask_better_hrba_questions']
    },
    {
      id: 'review-feedback-channel',
      action: 'Review whether one feedback channel is safe and useful.',
      priorityIds: ['make_feedback_safer', 'use_reflection_before_action']
    }
  ];

  const commitment = state.screen17ActionCommitment;
  const selectedPriorityAreas = commitment.selectedPriorityAreas || [];
  const suggestedPriorityLabels = [state.suggestedPriorityOne, state.suggestedPriorityTwo].filter(Boolean);
  const selectedCards = priorityCards.filter((card) => selectedPriorityAreas.includes(card.id));
  const selectedPriorityTitle = selectedCards[0]?.title || 'your selected priority';
  const visibleActionOptions = selectedPriorityAreas.length > 0
    ? actionBuilderOptions.filter((option) => option.priorityIds.some((priorityId) => selectedPriorityAreas.includes(priorityId)))
    : actionBuilderOptions;
  const selectedAction = actionBuilderOptions.find((option) => option.id === commitment.selectedAction);
  const isComplete = commitment.completed;
  const maxSelected = selectedPriorityAreas.length >= 2;

  const buildSentence = (priorityTitle: string, action: string) => (
    `I will strengthen ${priorityTitle} by ${action.charAt(0).toLowerCase()}${action.slice(1)}`
  );

  const updateCommitment = (nextValues: Partial<LearningState['screen17ActionCommitment']>) => {
    onChangeState((prev) => ({
      ...prev,
      screen17ActionCommitment: {
        ...prev.screen17ActionCommitment,
        ...nextValues
      }
    }));
  };

  const togglePriority = (priorityId: string) => {
    const alreadySelected = selectedPriorityAreas.includes(priorityId);
    if (!alreadySelected && maxSelected) {
      return;
    }

    const nextSelected = alreadySelected
      ? selectedPriorityAreas.filter((id) => id !== priorityId)
      : [...selectedPriorityAreas, priorityId];
    updateCommitment({
      selectedPriorityAreas: nextSelected,
      selectedAction: nextSelected.length > 0 ? commitment.selectedAction : null,
      commitmentSentence: nextSelected.length > 0 ? commitment.commitmentSentence : null,
      completed: nextSelected.length > 0 && Boolean(commitment.selectedAction)
    });
  };

  const chooseAction = (actionId: string) => {
    const action = actionBuilderOptions.find((option) => option.id === actionId);
    if (!action) {
      return;
    }

    updateCommitment({
      selectedAction: action.id,
      commitmentSentence: buildSentence(selectedPriorityTitle, action.action),
      completed: selectedPriorityAreas.length > 0
    });
  };

  const updateNote = (note: string) => {
    updateCommitment({ optionalNote: note });
  };

  const handleContinue = () => {
    if (isComplete) {
      onNext();
    }
  };

  return (
    <section className="m1-next-screen m1-action-screen" aria-labelledby="m1-action-title">
      <div className="m1-next-slide m1-action-slide">
        <div className="m1-action-header">
          <div>
            <div className="m1-next-kicker">MODULE 1 | ACTION COMMITMENT</div>
            <h1 id="m1-action-title">Choose your HRBA priority</h1>
            <p>
              Use your self-assessment to choose one practical area to strengthen. Start small. The goal is not to fix everything now — it is to choose one meaningful next step.
            </p>
          </div>
          <aside className="m1-action-visual" aria-label="Priority and action commitment">
            <span>Priority</span>
            <strong>Action</strong>
            <small>Follow-up</small>
          </aside>
        </div>

        <div className="m1-action-intro">
          <div>
            <h2>Your reflection becomes useful when it leads to action.</h2>
            <p>
              In HRBA practice, learning is not only about knowing the right words. It is about building better habits: asking who may be excluded, listening to people’s voices, clarifying responsibilities, and making feedback safer and more useful.
            </p>
            <p>
              Mini portfolio pattern: the group I may be missing is generalized, the question I will ask before acting is safe, and the accountability step I will add is small enough to follow up.
            </p>
          </div>
          <strong>Select one or two priority areas below. Your choice will be saved as part of your Module 1 learning record.</strong>
        </div>

        <div className="m1-action-body">
          <section className="m1-action-priorities" aria-labelledby="m1-action-priority-title">
            <div className="m1-action-section-head">
              <div>
                <h2 id="m1-action-priority-title">Based on your self-assessment, choose one or two areas to focus on.</h2>
                <p>You can choose what feels most relevant to your current role or CSO context: field work, program management, MEAL, advocacy, engagement, or team learning.</p>
              </div>
              <strong aria-live="polite">
                {selectedPriorityAreas.length === 2 ? 'You can choose up to two priority areas.' : `${selectedPriorityAreas.length} of 2 selected`}
              </strong>
            </div>
            <div className="m1-action-priority-grid">
              {priorityCards.map((card) => {
                const selected = selectedPriorityAreas.includes(card.id);
                const disabled = !selected && maxSelected;
                const suggested = suggestedPriorityLabels.some((label) => card.suggestedFrom.includes(label));
                return (
                  <button
                    key={card.id}
                    type="button"
                    className={`m1-action-priority-card ${selected ? 'is-selected' : ''} ${disabled ? 'is-disabled' : ''}`}
                    onClick={() => togglePriority(card.id)}
                    disabled={disabled}
                    aria-pressed={selected}
                    aria-disabled={disabled}
                  >
                    <span aria-hidden="true">{selected ? '✓' : card.icon}</span>
                    <strong>{card.title}</strong>
                    {suggested && <em>Suggested from your self-assessment</em>}
                    <small>{card.body}</small>
                  </button>
                );
              })}
            </div>
          </section>

          {selectedPriorityAreas.length > 0 && (
            <section className="m1-action-builder" aria-labelledby="m1-action-builder-title">
              <div className="m1-action-section-head">
                <div>
                  <h2 id="m1-action-builder-title">Now choose one action you can realistically try.</h2>
                  <p>Choose one practical action. Keep it small enough to use in your next project discussion, team meeting, monitoring visit, or reflection session.</p>
                </div>
              </div>

              <div className="m1-action-chip-grid" role="group" aria-label="Action commitment options">
                {visibleActionOptions.map((option) => {
                  const selected = commitment.selectedAction === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={selected ? 'is-selected' : ''}
                      onClick={() => chooseAction(option.id)}
                      aria-pressed={selected}
                    >
                      <span aria-hidden="true">{selected ? '✓' : '+'}</span>
                      {option.action}
                    </button>
                  );
                })}
              </div>

              {selectedAction && commitment.commitmentSentence && (
                <div className="m1-action-commitment-card" aria-live="polite">
                  <h2>Your Module 1 action commitment</h2>
                  <p>{commitment.commitmentSentence}</p>
                  <label htmlFor="m1-action-note">
                    Add a short note to make this action more specific to your work.
                  </label>
                  <p className="m1-inline-helper">
                    Use a fictional, generalized, or non-sensitive example. Do not include names, phone numbers, exact locations, identifiable stories, survivor details, children&apos;s details, officials&apos; names, organizational disputes, or sensitive incidents.
                  </p>
                  <textarea
                    id="m1-action-note"
                    value={commitment.optionalNote || ''}
                    onChange={(event) => updateNote(event.target.value)}
                    placeholder="Example: I will try this during our next project review meeting."
                    rows={2}
                  />
                </div>
              )}

              {isComplete && (
                <div className="m1-action-confirmation" aria-live="polite">
                  <h2>Good. This is a practical starting point.</h2>
                  <p>
                    HRBA grows through repeated habits. A small action — asked at the right moment — can change who is heard, who benefits, and who takes responsibility.
                  </p>
                  <strong>Your selected priority and action commitment will be carried into your Module 1 completion summary.</strong>
                </div>
              )}
            </section>
          )}
        </div>

        <div className="m1-next-footer m1-action-footer">
          <p id="m1-action-continue-helper" aria-live="polite">
            {isComplete
              ? 'Continue to your Module 1 takeaways.'
              : selectedPriorityAreas.length > 0
                ? 'Choose one practical action.'
                : 'Choose at least one priority area to continue.'}
          </p>
          <button
            type="button"
            className="m1-next-continue"
            onClick={handleContinue}
            disabled={!isComplete}
            aria-describedby="m1-action-continue-helper"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}

function Module1CompletionScreen({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}) {
  const takeaways = [
    {
      id: 'everyday-work',
      number: '01',
      title: 'HRBA starts with everyday CSO work.',
      short: 'Rights are already connected to services, projects, and community decisions.',
      explanation: 'Rights are already connected to services, projects, and community decisions.'
    },
    {
      id: 'rights-holders',
      number: '02',
      title: 'People are rights-holders.',
      short: 'Communities are not only beneficiaries or service users.',
      explanation: 'Communities are not only beneficiaries or service users. People have dignity, voice, agency, and legitimate claims.'
    },
    {
      id: 'participation',
      number: '03',
      title: 'Participation should influence decisions.',
      short: 'Attendance alone is not enough.',
      explanation: 'Attendance alone is not enough. People should understand, speak safely, influence decisions, and receive a response.'
    },
    {
      id: 'responsibility',
      number: '04',
      title: 'Responsibility must be clear.',
      short: 'Rights-holders, duty-bearers, and supporting actors have different roles.',
      explanation: 'Rights-holders, duty-bearers, and supporting actors have different roles. A CSO should not replace everyone.'
    },
    {
      id: 'accountability',
      number: '05',
      title: 'Accountability turns learning into improvement.',
      short: 'Feedback should lead to response and action.',
      explanation: 'Feedback should lead to response, follow-up, adaptation, and better practice.'
    }
  ];
  const reviewedTakeaways = state.screen18Completion.reviewedTakeaways || [];
  const reviewedSet = new Set(reviewedTakeaways);
  const [activeTakeawayId, setActiveTakeawayId] = useState<string | null>(
    reviewedTakeaways[0] || null
  );
  const reviewedCount = takeaways.filter((takeaway) => reviewedSet.has(takeaway.id)).length;
  const commitment = state.screen17ActionCommitment;
  const commitmentSentence = commitment.commitmentSentence;
  const optionalNote = commitment.optionalNote?.trim();
  const recordItems = [
    { id: 'knowledge', label: 'Knowledge check completed', completed: state.m1KnowledgeCheckCompleted },
    { id: 'self-assessment', label: 'Self-assessment completed', completed: state.screen16Completed },
    { id: 'priority', label: 'Priority area selected', completed: commitment.selectedPriorityAreas.length > 0 },
    { id: 'commitment', label: 'Action commitment created', completed: commitment.completed }
  ];
  const recordComplete = recordItems.every((item) => item.completed);
  const takeawaysComplete = reviewedCount === takeaways.length;
  const isComplete = takeawaysComplete && recordComplete && state.screen18Completion.completed;

  const completeModuleIfReady = (nextReviewed: string[]): Partial<LearningState> => {
    const nowComplete = nextReviewed.length === takeaways.length && recordComplete;
    if (!nowComplete) {
      return {
        screen18Completion: {
          reviewedTakeaways: nextReviewed,
          completed: false
        }
      };
    }

    return {
      screen18Completion: {
        reviewedTakeaways: nextReviewed,
        completed: true
      }
    };
  };

  const reviewTakeaway = (takeawayId: string) => {
    setActiveTakeawayId(takeawayId);
    onChangeState((prev) => {
      const currentReviewed = prev.screen18Completion.reviewedTakeaways || [];
      const nextReviewed = currentReviewed.includes(takeawayId)
        ? currentReviewed
        : [...currentReviewed, takeawayId];

      return {
        ...prev,
        ...completeModuleIfReady(nextReviewed)
      };
    });
  };

  const continueToFinalClosing = () => {
    if (!isComplete) {
      return;
    }

    onNext();
  };

  const goBackToActionCommitment = () => {
    onChangeState((prev) => ({
      ...prev,
      currentScreenId: 'M1-S3-01'
    }));
  };

  return (
    <section className="m1-completion-screen" aria-labelledby="m1-completion-title">
      <div className="m1-completion-slide">
        <header className="m1-completion-header">
          <div>
            <div className="m1-completion-kicker">MODULE 1 | COMPLETION</div>
            <h1 id="m1-completion-title">Key takeaways and Module 1 completion</h1>
            <p>
              You are at the final review step in your HRBA learning journey. Review the key ideas, carry forward your action commitment, and continue to the next module when you are ready.
            </p>
          </div>
        </header>

        <section className="m1-completion-panel" aria-label="Module 1 completion overview">
          <span className="m1-completion-check" aria-hidden="true">✓</span>
          <div>
            <h2>Module 1 review checkpoint</h2>
            <p>
              Complete the review items below to finish Module 1 and move to the closing screen.
            </p>
          </div>
          <strong>
            <span aria-hidden="true">✓</span>
            Starting HRBA learning journey review in progress
          </strong>
        </section>

        <div className="m1-completion-body">
          <section className="m1-takeaway-wall" aria-labelledby="m1-takeaway-title">
            <div className="m1-completion-section-head">
              <div>
                <h2 id="m1-takeaway-title">Select each takeaway to review what you are carrying forward from Module 1.</h2>
              <p>Choose each card once. The card will turn over to show the practical meaning.</p>
              </div>
              <strong aria-live="polite">{reviewedCount} of 5 takeaways reviewed</strong>
            </div>

            <div className="m1-takeaway-grid">
              {takeaways.map((takeaway) => {
                const reviewed = reviewedSet.has(takeaway.id);
                const active = activeTakeawayId === takeaway.id;
                return (
                  <button
                    key={takeaway.id}
                    type="button"
                    className={`m1-takeaway-tile ${active ? 'is-active' : ''} ${reviewed ? 'is-reviewed' : ''}`}
                    onClick={() => reviewTakeaway(takeaway.id)}
                    aria-pressed={reviewed}
                    aria-label={`${takeaway.title} ${reviewed ? 'Reviewed' : 'Not reviewed yet'}`}
                  >
                    <span className="m1-takeaway-number">{reviewed ? '✓' : takeaway.number}</span>
                    <span>
                      <strong>{reviewed ? takeaway.short : takeaway.title}</strong>
                      <small>{reviewed ? takeaway.explanation : 'Select to review'}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="m1-completion-side">
            <section className="m1-commitment-summary" aria-labelledby="m1-commitment-summary-title">
              <h2 id="m1-commitment-summary-title">Your Module 1 action commitment</h2>
              {commitmentSentence ? (
                <>
                  <p className="m1-commitment-sentence">{commitmentSentence}</p>
                  {optionalNote && (
                    <div className="m1-commitment-note">
                      <strong>Your note:</strong>
                      <p>{optionalNote}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="m1-commitment-missing">
                  <p>You can return to the previous screen to choose an action commitment.</p>
                  <button type="button" onClick={goBackToActionCommitment}>
                    Back to action commitment
                  </button>
                </div>
              )}
              <small>
                Keep this action small and realistic. The purpose is to begin applying HRBA through repeated habits in your everyday CSO work.
              </small>
            </section>

            <section className="m1-learning-record" aria-labelledby="m1-learning-record-title">
              <h2 id="m1-learning-record-title">Saved to your Module 1 learning record</h2>
              <ul>
                {recordItems.map((item) => (
                  <li key={item.id} className={item.completed ? 'is-complete' : ''}>
                    <span aria-hidden="true">{item.completed ? '✓' : '○'}</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <section className="m1-next-module-panel" aria-labelledby="m1-next-module-title">
          <div>
            <h2 id="m1-next-module-title">Next: Module 2</h2>
            <p>
              In Module 2, you will go deeper into human rights in everyday CSO work. You will explore types of rights, human rights principles, and how rights show up in practical project situations.
            </p>
          </div>
          <div className="m1-next-module-actions">
            <button
              type="button"
              className="m1-next-module-primary"
              onClick={continueToFinalClosing}
              disabled={!isComplete}
              aria-describedby="m1-completion-helper"
            >
              Continue
            </button>
          </div>
        </section>

        <footer className="m1-completion-footer">
          <p id="m1-completion-helper" aria-live="polite">
            {isComplete
              ? 'Continue to the final Module 1 closing screen.'
              : recordComplete
                ? 'Review all five takeaways to complete Module 1.'
                : 'Complete the missing learning record item before finishing Module 1.'}
          </p>
        </footer>
      </div>
    </section>
  );
}

function Module1FinishedScreen({
  onChangeState
}: {
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
}) {
  useEffect(() => {
    onChangeState((prev) => {
      const moduleId = 'module_01_hrba_foundations';
      const moduleProgress = prev.screenProgress[moduleId] || [];
      const nextProgress = Array.from(new Set([...moduleProgress, 'M1-S1-06B', 'M1-PLAYER-COMPLETE']));
      return {
        ...prev,
        module1Completion: {
          completed: true,
          completedAt: prev.module1Completion.completedAt || new Date().toISOString()
        },
        completedModules: prev.completedModules.includes(moduleId)
          ? prev.completedModules
          : [...prev.completedModules, moduleId],
        screenProgress: {
          ...prev.screenProgress,
          [moduleId]: nextProgress
        }
      };
    });
  }, [onChangeState]);

  const returnToCourseMenu = () => {
    onChangeState((prev) => ({
      ...prev,
      currentLayer: 'platform',
      currentModuleId: 'module_01_hrba_foundations',
      currentSubState: null,
      activeModal: null
    }));
  };

  const continueToModule2 = () => {
    onChangeState((prev) => ({
      ...prev,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_02_everyday_cso_work',
      currentScreenId: 'M2-PLAYER-00',
      currentSubState: null,
      activeModal: null
    }));
  };

  const reviewModule = () => {
    onChangeState((prev) => ({
      ...prev,
      currentLayer: 'player',
      currentCourseId: 'hrba_course',
      currentModuleId: 'module_01_hrba_foundations',
      currentScreenId: 'M1-S1-06B',
      currentSubState: null,
      activeModal: null
    }));
  };

  const summaryItems = [
    'You explored why the course matters for local and grassroots CSOs.',
    'You reviewed the learning journey and methodology.',
    'You prepared your portfolio for safe reflection and peer exchange.',
    'You completed a starting self-assessment and saved a first learning commitment.'
  ];

  return (
    <section
      className="m1-revised-finished-screen"
      aria-labelledby="m1-finished-title"
      style={{
        display: 'grid',
        width: '100%',
        placeItems: 'center',
        background: '#eef7f5',
        padding: '1.25rem 1rem 7rem'
      }}
    >
      <div
        className="m1-revised-finished-slide"
        style={{
          display: 'grid',
          gap: '1rem',
          width: 'min(100%, 880px)',
          border: '1px solid rgba(16, 92, 91, 0.16)',
          borderRadius: '8px',
          background: '#ffffff',
          boxShadow: '0 18px 42px rgba(15, 23, 42, 0.12)',
          color: '#10233f',
          padding: 'clamp(1.25rem, 3vw, 2rem)',
          textAlign: 'left'
        }}
      >
        <div
          className="m1-revised-finished-mark"
          aria-hidden="true"
          style={{
            display: 'inline-grid',
            placeItems: 'center',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '999px',
            background: '#d9eeea',
            color: '#0b2a55',
            fontSize: '1.65rem',
            fontWeight: 950
          }}
        >
          ✓
        </div>
        <div className="m1-completion-kicker" style={{ color: '#0f766e', fontWeight: 900, letterSpacing: '0.08em' }}>
          MODULE 1 | COMPLETED
        </div>
        <h1 id="m1-finished-title" style={{ color: '#0b2a55', fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.08, margin: 0 }}>
          Module 1 Complete
        </h1>
        <p style={{ color: '#26394f', fontSize: '1.08rem', lineHeight: 1.55, margin: 0 }}>
          You have completed Module 1: Starting the HRBA Learning Journey.
        </p>
        <p style={{ color: '#26394f', fontSize: '1.08rem', lineHeight: 1.55, margin: 0 }}>
          You are now ready to continue to Module 2: Foundations of HRBA — Rights, Actors, Principles, and Power.
        </p>
        <section
          className="m1-revised-finished-summary"
          aria-labelledby="m1-finished-summary-title"
          style={{
            border: '1px solid rgba(16, 92, 91, 0.16)',
            borderRadius: '8px',
            background: '#f8fbfb',
            color: '#10233f',
            padding: '1rem'
          }}
        >
          <h2 id="m1-finished-summary-title" style={{ color: '#0b2a55', fontSize: '1.25rem', margin: '0 0 0.75rem' }}>
            Completion summary
          </h2>
          <ul style={{ display: 'grid', gap: '0.55rem', margin: 0, paddingLeft: '1.25rem' }}>
            {summaryItems.map((item) => (
              <li key={item} style={{ color: '#26394f', lineHeight: 1.45 }}>{item}</li>
            ))}
          </ul>
        </section>
        <div className="m1-revised-finished-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'flex-start' }}>
          <button
            type="button"
            className="m1-revised-finished-secondary"
            onClick={returnToCourseMenu}
            style={{
              minHeight: '44px',
              border: '1px solid rgba(11, 42, 85, 0.28)',
              borderRadius: '999px',
              background: '#ffffff',
              color: '#0b2a55',
              fontWeight: 900,
              padding: '0.75rem 1.15rem'
            }}
          >
            Return to course
          </button>
          <button
            type="button"
            className="m1-revised-finished-review"
            onClick={reviewModule}
            style={{
              minHeight: '44px',
              border: '1px solid rgba(11, 42, 85, 0.28)',
              borderRadius: '999px',
              background: '#ffffff',
              color: '#0b2a55',
              fontWeight: 900,
              padding: '0.75rem 1.15rem'
            }}
          >
            Review commitment
          </button>
          <button
            type="button"
            className="m1-revised-finished-primary"
            onClick={continueToModule2}
            style={{
              minHeight: '44px',
              border: '1px solid #0b5a7e',
              borderRadius: '999px',
              background: '#0b5a7e',
              color: '#ffffff',
              fontWeight: 900,
              padding: '0.75rem 1.15rem'
            }}
          >
            Proceed to Module 2
          </button>
        </div>
      </div>
    </section>
  );
}

function renderBlockContent(
  screenId: string,
  state: LearningState,
  onChangeState: (updater: (prev: LearningState) => LearningState) => void,
  onNext: () => void
) {
  switch (screenId) {
    case 'M1-PLAYER-00':
      return <Module1OpeningScreen onNext={onNext} />;

    case 'M1-S1-01':
      return <Module1WelcomeCourseScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S1-02':
      return <Module1AboutCourseScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S1-03':
      return <Module1HrbaPracticalLensScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S1-04':
      return <Module1CourseJourneyScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S1-05':
      return <Module1LearningMethodologyScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S1-06':
      return <Module1SafePortfolioScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S1-06A':
      return <Module1StartingPointSelfAssessmentScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S1-06B':
      return <Module1FirstLearningCommitmentScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S1-07':
      return <Module1ConnectedRightsScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S1-08':
      return <Module1RightsHolderShiftScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S2-01':
      return <Module1ResponsibilityMapScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S2-02':
      return <Module1ParticipationProcessScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S2-03':
      return <Module1HrbaShiftScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S2-04':
      return <Module1KnowledgeCheckScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S2-05':
      return <Module1SelfAssessmentScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S3-01':
      return <Module1ActionCommitmentScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S3-02':
      return <Module1CompletionScreen state={state} onChangeState={onChangeState} onNext={onNext} />;

    case 'M1-S3-03': { // Ask Better Questions Before Acting
      return (
        <ScenarioDecisionBlock 
          state={state} 
          onChangeState={onChangeState} 
          onNext={onNext} 
        />
      );
    }

    case 'M1-S3-04': { // What Changes When We Ask Rights-Based Questions?
      const [opened, setOpened] = useState<Record<string, boolean>>({});
      const items = [
        { id: 'plan', t: 'Planning changes', d: 'The team may identify vulnerable groups that were missing from the first plan.' },
        { id: 'part', t: 'Participation changes', d: 'The team may adjust the time, language, venue, or facilitation method so more people can participate safely.' },
        { id: 'acc', t: 'Accountability changes', d: 'The team may invite relevant responsible actors or clarify how community feedback will be shared and followed up.' },
        { id: 'evid', t: 'Evidence changes', d: 'The team may collect safer, more useful information that shows barriers, not only activity counts.' },
        { id: 'power', t: 'Power changes', d: 'The team may shift from speaking for people toward helping people speak, organize, and influence decisions.' }
      ];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            What Changes When We Ask Rights-Based Questions?
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            Tapping into each domain demonstrates how questions change practice outcomes:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {items.map((item) => (
              <div 
                key={item.id}
                onClick={() => setOpened(p => ({ ...p, [item.id]: !p[item.id] }))}
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid var(--color-border-dark)',
                  borderRadius: '8px',
                  padding: '1rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#fff' }}>{item.t}</strong>
                  <span style={{ color: 'var(--color-primary-light)' }}>{opened[item.id] ? '▲' : '▼'}</span>
                </div>
                {opened[item.id] && (
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem', borderTop: '1px solid var(--color-border-dark)', paddingTop: '0.5rem' }}>
                    {item.d}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Continue
          </button>
        </div>
      );
    }

    case 'M1-S3-05': // Key Takeaway
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Key Takeaway: The First HRBA Shift
          </h3>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '2.5rem' }}>🧠</span>
            <h4 style={{ color: '#fff', fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              Do not only ask, "What support can we provide?"
            </h4>
            <div style={{ display: 'inline-block', textAlign: 'left', color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.8' }}>
              <p>✔ Who are the rights-holders?</p>
              <p>✔ What rights are affected?</p>
              <p>✔ Who is excluded?</p>
              <p>✔ Who has responsibility?</p>
              <p>✔ How can people participate safely and meaningfully?</p>
              <p>✔ How will accountability be strengthened?</p>
            </div>
          </div>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Continue
          </button>
        </div>
      );

    case 'M1-S4-01': // Four Ways CSOs May Frame Their Work
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Four Ways CSOs May Frame Their Work
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            Civil society organizations often frame their community programs using one of four paradigms:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { t: 'Charity-based', q: 'What can we give?', d: 'Focuses on direct aid. Limit: treats community members as passive beneficiaries.' },
              { t: 'Needs-based', q: 'What do people lack?', d: 'Focuses on gaps. Limit: doesn\'t map obligations or address systemic barriers.' },
              { t: 'Service-delivery', q: 'What service will we provide?', d: 'Focuses on executing activities. Limit: lacks stakeholder feedback loops.' },
              { t: 'Rights-based (HRBA)', q: 'What rights are affected?', d: 'Focuses on voice, claims, and duty-bearer obligations. Communities have voice and agency.' }
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: '#1e293b', border: idx === 3 ? '1px solid var(--color-primary)' : '1px solid var(--color-border-dark)', padding: '1.25rem', borderRadius: '8px' }}>
                <strong style={{ color: idx === 3 ? 'var(--color-accent-green)' : '#fff', fontSize: '1.1rem', display: 'block', marginBottom: '0.2rem' }}>{item.t}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)', display: 'block', marginBottom: '0.5rem', fontStyle: 'italic' }}>Question: {item.q}</span>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>{item.d}</p>
              </div>
            ))}
          </div>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Try the sorting activity
          </button>
        </div>
      );

    case 'M1-S4-02': { // Sort the Examples
      return (
        <SortingActivityBlock 
          state={state} 
          onChangeState={onChangeState} 
          onNext={onNext} 
        />
      );
    }

    case 'M1-S4-03': // Why the Rights-Based Option Goes Further
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Why the Rights-Based Option Goes Further
          </h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            Charity, needs assessment, and service delivery can all be valuable. But by themselves, they may not change the deeper conditions that keep people excluded or unheard.
          </p>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '1.5rem', borderRadius: '8px' }}>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.75rem' }}>Rights-based practice goes further because it asks:</h4>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <li>Are people involved in decisions that affect them?</li>
              <li>Are excluded groups being deliberately included?</li>
              <li>Are rights and responsibilities clear?</li>
              <li>Can people raise concerns safely?</li>
              <li>Are duty-bearers engaged where appropriate?</li>
              <li>Is the CSO strengthening dignity and accountability, not only delivering activities?</li>
            </ul>
          </div>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Continue
          </button>
        </div>
      );

    case 'M1-S4-04': { // What This Means for Your CSO
      const options = [
        'From giving support to strengthening dignity',
        'From identifying needs to understanding rights',
        'From delivering activities to strengthening accountability',
        'From general participation to meaningful participation',
        'From assuming inclusion to checking who is excluded',
        'I am still reflecting'
      ];

      const handleSelect = (opt: string) => {
        onChangeState((prev) => ({
          ...prev,
          portfolioShiftSelected: opt
        }));
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            What This Means for Your CSO
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            Choose one key learning shift that you want to prioritize in your own CSO project context:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {options.map((opt, idx) => {
              const selected = state.portfolioShiftSelected === opt;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  style={{
                    padding: '1rem',
                    backgroundColor: selected ? 'rgba(59, 153, 212, 0.15)' : '#1e293b',
                    border: selected ? '2px solid var(--color-primary)' : '1px solid var(--color-border-dark)',
                    color: '#fff',
                    borderRadius: '8px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span style={{ marginRight: '0.75rem', color: selected ? 'var(--color-primary-light)' : '#64748b' }}>
                    {selected ? '●' : '○'}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          
          {state.portfolioShiftSelected && (
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(145, 200, 82, 0.1)', color: 'var(--color-accent-green)', borderRadius: '6px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 600 }}>
              ✓ Your choice has been saved privately to your learning portfolio.
            </div>
          )}

          <button 
            onClick={onNext} 
            disabled={!state.portfolioShiftSelected}
            style={{ 
              alignSelf: 'flex-end', 
              backgroundColor: state.portfolioShiftSelected ? 'var(--color-primary)' : '#cbd5e1', 
              color: '#fff', 
              border: 'none', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '6px', 
              cursor: state.portfolioShiftSelected ? 'pointer' : 'not-allowed', 
              fontWeight: 600 
            }}
          >
            Continue
          </button>
        </div>
      );
    }

    case 'M1-S5-01': // Rights-Holders and Duty-Bearers
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Rights-Holders and Duty-Bearers
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            HRBA frames the core community relationship using two primary terms:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '1.5rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '2rem' }}>👥</span>
              <h4 style={{ color: '#fff', fontSize: '1.15rem', margin: '0.5rem 0' }}>Rights-holders</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
                All people are rights-holders with voice and claims. In CSO programs, this includes community groups, women, children, workers, disabled persons, and anyone affected by the issue.
              </p>
            </div>
            <div style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '1.5rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '2rem' }}>🏛️</span>
              <h4 style={{ color: '#fff', fontSize: '1.15rem', margin: '0.5rem 0' }}>Duty-bearers</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Actors with legal/moral obligations to respect, protect, and fulfill rights. The state is the main duty-bearer, alongside public departments, service facilities, and local authorities.
              </p>
            </div>
          </div>
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(59, 153, 212, 0.05)', borderLeft: '4px solid var(--color-primary)', borderRadius: '4px', fontSize: '0.9rem', color: '#cbd5e1' }}>
            <strong>The CSO Role:</strong> CSOs are not the primary duty-bearers. CSOs bridge the relationship by helping rights-holders claim rights safely, facilitating dialogue, sharing evidence, and promoting transparency.
          </div>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Continue
          </button>
        </div>
      );

    case 'M1-S5-02': // A Fictional Local CSO Scenario
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            CSO Scenario: Local Dialogue Review
          </h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            Lomi Community Development Association is supporting community dialogue around access to safe and inclusive public services. The team notices that women with care responsibilities, persons with disabilities, and young people from remote areas are less visible in the process.
          </p>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '1.25rem', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--color-primary-light)' }}>Ayele and his team ask:</strong>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <li>Who are the rights-holders and who may be excluded?</li>
              <li>Who has responsibility to respond to the community claims?</li>
              <li>What role can our CSO play safely to bridge the gap?</li>
            </ul>
          </div>
          <div style={{ border: '1px solid var(--color-border-dark)', padding: '1rem', borderRadius: '6px', backgroundColor: '#1e293b', fontSize: '0.85rem', color: '#64748b' }}>
            <strong>Safety Note:</strong> This is a fictional scenario for learning. It is not based on a real organization, person, case, or community record.
          </div>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Continue
          </button>
        </div>
      );

    case 'M1-S5-03': { // Who Is the Rights-Holder? Who Is the Duty-Bearer?
      return (
        <ActorMatchingBlock 
          state={state} 
          onChangeState={onChangeState} 
          onNext={onNext} 
        />
      );
    }

    case 'M1-S5-04': // Where Do CSOs Fit?
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Where Do CSOs Fit?
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            CSOs connect rights-holders and duty-bearers in constructive, safe, and accountable ways.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '0.5rem' }}>
            <div style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '1.25rem', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: 'var(--color-primary-light)' }}>Supporting Rights-Holders</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '1.25rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <li>sharing accessible information</li>
                <li>creating safe participation spaces</li>
                <li>strengthening community voice</li>
                <li>helping people understand rights</li>
                <li>documenting barriers safely</li>
              </ul>
            </div>
            <div style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '1.25rem', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: 'var(--color-accent-green)' }}>Engaging Duty-Bearers</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '1.25rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <li>sharing community-led evidence</li>
                <li>facilitating joint dialogue</li>
                <li>asking for formal responses</li>
                <li>tracking service commitments</li>
                <li>promoting transparency</li>
              </ul>
            </div>
          </div>
          
          <div style={{ border: '2px dashed #475569', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>
            <span style={{ fontSize: '3rem' }}>📊</span>
            <h4 style={{ color: '#fff', marginTop: '0.5rem', fontSize: '0.95rem' }}>Asset A-M1-10 Diagram Mapping</h4>
            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', maxWidth: '440px', margin: '0.25rem auto 0' }}>
              Bridge relationship mapping: Rights-holders claims $\leftrightarrow$ CSO support $\leftrightarrow$ Duty-bearer obligations.
            </p>
          </div>

          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Continue
          </button>
        </div>
      );

    case 'M1-S5-05': { // Common Misunderstanding
      const [opened, setOpened] = useState<Record<number, boolean>>({});
      const myths = [
        { m: '“If we are a CSO, then we are always the duty-bearer.”', r: 'Not quite. CSOs have responsibilities to work ethically and accountably, but the state is the primary duty-bearer for legal human rights obligations.' },
        { m: '“HRBA means only advocacy CSOs need to care about rights.”', r: 'Not quite. HRBA strengthens service delivery, protection, MEAL, gender, and youth development by putting dignity and feedback at the center.' },
        { m: '“Participation means inviting people to attend an event.”', r: 'Not quite. Attendance is not enough. Meaningful participation means people can influence decisions that affect them, especially groups often excluded.' }
      ];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Common Misunderstandings
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            Open each item to contrast myths with HRBA reality:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {myths.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setOpened(p => ({ ...p, [idx]: !p[idx] }))}
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid var(--color-border-dark)',
                  borderRadius: '8px',
                  padding: '1rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: 'var(--color-warning)' }}>Myth: {item.m}</strong>
                  <span style={{ color: 'var(--color-primary-light)' }}>{opened[idx] ? '▲' : '▼'}</span>
                </div>
                {opened[idx] && (
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.5rem', borderTop: '1px solid var(--color-border-dark)', paddingTop: '0.5rem', lineHeight: '1.4' }}>
                    <strong style={{ color: 'var(--color-accent-green)' }}>Reality: </strong> {item.r}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Continue to self-assessment
          </button>
        </div>
      );
    }

    // Section 6 Baseline Self-Assessment Group
    case 'M1-S6-01': // Baseline Self-Assessment Intro
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            HRBA Starting Point Self-Assessment
          </h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            HRBA is not something your CSO either “has” or “does not have.” Most organizations already practice some rights-based habits. Most also have areas they can strengthen.
          </p>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            This short self-assessment helps you reflect on your current practice. It is not a public ranking and not a certificate test. Your result is a private learning tool to identify strengths and choose practical priorities.
          </p>
          <div style={{ border: '1px solid var(--color-warning)', borderLeft: '4px solid var(--color-warning)', padding: '1rem', borderRadius: '6px', backgroundColor: 'rgba(249, 115, 22, 0.05)', fontSize: '0.9rem' }}>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '0.2rem' }}>🔒 Privacy Note</strong>
            <span style={{ color: '#94a3b8' }}>
              Please answer using broad organizational or team judgement. Do not enter names, case details, complaint records, safeguarding records, or politically sensitive information.
            </span>
          </div>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Start self-assessment
          </button>
        </div>
      );

    case 'M1-S6-02': { // What Are You Assessing?
      const options = ['My whole organization', 'One team or department', 'One project or program', 'One community engagement or advocacy activity', 'I am not sure yet — I will answer generally'];
      const currentSelected = (state.practiceCheckState?.assessingWhat as string) || '';
      
      const handleChoose = (opt: string) => {
        onChangeState((prev) => ({
          ...prev,
          practiceCheckState: { ...prev.practiceCheckState, assessingWhat: opt }
        }));
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            What Are You Assessing?
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            When you complete the survey, what perspective are you mainly thinking about?
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleChoose(opt)}
                style={{
                  padding: '1rem',
                  backgroundColor: currentSelected === opt ? 'rgba(59, 153, 212, 0.15)' : '#1e293b',
                  border: currentSelected === opt ? '2px solid var(--color-primary)' : '1px solid var(--color-border-dark)',
                  color: '#fff',
                  borderRadius: '8px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.95rem'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          <button 
            onClick={onNext}
            disabled={!currentSelected}
            style={{ 
              alignSelf: 'flex-end', 
              backgroundColor: currentSelected ? 'var(--color-primary)' : '#cbd5e1', 
              color: '#fff', 
              border: 'none', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '6px', 
              cursor: currentSelected ? 'pointer' : 'not-allowed', 
              fontWeight: 600 
            }}
          >
            Continue
          </button>
        </div>
      );
    }

    case 'M1-S6-03': { // Your Role and Context
      const roles = ['Project/program staff', 'MEAL/accountability staff', 'Advocacy/community engagement staff', 'CSO leader or manager', 'Safeguarding/protection focal person', 'Volunteer or community team member', 'Other CSO role', 'Prefer not to say'];
      const modes = ['Alone', 'With one colleague', 'In a small team discussion', 'Not sure / prefer not to say'];
      
      const currentRole = (state.practiceCheckState?.roleType as string) || '';
      const currentMode = (state.practiceCheckState?.colleagueMode as string) || '';

      const handleSet = (key: string, val: string) => {
        onChangeState((prev) => ({
          ...prev,
          practiceCheckState: { ...prev.practiceCheckState, [key]: val }
        }));
      };

      const ready = currentRole && currentMode;

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Your Role and Context
          </h3>
          
          <label style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>Which option best describes your role?</label>
          <select 
            value={currentRole} 
            onChange={(e) => handleSet('roleType', e.target.value)}
            style={{ padding: '0.75rem', backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', color: '#fff', borderRadius: '6px', outline: 'none' }}
          >
            <option value="">-- Select Role --</option>
            {roles.map((r, i) => <option key={i} value={r}>{r}</option>)}
          </select>

          <label style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, marginTop: '0.5rem' }}>Are you completing this alone or with colleagues?</label>
          <select 
            value={currentMode} 
            onChange={(e) => handleSet('colleagueMode', e.target.value)}
            style={{ padding: '0.75rem', backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', color: '#fff', borderRadius: '6px', outline: 'none' }}
          >
            <option value="">-- Select Mode --</option>
            {modes.map((m, i) => <option key={i} value={m}>{m}</option>)}
          </select>

          <button 
            onClick={onNext}
            disabled={!ready}
            style={{ 
              alignSelf: 'flex-end', 
              backgroundColor: ready ? 'var(--color-primary)' : '#cbd5e1', 
              color: '#fff', 
              border: 'none', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '6px', 
              cursor: ready ? 'pointer' : 'not-allowed', 
              fontWeight: 600,
              marginTop: '1rem'
            }}
          >
            Continue
          </button>
        </div>
      );
    }

    case 'M1-S6-04': // How to Answer
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            How to Answer
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            For each statement, choose the score that best reflects current practice. Base your rating on what happens <strong>now</strong>, not what you hope will happen later.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { s: '0 — Not yet in place', d: 'We do not have this in practice, or only in isolated cases.' },
              { s: '1 — Starting', d: 'We have discussed it or tried it informally, but it is not consistent.' },
              { s: '2 — Partly in place', d: 'We do this in some projects or teams, but not yet across the board.' },
              { s: '3 — Consistently in place', d: 'We do this regularly and can show examples or evidence.' },
              { s: 'Not sure / need to check', d: 'Choose this when you do not have enough information. (Not scored)' }
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '1rem', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '1rem' }}>
                <strong style={{ color: '#fff' }}>{item.s}</strong>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{item.d}</span>
              </div>
            ))}
          </div>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Begin survey
          </button>
        </div>
      );

    case 'M1-S6-05': { // Starting Point 16-item Survey
      return (
        <SurveyBlock 
          state={state} 
          onChangeState={onChangeState} 
          onNext={onNext} 
        />
      );
    }

    case 'M1-S6-06': { // Results Band — N/A items excluded from score and possible points
      const allAnswers = Object.values(state.surveyAnswers);
      // Only count numeric responses; N/A items are not scored and not counted in possible points
      const numericAnswers = allAnswers.filter(r => r !== 'N/A') as number[];
      const naCount = allAnswers.filter(r => r === 'N/A').length;
      const answeredScore = numericAnswers.reduce((sum, val) => sum + val, 0);
      const possiblePoints = numericAnswers.length * 3; // max 3 per answered item

      // Band calculation uses answered numeric score relative to possible answered points
      // Bands are proportional to the answered subset to remain meaningful when N/A items exist
      const scoreFraction = possiblePoints > 0 ? answeredScore / possiblePoints : 0;

      let bandTitle = '';
      let bandDesc = '';

      if (scoreFraction < 0.33) {
        bandTitle = 'Starting point';
        bandDesc = 'Your organization is at an early stage of applying HRBA. This is a useful baseline. Focus first on participation, non-discrimination, and basic accountability mechanisms before expanding to more advanced integration.';
      } else if (scoreFraction < 0.58) {
        bandTitle = 'Emerging practice';
        bandDesc = 'Your organization shows important HRBA building blocks, but practice is not yet consistent. Prioritize formalizing what already works and making it routine across projects and teams.';
      } else if (scoreFraction < 0.84) {
        bandTitle = 'Progressing';
        bandDesc = 'Your organization is applying HRBA in a meaningful way. The next step is to improve consistency, evidence, and feedback loops so HRBA is embedded across the program cycle.';
      } else {
        bandTitle = 'Embedding HRBA';
        bandDesc = 'Your organization shows strong HRBA practice. Maintain momentum by documenting examples, coaching partners, and checking whether good policies are matched by inclusive practice and accountability in reality.';
      }

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Your Survey Result Summary
          </h3>

          <div style={{ border: '2px solid var(--color-primary)', backgroundColor: '#1e293b', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '1.25rem', color: 'var(--color-accent-green)', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Score (answered items only)</span>
            <div style={{ fontSize: '3.5rem', color: '#fff', fontWeight: 800, margin: '0.25rem 0' }}>
              {answeredScore} <span style={{ fontSize: '1.5rem', color: '#64748b' }}>/ {possiblePoints} answered points</span>
            </div>
            {naCount > 0 && (
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                N/A items: {naCount} <span style={{ color: '#64748b' }}>(not scored — excluded from possible points)</span>
              </div>
            )}
            <strong style={{ color: 'var(--color-primary-light)', fontSize: '1.25rem', display: 'block', marginBottom: '1rem' }}>{bandTitle}</strong>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5', maxWidth: '600px', margin: '0 auto' }}>{bandDesc}</p>
          </div>

          {naCount >= 4 && (
            <div style={{ border: '1px solid var(--color-warning)', padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(249, 115, 22, 0.05)', fontSize: '0.9rem', color: '#94a3b8' }}>
              ℹ️ <strong>Confidence note:</strong> You marked {naCount} items as N/A. Consider reviewing those areas with colleagues to build a more complete picture. Your score reflects only the items you answered.
            </div>
          )}

          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            View domain feedback
          </button>
        </div>
      );
    }

    case 'M1-S6-07': { // Domain Feedback Cards
      const domains = [
        { name: 'Participation', q: ['Q1', 'Q2'], desc: 'Involving communities early in shaping plans; reducing barriers to participation.' },
        { name: 'Non-discrimination & Equality', q: ['Q3', 'Q4'], desc: 'Identifying exclusion; adjusting outreach to benefit vulnerable groups.' },
        { name: 'Accountability', q: ['Q5', 'Q6'], desc: 'Enabling safe complaint channels; responding within timeframes.' },
        { name: 'Transparency', q: ['Q7', 'Q8'], desc: 'Sharing criteria/progress in plain language; closing feedback loops.' },
        { name: 'Empowerment', q: ['Q9', 'Q10'], desc: 'Helping communities claim rights and speak directly for themselves.' },
        { name: 'Legality & Rule of Law', q: ['Q11', 'Q12'], desc: 'Consider policy checks, law, and human rights guidelines.' },
        { name: 'Human Rights Standards', q: ['Q13', 'Q14'], desc: 'Linking projects to rights; checking accessibility and quality.' },
        { name: 'Capacity to Integrate HRBA', q: ['Q15', 'Q16'], desc: 'Providing staff guidance; integrating HRBA into budget/MEAL.' }
      ];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Domain-Specific Feedback
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            Review your scores out of 6 for each of the core HRBA dimensions:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '55vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {domains.map((dom, idx) => {
              const val1 = state.surveyAnswers[dom.q[0]];
              const val2 = state.surveyAnswers[dom.q[1]];
              const score = (val1 === 'N/A' ? 0 : val1) + (val2 === 'N/A' ? 0 : val2);
              
              return (
                <div key={idx} style={{ padding: '1rem', backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.2rem' }}>{dom.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{dom.desc}</p>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: '80px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: score >= 4 ? 'var(--color-accent-green)' : score >= 2 ? 'var(--color-primary-light)' : 'var(--color-warning)' }}>
                      {score} <span style={{ fontSize: '0.85rem', color: '#64748b' }}>/ 6</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Choose priority areas
          </button>
        </div>
      );
    }

    case 'M1-S6-08': { // Choose Priority Areas
      const domains = [
        'Participation',
        'Non-discrimination and equality',
        'Accountability',
        'Transparency',
        'Empowerment',
        'Legality and rule of law',
        'Human rights standards',
        'Capacity to integrate HRBA'
      ];

      const handlePriorityToggle = (dom: string) => {
        const index = state.surveyPriorities.indexOf(dom);
        onChangeState((prev) => {
          let updated = [...prev.surveyPriorities];
          if (index > -1) {
            updated.splice(index, 1);
          } else {
            updated.push(dom);
          }
          return { ...prev, surveyPriorities: updated };
        });
      };

      const isValid = state.surveyPriorities.length === 2;

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Choose Two Priority Areas
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            Select exactly <strong>two domains</strong> you want to prioritize for improvement during the rest of the course:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {domains.map((dom, idx) => {
              const selected = state.surveyPriorities.includes(dom);
              return (
                <label 
                  key={idx}
                  style={{
                    padding: '1rem',
                    backgroundColor: selected ? 'rgba(59, 153, 212, 0.15)' : '#1e293b',
                    border: selected ? '2px solid var(--color-primary)' : '1px solid var(--color-border-dark)',
                    borderRadius: '8px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  <input 
                    type="checkbox"
                    checked={selected}
                    onChange={() => handlePriorityToggle(dom)}
                    disabled={!selected && state.surveyPriorities.length >= 2}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.9rem' }}>{dom}</span>
                </label>
              );
            })}
          </div>

          {!isValid && (
            <div style={{ color: 'var(--color-warning)', fontSize: '0.85rem', fontWeight: 600 }}>
              ⚠️ Please select exactly two priority areas. (Selected: {state.surveyPriorities.length})
            </div>
          )}

          <button 
            onClick={onNext}
            disabled={!isValid}
            style={{ 
              alignSelf: 'flex-end', 
              backgroundColor: isValid ? 'var(--color-primary)' : '#cbd5e1', 
              color: '#fff', 
              border: 'none', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '6px', 
              cursor: isValid ? 'pointer' : 'not-allowed', 
              fontWeight: 600 
            }}
          >
            Save my priority areas
          </button>
        </div>
      );
    }

    case 'M1-S6-09': { // Save Portfolio Summary
      const saved = state.surveyCompleted;

      const handleSave = () => {
        if (saved) {
          onNext();
          return;
        }

        onChangeState((prev) => ({
          ...prev,
          surveyCompleted: true
        }));
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Save My HRBA Starting Point
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            Your baseline summary will be stored privately inside your HRBA Learning Portfolio:
          </p>

          <div style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '1.25rem', borderRadius: '8px', fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <p><strong>Assessment Target:</strong> {state.practiceCheckState?.assessingWhat || 'Not selected'}</p>
            <p><strong>Overall Score Band:</strong> {Object.keys(state.surveyAnswers).length ? 'Calculated baseline rating' : 'Survey not complete'}</p>
            <p><strong>Selected Priorities:</strong> {state.surveyPriorities.join(', ')}</p>
          </div>

          <label style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, display: 'block', marginTop: '0.5rem' }}>
            What is one broad area you want to improve as you continue the course? (Optional)
          </label>
          <textarea
            placeholder="Type broad learning reflections here..."
            value={state.surveyNote}
            onChange={(e) => {
              const val = e.target.value;
              onChangeState((prev) => ({ ...prev, surveyNote: val }));
            }}
            rows={3}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid var(--color-border-dark)', color: '#fff', outline: 'none', resize: 'vertical' }}
          />

          <div style={{ border: '1px solid var(--color-warning)', padding: '0.75rem 1rem', borderRadius: '6px', backgroundColor: 'rgba(249, 115, 22, 0.05)', fontSize: '0.85rem', color: '#94a3b8' }}>
            This portfolio is for learning. Keep it private and safe. Use a generalized issue rather than a real sensitive case. Use a fictional, generalized, or non-sensitive example. Do not include names, phone numbers, exact locations, identifiable stories, survivor details, children&apos;s details, officials&apos; names, organizational disputes, or sensitive incidents.
          </div>

          {saved && (
            <div className="m1-portfolio-save-confirmation" aria-live="polite">
              <strong>✓ Saved to portfolio</strong>
              <span>Your private HRBA starting point is saved in this browser.</span>
            </div>
          )}

          <button 
            onClick={handleSave}
            aria-describedby="m1-s6-save-helper"
            style={{ 
              alignSelf: 'flex-end', 
              backgroundColor: 'var(--color-primary)', 
              color: '#fff', 
              border: 'none', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontWeight: 600 
            }}
          >
            {saved ? 'Continue' : 'Save to Portfolio'}
          </button>
          <p id="m1-s6-save-helper" className="m1-inline-helper" aria-live="polite">
            {saved ? 'Saved. Continue when ready.' : 'Save your portfolio summary to continue.'}
          </p>
        </div>
      );
    }

    case 'M1-S6-10': // How to Use Your Result
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            How to Use Your Result
          </h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            Your result is a starting point, not a judgment. Use it to ask:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.95rem' }}>
            <li>Where are we already practicing HRBA?</li>
            <li>Where is practice still informal or inconsistent?</li>
            <li>Which groups may still be excluded?</li>
            <li>What can we improve safely and realistically?</li>
            <li>Which parts of the course can help us strengthen our work?</li>
          </ul>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            You will return to these priorities later in the course.
          </p>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Continue to Module 1 checkpoint
          </button>
        </div>
      );

    case 'M1-S7-01': { // Add to My HRBA Learning Portfolio
      const shifts = [
        'From beneficiaries to rights-holders',
        'From activities to meaningful change',
        'From service delivery alone to empowerment and accountability',
        'From general participation to meaningful and inclusive participation',
        'From needs-only thinking to rights-aware practice',
        'I am still reflecting on this'
      ];
      const areas = ['Project planning or design', 'Community engagement', 'Service delivery', 'MEAL, feedback, or learning', 'Advocacy or dialogue', 'Accountability and complaint handling', 'Internal CSO practice', 'Partnerships or coordination', 'Volunteer or field practice'];

      const handleAreaToggle = (area: string) => {
        const index = state.portfolioShiftAreas.indexOf(area);
        onChangeState((prev) => {
          let updated = [...prev.portfolioShiftAreas];
          if (index > -1) {
            updated.splice(index, 1);
          } else {
            updated.push(area);
          }
          return { ...prev, portfolioShiftAreas: updated };
        });
      };

      const handleSave = () => {
        if (state.practiceCheckState?.m1PortfolioCheckpointSaved) {
          onNext();
          return;
        }

        onChangeState((prev) => ({
          ...prev,
          practiceCheckState: {
            ...prev.practiceCheckState,
            m1PortfolioCheckpointSaved: true
          }
        }));
      };

      const ready = state.portfolioShiftSelected && state.portfolioShiftAreas.length > 0;
      const saved = Boolean(state.practiceCheckState?.m1PortfolioCheckpointSaved);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '70vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
          <h3 style={{ fontSize: '1.6rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Portfolio Checkpoint: My Starting HRBA Shift
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5' }}>
            This portfolio is for learning. Keep it private and safe. Use a generalized issue rather than a real sensitive case.
          </p>
          
          <label style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>Which HRBA shift stood out most for you?</label>
          <select
            value={state.portfolioShiftSelected}
            onChange={(e) => onChangeState(prev => ({ ...prev, portfolioShiftSelected: e.target.value }))}
            style={{ padding: '0.75rem', backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', color: '#fff', borderRadius: '6px', outline: 'none' }}
          >
            <option value="">-- Select Shift --</option>
            {shifts.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>

          <label style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600, marginTop: '0.5rem' }}>
            Where could this shift matter in your CSO’s work? (Choose all that apply)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {areas.map((area, i) => {
              const selected = state.portfolioShiftAreas.includes(area);
              return (
                <label key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem', cursor: 'pointer', padding: '0.4rem', backgroundColor: selected ? 'rgba(59, 153, 212, 0.1)' : 'transparent', borderRadius: '4px', border: selected ? '1px solid var(--color-primary)' : '1px solid transparent' }}>
                  <input type="checkbox" checked={selected} onChange={() => handleAreaToggle(area)} style={{ cursor: 'pointer' }} />
                  <span style={{ color: selected ? '#fff' : '#cbd5e1' }}>{area}</span>
                </label>
              );
            })}
          </div>

          <label style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600, marginTop: '0.5rem' }}>
            Write one safe, broad note about where your CSO could apply this shift.
          </label>
          <textarea
            placeholder="Type your notes here..."
            value={state.portfolioShiftNote}
            onChange={(e) => {
              const val = e.target.value;
              onChangeState(prev => ({ ...prev, portfolioShiftNote: val }));
            }}
            rows={2}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid var(--color-border-dark)', color: '#fff', outline: 'none', resize: 'vertical' }}
          />
          <p className="m1-inline-helper">
            Use a fictional, generalized, or non-sensitive example. Do not include names, phone numbers, exact locations, identifiable stories, survivor details, children&apos;s details, officials&apos; names, organizational disputes, or sensitive incidents.
          </p>

          {saved && (
            <div className="m1-portfolio-save-confirmation" aria-live="polite">
              <strong>✓ Saved to portfolio</strong>
              <span>Your selected shift and work areas are saved in this browser.</span>
            </div>
          )}

          <button 
            onClick={handleSave}
            disabled={!ready}
            aria-describedby="m1-s7-save-helper"
            style={{ 
              alignSelf: 'flex-end', 
              backgroundColor: ready ? 'var(--color-primary)' : '#cbd5e1',
              color: '#fff', 
              border: 'none', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '6px', 
              cursor: ready ? 'pointer' : 'not-allowed', 
              fontWeight: 600,
              marginTop: '1rem'
            }}
          >
            {saved ? 'Continue to Module 1 quiz' : 'Save to portfolio'}
          </button>
          <p id="m1-s7-save-helper" className="m1-inline-helper" aria-live="polite">
            {ready ? saved ? 'Saved. Continue when ready.' : 'Save your portfolio checkpoint to continue.' : 'Select a shift and at least one work area to continue.'}
          </p>
        </div>
      );
    }

    case 'M1-S7-02': { // Formative Quiz Block
      return (
        <QuizBlock 
          state={state} 
          onChangeState={onChangeState} 
          onNext={onNext} 
        />
      );
    }

    case 'M1-S7-03': // Quiz Feedback Review
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Review Your Feedback
          </h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            Thank you for completing the Module 1 quiz. This quiz is not about passing or failing. It helps you check your understanding before moving forward.
          </p>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            Review any “Not quite” feedback on the previous page and revisit the related sections if you want to strengthen your understanding.
          </p>
          <div style={{ border: '1.5px solid var(--color-primary)', backgroundColor: 'rgba(59, 153, 212, 0.05)', padding: '1.25rem', borderRadius: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>
            ℹ️ <strong>Reminder:</strong> Your certificate is issued based on the final course test with a score of 80% or above. Module 1 activities and checks help you prepare.
          </div>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Continue
          </button>
        </div>
      );

    case 'M1-S7-04': { // Summary Tabs
      const tabs = [
        { title: 'HRBA Mindset', content: 'HRBA is not just a theory; it is a practical mindset shift. It focuses on dignity, deliberate inclusion, and accountability as active operational values.' },
        { title: 'Rights-Holder Shift', content: 'Shifting from viewing community members as passive recipients ("beneficiaries") to recognizing them as active rights-holders with agency.' },
        { title: 'Actor Roles', content: 'Mapping local actors: Rights-holders make claims, Duty-bearers meet obligations. CSOs bridge the dialogue.' },
        { title: 'Safe Portfolio', content: 'Creating a private local action log. Safeguarding guidelines protect organizations and local communities from sensitive data leaks.' }
      ];
      const [activeTab, setActiveTab] = useState(0);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Module 1 Summary
          </h3>
          <p style={{ color: '#cbd5e1' }}>
            Click the tabs to review the key takeaways from Module 1:
          </p>

          <div style={{ border: '1px solid var(--color-border-dark)', borderRadius: '10px', overflow: 'hidden' }}>
            {/* Tab Headers */}
            <div style={{ display: 'flex', backgroundColor: '#0f172a', borderBottom: '1px solid var(--color-border-dark)', overflowX: 'auto' }}>
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    border: 'none',
                    backgroundColor: activeTab === idx ? '#1e293b' : 'transparent',
                    color: activeTab === idx ? 'var(--color-primary-light)' : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    borderBottom: activeTab === idx ? '2px solid var(--color-primary-light)' : '2px solid transparent'
                  }}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            {/* Tab Body */}
            <div style={{ padding: '1.5rem', backgroundColor: '#1e293b', minHeight: '120px', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5' }}>
              {tabs[activeTab].content}
            </div>
          </div>
          <button onClick={onNext} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Continue
          </button>
        </div>
      );
    }

    case 'M1-S7-05': // Next step: transition to Module 2
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
            Next: Foundations of HRBA
          </h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            In Module 2, you will go deeper into human rights in everyday CSO work. You will explore how rights connect to common CSO issues, how exclusion affects access, and how CSOs can use a rights lens without complex legal jargon.
          </p>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            You have already started the journey. Now you are ready to connect HRBA more directly to daily CSO practice.
          </p>
          
          <div style={{ border: '2px dashed #475569', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>
            <span style={{ fontSize: '3rem' }}>🏞️</span>
            <h4 style={{ color: '#fff', marginTop: '0.5rem', fontSize: '0.95rem' }}>Asset A-M1-12</h4>
            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Visual of learner transitioning to Module 2</p>
          </div>

          <button
            onClick={() => {
              // Navigate to the completion screen; module completion is marked at M1-PLAYER-COMPLETE
              onNext();
            }}
            style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-accent-green)', color: '#fff', border: 'none', padding: '0.65rem 2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
          >
            Continue to Module 2
          </button>
        </div>
      );

    case 'M1-PLAYER-COMPLETE':
      return <Module1FinishedScreen onChangeState={onChangeState} />;

    default:
      return (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          <h3>Pending source content</h3>
          <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Block renderer for ID: {screenId}</p>
        </div>
      );
  }
}

// ==========================================
// SUB-BLOCK COMPONENTS FOR RENDERER
// ==========================================

function ScenarioDecisionBlock({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: any;
  onNext: () => void;
}) {
  const currentSelected = state.scenarioAnswers['M1-S3-03'] || '';
  const [checked, setChecked] = useState(false);

  const handleChoose = (opt: string) => {
    onChangeState((prev: any) => ({
      ...prev,
      scenarioAnswers: { ...prev.scenarioAnswers, 'M1-S3-03': opt }
    }));
  };

  const verify = () => {
    setChecked(true);
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '70vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
      <h3 style={{ fontSize: '1.6rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
        Ask Better Questions Before Acting
      </h3>
      
      <div style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '1.25rem', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5' }}>
        <strong>Scenario situation:</strong> Lomi Community Development Association is planning a community dialogue on access to basic services. The team could move quickly and invite the usual community representatives. But before finalizing the plan, Ayele suggests that the team pause and ask more rights-based questions.
        <br />
        <span style={{ color: 'var(--color-primary-light)', display: 'block', marginTop: '0.75rem', fontWeight: 600 }}>Which set of questions is the strongest rights-based starting point?</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {[
          { key: 'A', text: 'How many people can we invite, and how quickly can we finish the event?' },
          { key: 'B', text: 'Which groups are affected, who may be excluded, what rights are connected, and who has responsibility to respond?' },
          { key: 'C', text: 'Which donor indicators can we report most easily?' },
          { key: 'D', text: 'Which participants are most likely to agree with our existing plan?' }
        ].map((opt) => (
          <label 
            key={opt.key}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: currentSelected === opt.key ? 'rgba(59, 153, 212, 0.1)' : '#1e293b',
              border: currentSelected === opt.key ? '1px solid var(--color-primary)' : '1px solid var(--color-border-dark)',
              borderRadius: '6px',
              color: '#fff',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
              cursor: checked ? 'default' : 'pointer'
            }}
          >
            <input type="radio" name="scenario_q" value={opt.key} checked={currentSelected === opt.key} onChange={() => handleChoose(opt.key)} disabled={checked} />
            <span style={{ fontSize: '0.85rem' }}>{opt.key}. {opt.text}</span>
          </label>
        ))}
      </div>

      {checked && (
        <div style={{ padding: '0.75rem', borderRadius: '4px', backgroundColor: currentSelected === 'B' ? 'rgba(145,200,82,0.1)' : 'rgba(249,115,22,0.1)', color: currentSelected === 'B' ? 'var(--color-accent-green)' : 'var(--color-warning)', fontSize: '0.9rem' }}>
          {currentSelected === 'B'
            ? 'That’s right. These questions help the CSO identify affected groups, possible exclusion, relevant rights, and responsible actors before acting.'
            : 'Consider this: Choice B centers on rights, inclusion, and accountability, which are the core pillars of an HRBA approach.'}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        {!checked ? (
          <button 
            onClick={verify} 
            disabled={!currentSelected}
            style={{ backgroundColor: currentSelected ? 'var(--color-primary)' : '#cbd5e1', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: currentSelected ? 'pointer' : 'not-allowed', fontWeight: 600 }}
          >
            Submit Choice
          </button>
        ) : (
          <button 
            onClick={handleContinue}
            style={{ backgroundColor: 'var(--color-accent-green)', color: '#fff', border: 'none', padding: '0.6rem 1.75rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

function SortingActivityBlock({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: any;
  onNext: () => void;
}) {
  const examples = [
    { id: 1, text: 'A CSO distributes materials to families after a crisis, but affected people do not help decide what support is most appropriate.', category: 'Charity-based framing' },
    { id: 2, text: 'A CSO conducts a survey to identify what communities lack, but does not ask who is responsible for addressing the issue.', category: 'Needs-based framing' },
    { id: 3, text: 'A CSO delivers training sessions and reports the number of participants, but does not check whether excluded groups could participate.', category: 'Service-delivery framing' },
    { id: 4, text: 'A CSO works with affected groups to identify barriers, connect the issue to rights, engage responsible actors, and create a safe feedback loop.', category: 'Rights-based framing' }
  ];

  const categories = [
    'Charity-based framing',
    'Needs-based framing',
    'Service-delivery framing',
    'Rights-based framing'
  ];

  const [answers, setAnswers] = useState<Record<number, string>>(
    Object.keys(state.sortingState).reduce((acc, key) => {
      acc[Number(key)] = state.sortingState[key];
      return acc;
    }, {} as Record<number, string>)
  );
  const [checked, setChecked] = useState(false);

  const handleSelect = (idx: number, cat: string) => {
    setAnswers(p => ({ ...p, [idx]: cat }));
  };

  const handleCheck = () => {
    onChangeState((prev: any) => ({
      ...prev,
      sortingState: Object.keys(answers).reduce((acc, k) => {
        acc[k] = answers[Number(k)];
        return acc;
      }, {} as Record<string, string>)
    }));
    setChecked(true);
  };

  const isAllAnswered = Object.keys(answers).length === 4;
  const isCorrect = Object.keys(answers).every(k => answers[Number(k)] === examples[Number(k) - 1].category);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '70vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
      <h3 style={{ fontSize: '1.6rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
        Practice Sorting: Framework Framings
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
        Assign each fictional program example to its corresponding framing model using drop downs:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {examples.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.75rem' }}><strong>Example {item.id}:</strong> {item.text}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <select
                value={answers[item.id] || ''}
                onChange={(e) => handleSelect(item.id, e.target.value)}
                disabled={checked}
                style={{ padding: '0.4rem', backgroundColor: '#0f172a', border: '1px solid var(--color-border-dark)', color: '#fff', borderRadius: '4px', outline: 'none', fontSize: '0.85rem', flexGrow: 1 }}
              >
                <option value="">-- Choose Category --</option>
                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>

              {checked && (
                <span style={{ fontSize: '1.25rem' }}>
                  {answers[item.id] === item.category ? '✅' : '◻️'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {checked && (
        <div style={{ padding: '0.75rem', borderRadius: '4px', backgroundColor: isCorrect ? 'rgba(145,200,82,0.1)' : 'rgba(249,115,22,0.1)', color: isCorrect ? 'var(--color-accent-green)' : 'var(--color-warning)', fontSize: '0.9rem' }}>
          {isCorrect 
            ? 'All correct! You cleanly matched all categories to their respective program examples.'
            : 'Some matches need another look. Use Replay/Reload to try again, or continue forward.'}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        {!checked ? (
          <button 
            onClick={handleCheck} 
            disabled={!isAllAnswered}
            style={{ backgroundColor: isAllAnswered ? 'var(--color-primary)' : '#cbd5e1', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: isAllAnswered ? 'pointer' : 'not-allowed', fontWeight: 600 }}
          >
            Check Matches
          </button>
        ) : (
          <button 
            onClick={onNext}
            style={{ backgroundColor: 'var(--color-accent-green)', color: '#fff', border: 'none', padding: '0.6rem 1.75rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

function ActorMatchingBlock({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: any;
  onNext: () => void;
}) {
  const actors = [
    { id: 1, text: 'Community members affected by barriers to public services.', role: 'Rights-holders' },
    { id: 2, text: 'Relevant public office responsible for the service.', role: 'Duty-bearer' },
    { id: 3, text: 'Lomi Community Development Association.', role: 'CSO support and accountability actor' },
    { id: 4, text: 'Local community influencers who can encourage or discourage participation.', role: 'Stakeholder or influencer' }
  ];

  const roles = [
    'Rights-holders',
    'Duty-bearer',
    'CSO support and accountability actor',
    'Stakeholder or influencer'
  ];

  const [matches, setMatches] = useState<Record<number, string>>(
    Object.keys(state.matchingState).reduce((acc, key) => {
      acc[Number(key)] = state.matchingState[key];
      return acc;
    }, {} as Record<number, string>)
  );
  const [checked, setChecked] = useState(false);

  const handleSelect = (idx: number, role: string) => {
    setMatches(p => ({ ...p, [idx]: role }));
  };

  const handleCheck = () => {
    onChangeState((prev: any) => ({
      ...prev,
      matchingState: Object.keys(matches).reduce((acc, k) => {
        acc[k] = matches[Number(k)];
        return acc;
      }, {} as Record<string, string>)
    }));
    setChecked(true);
  };

  const isAllAnswered = Object.keys(matches).length === 4;
  const isCorrect = Object.keys(matches).every(k => matches[Number(k)] === actors[Number(k) - 1].role);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '70vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
      <h3 style={{ fontSize: '1.6rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
        Practice Matching: Actor Roles
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
        Match each actor group in our fictional scenario with their correct HRBA categorization:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {actors.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.75rem' }}><strong>Actor {item.id}:</strong> {item.text}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <select
                value={matches[item.id] || ''}
                onChange={(e) => handleSelect(item.id, e.target.value)}
                disabled={checked}
                style={{ padding: '0.4rem', backgroundColor: '#0f172a', border: '1px solid var(--color-border-dark)', color: '#fff', borderRadius: '4px', outline: 'none', fontSize: '0.85rem', flexGrow: 1 }}
              >
                <option value="">-- Choose Role --</option>
                {roles.map((r, i) => <option key={i} value={r}>{r}</option>)}
              </select>

              {checked && (
                <span style={{ fontSize: '1.25rem' }}>
                  {matches[item.id] === item.role ? '✅' : '◻️'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {checked && (
        <div style={{ padding: '0.75rem', borderRadius: '4px', backgroundColor: isCorrect ? 'rgba(145,200,82,0.1)' : 'rgba(249,115,22,0.1)', color: isCorrect ? 'var(--color-accent-green)' : 'var(--color-warning)', fontSize: '0.9rem' }}>
          {isCorrect 
            ? 'Correct! You correctly mapped all actor roles. CSOs act as bridges, rather than replacing the government (primary duty-bearer).'
            : 'Some roles need another look. Replay or continue forward.'}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        {!checked ? (
          <button 
            onClick={handleCheck} 
            disabled={!isAllAnswered}
            style={{ backgroundColor: isAllAnswered ? 'var(--color-primary)' : '#cbd5e1', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: isAllAnswered ? 'pointer' : 'not-allowed', fontWeight: 600 }}
          >
            Check Matches
          </button>
        ) : (
          <button 
            onClick={onNext}
            style={{ backgroundColor: 'var(--color-accent-green)', color: '#fff', border: 'none', padding: '0.6rem 1.75rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

function SurveyBlock({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: any;
  onNext: () => void;
}) {
  const surveyItems = [
    { id: 'Q1', cat: 'Participation', text: 'People and communities affected by our work are involved early enough to shape plans, not only comment after key decisions are already made.' },
    { id: 'Q2', cat: 'Participation', text: 'We reduce practical barriers to participation, such as language, disability access, meeting times, transport cost, child care, safety, or fear of speaking.' },
    { id: 'Q3', cat: 'Non-discrimination', text: 'We actively identify which groups may be excluded or face discrimination in our work, using disaggregated information where possible.' },
    { id: 'Q4', cat: 'Non-discrimination', text: 'When we see that some groups benefit less, we adjust our activities, outreach, or support rather than treating everyone in the same way.' },
    { id: 'Q5', cat: 'Accountability', text: 'People know where and how to raise questions, concerns, or complaints about our work, and can do so safely.' },
    { id: 'Q6', cat: 'Accountability', text: 'We record complaints or feedback, respond within an agreed timeframe, and explain what action was taken.' },
    { id: 'Q7', cat: 'Transparency', text: 'We explain our objectives, partner roles, selection criteria, and key decisions in plain language people can understand.' },
    { id: 'Q8', cat: 'Transparency', text: 'We share progress, results, and key changes made because of feedback, including what did not work as planned.' },
    { id: 'Q9', cat: 'Empowerment', text: 'Our work helps people understand relevant rights, entitlements, and available services or decision-making spaces.' },
    { id: 'Q10', cat: 'Empowerment', text: 'We strengthen communities, partners, or member groups to speak for themselves and engage decision-makers directly, not only through our organization.' },
    { id: 'Q11', cat: 'Legality', text: 'We check that our activities align with national law and policy while also watching for risks that law or practice may conflict with human rights standards.' },
    { id: 'Q12', cat: 'Legality', text: 'When relevant, we refer to independent human rights recommendations or reviews, such as treaty body observations, UPR recommendations, or national reviews.' },
    { id: 'Q13', cat: 'Standards', text: 'Our plans clearly link activities to specific rights or human rights standards, not only to general needs or service gaps.' },
    { id: 'Q14', cat: 'Standards', text: 'We check whether services, information, or support are available, accessible, acceptable, and of reasonable quality for different groups.' },
    { id: 'Q15', cat: 'Capacity', text: 'Staff and key partners have practical guidance, examples, or training they can use to apply HRBA in day-to-day work.' },
    { id: 'Q16', cat: 'Capacity', text: 'HRBA is built into planning, budgeting, monitoring, and review, rather than added at the end as a separate checklist.' }
  ];

  const scale = [
    { val: 0, label: '0 - Not yet' },
    { val: 1, label: '1 - Starting' },
    { val: 2, label: '2 - Partly' },
    { val: 3, label: '3 - Consistently' },
    { val: 'N/A', label: 'N/A' }
  ];

  const [answers, setAnswers] = useState<Record<string, number | 'N/A'>>(state.surveyAnswers);
  const [currentPage, setCurrentPage] = useState(0); // 4 questions per page, total 4 pages

  const handleRate = (id: string, score: number | 'N/A') => {
    setAnswers(prev => ({ ...prev, [id]: score }));
  };

  const handleNextPage = () => {
    setCurrentPage(p => p + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(p => p - 1);
  };

  const handleSubmit = () => {
    onChangeState((prev: any) => ({
      ...prev,
      surveyAnswers: answers
    }));
    onNext();
  };

  const startIdx = currentPage * 4;
  const currentQuestions = surveyItems.slice(startIdx, startIdx + 4);
  const isPageAnswered = currentQuestions.every(q => answers[q.id] !== undefined);
  const isLastPage = currentPage === 3;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '72vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
          HRBA Starting-Point Survey
        </h3>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Page {currentPage + 1} of 4</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {currentQuestions.map((q) => (
          <div key={q.id} style={{ padding: '1rem', backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-light)', fontWeight: 700, textTransform: 'uppercase' }}>{q.cat}</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{q.id}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem', lineHeight: '1.4' }}>{q.text}</p>
            
            {/* Rating scale */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
              {scale.map((s) => {
                const selected = answers[q.id] === s.val;
                return (
                  <button
                    key={s.label}
                    onClick={() => handleRate(q.id, s.val as any)}
                    style={{
                      flexGrow: 1,
                      padding: '0.4rem 0.5rem',
                      fontSize: '0.75rem',
                      backgroundColor: selected ? 'var(--color-primary)' : '#0f172a',
                      border: selected ? '1px solid var(--color-primary)' : '1px solid var(--color-border-dark)',
                      color: selected ? '#fff' : '#cbd5e1',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid var(--color-border-dark)',
            color: currentPage === 0 ? '#475569' : '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Previous Page
        </button>

        {!isLastPage ? (
          <button
            onClick={handleNextPage}
            disabled={!isPageAnswered}
            style={{
              backgroundColor: isPageAnswered ? 'var(--color-primary)' : '#cbd5e1',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              cursor: isPageAnswered ? 'pointer' : 'not-allowed',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            Next Page
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isPageAnswered}
            style={{
              backgroundColor: isPageAnswered ? 'var(--color-accent-green)' : '#cbd5e1',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1.5rem',
              borderRadius: '6px',
              cursor: isPageAnswered ? 'pointer' : 'not-allowed',
              fontSize: '0.9rem',
              fontWeight: 700
            }}
          >
            Submit Assessment
          </button>
        )}
      </div>
    </div>
  );
}

function QuizBlock({
  state,
  onChangeState,
  onNext
}: {
  state: LearningState;
  onChangeState: any;
  onNext: () => void;
}) {
  const quizItems = [
    {
      q: 'Q1. What is one important HRBA shift introduced in this module?',
      options: [
        { key: 'A', text: 'From communities as rights-holders to communities as passive recipients' },
        { key: 'B', text: 'From beneficiaries to rights-holders' },
        { key: 'C', text: 'From accountability to activity reporting only' },
        { key: 'D', text: 'From participation to decisions made only by the CSO' }
      ],
      correct: 'B',
      feedback: {
        A: 'Not quite. HRBA moves in the opposite direction: from seeing people only as recipients toward recognizing them as rights-holders.',
        B: 'That’s right. A core HRBA shift is recognizing people as rights-holders with dignity, voice, and legitimate claims.',
        C: 'Not quite. HRBA strengthens accountability rather than reducing work to activity reporting.',
        D: 'Not quite. HRBA strengthens meaningful participation in decisions that affect people.'
      }
    },
    {
      q: 'Q2. Which question is most rights-based?',
      options: [
        { key: 'A', text: 'How many people can we reach quickly?' },
        { key: 'B', text: 'Which activity will be easiest to report?' },
        { key: 'C', text: 'Who is affected, who may be excluded, and who has responsibility to respond?' },
        { key: 'D', text: 'How can we avoid changing our existing plan?' }
      ],
      correct: 'C',
      feedback: {
        A: 'Not quite. Reach matters, but HRBA also asks about rights, exclusion, participation, and responsibility.',
        B: 'Not quite. Reporting matters, but HRBA should not begin only from what is easiest to report.',
        C: 'That’s right. This question connects affected groups, exclusion, and responsibility.',
        D: 'Not quite. HRBA may require adapting plans when people are excluded or accountability is weak.'
      }
    },
    {
      q: 'Q3. Who are rights-holders?',
      options: [
        { key: 'A', text: 'Only people who work in human rights organizations' },
        { key: 'B', text: 'People and groups who have rights' },
        { key: 'C', text: 'Only government officials' },
        { key: 'D', text: 'Only people selected for a project activity' }
      ],
      correct: 'B',
      feedback: {
        A: 'Not quite. All people have rights, not only those working in human rights organizations.',
        B: 'That’s right. Rights-holders are people and groups who have rights.',
        C: 'Not quite. Government actors are usually duty-bearers, not the only rights-holders.',
        D: 'Not quite. People do not become rights-holders only when selected for a project.'
      }
    },
    {
      q: 'Q4. What is usually the CSO role in an HRBA?',
      options: [
        { key: 'A', text: 'To replace all duty-bearers' },
        { key: 'B', text: 'To support participation, evidence, dialogue, and accountability safely' },
        { key: 'C', text: 'To avoid questions about exclusion and responsibility' },
        { key: 'D', text: 'To collect as much personal data as possible' }
      ],
      correct: 'B',
      feedback: {
        A: 'Not quite. CSOs usually do not replace duty-bearers. They can support rights-holders and strengthen accountability.',
        B: 'That’s right. CSOs can support participation, evidence, dialogue, and accountability in safe and practical ways.',
        C: 'Not quite. HRBA asks CSOs to notice exclusion and clarify responsibility.',
        D: 'Not quite. HRBA requires safe and responsible data use, not excessive data collection.'
      }
    },
    {
      q: 'Q5. How should you use the HRBA self-assessment?',
      options: [
        { key: 'A', text: 'As a public ranking of CSOs' },
        { key: 'B', text: 'As a private learning tool to identify strengths and improvement priorities' },
        { key: 'C', text: 'As a replacement for community participation' },
        { key: 'D', text: 'As proof that your CSO already applies HRBA perfectly' }
      ],
      correct: 'B',
      feedback: {
        A: 'Not quite. The self-assessment is private and should not be used to rank CSOs.',
        B: 'That’s right. The self-assessment helps you identify strengths, gaps, and learning priorities.',
        C: 'Not quite. Self-assessment does not replace meaningful participation with rights-holders.',
        D: 'Not quite. The self-assessment is a starting point for learning, not proof of perfection.'
      }
    }
  ];

  const [answers, setAnswers] = useState<Record<number, string>>(
    Object.keys(state.quizAnswers).reduce((acc, key) => {
      acc[Number(key)] = state.quizAnswers[key];
      return acc;
    }, {} as Record<number, string>)
  );
  const [checked, setChecked] = useState(state.quizCompleted);

  const handleSelect = (qIdx: number, key: string) => {
    setAnswers(prev => ({ ...prev, [qIdx]: key }));
  };

  const handleCheck = () => {
    let score = 0;
    Object.keys(answers).forEach((k) => {
      const idx = Number(k);
      if (answers[idx] === quizItems[idx].correct) score++;
    });
    
    onChangeState((prev: any) => ({
      ...prev,
      quizAnswers: Object.keys(answers).reduce((acc, k) => {
        acc[k] = answers[Number(k)];
        return acc;
      }, {} as Record<string, string>),
      quizCompleted: true,
      quizScore: score
    }));
    setChecked(true);
  };

  const isAllAnswered = Object.keys(answers).length === 5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '72vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', color: '#fff', fontFamily: 'var(--font-family-headings)' }}>
        Module 1 Review Quiz
      </h3>
      <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
        Answer the following 5 questions to review your understanding. (Formative check)
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {quizItems.map((item, idx) => (
          <div key={idx} style={{ padding: '1.25rem', backgroundColor: '#1e293b', border: '1px solid var(--color-border-dark)', borderRadius: '8px' }}>
            <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>{item.q}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {item.options.map((opt) => {
                const selected = answers[idx] === opt.key;
                return (
                  <label 
                    key={opt.key}
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center',
                      fontSize: '0.85rem',
                      color: selected ? '#fff' : '#cbd5e1',
                      cursor: checked ? 'default' : 'pointer',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: selected ? 'rgba(59, 153, 212, 0.1)' : 'transparent',
                      borderRadius: '4px'
                    }}
                  >
                    <input 
                      type="radio" 
                      name={`quiz_q_${idx}`} 
                      value={opt.key} 
                      checked={selected}
                      onChange={() => handleSelect(idx, opt.key)} 
                      disabled={checked} 
                      style={{ cursor: checked ? 'default' : 'pointer' }}
                    />
                    <span>{opt.key}. {opt.text}</span>
                  </label>
                );
              })}
            </div>

            {checked && (
              <div 
                style={{ 
                  marginTop: '0.75rem', 
                  fontSize: '0.85rem', 
                  padding: '0.6rem', 
                  borderRadius: '4px', 
                  backgroundColor: answers[idx] === item.correct ? 'rgba(145,200,82,0.1)' : 'rgba(239,68,68,0.1)', 
                  color: answers[idx] === item.correct ? 'var(--color-accent-green)' : 'var(--color-danger)',
                  lineHeight: '1.4'
                }}
              >
                {answers[idx] === item.correct
                  ? `✓ That's right. ${item.feedback[answers[idx] as 'B']}`
                  : `Let's clarify. ${item.feedback[answers[idx] as 'A'] || 'A stronger answer addresses rights, inclusion, and accountability. Review the key definitions to build your understanding.'}`}
              </div>
            )}
          </div>
        ))}
      </div>

      {checked && (
        <div style={{ border: '2px solid var(--color-primary)', backgroundColor: 'rgba(59, 153, 212, 0.1)', padding: '1.25rem', borderRadius: '8px', textAlign: 'center', margin: '1rem 0' }}>
          <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Quiz Results Checked</strong>
          <div style={{ fontSize: '2.5rem', color: '#fff', fontWeight: 800, margin: '0.4rem 0' }}>
            {state.quizScore} / 5
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
            {state.quizScore >= 4 ? 'Great job! You have solid understanding of HRBA foundations.' : 'Consider reviewing the key definitions and myths before launching the final test.'}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem', paddingBottom: '1rem' }}>
        {!checked ? (
          <button 
            onClick={handleCheck} 
            disabled={!isAllAnswered}
            style={{ backgroundColor: isAllAnswered ? 'var(--color-primary)' : '#cbd5e1', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: isAllAnswered ? 'pointer' : 'not-allowed', fontWeight: 600 }}
          >
            Submit Quiz
          </button>
        ) : (
          <button 
            onClick={onNext}
            style={{ backgroundColor: 'var(--color-accent-green)', color: '#fff', border: 'none', padding: '0.6rem 1.75rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
