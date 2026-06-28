import { useState, type KeyboardEvent, type ReactNode } from 'react';
import type { LearningState } from '../../../state/learningState';
import {
  MODULE2_FINAL_SUBTITLE,
  MODULE2_FINAL_TITLE,
  module2FinalScreenById,
} from '../../../data/module2-final/module2FinalScreens';
import {
  module2FinalAssets,
  module2FinalAudio,
  module2FinalCuratedResources,
  module2FinalReferenceSlides,
  module2FinalResources,
  module2FinalVideoPlaceholder,
} from '../../../data/module2-final/module2FinalAssets';
import { module2FinalKnowledgeCheckQuestions } from '../../../data/module2-final/module2FinalKnowledgeCheck';
import type { Module2FinalScreenId } from '../../../data/module2-final/module2FinalTypes';
import './module2Final.css';

const MODULE_ID = 'module_02_everyday_cso_work';

interface Module2FinalRendererProps {
  screenId: string;
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
  onNext: () => void;
}

type RevealedMap = Record<string, boolean>;

function addProgress(prev: LearningState, screenId: string) {
  const progress = new Set(prev.screenProgress[MODULE_ID] || []);
  progress.add(screenId);
  return {
    ...prev.screenProgress,
    [MODULE_ID]: Array.from(progress),
  };
}

function updateFinalPortfolio(
  onChangeState: Module2FinalRendererProps['onChangeState'],
  updates: Partial<LearningState['m2FinalPortfolio']>,
) {
  onChangeState((prev) => ({
    ...prev,
    m2FinalPortfolio: {
      ...prev.m2FinalPortfolio,
      ...updates,
      updatedAt: new Date().toISOString(),
    },
  }));
}

function ContinueButton({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button type="button" className="m2-final-primary-button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

function Module2FinalShell({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <main className="m2-final-screen" aria-labelledby="m2-final-screen-title">
      <section className="m2-final-shell">
        <header className="m2-final-header">
          <p className="m2-final-eyebrow">{eyebrow}</p>
          <h1 id="m2-final-screen-title">{title}</h1>
          <p>{lead}</p>
        </header>
        {children}
      </section>
    </main>
  );
}

function TextBlock({ children }: { children: ReactNode }) {
  return <section className="m2-final-text-block">{children}</section>;
}

function Takeaway({ children }: { children: ReactNode }) {
  return (
    <aside className="m2-final-takeaway" role="status">
      <strong>Takeaway</strong>
      <p>{children}</p>
    </aside>
  );
}

function SafetyNote({ children }: { children: ReactNode }) {
  return (
    <aside className="m2-final-safe-note" role="note" aria-label="Mandatory safety note">
      <strong>Mandatory Safety Note</strong>
      <p>{children}</p>
    </aside>
  );
}

function SaveConfirmation({ show }: { show: boolean }) {
  return (
    <p className="m2-final-save-status" aria-live="polite">
      {show ? 'Saved to your Module 2 portfolio.' : ''}
    </p>
  );
}

function OptionalAudioBlock({
  title,
  src,
  transcript,
}: {
  title: string;
  src: string;
  transcript: string[];
}) {
  return (
    <aside className="m2-final-audio-block" aria-label={`Optional audio deep dive: ${title}`}>
      <div className="m2-final-audio-block__header">
        <span className="m2-final-tag">Optional audio deep dive</span>
        <h2>Listen: {title}</h2>
        <p>Audio support is optional and is not required to continue.</p>
      </div>
      <audio controls preload="none" src={src}>
        Your browser does not support embedded audio. Use the transcript below instead.
      </audio>
      <details className="m2-final-transcript">
        <summary>Expand Transcript</summary>
        <div className="m2-final-transcript__body">
          {transcript.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </details>
    </aside>
  );
}

function OptionalReferenceToolkit() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = module2FinalReferenceSlides[activeSlideIndex];
  const goToSlide = (direction: -1 | 1) => {
    setActiveSlideIndex((current) => (
      current + direction + module2FinalReferenceSlides.length
    ) % module2FinalReferenceSlides.length);
  };
  const quickTools = [
    module2FinalResources.everydayRightsLensChecklist,
    module2FinalResources.overlappingBarriersReflectionCard,
  ];
  const resourceGroups = [
    ['Existing Core References', module2FinalCuratedResources.coreReferences],
    ['Course-Created Quick Tools', module2FinalCuratedResources.courseTools],
    ['External References to Verify Before Linking', module2FinalCuratedResources.externalReferences],
  ] as const;

  return (
    <section className="m2-final-toolkit" aria-labelledby="m2-final-toolkit-title">
      <header className="m2-final-toolkit__header">
        <span className="m2-final-tag">Optional resource</span>
        <h2 id="m2-final-toolkit-title">Optional Reference Toolkit</h2>
        <p>
          Use these optional resources to review the Module 2 foundations or keep a safe offline copy.
          These resources are not required for progress.
        </p>
      </header>

      <article className="m2-final-slide-viewer" aria-label="Twelve-slide HRBA foundations reference deck viewer">
        <div className="m2-final-slide-viewer__topline">
          <span className="m2-final-tag">Slide {activeSlideIndex + 1} of {module2FinalReferenceSlides.length}</span>
          <div className="m2-final-slide-viewer__controls" aria-label="Reference slide controls">
            <button type="button" onClick={() => goToSlide(-1)}>Previous slide</button>
            <button type="button" onClick={() => goToSlide(1)}>Next slide</button>
          </div>
        </div>
        <div className="m2-final-slide-card">
          <h3>{activeSlide.title}</h3>
          <p className="m2-final-slide-card__headline">{activeSlide.headline}</p>
          <ul>
            {activeSlide.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <aside>
            <strong>Speaker note</strong>
            <p>{activeSlide.speakerNote}</p>
          </aside>
        </div>
      </article>

      <section className="m2-final-resource-downloads" aria-label="Downloadable course-created quick tools">
        {quickTools.map((resource) => (
          <article key={resource.href} className="m2-final-resource-card">
            <span className="m2-final-tag">{resource.fileType}</span>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.href} download>
              Download {resource.title} ({resource.fileType})
            </a>
          </article>
        ))}
      </section>

      <section className="m2-final-curated-resources" aria-label="Curated reference list">
        {resourceGroups.map(([title, items]) => (
          <article key={title}>
            <h3>{title}</h3>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
        <SafetyNote>
          Do not use these tools to record real identities, exact communities, active disputes, or sensitive personal details.
          Keep notes general and safe.
        </SafetyNote>
      </section>
    </section>
  );
}

function CoverScreen({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  return (
    <main className="m2-final-cover" aria-labelledby="m2-final-cover-title">
      <section className="m2-final-cover__copy">
        <p className="m2-final-eyebrow">Applying the Human Rights-Based Approach in CSO Practice</p>
        <h1 id="m2-final-cover-title">{MODULE2_FINAL_TITLE}</h1>
        <p>{MODULE2_FINAL_SUBTITLE}</p>
        <ContinueButton label="Start Module 2" onClick={onNext} />
      </section>
      <figure className="m2-final-cover__visual">
        <img src={module2FinalAssets.cover.src} alt={module2FinalAssets.cover.alt} />
      </figure>
    </main>
  );
}

function IntroScreen({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  return (
    <Module2FinalShell
      eyebrow="Module 2 intro"
      title={module2FinalVideoPlaceholder.title}
      lead="The final video will be produced later. This screen keeps the approved title, transcript area, and low-bandwidth story-strip fallback stable."
    >
      <section className="m2-final-video-placeholder" aria-label="Intro video placeholder">
        <div className="m2-final-video-placeholder__poster">
          <img
            src={module2FinalVideoPlaceholder.storyStripFallback}
            alt="Panel 1: CSO staff distributing supplies. Panel 2: CSO staff looking at a broken water pump with an under-resourced local official. Panel 3: A community meeting where a few confident speakers are speaking while people facing barriers are not heard. Panel 4: The CSO team planning a new project."
          />
        </div>
        <div className="m2-final-video-placeholder__body">
          <p className="m2-final-tag">{module2FinalVideoPlaceholder.format}</p>
          <h2>Caption and transcript area</h2>
          <p>
            Meet Awra, a local civil society organization in Jiru Amba. The team has delivered important services,
            but recurring water, participation, power, and accountability issues show why an Everyday Rights Lens is needed.
          </p>
          <p>
            The produced video will use the approved narration script and four-scene storyboard. Until then, the story-strip
            remains the stable illustrated fallback.
          </p>
        </div>
      </section>
      <footer className="m2-final-footer">
        <ContinueButton label="Continue to Module 2 Content" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function ObjectivesScreen({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  const objectives = [
    'Explain the difference between a needs-based lens and a human rights-based lens.',
    'Identify rights-holders, duty-bearers, and the role of CSOs as enablers.',
    'Apply the PANEL principles in simple, practical CSO work.',
    'Recognize participation barriers, power dynamics, and overlapping forms of exclusion.',
    'Describe accountability as information, feedback, response, correction, and learning.',
    'Use simple-to-understand rights standards safely and constructively.',
    'Create an Everyday Rights Lens Summary for use in Module 3.',
  ];

  return (
    <Module2FinalShell
      eyebrow="Before the first lesson"
      title="Module 2 Learning Objectives"
      lead="By the end of this module, you will be able to:"
    >
      <ol className="m2-final-objectives">
        {objectives.map((objective) => (
          <li key={objective}>{objective}</li>
        ))}
      </ol>
      <footer className="m2-final-footer">
        <ContinueButton label="Start the first lesson" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen11Welcome({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  return (
    <Module2FinalShell
      eyebrow="Screen 1.1"
      title="Welcome to Module 2: The Everyday Rights Lens"
      lead="Welcome to Module 2. Before we dive into human rights concepts, let us look again at the Jiru Amba story and the recurring problems Awra is trying to understand."
    >
      <TextBlock>
        <p>
          In the opening story, Awra has done important service delivery work: distributing relief, fixing broken pumps,
          and inviting different community members into meetings. Yet the same problems keep returning.
        </p>
        <p>
          This module asks why. Who holds the rights? Who carries public responsibility? Who is excluded from influence?
          Where is power hidden? And how can a CSO support safe accountability without replacing the state?
        </p>
      </TextBlock>
      <section className="m2-final-story-strip">
        <img
          src={module2FinalAssets.openingStoryStrip.src}
          alt="Panel 1: CSO staff distributing supplies. Panel 2: CSO staff looking at a broken water pump with an under-resourced local official. Panel 3: A community meeting where a few confident speakers are speaking while people facing barriers are not heard. Panel 4: The CSO team planning a new project."
        />
      </section>
      <aside className="m2-final-reflection">
        <h2>Hold this thought</h2>
        <p>
          Think about your own organization: What is one recurring challenge your CSO faces where providing a direct service
          does not seem to solve the root problem?
        </p>
      </aside>
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Evolving Our Approach" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen12Approach({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  const [opened, setOpened] = useState<RevealedMap>({});
  const cards = [
    {
      id: 'needs',
      title: 'The Needs-Based Mindset',
      prompt: 'What does this community need, and how can we provide it for them?',
      body: 'People are mainly viewed through their immediate needs, and the CSO is seen as the main provider of support. Success is measured by counting what the CSO delivered, for example, "We handed out 500 food packs."',
    },
    {
      id: 'rights',
      title: 'The Rights-Based Mindset',
      prompt: 'What rights are at stake, why is the community blocked from claiming them, and how can we support the government to fulfill its obligations?',
      body: 'People are viewed as rights-holders with voice, agency, and valid claims. Success is measured by structural change, for example, "The community successfully petitioned the local health desk to restock the clinic."',
    },
  ];

  const reveal = (id: string) => setOpened((prev) => ({ ...prev, [id]: true }));

  return (
    <Module2FinalShell
      eyebrow="Screen 1.2"
      title="Evolving Our Approach"
      lead="Delivering urgent services and emergency relief is vital work. HRBA does not replace that work; it upgrades it."
    >
      <TextBlock>
        <p>
          In Awra's situation, hiring a contractor to fix the water pump provided immediate relief. But because the project
          treated the community as passive "beneficiaries" and did not build the local government's capacity to maintain the
          infrastructure, the problem returned the following year.
        </p>
        <p>
          By evolving our approach, we stop treating the symptoms of poverty and start addressing the structural roots of exclusion.
        </p>
      </TextBlock>
      <section className="m2-final-reveal-grid" aria-label="Click to reveal comparison">
        {cards.map((card) => {
          const isOpen = Boolean(opened[card.id]);
          return (
            <article key={card.id} className={`m2-final-reveal-card ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`m2-final-${card.id}-body`}
                onClick={() => reveal(card.id)}
              >
                <span className="m2-final-reveal-icon" aria-hidden="true">{isOpen ? '-' : '+'}</span>
                <span>{card.title}</span>
              </button>
              <p className="m2-final-card-prompt">{card.prompt}</p>
              {isOpen && (
                <div id={`m2-final-${card.id}-body`} className="m2-final-reveal-body" aria-live="polite">
                  <p>{card.body}</p>
                </div>
              )}
            </article>
          );
        })}
      </section>
      <footer className="m2-final-footer">
        <ContinueButton label="Next: A Tale of Two Water Projects" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen13WaterProjects({
  state,
  onChangeState,
  onNext,
}: Pick<Module2FinalRendererProps, 'state' | 'onChangeState' | 'onNext'>) {
  const [slider, setSlider] = useState(50);
  const [draft, setDraft] = useState(state.m2FinalPortfolio.reframedLanguageNote || '');
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateFinalPortfolio(onChangeState, { reframedLanguageNote: draft });
    setSaved(true);
  };

  return (
    <Module2FinalShell
      eyebrow="Screen 1.3"
      title="A Tale of Two Water Projects"
      lead="To understand the difference between a needs-based lens and a rights-holder lens, let's look at a brief contrast scenario."
    >
      <TextBlock>
        <p><strong>Story setup:</strong> Two neighboring rural communities are facing severe water shortages due to expanding agricultural land.</p>
        <p>
          Move the slider, or use the keyboard controls, to compare the Needs Lens and Rights Lens. Then, let’s apply this to your own work.
          Think of a current or recent project at your CSO. Use the example below as a guide to reframe a passive project description into active rights-based language.
        </p>
      </TextBlock>
      <section
        className="m2-final-compare"
        aria-label="An interactive slider comparing Community A depending on repeated water deliveries with Community B advocating with local officials for water infrastructure."
      >
        <div className="m2-final-compare__visual">
          <img src={module2FinalAssets.waterProjectsAfter.src} alt={module2FinalAssets.waterProjectsAfter.alt} />
          <div className="m2-final-compare__overlay" style={{ width: `${slider}%` }}>
            <img src={module2FinalAssets.waterProjectsBefore.src} alt={module2FinalAssets.waterProjectsBefore.alt} />
          </div>
          <div className="m2-final-compare__handle" style={{ left: `${slider}%` }} aria-hidden="true" />
        </div>
        <label className="m2-final-slider-label">
          <span>Compare Needs Lens and Rights Lens</span>
          <input
            type="range"
            min="0"
            max="100"
            value={slider}
            onChange={(event) => setSlider(Number(event.target.value))}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
                event.preventDefault();
                setSlider((current) => Math.max(0, current - 5));
              }
              if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                event.preventDefault();
                setSlider((current) => Math.min(100, current + 5));
              }
            }}
            aria-valuetext={`${slider}% Needs Lens overlay`}
          />
        </label>
        <div className="m2-final-two-col">
          <article>
            <h2>Left Side - Needs Lens</h2>
            <p>
              The CSO drives a water truck into the village once a week. The community depends on repeated deliveries.
              The CSO reports success to the donor because "1,000 liters of water were delivered to beneficiaries."
            </p>
          </article>
          <article>
            <h2>Right Side - Rights Lens</h2>
            <p>
              The CSO helps the community understand their right to safe and reliable water for household use. Together, they constructively request the woreda water desk to be included in the annual extension plan.
              The CSO reports success because "Rights-holders claimed their entitlements and secured sustainable water access."
            </p>
          </article>
        </div>
      </section>
      <Takeaway>
        Building the community's capacity to claim their rights ensures resources flow long after a single delivery.
      </Takeaway>
      <section className="m2-final-portfolio-block">
        <h2>Everyday Rights Lens Summary</h2>
        <p>
          <strong>Task:</strong>{' '}
          How could you reframe a project description from "beneficiaries receiving aid" into language that highlights
          "rights-holders claiming access or participating"?
        </p>
        <aside className="m2-final-hint-box" aria-label="Worked example">
          <h2>Worked example</h2>
          <ul>
            <li><strong>Before (Needs Lens):</strong> "We distributed 50 agricultural toolkits to the village."</li>
            <li><strong>After (Rights-Holder Lens):</strong> "Farmers used the project to access agricultural resources, discuss barriers with the local agriculture desk, and strengthen their ability to claim support."</li>
          </ul>
        </aside>
        <label className="m2-final-field">
          <span>Reframed project language</span>
          <textarea
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setSaved(false);
            }}
            placeholder="Example: 50 youth rights-holders built the capacity to advocate for inclusive local jobs."
          />
        </label>
        <SafetyNote>
          Do not write real names, exact locations, active disputes, survivor stories, identifiable complaints, politically sensitive details, or sensitive service information. Keep your reflection focused on general project language.
        </SafetyNote>
        <button type="button" className="m2-final-secondary-button" onClick={save}>Save to Portfolio</button>
        <SaveConfirmation show={saved} />
      </section>
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Identifying the Actors" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen21RightsHolders({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  const [opened, setOpened] = useState<RevealedMap>({});
  const cards = [
    {
      id: 'displaced-youth',
      title: 'Displaced Youth',
      needs: 'These young people need emergency shelter and food.',
      rights: 'These youth have a valid claim to safe, dignified living conditions and the right to participate in local youth programs without discrimination.',
    },
    {
      id: 'rural-women',
      title: 'Rural Women',
      needs: "These women need us to deliver water so they don't have to walk so far.",
      rights: 'These women are entitled to safe and reliable water for household use, and have the right to be heard by the authorities managing the water supply.',
    },
    {
      id: 'persons-with-disabilities',
      title: 'Persons with Disabilities',
      needs: 'These individuals need us to bring the meeting notes directly to their homes.',
      rights: 'These individuals have the right to accessible public spaces and information so they can participate in community decisions equally.',
    },
  ];
  const allOpen = cards.every((card) => opened[card.id]);

  return (
    <Module2FinalShell
      eyebrow="Screen 2.1"
      title="Who Holds the Rights?"
      lead="Evolving our approach starts with changing how we see the people we work with."
    >
      <TextBlock>
        <p>
          In planning the Jiru Amba Initiative, Awra focuses on displaced youth excluded from local services, rural women
          who spend hours fetching water, and persons with disabilities who face physical barriers to attending community meetings.
        </p>
        <p>
          In HRBA, every individual and community member is a rights-holder. They are people with rights, voice, and valid claims,
          regardless of gender, age, disability, or displacement status.
        </p>
      </TextBlock>
      <section className="m2-final-card-grid" aria-label="Three interactive cards labeled Displaced Youth, Rural Women, and Persons with Disabilities.">
        {cards.map((card) => {
          const isOpen = Boolean(opened[card.id]);
          return (
            <article key={card.id} className={`m2-final-lens-card ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpened((prev) => ({ ...prev, [card.id]: true }))}
              >
                <span aria-hidden="true">{isOpen ? 'Viewed' : 'Reveal'}</span>
                <strong>{card.title}</strong>
              </button>
              {isOpen && (
                <div className="m2-final-lens-card__body" aria-live="polite">
                  <p><strong>Needs Lens:</strong> {card.needs}</p>
                  <p><strong>Rights-Holder Lens:</strong> {card.rights}</p>
                </div>
              )}
            </article>
          );
        })}
      </section>
      {allOpen && (
        <Takeaway>
          Identifying rights-holders specifically, rather than just saying "the community," helps us understand exactly whose rights are at stake and what specific barriers they face.
        </Takeaway>
      )}
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Who Bears the Duty?" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen22DutyBearers({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  const obligations = [
    {
      id: 'respect',
      label: 'Respect',
      fullTitle: 'Obligation to Respect: Do Not Interfere',
      meaning: 'The state must not block or interfere with people enjoying their rights.',
      example: "A local health clinic does not deny access to maternity care based on a mother's ethnicity, displacement status, or lack of an official ID.",
    },
    {
      id: 'protect',
      label: 'Protect',
      fullTitle: 'Obligation to Protect: Prevent Harm by Others',
      meaning: 'The state must intervene to stop private actors or third parties from violating rights.',
      example: 'The woreda administration intervenes when a private actor restricts access to a water source, investigates, and responds so rural women can safely access household water.',
    },
    {
      id: 'fulfil',
      label: 'Fulfil',
      fullTitle: 'Obligation to Fulfil: Take Active Steps',
      meaning: 'The state must take proactive steps through budgeting, planning, and building services to ensure rights can be realized.',
      example: 'The woreda water office actively budgets for and constructs accessible water points in kebeles where groups facing barriers were previously overlooked.',
    },
  ];
  const [active, setActive] = useState('respect');
  const [viewed, setViewed] = useState<RevealedMap>({ respect: true });
  const activeIndex = obligations.findIndex((item) => item.id === active);
  const activeObligation = obligations[activeIndex] || obligations[0];
  const allViewed = obligations.every((item) => viewed[item.id]);

  const select = (id: string) => {
    setActive(id);
    setViewed((prev) => ({ ...prev, [id]: true }));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
    const nextIndex = (activeIndex + direction + obligations.length) % obligations.length;
    select(obligations[nextIndex].id);
  };

  return (
    <Module2FinalShell
      eyebrow="Screen 2.2"
      title="Who Bears the Duty?"
      lead="If the people of Jiru Amba hold rights, who has the responsibility to ensure those rights are realized?"
    >
      <TextBlock>
        <p>
          Awra's team interacts with the Woreda Water Desk and the Woreda Health Desk. These officials may be overwhelmed
          and under-resourced, but under the law they still hold specific public responsibilities to the community.
        </p>
        <p>
          The State and its institutions remain the primary duty-bearers, including ministries, regional bureaus, woreda desks,
          and kebele administrations.
        </p>
      </TextBlock>
      <section className="m2-final-tabs" aria-label="Duty-bearer obligations">
        <div className="m2-final-tab-list" role="tablist" aria-orientation="horizontal" onKeyDown={onKeyDown}>
          {obligations.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === item.id}
              aria-controls={`m2-final-tab-${item.id}`}
              id={`m2-final-tab-button-${item.id}`}
              className={active === item.id ? 'is-active' : ''}
              onClick={() => select(item.id)}
            >
              <span aria-hidden="true">{active === item.id ? '-' : '+'}</span>
              {item.label}
            </button>
          ))}
        </div>
        <article
          id={`m2-final-tab-${activeObligation.id}`}
          role="tabpanel"
          aria-labelledby={`m2-final-tab-button-${activeObligation.id}`}
          className="m2-final-tab-panel"
        >
          <h2>{activeObligation.fullTitle}</h2>
          <p><strong>What it means:</strong> {activeObligation.meaning}</p>
          <p><strong>Local example:</strong> {activeObligation.example}</p>
        </article>
      </section>
      {allViewed && (
        <Takeaway>
          Duty-bearers are not our enemies; they are public actors with recognized obligations. Even when a woreda desk lacks funding, they still have an immediate obligation to respect rights and allocate their available resources without discrimination.
        </Takeaway>
      )}
      <footer className="m2-final-footer">
        <ContinueButton label="Next: CSOs as Enablers" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen23Enablers({
  state,
  onChangeState,
  onNext,
}: Pick<Module2FinalRendererProps, 'state' | 'onChangeState' | 'onNext'>) {
  const [selected, setSelected] = useState('');
  const [rightsHolder, setRightsHolder] = useState(state.m2FinalPortfolio.actorRightsHolder || '');
  const [dutyBearer, setDutyBearer] = useState(state.m2FinalPortfolio.actorDutyBearer || '');
  const [saved, setSaved] = useState(false);
  const options = [
    {
      id: 'A',
      text: 'Hire a contractor to repair the pump immediately to restore urgent water access and provide immediate community relief.',
      feedback: "Risky if used alone. While this provides urgent relief, it accidentally substitutes the state. The duty-bearer's capacity is not strengthened, and the community may continue to rely on repeated external support.",
    },
    {
      id: 'B',
      text: 'Submit a formal, time-bound written request to the Woreda Water Desk holding them accountable to fix the pump, before first checking the repair process, budget constraints, or who needs to be involved.',
      feedback: 'Risky. A firm formal request without first understanding capacity constraints can create an adversarial relationship and shut down communication.',
    },
    {
      id: 'C',
      text: 'Facilitate a constructive working discussion where the community presents safe evidence of the breakage, and offer technical support to help the woreda draft a joint maintenance budget request.',
      feedback: 'Strong HRBA choice. Awra acts as an enabler by offering planning support to the duty-bearer, building sustainable accountability without creating hostility.',
    },
  ];

  const save = () => {
    updateFinalPortfolio(onChangeState, {
      actorRightsHolder: rightsHolder,
      actorDutyBearer: dutyBearer,
    });
    setSaved(true);
  };

  return (
    <Module2FinalShell
      eyebrow="Screen 2.3"
      title="CSOs as Enablers"
      lead="If the community holds the rights and the state bears the duty, where does your CSO fit into the picture?"
    >
      <section className="m2-final-scenario-visual">
        <img src={module2FinalAssets.brokenWaterPumpBridge.src} alt={module2FinalAssets.brokenWaterPumpBridge.alt} />
      </section>
      <TextBlock>
        <h2>Story Segment: The Broken Water Pump</h2>
        <p>
          A vital water pump breaks in Jiru Amba. The community, fearing waterborne disease, asks Awra’s Director to quickly hire a contractor to fix it.
          Tadesse, a project officer, knows the Woreda Water Desk has the primary maintenance responsibility, but the desk is chronically under-resourced.
        </p>
        <p>
          Help Tadesse decide how Awra should handle the broken water pump. Select the most constructive, HRBA-aligned choice below.
          After, let’s map the actors in your own work.
        </p>
      </TextBlock>
      <section className="m2-final-option-list" aria-label="Broken water pump response options">
        {options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <div key={option.id} className="m2-final-option-item">
              <button
                type="button"
                className={isSelected ? 'is-selected' : ''}
                aria-pressed={isSelected}
                onClick={() => setSelected(option.id)}
              >
                <strong>Option {option.id}</strong>
                <span>{option.text}</span>
              </button>
              {isSelected && (
                <p className="m2-final-option-feedback" aria-live="polite">
                  {option.id === 'C' ? '✓ ' : '! '}
                  {option.feedback}
                </p>
              )}
            </div>
          );
        })}
      </section>
      <section className="m2-final-portfolio-block">
        <h2>Actor Map</h2>
        <p>
          <strong>Task:</strong> Identify one specific rights-holder group and one specific local duty-bearer, who may be under-resourced, relevant to your daily CSO work.
        </p>
        <aside className="m2-final-hint-box" aria-label="Worked example">
          <h2>Worked example</h2>
          <ul>
            <li><strong>Rights-holder:</strong> Young people with visual impairments.</li>
            <li><strong>Duty-bearer:</strong> The Kebele Education Office.</li>
          </ul>
        </aside>
        <div className="m2-final-field-grid">
          <label className="m2-final-field">
            <span>Rights-holder group</span>
            <input
              value={rightsHolder}
              onChange={(event) => {
                setRightsHolder(event.target.value);
                setSaved(false);
              }}
              placeholder="Example: Visually impaired youth"
            />
          </label>
          <label className="m2-final-field">
            <span>Local duty-bearer</span>
            <input
              value={dutyBearer}
              onChange={(event) => {
                setDutyBearer(event.target.value);
                setSaved(false);
              }}
              placeholder="Example: Kebele Education Office"
            />
          </label>
        </div>
        <SafetyNote>
          Do not write real names, exact locations, active disputes, survivor stories, identifiable complaints, politically sensitive details, or sensitive service information. Use general titles, such as "Woreda Health Desk."
        </SafetyNote>
        <button type="button" className="m2-final-secondary-button" onClick={save}>Save to Portfolio</button>
        <SaveConfirmation show={saved} />
      </section>
      <footer className="m2-final-footer">
        <ContinueButton label="Next: The PANEL Principles" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen31Panel({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  const [opened, setOpened] = useState<RevealedMap>({});
  const principles = [
    ['P', 'Participation', 'People must have an active, free, and meaningful voice in decisions that affect their lives, not just an invitation to attend.'],
    ['A', 'Accountability', 'There must be clear responsibilities, transparent sharing of information, and safe ways for the community to provide feedback and receive a response.'],
    ['N', 'Non-Discrimination & Equality', 'We must actively identify and prioritize people facing the greatest barriers, ensuring no one is excluded because of gender, age, disability, displacement status, or background.'],
    ['E', 'Empowerment & Capacity', 'CSOs must help rights-holders build confidence and skills to claim their rights, while also supporting duty-bearers to build capacity to fulfill them.'],
    ['L', 'Legality / Recognized Rights', 'Community claims should be grounded in recognized rights and responsibilities, giving them strength rather than relying on charity.'],
  ] as const;
  const allOpen = principles.every(([letter]) => opened[letter]);

  return (
    <Module2FinalShell
      eyebrow="Screen 3.1"
      title="The PANEL Principles"
      lead="The PANEL principles are practical rules for how rights-holders and duty-bearers interact fairly and effectively."
    >
      <TextBlock>
        <p>
          As Awra prepares the Jiru Amba Initiative, Almaz suggests checking the plan against PANEL: Participation,
          Accountability, Non-Discrimination, Empowerment, and Legality.
        </p>
        <p>The principles remind us that how we work is just as important as what we do.</p>
      </TextBlock>
      <section className="m2-final-panel-grid" aria-label="Five interactive cards spelling out P-A-N-E-L.">
        {principles.map(([letter, title, body]) => {
          const isOpen = Boolean(opened[letter]);
          return (
            <article key={letter} className={`m2-final-panel-card ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpened((prev) => ({ ...prev, [letter]: true }))}
              >
                <span className="m2-final-panel-letter" aria-hidden="true">{letter}</span>
                <span>{title}</span>
                <span aria-hidden="true">{isOpen ? '-' : '+'}</span>
              </button>
              {isOpen && <p aria-live="polite">{body}</p>}
            </article>
          );
        })}
      </section>
      <OptionalAudioBlock {...module2FinalAudio.panelPrinciples} />
      {allOpen && (
        <Takeaway>
          The PANEL principles are complementary. You cannot have true empowerment without meaningful participation, and you cannot have accountability if certain groups face discrimination.
        </Takeaway>
      )}
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Beyond the Roster" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen32Roster({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  const [visited, setVisited] = useState<RevealedMap>({});
  const [active, setActive] = useState('stairs');
  const hotspots = [
    {
      id: 'stairs',
      label: 'Barrier 1: Entrance stairs',
      title: 'Physical Accessibility',
      text: 'Holding meetings in buildings with steep stairs or holding them far from rural areas automatically excludes persons with physical mobility challenges and the elderly.',
      x: '9%',
      y: '48%',
    },
    {
      id: 'notice',
      label: 'Barrier 2: Notice board',
      title: 'Information Access',
      text: 'Providing complex, written information in only one language excludes minority language speakers and community members with lower literacy levels.',
      x: '29%',
      y: '32%',
    },
    {
      id: 'edges',
      label: 'Barrier 3: People at the edges not heard',
      title: 'Weak Meeting Design & Facilitation',
      text: 'Even when people are in the room, a lack of active, inclusive facilitation means some groups dominate while others are silenced. Without safe facilitation, their presence is only token attendance.',
      x: '84%',
      y: '65%',
    },
  ];
  const activeHotspot = hotspots.find((hotspot) => hotspot.id === active) || hotspots[0];
  const allVisited = hotspots.every((hotspot) => visited[hotspot.id]);

  const select = (id: string) => {
    setActive(id);
    setVisited((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <Module2FinalShell
      eyebrow="Screen 3.2"
      title="Beyond the Roster"
      lead="Participation is not the same as counting how many people attended a meeting."
    >
      <TextBlock>
        <h2>Story Segment: The Silent Committee</h2>
        <p>
          Awra hosts a consultation for the new JAI water project. They invite a diverse group, but the meeting is in a building
          with steep stairs, notices are printed in one language, and weak facilitation lets a few confident voices dominate.
        </p>
        <p>
          Token participation happens when people are counted as present but cannot safely understand, speak, or influence decisions.
        </p>
      </TextBlock>
      <section className="m2-final-hotspot" aria-label="Silent Committee hotspot scene">
        <div className="m2-final-hotspot__image">
          <img src={module2FinalAssets.silentCommitteeScene.src} alt={module2FinalAssets.silentCommitteeScene.alt} />
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              type="button"
              className={`m2-final-hotspot__marker ${visited[hotspot.id] ? 'is-visited' : ''}`}
              style={{ left: hotspot.x, top: hotspot.y }}
              aria-label={hotspot.label}
              onClick={() => select(hotspot.id)}
            >
              <span aria-hidden="true">{visited[hotspot.id] ? '✓' : '?'}</span>
            </button>
          ))}
        </div>
        <article className="m2-final-hotspot__panel" aria-live="polite">
          <p className="m2-final-tag">{activeHotspot.label}</p>
          <h2>{activeHotspot.title}</h2>
          <p>{activeHotspot.text}</p>
        </article>
        <div className="m2-final-hotspot-list" aria-label="Screen-reader fallback hotspot list">
          {hotspots.map((hotspot) => (
            <button key={hotspot.id} type="button" onClick={() => select(hotspot.id)}>
              <span aria-hidden="true">{visited[hotspot.id] ? '✓' : '?'}</span>
              {hotspot.label}
            </button>
          ))}
        </div>
      </section>
      {allVisited && (
        <Takeaway>
          A person cannot meaningfully participate if they cannot reach the room, cannot understand the information, or are not safely facilitated to speak. Participation requires intentional design.
        </Takeaway>
      )}
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Designing for Inclusion" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen33Inclusion({
  state,
  onChangeState,
  onNext,
}: Pick<Module2FinalRendererProps, 'state' | 'onChangeState' | 'onNext'>) {
  const items = [
    {
      id: 'workday',
      text: 'Holding the meeting at 10:00 AM on a workday.',
      target: 'token',
    },
    {
      id: 'languages',
      text: 'Providing meeting summaries in multiple local spoken languages and using visual aids.',
      target: 'meaningful',
    },
    {
      id: 'leaders-only',
      text: 'Asking community leaders to make the project decisions before the rest of the community arrives.',
      target: 'token',
    },
    {
      id: 'safe-circle',
      text: 'Offering an additional safe feedback space where young women can speak freely.',
      target: 'meaningful',
    },
  ] as const;
  const portfolio = state.m2FinalPortfolio;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [groupMissing, setGroupMissing] = useState(portfolio.inclusionGroupOftenMissing || '');
  const [practicalStep, setPracticalStep] = useState(portfolio.inclusionPracticalStep || '');
  const [saved, setSaved] = useState(false);
  const allCorrect = items.every((item) => answers[item.id] === item.target);

  const save = () => {
    const summary = [groupMissing && `Group often missing: ${groupMissing}`, practicalStep && `Practical step: ${practicalStep}`]
      .filter(Boolean)
      .join(' | ');
    updateFinalPortfolio(onChangeState, {
      inclusionGroupOftenMissing: groupMissing,
      inclusionPracticalStep: practicalStep,
      inclusionAudit: summary,
    });
    setSaved(true);
  };

  return (
    <Module2FinalShell
      eyebrow="Screen 3.3"
      title="Designing for Inclusion"
      lead="Recognizing barriers is the first step. The next step is actively removing them."
    >
      <TextBlock>
        <p>
          Almaz reviews barriers from the last meeting to ensure that groups facing barriers in Jiru Amba can safely share insights
          and influence the project's direction.
        </p>
        <p>
          Help Almaz sort the following facilitation choices. Match or select each action into either the Token Attendance box,
          meaning Needs work, or the Meaningful Influence box, meaning Strong HRBA.
        </p>
      </TextBlock>
      <section className="m2-final-sorter" aria-label="Token Attendance versus Meaningful Influence sorting task">
        <div className="m2-final-sorter-zones" aria-hidden="true">
          <div><strong>Token Attendance</strong><span>Needs work</span></div>
          <div><strong>Meaningful Influence</strong><span>Strong HRBA</span></div>
        </div>
        {items.map((item, index) => {
          const selected = answers[item.id];
          const hasAnswer = Boolean(selected);
          const isCorrect = selected === item.target;
          return (
            <fieldset key={item.id} className="m2-final-sorter-item">
              <legend>{index + 1}. {item.text}</legend>
              <div className="m2-final-radio-row">
                <label>
                  <input
                    type="radio"
                    name={`m2-final-sort-${item.id}`}
                    checked={selected === 'token'}
                    onChange={() => setAnswers((prev) => ({ ...prev, [item.id]: 'token' }))}
                  />
                  Token Attendance
                </label>
                <label>
                  <input
                    type="radio"
                    name={`m2-final-sort-${item.id}`}
                    checked={selected === 'meaningful'}
                    onChange={() => setAnswers((prev) => ({ ...prev, [item.id]: 'meaningful' }))}
                  />
                  Meaningful Influence
                </label>
              </div>
              <p className="m2-final-item-feedback" aria-live="polite">
                {hasAnswer
                  ? isCorrect
                    ? '✓ Strong HRBA choice.'
                    : item.id === 'leaders-only'
                      ? 'X Needs adjustment. Asking leaders to make decisions before the community arrives is token attendance. Meaningful influence requires shared decision-making.'
                      : 'X Needs adjustment.'
                  : ''}
              </p>
            </fieldset>
          );
        })}
      </section>
      {allCorrect && (
        <Takeaway>
          Strong HRBA response! Meaningful influence requires adapting our methods, like using safe spaces, accessible locations, and visual aids, so that everyone has an equal opportunity to shape the outcome.
        </Takeaway>
      )}
      <section className="m2-final-portfolio-block">
        <h2>Inclusion Audit</h2>
        <p>
          <strong>Task:</strong> Conduct a quick inclusion reflection. Who is missing from your meetings, and what is one practical step to remove their barrier?
        </p>
        <aside className="m2-final-hint-box" aria-label="Worked example">
          <h2>Worked example</h2>
          <ul>
            <li><strong>Group missing:</strong> Rural caregivers.</li>
            <li><strong>Practical step:</strong> Provide childcare at the venue and hold the meeting in the late afternoon.</li>
          </ul>
        </aside>
        <div className="m2-final-field-grid">
          <label className="m2-final-field">
            <span>Group Often Missing</span>
            <input
              value={groupMissing}
              onChange={(event) => {
                setGroupMissing(event.target.value);
                setSaved(false);
              }}
              placeholder="Example: Rural caregivers"
            />
          </label>
          <label className="m2-final-field">
            <span>Practical Step for Inclusion</span>
            <input
              value={practicalStep}
              onChange={(event) => {
                setPracticalStep(event.target.value);
                setSaved(false);
              }}
              placeholder="Example: Provide childcare and adjust meeting time"
            />
          </label>
        </div>
        <SafetyNote>
          Do not write real names, exact locations, active disputes, survivor stories, identifiable complaints, politically sensitive details, or sensitive service information. Keep your examples focused on general groups and systemic barriers.
        </SafetyNote>
        <button type="button" className="m2-final-secondary-button" onClick={save}>Save to Portfolio</button>
        <SaveConfirmation show={saved} />
      </section>
      <footer className="m2-final-footer">
        <ContinueButton label="Continue" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen41Power({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  const items = [
    {
      id: 'rules',
      text: 'The Woreda Agriculture Desk publishes official rules requiring a formal land-holding certificate.',
      target: 'visible',
    },
    {
      id: 'tea-houses',
      text: 'Extension workers only share application deadlines at local tea houses where recognized household representatives gather.',
      target: 'hidden',
    },
    {
      id: 'widowed-farmer',
      text: 'A widowed female farmer does not apply because she believes negotiating resources is "not for someone like her."',
      target: 'invisible',
    },
  ] as const;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const allCorrect = items.every((item) => answers[item.id] === item.target);

  return (
    <Module2FinalShell
      eyebrow="Screen 4.1"
      title="Unmasking Power"
      lead="Even when a support program is formally open to everyone, some people may still be excluded by rules, information channels, or long-standing social expectations."
    >
      <section className="m2-final-scenario-visual">
        <img src={module2FinalAssets.powerMap.src} alt={module2FinalAssets.powerMap.alt} />
      </section>
      <TextBlock>
        <h2>Story Segment: Agricultural Subsidy Rollout</h2>
        <p>
          The Woreda Agriculture Desk is rolling out a new drought-resistant seed subsidy in Jiru Amba. We must map formal rules,
          informal networks, and internalized beliefs.
        </p>
        <p>
          Help Almaz analyze the power dynamics at play in the Jiru Amba agricultural subsidy rollout. Match or select each scenario card into one of three power types.
        </p>
      </TextBlock>
      <aside className="m2-final-hint-box" aria-label="Worked example">
        <h2>Hint</h2>
        <p>Visible = Formal rules; Hidden = Informal networks/information; Invisible = Long-standing social expectations.</p>
      </aside>
      <section className="m2-final-sorter m2-final-power-match" aria-label="Visible, hidden, and invisible power matching">
        <div className="m2-final-sorter-zones" aria-hidden="true">
          <div><span className="m2-final-zone-icon">1</span><strong>Visible Power</strong><span>Formal authority and rules</span></div>
          <div><span className="m2-final-zone-icon">2</span><strong>Hidden Power</strong><span>Agenda and access control</span></div>
          <div><span className="m2-final-zone-icon">3</span><strong>Invisible Power</strong><span>Norms and internalized beliefs</span></div>
        </div>
        {items.map((item, index) => {
          const selected = answers[item.id];
          const hasAnswer = Boolean(selected);
          const isCorrect = selected === item.target;
          return (
            <fieldset key={item.id} className="m2-final-sorter-item">
              <legend>{index + 1}. {item.text}</legend>
              <div className="m2-final-radio-row m2-final-radio-row--three">
                {['visible', 'hidden', 'invisible'].map((choice) => {
                  const isChoiceSelected = selected === choice;
                  return (
                  <label
                    key={choice}
                    className={[
                      isChoiceSelected ? 'is-selected' : '',
                      hasAnswer && isChoiceSelected && isCorrect ? 'is-correct' : '',
                      hasAnswer && isChoiceSelected && !isCorrect ? 'is-incorrect' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <input
                      type="radio"
                      name={`m2-final-power-${item.id}`}
                      checked={isChoiceSelected}
                      onChange={() => setAnswers((prev) => ({ ...prev, [item.id]: choice }))}
                    />
                    <span>{choice === 'visible' ? 'Visible Power' : choice === 'hidden' ? 'Hidden Power' : 'Invisible Power'}</span>
                  </label>
                )})}
              </div>
              <p className={['m2-final-item-feedback', hasAnswer ? (isCorrect ? 'is-correct' : 'is-incorrect') : ''].filter(Boolean).join(' ')} aria-live="polite">
                {hasAnswer
                  ? isCorrect
                    ? item.target === 'visible'
                      ? '✓ Strong HRBA choice. This is Visible Power. Formal rules decide who can access the subsidy.'
                      : item.target === 'hidden'
                        ? '✓ Strong HRBA choice. This is Hidden Power. Informal networks and information channels shape who hears about the opportunity.'
                        : '✓ Strong HRBA choice. This is Invisible Power. Long-standing social expectations can cause individuals to censor themselves and believe they cannot claim support.'
                    : 'X Needs adjustment. Consider whether the power is formal, controls the agenda, or is shaped by social norms.'
                  : ''}
              </p>
            </fieldset>
          );
        })}
      </section>
      <OptionalAudioBlock {...module2FinalAudio.unmaskingPower} />
      {allCorrect && (
        <Takeaway>
          Power itself is not inherently bad; it is a reality in every community. CSOs must understand rules, information channels, and long-standing social expectations so they can safely expand access.
        </Takeaway>
      )}
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Overlapping Barriers" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen42Barriers({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  const [opened, setOpened] = useState<RevealedMap>({});
  const cards = [
    {
      id: 'line',
      title: 'The Registration Line',
      barrier: 'Displacement / documentation barrier',
      text: 'Because her family is displaced, Chaltu lacks the standard local residency ID required by the clerk to easily process her forms.',
    },
    {
      id: 'desk',
      title: 'The Information Desk',
      barrier: 'Communication access barrier',
      text: 'The registration instructions are only given verbally over a loudspeaker, meaning Chaltu cannot hear the announcements and misses her turn.',
    },
    {
      id: 'waiting',
      title: 'The Waiting Area',
      barrier: 'Gender and age barrier',
      text: 'As a young woman, Chaltu is repeatedly bypassed due to informal social hierarchies that prioritize older, more established community members at the desk.',
    },
  ];
  const allOpen = cards.every((card) => opened[card.id]);

  return (
    <Module2FinalShell
      eyebrow="Screen 4.2"
      title="Overlapping Barriers"
      lead="When we look at power, we see that exclusion is rarely simple. People often face more than one barrier at the same time."
    >
      <section className="m2-final-scenario-visual">
        <img src={module2FinalAssets.overlappingBarriersCards.src} alt={module2FinalAssets.overlappingBarriersCards.alt} />
      </section>
      <TextBlock>
        <h2>Worked Example: How Barriers Combine</h2>
        <p>
          Example: In Chaltu's case, her lack of formal documentation, a displacement barrier; her inability to hear megaphone announcements,
          a communication access barrier; and being bypassed by others, a social hierarchy barrier, combine to prevent her from completing the registration process.
          Fixing just one barrier is not enough.
        </p>
      </TextBlock>
      <TextBlock>
        <h2>Meet Chaltu</h2>
        <p>
          Meet Chaltu, a young woman whose family was internally displaced. Chaltu also has a hearing impairment.
          She wants to register for the new livelihood support program.
        </p>
        <p>
          Explore Chaltu’s experience below to see how overlapping barriers combine to prevent her from completing the registration process.
        </p>
      </TextBlock>
      <section className="m2-final-card-grid" aria-label="Three interactive cards showing the Registration Line, Information Desk, and Waiting Area.">
        {cards.map((card) => {
          const isOpen = Boolean(opened[card.id]);
          return (
            <article key={card.id} className={`m2-final-lens-card ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpened((prev) => ({ ...prev, [card.id]: true }))}
              >
                <span aria-hidden="true">{isOpen ? 'Viewed' : 'Reveal'}</span>
                <strong>{card.title}</strong>
              </button>
              {isOpen && (
                <div className="m2-final-lens-card__body" aria-live="polite">
                  <p><strong>{card.barrier}.</strong> {card.text}</p>
                </div>
              )}
            </article>
          );
        })}
      </section>
      <OptionalAudioBlock {...module2FinalAudio.overlappingBarriers} />
      {allOpen && (
        <Takeaway>
          Chaltu is not facing one issue only; her displacement, communication access needs, gender, and age overlap. Making one single adjustment is rarely enough.
        </Takeaway>
      )}
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Navigating Customary Power" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen43CustomaryPower({
  state,
  onChangeState,
  onNext,
}: Pick<Module2FinalRendererProps, 'state' | 'onChangeState' | 'onNext'>) {
  const [selected, setSelected] = useState('');
  const [draft, setDraft] = useState(state.m2FinalPortfolio.powerInsight || '');
  const [saved, setSaved] = useState(false);
  const options = [
    {
      id: 'A',
      text: 'Work only through formal Kebele/woreda administration channels to reduce the risk of exclusion.',
      feedback: 'Risky if used alone. Relying only on formal systems ignores trusted local influence and can create defensiveness.',
    },
    {
      id: 'B',
      text: 'Ask respected community leaders and informal gatekeepers to organize the consultation and identify speakers, so the process moves smoothly and avoids local friction.',
      feedback: 'Risky if used alone. Asking informal gatekeepers to control who participates can make implementation smoother, but it may also create hidden exclusion.',
    },
    {
      id: 'C',
      text: 'Respectfully engage formal authorities and informal actors as allies while intentionally creating context-validated, safe channels for less-heard voices to share their input directly.',
      feedback: 'Strong HRBA choice. This approach respectfully leverages trusted local influence while protecting inclusion through separate safe discussion options.',
    },
  ];

  const save = () => {
    updateFinalPortfolio(onChangeState, { powerInsight: draft });
    setSaved(true);
  };

  return (
    <Module2FinalShell
      eyebrow="Screen 4.3"
      title="Navigating Customary Power"
      lead="Once we identify hidden power and overlapping barriers, we must figure out how to address them safely."
    >
      <section className="m2-final-scenario-visual">
        <img src={module2FinalAssets.customaryPowerDialogue.src} alt={module2FinalAssets.customaryPowerDialogue.alt} />
      </section>
      <TextBlock>
        <p>
          Ato Kebede wants the JAI community consultation to be inclusive. However, community leaders and informal gatekeepers are used to guiding
          how gatherings are organized and whose voices are heard first. Bypassing them may cause disrespect and conflict.
        </p>
        <p>
          Help Ato Kebede decide how to approach the community leaders. Select the most constructive, HRBA-aligned strategy below.
        </p>
      </TextBlock>
      <section className="m2-final-option-list" aria-label="Customary power response options">
        {options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <div key={option.id} className="m2-final-option-item">
              <button
                type="button"
                className={isSelected ? 'is-selected' : ''}
                aria-pressed={isSelected}
                onClick={() => setSelected(option.id)}
              >
                <strong>Option {option.id}</strong>
                <span>{option.text}</span>
              </button>
              {isSelected && (
                <p className="m2-final-option-feedback" aria-live="polite">
                  {option.id === 'C' ? '✓ ' : '! '}
                  {option.feedback}
                </p>
              )}
            </div>
          );
        })}
      </section>
      <OptionalAudioBlock {...module2FinalAudio.customaryPower} />
      <section className="m2-final-portfolio-block">
        <h2>Power Insight</h2>
        <p>
          <strong>Task:</strong> Identify one general community influence channel or trusted communication channel, and note how you might respectfully engage it while ensuring safe inclusion.
        </p>
        <aside className="m2-final-hint-box" aria-label="Worked example">
          <h2>Worked example</h2>
          <p>
            "Important community decisions are often guided by elder councils. We could respectfully engage them while also hosting a separate safe discussion option that includes female cooperative members."
          </p>
        </aside>
        <label className="m2-final-field">
          <span>Community influence channel and safe approach</span>
          <textarea
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setSaved(false);
            }}
            placeholder="Example: Important decisions happen in informal spaces. We could respectfully request a safer expanded gathering."
          />
        </label>
        <SafetyNote>
          Do not write real names, exact locations, active disputes, survivor stories, identifiable complaints, politically sensitive details, or sensitive service information. Describe the community influence channel in general terms.
        </SafetyNote>
        <button type="button" className="m2-final-secondary-button" onClick={save}>Save to Portfolio</button>
        <SaveConfirmation show={saved} />
      </section>
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Accountability & Safe Standards" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen51Accountability({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const myths = [
    {
      id: 'box',
      statement: 'Accountability simply means setting up a hotline or a complaint box.',
      correct: 'false',
      explanation: 'A box or hotline is only a feedback channel. Without a transparent process to review, respond, correct the issue, and learn from it, there is no real accountability.',
    },
    {
      id: 'cso',
      statement: 'CSOs help hold duty-bearers accountable, which means CSOs are duty-bearers themselves.',
      correct: 'false',
      explanation: 'The State remains the primary duty-bearer. CSOs have strong accountability responsibilities to communities: do no harm, be transparent, respond to feedback, and avoid substituting the State.',
    },
    {
      id: 'safe',
      statement: 'Accountability requires safe channels where people know they will not face retaliation for speaking up.',
      correct: 'true',
      explanation: 'Safety is essential. If reporting a problem puts a person facing barriers at risk, the accountability system has failed.',
    },
  ];
  const allAnswered = myths.every((myth) => answers[myth.id]);

  return (
    <Module2FinalShell
      eyebrow="Screen 5.1"
      title="What is Accountability?"
      lead="When a project is running, how do we ensure commitments are kept? This brings us to the A in the PANEL principles: Accountability."
    >
      <TextBlock>
        <p>
          Ato Kebede suggests putting a locked "Complaint Box" outside the kebele office. Almaz asks what happens after the paper drops in.
        </p>
        <p>
          Evaluate the statements below. Accountability is a continuous cycle of responsibility, information, feedback, response, correction, and learning.
        </p>
      </TextBlock>
      <section className="m2-final-myth-grid" aria-label="Three true or false accountability myth cards">
        {myths.map((myth, index) => {
          const answer = answers[myth.id];
          const answered = Boolean(answer);
          const correct = answer === myth.correct;
          return (
            <article key={myth.id} className={`m2-final-myth-card ${answered ? 'is-open' : ''}`}>
              <h2>{index + 1}. Myth check</h2>
              <p>{myth.statement}</p>
              <div className="m2-final-myth-actions">
                {['true', 'false'].map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    aria-pressed={answer === choice}
                    onClick={() => setAnswers((prev) => ({ ...prev, [myth.id]: choice }))}
                  >
                    {choice === 'true' ? 'True' : 'False'}
                  </button>
                ))}
              </div>
              <p className="m2-final-item-feedback" aria-live="polite">
                {answered ? `${correct ? '✓ Correct.' : 'X Review.'} The statement is ${myth.correct === 'true' ? 'True' : 'False'}. ${myth.explanation}` : ''}
              </p>
            </article>
          );
        })}
      </section>
      {allAnswered && (
        <Takeaway>
          Accountability is a two-way street. It requires duty-bearers to explain their actions and correct errors, and it requires CSOs to ensure feedback is safe, respectful, and transparent.
        </Takeaway>
      )}
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Constructive Engagement" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen52Engagement({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  const steps = [
    ['identified', 'Issue is Identified', 'Supplies are redirected.'],
    ['evidence', 'Organize Safe Evidence', 'Awra helps the youth use a simple, low-tech community scorecard to document the service gap without exposing individual names.'],
    ['dialogue', 'Constructive Dialogue', 'Awra facilitates a respectful meeting where youth present the scorecard data to the health desk.'],
    ['response', 'Official Response', 'The health desk reviews the evidence and explains the administrative error.'],
    ['follow-up', 'Correction & Follow-up', 'Supplies are equitably redistributed in the next cycle.'],
  ] as const;
  const [order, setOrder] = useState<Record<string, string>>({});
  const allFilled = steps.every(([id]) => order[id]);
  const allCorrect = steps.every(([id], index) => order[id] === String(index + 1));

  return (
    <Module2FinalShell
      eyebrow="Screen 5.2"
      title="Constructive Engagement"
      lead="When things go wrong, emotions can run high. How can a CSO help a community claim their rights without creating unsafe hostility?"
    >
      <TextBlock>
        <h2>Story Segment: The Misallocated Health Supplies</h2>
        <p>
          Health supplies meant for youth facing barriers do not reach the intended group as planned. Awra must help.
        </p>
        <p>
          Accountability is a continuous loop, not a one-time event. Help Awra build a safe accountability pathway by selecting the correct order of the accountability pathway,
          from identifying the issue to the final correction.
        </p>
        <p>
          <strong>Hint:</strong> Start with Organize Safe Evidence before engaging in Constructive Dialogue.
        </p>
      </TextBlock>
      <section className="m2-final-flow" aria-label="Accountability pathway sequence builder">
        {steps.map(([id, title, text], index) => {
          const selected = order[id] || '';
          const correct = selected === String(index + 1);
          return (
            <label
              key={id}
              className={[
                'm2-final-flow-step',
                selected ? (correct ? 'is-correct' : 'is-incorrect') : '',
              ].filter(Boolean).join(' ')}
            >
              <span className="m2-final-flow-step__title">{title}</span>
              <span>{text}</span>
              <select
                value={selected}
                onChange={(event) => setOrder((prev) => ({ ...prev, [id]: event.target.value }))}
                aria-label={`Choose sequence position for ${title}`}
              >
                <option value="">Choose position</option>
                {[1, 2, 3, 4, 5].map((position) => (
                  <option key={position} value={String(position)}>Position {position}</option>
                ))}
              </select>
              <span className={['m2-final-item-feedback', selected ? (correct ? 'is-correct' : 'is-incorrect') : ''].filter(Boolean).join(' ')} aria-live="polite">
                {selected ? (correct ? '✓ Correct position.' : 'X Needs adjustment.') : ''}
              </span>
            </label>
          );
        })}
      </section>
      <div className="m2-final-feedback" aria-live="polite">
        {allFilled && (
          <p>
            {allCorrect
              ? '✓ Strong HRBA choice.'
              : 'X Needs adjustment. Remember to gather safe evidence, like using a simple feedback tool, before opening a dialogue, and ensure there is follow-up after the official response.'}
          </p>
        )}
      </div>
      {allCorrect && (
        <Takeaway>
          Constructive accountability links evidence, dialogue, response, correction, and follow-up so duty-bearers can respond and rights-holders can see what changed.
        </Takeaway>
      )}
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Simple-to-Understand Standards" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen53Standards({
  state,
  onChangeState,
  onNext,
}: Pick<Module2FinalRendererProps, 'state' | 'onChangeState' | 'onNext'>) {
  const [selected, setSelected] = useState('');
  const [draft, setDraft] = useState(state.m2FinalPortfolio.safeFeedbackMethod || '');
  const [saved, setSaved] = useState(false);
  const blocks = [
    {
      id: 'A',
      text: 'We are begging you to please help us because we are suffering and have nothing.',
      feedback: 'Needs adjustment. The overly technical/legalistic or charity-based wording is unnecessarily adversarial or strips agency. Try to find the balance: respectful, firm, and rooted in equitable standards.',
    },
    {
      id: 'B',
      text: 'We formally declare non-compliance with recognized legal standards and request immediate corrective action.',
      feedback: 'Needs adjustment. The overly technical/legalistic or charity-based wording is unnecessarily adversarial or strips agency. Try to find the balance: respectful, firm, and rooted in equitable standards.',
    },
    {
      id: 'C',
      text: 'We are presenting this scorecard so we can work together to ensure equitable health access for everyone, as recognized in our national standards.',
      feedback: 'Strong HRBA choice.',
    },
  ];
  const feedback = blocks.find((block) => block.id === selected)?.feedback;

  const save = () => {
    updateFinalPortfolio(onChangeState, { safeFeedbackMethod: draft });
    setSaved(true);
  };

  return (
    <Module2FinalShell
      eyebrow="Screen 5.3"
      title="Simple-to-Understand Standards"
      lead="When Awra facilitated the meeting, they didn't just ask for a favor. They grounded their request in recognized standards."
    >
      <TextBlock>
        <p>
          Let’s look at the L in PANEL: Legality. Tadesse helps youth frame their request without needing complex legal language.
        </p>
        <p>
          Let’s apply this to your everyday work. Identify one safe, low-tech way your CSO can collect feedback or evidence from the community
          in your CSO’s regular work or in a future activity, using simple-to-understand standards.
        </p>
      </TextBlock>
      <aside className="m2-final-hint-box" aria-label="Worked example">
        <h2>Worked example</h2>
        <p>
          "We can set up a secure, verbal feedback hour during our next agricultural training where a trusted facilitator takes anonymous notes."
        </p>
      </aside>
      <section className="m2-final-statement-list" aria-label="Simple-to-understand rights-based wording options">
        {blocks.map((block) => (
          <button
            key={block.id}
            type="button"
            className={selected === block.id ? 'is-selected' : ''}
            aria-pressed={selected === block.id}
            onClick={() => setSelected(block.id)}
          >
            <strong>{block.id === 'A' ? 'Charity-based wording' : block.id === 'B' ? 'Overly technical/legalistic wording' : 'Simple-to-understand rights-based wording'}</strong>
            <span>{block.text}</span>
          </button>
        ))}
      </section>
      <div className="m2-final-feedback" aria-live="polite">
        {feedback && <p>{selected === 'C' ? '✓ ' : '! '}{feedback}</p>}
      </div>
      <section className="m2-final-portfolio-block">
        <h2>Safe Feedback Method</h2>
        <p>
          <strong>Task:</strong> What is one safe, low-tech method your CSO can use to gather community feedback or evidence?
        </p>
        <label className="m2-final-field">
          <span>Safe feedback method</span>
          <textarea
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setSaved(false);
            }}
            placeholder="Example: A secure verbal feedback hour where a trusted facilitator takes anonymous notes."
          />
        </label>
        <SafetyNote>
          Do not write real names, exact locations, active disputes, survivor stories, identifiable complaints, politically sensitive details, or sensitive service information. Keep your examples focused on the methods of collecting feedback safely.
        </SafetyNote>
        <button type="button" className="m2-final-secondary-button" onClick={save}>Save to Portfolio</button>
        <SaveConfirmation show={saved} />
      </section>
      <footer className="m2-final-footer">
        <ContinueButton label="Next: The Everyday Rights Lens" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function Screen61Lens({ onNext }: Pick<Module2FinalRendererProps, 'onNext'>) {
  const [checked, setChecked] = useState<RevealedMap>({});
  const items = [
    ['actors', 'Rights & Actors', 'Who are the specific rights-holders, and who are the primary state duty-bearers responsible for responding?'],
    ['inclusion', 'Inclusion', 'Who is excluded, and what overlapping barriers do they face?'],
    ['participation', 'Participation', 'How can we ensure our engagement is meaningful and influential, rather than just token attendance?'],
    ['power', 'Power', 'How are we safely navigating visible, hidden, and invisible power dynamics in the community?'],
    ['accountability', 'Accountability', 'How will we support constructive dialogue, safe feedback, and the practical use of recognized standards?'],
  ] as const;
  const allChecked = items.every(([id]) => checked[id]);

  return (
    <Module2FinalShell
      eyebrow="Screen 6.1"
      title="The Everyday Rights Lens"
      lead="Bring the main foundations together into a practical mental framework before project design begins."
    >
      <section className="m2-final-scenario-visual">
        <img src={module2FinalAssets.everydayRightsLensBridge.src} alt={module2FinalAssets.everydayRightsLensBridge.alt} />
      </section>
      <TextBlock>
        <p>
          Awra's team pauses before formal planning and agrees to ask a core set of questions. The Everyday Rights Lens is a mindset shift:
          before designing an activity, analyze actors, principles, power, and accountability.
        </p>
      </TextBlock>
      <section className="m2-final-checklist" aria-label="Everyday Rights Lens checklist">
        {items.map(([id, title, text]) => {
          const isChecked = Boolean(checked[id]);
          return (
            <label key={id} className={`m2-final-check-item ${isChecked ? 'is-checked' : ''}`}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(event) => setChecked((prev) => ({ ...prev, [id]: event.target.checked }))}
              />
              <span className="m2-final-check-box" aria-hidden="true">{isChecked ? '✓' : ''}</span>
              <span>
                <strong>{title}</strong>
                <span>{text}</span>
                <em>{isChecked ? 'Completed' : 'Not completed yet'}</em>
              </span>
            </label>
          );
        })}
      </section>
      {allChecked && (
        <Takeaway>
          Strong HRBA mindset! You are now looking at community development not just through temporary services, but through structural equity, dignity, and recognized rights.
        </Takeaway>
      )}
      <OptionalReferenceToolkit />
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Your Portfolio Snapshot" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function PortfolioScaffold({
  screenId,
  state,
  onChangeState,
}: Pick<Module2FinalRendererProps, 'screenId' | 'state' | 'onChangeState'>) {
  const portfolio = state.m2FinalPortfolio;

  if (screenId === '4.3') {
    return (
      <label className="m2-final-field">
        <span>Portfolio scaffold: power insight</span>
        <textarea
          value={portfolio.powerInsight}
          onChange={(event) => updateFinalPortfolio(onChangeState, { powerInsight: event.target.value })}
          placeholder="Final interaction will save the approved Screen 4.3 power insight here."
        />
      </label>
    );
  }

  if (screenId === '5.3') {
    return (
      <label className="m2-final-field">
        <span>Portfolio scaffold: safe feedback method</span>
        <textarea
          value={portfolio.safeFeedbackMethod}
          onChange={(event) => updateFinalPortfolio(onChangeState, { safeFeedbackMethod: event.target.value })}
          placeholder="Final interaction will save the approved Screen 5.3 safe standards note here."
        />
      </label>
    );
  }

  return null;
}

function LessonPlaceholder(props: Module2FinalRendererProps) {
  const screen = module2FinalScreenById[props.screenId as Module2FinalScreenId];

  return (
    <Module2FinalShell
      eyebrow={`Approved screen ${screen.id}`}
      title={screen.title}
      lead={screen.purpose}
    >
      <section className="m2-final-placeholder-card">
        <h2>Final Module 2 screen unavailable</h2>
        <p>
          Screen {screen.id} is registered, but no final learner-facing renderer was found for it. Legacy Module 2 content is intentionally not loaded here.
        </p>
        <PortfolioScaffold {...props} />
      </section>
      <footer className="m2-final-footer">
        <ContinueButton label={screen.id === '6.1' ? 'Next: Your Portfolio Snapshot' : 'Continue'} onClick={props.onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function PortfolioSnapshotScreen({ state, onNext }: Pick<Module2FinalRendererProps, 'state' | 'onNext'>) {
  const portfolio = state.m2FinalPortfolio;
  const inclusionSummary = portfolio.inclusionAudit || [
    portfolio.inclusionGroupOftenMissing && `Group often missing: ${portfolio.inclusionGroupOftenMissing}`,
    portfolio.inclusionPracticalStep && `Practical step: ${portfolio.inclusionPracticalStep}`,
  ].filter(Boolean).join(' | ');
  const blank = '[No response entered]';
  const entries = [
    { title: 'Evolving Our Approach', value: portfolio.reframedLanguageNote || blank },
    { title: 'Identifying the Actors', value: [portfolio.actorRightsHolder, portfolio.actorDutyBearer].filter(Boolean).join(' / ') || blank },
    { title: 'Designing for Inclusion', value: inclusionSummary || blank },
    { title: 'Power insight', value: portfolio.powerInsight || blank },
    { title: 'Safe feedback method', value: portfolio.safeFeedbackMethod || blank },
  ];
  const offlineCardItems = [
    ['Rights & Actors', 'Who are the specific rights-holders, and who are the primary state duty-bearers responsible for responding?'],
    ['Inclusion', 'Who is excluded, and what overlapping barriers do they face?'],
    ['Participation', 'How can engagement be meaningful and influential, not token attendance?'],
    ['Power', 'How are visible, hidden, and invisible power dynamics being navigated safely?'],
    ['Accountability', 'How will constructive dialogue, safe feedback, and recognized standards be supported?'],
  ] as const;
  const offlineCard = [
    'Everyday Rights Lens Offline Card',
    '',
    ...offlineCardItems.map(([title, text], index) => `${index + 1}. ${title}: ${text}`),
  ].join('\n');

  const printSummary = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const downloadOfflineCard = () => {
    if (typeof document === 'undefined') return;
    const blob = new Blob([offlineCard], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'everyday-rights-lens-offline-card.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Module2FinalShell
      eyebrow="Screen 6.2"
      title="Your Portfolio Snapshot"
      lead="Throughout this module, you have reflected on how HRBA concepts apply to your own organization. Let’s review the insights you’ve gathered."
    >
      <TextBlock>
        <p>
          Below is your Everyday Rights Lens Summary. It captures your reflections on shifting mindsets, mapping actors, and navigating power.
        </p>
        <p>
          Review your snapshot below. If a saved section is blank, you may leave it blank or return to the earlier screen to complete it.
        </p>
      </TextBlock>
      <section className="m2-final-snapshot-document" aria-label="Everyday Rights Lens Summary">
        <header className="m2-final-snapshot-document__header">
          <span className="m2-final-tag">Learner artifact</span>
          <h2>Everyday Rights Lens Summary</h2>
          <p>A safe, general summary of your Module 2 reflections for use in Module 3.</p>
        </header>
        {entries.map((entry) => (
          <article key={entry.title} className={['m2-final-snapshot-card', entry.value === blank ? 'is-empty' : ''].filter(Boolean).join(' ')}>
            <h2>{entry.title}</h2>
            <p>{entry.value}</p>
          </article>
        ))}
      </section>
      <TextBlock>
        <h2>Print/Save fallback</h2>
        <p>
          <strong>Task:</strong> Review your compiled notes and use the Print/Save button to keep a safe copy of your reflections for your records.
        </p>
        <p>
          If the button does not work on your device, use your browser print function, copy the summary into a private offline document,
          or download the blank checklist below.
        </p>
      </TextBlock>
      <SafetyNote>
        Please review your summary before saving or printing. Ensure you have not included real names, exact locations, active disputes,
        survivor stories, identifiable complaints, politically sensitive details, or sensitive service information. Your output should summarize
        your learning safely and generally to protect yourself and your community.
      </SafetyNote>
      <section className="m2-final-offline-card">
        <div>
          <span className="m2-final-tag">Printable field reminder</span>
          <h2>Everyday Rights Lens Offline Card</h2>
          <p>
            Download or print a simple field reminder with the five foundation questions. It is not a project plan, MEAL framework,
            logframe, or 90-day action plan.
          </p>
        </div>
        <ol className="m2-final-offline-checklist">
          {offlineCardItems.map(([title, text]) => (
            <li key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ol>
        <details>
          <summary>Plain-text fallback preview</summary>
          <pre>{offlineCard}</pre>
        </details>
        <div className="m2-final-action-group" aria-label="Portfolio print and download actions">
          <button type="button" className="m2-final-primary-button" onClick={printSummary}>Print / Save Summary</button>
          <button type="button" onClick={downloadOfflineCard}>Download Blank Offline Card</button>
        </div>
      </section>
      <footer className="m2-final-footer">
        <ContinueButton label="Continue to knowledge check" onClick={onNext} />
      </footer>
    </Module2FinalShell>
  );
}

function KnowledgeCheckScreen({
  state,
  onChangeState,
  onNext,
}: Pick<Module2FinalRendererProps, 'state' | 'onChangeState' | 'onNext'>) {
  const answers = state.m2FinalKnowledgeCheckAnswers;
  const allAnswered = module2FinalKnowledgeCheckQuestions.every((question) => answers[question.id]);
  const isCompleted = state.m2FinalKnowledgeCheckCompleted;
  const score = module2FinalKnowledgeCheckQuestions.filter(
    (question) => answers[question.id] === question.correctOptionId,
  ).length;
  const total = module2FinalKnowledgeCheckQuestions.length;
  const percent = Math.round((score / total) * 100);

  const selectAnswer = (questionId: string, optionId: string) => {
    onChangeState((prev) => ({
      ...prev,
      m2FinalKnowledgeCheckAnswers: {
        ...prev.m2FinalKnowledgeCheckAnswers,
        [questionId]: optionId,
      },
      m2FinalKnowledgeCheckCompleted: false,
    }));
  };

  const submit = () => {
    onChangeState((prev) => ({
      ...prev,
      m2FinalKnowledgeCheckCompleted: true,
      screenProgress: addProgress(prev, 'M2-KC'),
    }));
  };

  const retry = () => {
    onChangeState((prev) => ({
      ...prev,
      m2FinalKnowledgeCheckAnswers: {},
      m2FinalKnowledgeCheckCompleted: false,
    }));
  };

  const continueToClose = () => {
    onNext();
  };

  return (
    <Module2FinalShell
      eyebrow="M2-KC"
      title="Module 2 Knowledge Check"
      lead="Check your understanding of the Everyday Rights Lens before completing Module 2."
    >
      <section className="m2-final-kc-summary" aria-live="polite">
        <div>
          <span className="m2-final-kc-summary__icon" aria-hidden="true">1</span>
          <span className="m2-final-tag">Progress</span>
          <strong>{Object.keys(answers).length} of {total} answered</strong>
        </div>
        <div>
          <span className="m2-final-kc-summary__icon" aria-hidden="true">2</span>
          <span className="m2-final-tag">Score</span>
          <strong>{isCompleted ? `${score}/${total} (${percent}%)` : 'Submit to see score'}</strong>
        </div>
      </section>
      <section className="m2-final-kc-list" aria-label="Module 2 knowledge check questions">
        {module2FinalKnowledgeCheckQuestions.map((question, index) => (
          <fieldset key={question.id} className="m2-final-kc-question">
            <legend>
              <span>Question {index + 1}</span>
              {question.prompt}
            </legend>
            {question.options.map((option) => (
              <label
                key={option.id}
                className={[
                  'm2-final-kc-option',
                  answers[question.id] === option.id ? 'is-selected' : '',
                  isCompleted && option.id === question.correctOptionId ? 'is-correct' : '',
                  isCompleted && answers[question.id] === option.id && option.id !== question.correctOptionId ? 'is-incorrect' : '',
                ].filter(Boolean).join(' ')}
              >
                <input
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === option.id}
                  onChange={() => selectAnswer(question.id, option.id)}
                />
                <span className="m2-final-kc-option__marker" aria-hidden="true">
                  {isCompleted && option.id === question.correctOptionId ? '✓' : answers[question.id] === option.id ? '•' : option.id}
                </span>
                <span>
                  <strong>Option {option.id}</strong>
                  {option.text}
                </span>
              </label>
            ))}
            {isCompleted && (
              <p className={['m2-final-kc-feedback', answers[question.id] === question.correctOptionId ? 'is-correct' : 'is-incorrect'].join(' ')} aria-live="polite">
                <span aria-hidden="true">{answers[question.id] === question.correctOptionId ? '✓' : '!'}</span>
                {answers[question.id] === question.correctOptionId ? ' Correct. ' : ' Review. '}
                {question.options.find((option) => option.id === (answers[question.id] || question.correctOptionId))?.feedback}
              </p>
            )}
          </fieldset>
        ))}
      </section>
      {isCompleted && (
        <Takeaway>
          {score === total
            ? 'Strong work. You are ready to carry the Everyday Rights Lens into Module 3.'
            : 'Good progress. Review the feedback above, then retry or continue when you are ready.'}
        </Takeaway>
      )}
      <footer className="m2-final-footer">
        {isCompleted && (
          <button type="button" className="m2-final-secondary-button" onClick={retry}>
            Retry knowledge check
          </button>
        )}
        {!isCompleted ? (
          <ContinueButton
            label={allAnswered ? 'Submit knowledge check' : 'Answer all questions to submit'}
            onClick={submit}
            disabled={!allAnswered}
          />
        ) : (
          <ContinueButton label="Continue to module closure" onClick={continueToClose} />
        )}
      </footer>
    </Module2FinalShell>
  );
}

function CloseScreen({
  onChangeState,
}: Pick<Module2FinalRendererProps, 'onChangeState'>) {
  const completeModule = () => {
    onChangeState((prev) => {
      const completedModules = prev.completedModules.includes(MODULE_ID)
        ? prev.completedModules
        : [...prev.completedModules, MODULE_ID];

      return {
        ...prev,
        currentModuleId: 'module_03_project_design',
        currentScreenId: 'M3-PLAYER-00',
        currentSubState: null,
        activeModal: null,
        completedModules,
        screenProgress: addProgress(prev, 'M2-Close'),
      };
    });

    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/module-3');
    }
  };

  return (
    <Module2FinalShell
      eyebrow="M2-Close"
      title="Next Steps: Module 3"
      lead="Congratulations on completing Module 2. You have built the Everyday Rights Lens that Module 3 will use for project design."
    >
      <section className="m2-final-close-hero">
        <img src={module2FinalAssets.everydayRightsLensBridge.src} alt="An illustration of a bridge connecting HRBA Foundations to Project Design." />
        <div>
          <h2>Module 2 built the lens. Module 3 applies it.</h2>
          <p>
            Ato Kebede, Almaz, and Tadesse now understand the rights, actors, principles, power dynamics, and accountability pathways
            shaping Jiru Amba. With this foundation, they are ready to open their project planner.
          </p>
        </div>
      </section>
      <section className="m2-final-close-grid" aria-label="Module 2 closing takeaways">
        <article>
          <span className="m2-final-close-card-icon" aria-hidden="true">✓</span>
          <strong>What Module 2 completed</strong>
          <p>You practiced seeing community work through rights-holders, duty-bearers, PANEL, power, accountability, and safe standards.</p>
        </article>
        <article>
          <span className="m2-final-close-card-icon" aria-hidden="true">!</span>
          <strong>What Module 2 does not do</strong>
          <p>It does not ask you to build a logframe, MEAL framework, project plan, or legal case.</p>
        </article>
        <article>
          <span className="m2-final-close-card-icon" aria-hidden="true">3</span>
          <strong>What comes next</strong>
          <p>Module 3 uses this lens to support practical HRBA project design decisions.</p>
        </article>
      </section>
      <footer className="m2-final-footer">
        <ContinueButton label="Continue to Module 3" onClick={completeModule} />
      </footer>
    </Module2FinalShell>
  );
}

export default function Module2FinalRenderer(props: Module2FinalRendererProps) {
  const screen = module2FinalScreenById[props.screenId as Module2FinalScreenId];

  if (!screen) {
    return (
      <Module2FinalShell
        eyebrow="Module 2"
        title="Final Module 2 screen not found"
        lead={`No final Module 2 screen is registered for ${props.screenId}.`}
      >
        <section className="m2-final-placeholder-card">
          <p>Returning to the final Module 2 cover keeps learners out of legacy Module 2 content.</p>
        </section>
        <footer className="m2-final-footer">
          <ContinueButton label="Return to Module 2 cover" onClick={props.onNext} />
        </footer>
      </Module2FinalShell>
    );
  }

  if (screen.kind === 'cover') return <CoverScreen onNext={props.onNext} />;
  if (screen.kind === 'intro') return <IntroScreen onNext={props.onNext} />;
  if (screen.kind === 'objectives') return <ObjectivesScreen onNext={props.onNext} />;
  if (screen.id === '1.1') return <Screen11Welcome onNext={props.onNext} />;
  if (screen.id === '1.2') return <Screen12Approach onNext={props.onNext} />;
  if (screen.id === '1.3') return <Screen13WaterProjects {...props} />;
  if (screen.id === '2.1') return <Screen21RightsHolders onNext={props.onNext} />;
  if (screen.id === '2.2') return <Screen22DutyBearers onNext={props.onNext} />;
  if (screen.id === '2.3') return <Screen23Enablers {...props} />;
  if (screen.id === '3.1') return <Screen31Panel onNext={props.onNext} />;
  if (screen.id === '3.2') return <Screen32Roster onNext={props.onNext} />;
  if (screen.id === '3.3') return <Screen33Inclusion {...props} />;
  if (screen.id === '4.1') return <Screen41Power onNext={props.onNext} />;
  if (screen.id === '4.2') return <Screen42Barriers onNext={props.onNext} />;
  if (screen.id === '4.3') return <Screen43CustomaryPower {...props} />;
  if (screen.id === '5.1') return <Screen51Accountability onNext={props.onNext} />;
  if (screen.id === '5.2') return <Screen52Engagement onNext={props.onNext} />;
  if (screen.id === '5.3') return <Screen53Standards {...props} />;
  if (screen.id === '6.1') return <Screen61Lens onNext={props.onNext} />;
  if (screen.kind === 'portfolio-snapshot') return <PortfolioSnapshotScreen state={props.state} onNext={props.onNext} />;
  if (screen.kind === 'knowledge-check') return <KnowledgeCheckScreen {...props} />;
  if (screen.kind === 'close') return <CloseScreen onChangeState={props.onChangeState} />;

  return <LessonPlaceholder {...props} />;
}
