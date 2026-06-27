import { useState, type KeyboardEvent, type ReactNode } from 'react';
import type { LearningState } from '../../../state/learningState';
import {
  MODULE2_FINAL_SUBTITLE,
  MODULE2_FINAL_TITLE,
  module2FinalScreenById,
} from '../../../data/module2-final/module2FinalScreens';
import { module2FinalAssets, module2FinalVideoPlaceholder } from '../../../data/module2-final/module2FinalAssets';
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
    'Use plain-language rights standards safely and constructively.',
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
      lead="To understand the difference between a needs-based lens and a rights-holder lens, compare how two different CSOs might respond to a water shortage."
    >
      <TextBlock>
        <p><strong>Story setup:</strong> Two neighboring rural communities are facing severe water shortages due to expanding agricultural land.</p>
        <p>Use the slider below to compare the Needs Lens and the Rights Lens. The handle is keyboard accessible with Left and Right arrow keys.</p>
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
            <h2>Needs Lens: Community A</h2>
            <p>
              The CSO drives a water truck into the village once a week. The community depends on repeated deliveries.
              The CSO reports success because "1,000 liters of water were delivered to beneficiaries."
            </p>
          </article>
          <article>
            <h2>Rights Lens: Community B</h2>
            <p>
              The CSO helps the community understand their right to safe and reliable water for household use. Together,
              they safely petition the woreda water desk to be included in the annual extension plan.
            </p>
          </article>
        </div>
      </section>
      <Takeaway>
        Providing a water truck saves lives today, but building the community's capacity to claim their rights ensures water flows tomorrow. HRBA empowers communities to be active claimants rather than people only receiving repeated support.
      </Takeaway>
      <section className="m2-final-portfolio-block">
        <h2>Everyday Rights Lens Summary</h2>
        <p>
          How could you reframe a project description from "beneficiaries receiving aid" into language that highlights
          "rights-holders claiming access or participating"?
        </p>
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
          Do not write the names of real local officials, exact service locations, active community disputes, identifiable complaints, or survivor stories. Keep your reflection focused on general project language.
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
      example: 'The woreda water office actively budgets for and constructs accessible water points in marginalized kebeles that were previously ignored.',
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
      text: "Buy and install the pump using Awra's emergency funds to solve the immediate problem quickly.",
      feedback: "Let's rethink this. While this provides immediate relief, it substitutes the state. The duty-bearer learns nothing, and when the pump breaks again next year, the community will be stuck waiting for another CSO delivery.",
    },
    {
      id: 'B',
      text: 'Send a public accusation without first checking facts or opening dialogue.',
      feedback: "Let's rethink this. While accountability is important, this woreda official lacks knowledge and resources, not just motivation. A public accusation without dialogue might create hostility and shut down communication entirely.",
    },
    {
      id: 'C',
      text: 'Share plain-language water standards with the official and help the community organize their evidence to collaboratively request a repair budget.',
      feedback: 'Strong HRBA response! Awra acts as a powerful bridge. By educating the duty-bearer on their obligations and helping the rights-holders present organized evidence, Awra builds long-term capacity and sustainable accountability.',
    },
  ];
  const feedback = options.find((option) => option.id === selected)?.feedback;

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
          A vital water pump breaks in Jiru Amba. The community asks Awra to quickly buy and install a new one. When Tadesse
          visits the Woreda Water Desk, he finds the official is well-meaning but unaware of national guidelines that prioritize domestic water budgets.
        </p>
        <p>
          CSOs are enablers and connectors. If a CSO simply replaces the state, the community depends on repeated CSO action,
          and the duty-bearer never builds capacity or accountability.
        </p>
      </TextBlock>
      <section className="m2-final-option-list" aria-label="Broken water pump response options">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={selected === option.id ? 'is-selected' : ''}
            aria-pressed={selected === option.id}
            onClick={() => setSelected(option.id)}
          >
            <strong>Option {option.id}</strong>
            <span>{option.text}</span>
          </button>
        ))}
      </section>
      <div className="m2-final-feedback" aria-live="polite">
        {feedback && <p>{selected === 'C' ? '✓ ' : '! '}{feedback}</p>}
      </div>
      <section className="m2-final-portfolio-block">
        <h2>Actor Map</h2>
        <p>
          Identify one specific rights-holder group and one specific local duty-bearer connected to an upcoming project or issue.
        </p>
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
          Do not write real names, exact locations, active disputes, survivor stories, identifiable complaints, or sensitive service details. Use general titles, for example, "Woreda Health Desk" instead of a person's name.
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
      text: 'Holding the meeting at 10:00 AM on a workday when most rural women are doing household or agricultural labor.',
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
      text: 'Offering an optional, safe feedback circle where young women can speak freely, ensuring their ideas are directly carried into the main decision process.',
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
          Almaz reviews the last meeting and wants to ensure women, youth, and persons with disabilities in Jiru Amba can safely share insights
          and actually influence the project's direction.
        </p>
        <p>
          Meaningful participation requires deliberate choices about location, language, timing, and safety.
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
                {hasAnswer ? (isCorrect ? '✓ Strong HRBA choice.' : 'X Needs adjustment.') : ''}
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
          Identify one group in your community that is often missing from planning meetings, and list one practical step your CSO could take to ensure their meaningful inclusion.
        </p>
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
          Do not write real names, exact locations, active disputes, survivor stories, identifiable complaints, sensitive service details, or politically sensitive examples. Keep your examples focused on general groups and systemic barriers.
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
      text: 'The Woreda Water Desk publishes the official rules for requesting a new water connection.',
      target: 'visible',
    },
    {
      id: 'silent',
      text: 'A young woman feels unable to raise her hand because social norms and meeting design signal that public planning is for older community members.',
      target: 'invisible',
    },
    {
      id: 'agenda',
      text: 'Due to weak facilitation, the meeting only covers agenda items established committee leaders want to discuss, leaving no time for displaced youth priorities.',
      target: 'hidden',
    },
  ] as const;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const allCorrect = items.every((item) => answers[item.id] === item.target);

  return (
    <Module2FinalShell
      eyebrow="Screen 4.1"
      title="Unmasking Power"
      lead="Even in an accessible room, some voices dominate while others stay quiet. To understand why, we need to unmask power."
    >
      <section className="m2-final-scenario-visual">
        <img src={module2FinalAssets.powerMap.src} alt={module2FinalAssets.powerMap.alt} />
      </section>
      <TextBlock>
        <h2>Story Segment: The Silent Committee Continues</h2>
        <p>
          Almaz reflects on the first JAI consultation and wonders why young women and displaced youth did not speak up when
          the floor was open. She realizes unseen forces were shaping the meeting.
        </p>
        <p>
          <strong>Visible power</strong> is formal authority, rules, and laws. <strong>Hidden power</strong> controls who gets to the table
          and what gets discussed. <strong>Invisible power</strong> includes internalized beliefs and social norms that shape whose voice feels safe or important.
        </p>
      </TextBlock>
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
                    ? '✓ Matched. Strong HRBA choice! Recognizing these dynamics is the first step to addressing them.'
                    : 'X Needs adjustment. Consider whether the power is formal, controls the agenda, or is shaped by social norms.'
                  : ''}
              </p>
            </fieldset>
          );
        })}
      </section>
      {allCorrect && (
        <Takeaway>
          Power itself is not inherently bad; it is a reality in every community. CSOs must understand informal influence and weak facilitation so they can intentionally design meetings that balance the scales and safely amplify unheard voices.
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
      title: 'Kebele Office Registration Line',
      barrier: 'Displacement Barrier',
      text: 'Because her family is displaced, Chaltu lacks the standard local residency ID required by the clerk to easily process her forms.',
    },
    {
      id: 'desk',
      title: 'The Information Desk',
      barrier: 'Disability Barrier',
      text: 'The registration instructions are only given verbally over a loudspeaker, meaning Chaltu cannot hear the announcements and misses her turn.',
    },
    {
      id: 'waiting',
      title: 'The Waiting Area',
      barrier: 'Gender & Age Barrier',
      text: 'As a young woman, Chaltu is repeatedly bypassed due to informal social hierarchies that prioritize older, more established community members at the desk.',
    },
  ];
  const allOpen = cards.every((card) => opened[card.id]);

  return (
    <Module2FinalShell
      eyebrow="Screen 4.2"
      title="Overlapping Barriers"
      lead="Marginalization is rarely simple. People often face more than one barrier at the same time."
    >
      <section className="m2-final-scenario-visual">
        <img src={module2FinalAssets.overlappingBarriersCards.src} alt={module2FinalAssets.overlappingBarriersCards.alt} />
      </section>
      <TextBlock>
        <h2>Worked Example: How Barriers Combine</h2>
        <p>
          Imagine an older man living in a remote village. Distance from the road creates a geographic barrier to healthcare.
          If he also has a visual impairment, he faces physical and informational barriers too. These barriers overlap.
        </p>
      </TextBlock>
      <TextBlock>
        <h2>Meet Chaltu</h2>
        <p>
          Chaltu is a young woman in Jiru Amba. Her family was internally displaced a few years ago, and she has a severe hearing impairment.
          She wants to register for JAI livelihood support at the Kebele office, but she is struggling to access the process.
        </p>
        <p>
          An everyday rights lens asks how age, gender, displacement, disability, language, and poverty combine to lock certain individuals out.
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
      {allOpen && (
        <Takeaway>
          Chaltu is not just facing one issue; her displacement, disability, gender, and age overlap to create a unique experience of exclusion. An HRBA project must be designed to intentionally remove these combined barriers.
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
      text: 'Tell the elders they are no longer allowed to speak first because their tradition violates human rights standards for equal participation.',
      feedback: 'Needs adjustment. Attacking customary leaders creates instant defensiveness and conflict. HRBA seeks to build understanding, not unnecessary hostility.',
    },
    {
      id: 'B',
      text: 'Hold a separate meeting without explaining how it will connect to the main decision process.',
      feedback: 'Needs adjustment. Holding separate, disconnected meetings might seem easier, but it does not integrate marginalized voices into the main decision process and can create misunderstanding.',
    },
    {
      id: 'C',
      text: "Visit the elders beforehand. Respectfully explain that hearing from the young women in a dedicated circle will provide the elders with better information to guide the community's overall development.",
      feedback: 'Strong HRBA choice! This approach treats the elders with dignity while finding a shared value, community development, to respectfully introduce inclusive practices.',
    },
  ];
  const feedback = options.find((option) => option.id === selected)?.feedback;

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
          Ato Kebede wants the next JAI consultation to include a safe feedback circle for young women. Customary elders are used
          to leading these meetings, and changing the rules without consulting them could cause them to withdraw support.
        </p>
        <p>
          Customary structures and elders are not the enemy. CSOs can act as bridges by engaging leaders through dialogue,
          finding shared values, and explaining how inclusion benefits the whole community.
        </p>
        <p>
          <strong>General design note:</strong> CSOs may also consider trusted local communication channels or customary communication
          practices to share rights information and gather feedback, but only when those channels have been context-validated as safe,
          appropriate, and inclusive for marginalized groups.
        </p>
      </TextBlock>
      <section className="m2-final-option-list" aria-label="Customary power response options">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={selected === option.id ? 'is-selected' : ''}
            aria-pressed={selected === option.id}
            onClick={() => setSelected(option.id)}
          >
            <strong>Option {option.id}</strong>
            <span>{option.text}</span>
          </button>
        ))}
      </section>
      <div className="m2-final-feedback" aria-live="polite">
        {feedback && <p>{selected === 'C' ? '✓ ' : '! '}{feedback}</p>}
      </div>
      <section className="m2-final-portfolio-block">
        <h2>Power Insight</h2>
        <p>
          Identify one hidden or invisible power dynamic that affects rights-holders. How might you respectfully navigate it?
        </p>
        <label className="m2-final-field">
          <span>Power dynamic and safe approach</span>
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
          Do not write real names, exact locations, active disputes, survivor stories, identifiable complaints, sensitive service details, or politically sensitive examples. Describe the dynamic in general terms.
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
      explanation: 'Safety is essential. If reporting a problem puts a marginalized person at risk, the accountability system has failed.',
    },
  ];
  const allAnswered = myths.every((myth) => answers[myth.id]);

  return (
    <Module2FinalShell
      eyebrow="Screen 5.1"
      title="What is Accountability?"
      lead="Accountability is a continuous cycle of responsibility, information, feedback, response, correction, and learning."
    >
      <TextBlock>
        <p>
          Ato Kebede suggests putting a locked complaint box outside the kebele office. Almaz agrees it is a start, then asks:
          Who opens it, how do we protect identity, and how do we ensure the woreda responds?
        </p>
        <p>
          True accountability includes responsibility, information, safe feedback, response, correction, and learning.
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
      lead="When things go wrong, emotions can run high. HRBA turns frustration into safe evidence and constructive dialogue."
    >
      <TextBlock>
        <h2>Story Segment: The Misallocated Health Supply</h2>
        <p>
          A batch of health supplies for the IDP youth settlement is unexpectedly redirected to a general clinic. The youth want a public confrontation,
          but Awra knows that reckless confrontation could cause officials to shut down communication.
        </p>
        <p>
          Accountability does not mean attacking duty-bearers. Officials often manage severe resource constraints and overlapping pressures.
          HRBA encourages constructive engagement.
        </p>
        <p>
          <strong>Duty-bearer collaboration note:</strong> Organizing safe evidence is not about attacking officials. It can equip the health desk with
          clear, objective information they need to review the gap, explain the administrative error, respond constructively, follow up, or raise the issue internally.
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
              ? '✓ Strong HRBA choice! By using a simple, low-tech scorecard, Awra helped the youth shift from risky confrontation to safe, compelling dialogue.'
              : 'X Needs adjustment. Gather safe evidence before opening dialogue, and ensure there is follow-up after the official response.'}
          </p>
        )}
      </div>
      {allCorrect && (
        <Takeaway>
          Constructive accountability links evidence, dialogue, response, correction, and follow-up so duty-bearers can respond and rights-holders can see what changed.
        </Takeaway>
      )}
      <footer className="m2-final-footer">
        <ContinueButton label="Next: Plain Language Standards" onClick={onNext} />
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
      feedback: 'Needs adjustment. Block A relies on pity and charity.',
    },
    {
      id: 'B',
      text: 'We demand you immediately fix this violation using formal legal accusations and complex legal language.',
      feedback: 'Needs adjustment. Block B is unnecessarily adversarial and dense.',
    },
    {
      id: 'C',
      text: 'We are presenting this scorecard so we can work together to ensure equitable health access for everyone, as recognized in our national standards.',
      feedback: 'Strong HRBA choice! This statement is respectful, references recognized standards plainly, and invites collaboration rather than hostility.',
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
      title="Plain Language Standards"
      lead="Legality does not require dense legal language. It means grounding practical requests in recognized rights and responsibilities."
    >
      <TextBlock>
        <p>
          Tadesse tells the youth that they do not need to memorize complex legal language. They can remind the desk of its recognized
          public duty to provide equitable care.
        </p>
        <p>
          Plain-language standards shift the conversation from "Please give us aid" to "We are here to help you fulfill recognized responsibilities."
        </p>
      </TextBlock>
      <section className="m2-final-statement-list" aria-label="Plain-language rights claim options">
        {blocks.map((block) => (
          <button
            key={block.id}
            type="button"
            className={selected === block.id ? 'is-selected' : ''}
            aria-pressed={selected === block.id}
            onClick={() => setSelected(block.id)}
          >
            <strong>Text Block {block.id}</strong>
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
          Identify one safe, low-tech way your CSO can collect feedback or evidence from the community this month.
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
          Do not write real names, exact locations, active disputes, survivor stories, identifiable complaints, sensitive service details, or politically sensitive examples. Keep your examples focused on the methods of collecting feedback safely.
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
    { title: 'Navigating Power', value: portfolio.powerInsight || blank },
    { title: 'Constructive Accountability', value: portfolio.safeFeedbackMethod || blank },
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
      lead="Review your Everyday Rights Lens Summary before the Module 2 knowledge check."
    >
      <TextBlock>
        <p>
          Awra's team compiles their reflection notes. They are not drafting a logframe or MEAL indicators yet; they are summarizing
          their new rights-based perspective so they are prepared for project design in Module 3.
        </p>
        <p>
          If a saved section is blank, you may leave it blank or return to the earlier screen to complete it.
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
          If the button does not work on your device, use your browser print function, copy the summary into a private offline document,
          or download the blank checklist below.
        </p>
      </TextBlock>
      <SafetyNote>
        Please review your summary before saving or printing. Ensure you have not included real names, exact locations, active disputes,
        survivor stories, identifiable complaints, sensitive service details, or politically sensitive examples. Your output should summarize
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
