import CourseRoadmap from './CourseRoadmap';
import { HRBA_COURSE_MODULES } from '../../data/hrbaCourseModules';

interface PlatformShellProps {
  completedModules: string[];
  screenProgress: Record<string, string[]>;
  currentModuleId: string | null;
  currentScreenId: string | null;
  onLaunchModule: (moduleId: string, reviewMode: boolean) => void;
  onResetProgress: () => void;
  portalModeActive?: boolean;
}

export default function PlatformShell({
  completedModules,
  screenProgress,
  currentModuleId,
  currentScreenId,
  onLaunchModule,
  onResetProgress,
  portalModeActive = false,
}: PlatformShellProps) {
  const finalAssessmentCompleted = completedModules.includes('final_assessment');
  const nextModule =
    HRBA_COURSE_MODULES.find((module) => !completedModules.includes(module.moduleId)) ||
    HRBA_COURSE_MODULES[0];
  const nextModuleProgress = (screenProgress[nextModule.moduleId] || []).length;
  const progressTitle = finalAssessmentCompleted
    ? 'Course completed.'
    : completedModules.length === 0 && nextModuleProgress === 0
    ? 'Start your HRBA learning pathway.'
    : nextModule.moduleId === 'final_assessment'
      ? 'Module 5 is complete. Final Assessment is ready.'
      : `Continue with ${nextModule.itemLabel}.`;
  const progressDescription = finalAssessmentCompleted
    ? 'Your progress saves automatically. You can review your final assessment at any time.'
    : completedModules.length === 0 && nextModuleProgress === 0
    ? 'Begin with Module 1. Your progress saves automatically as you move through the course.'
    : nextModule.moduleId === 'final_assessment'
      ? 'You can now open the final course assessment. Pass with a score of 80% or higher to earn your certificate.'
      : `Your progress saves automatically. Continue ${nextModule.title} when you are ready.`;
  const progressCta = finalAssessmentCompleted
    ? 'Review Final Assessment'
    : completedModules.length === 0 && nextModuleProgress === 0
    ? 'Start Module 1'
    : nextModule.moduleId === 'final_assessment'
      ? 'Start Final Assessment'
      : nextModuleProgress > 0
        ? `Resume ${nextModule.itemLabel}`
        : `Start ${nextModule.itemLabel}`;

  return (
    <div
      className={`platform-container ${portalModeActive ? 'platform-container--portal' : ''}`}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Layer 1 Platform Header */}
      {!portalModeActive && (
        <header
          className="platform-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '2rem',
          }}
        >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div 
            style={{ 
              width: '45px', 
              height: '45px', 
              backgroundColor: 'var(--color-primary)', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#fff', 
              fontWeight: 800,
              fontSize: '1.1rem'
            }}
          >
            DEC
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', color: 'var(--color-deep-navy)', fontFamily: 'var(--font-family-headings)', fontWeight: 800 }}>
              CSO Learning Hub
            </h1>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary-text)', fontWeight: 500 }}>
              Ethical & Rights-Based Capacity Platform
            </span>
          </div>
        </div>

        <nav className="platform-header__nav" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
          <span style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>Catalogue</span>
          <span style={{ cursor: 'pointer', color: 'var(--color-secondary-text)' }}>My Portfolio</span>
          <span style={{ cursor: 'pointer', color: 'var(--color-secondary-text)' }}>Focal Support</span>
        </nav>
        </header>
      )}

      {/* Main LMS overview banner */}
      <main style={{ flexGrow: 1 }}>
        <div
          className="platform-course-hero"
          style={{ 
            background: 'linear-gradient(135deg, var(--color-deep-navy) 0%, var(--color-primary) 100%)', 
            color: '#ffffff', 
            padding: '2.5rem', 
            borderRadius: '16px', 
            marginBottom: '2rem', 
            boxShadow: '0 10px 20px -5px rgba(15, 23, 42, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem', fontFamily: 'var(--font-family-headings)', fontWeight: 800 }}>
              Applying the Human Rights-Based Approach in CSO Practice
            </h2>
            <p style={{ fontSize: '1rem', maxWidth: '760px', opacity: 0.9, lineHeight: '1.6' }}>
              This training program guides local civil society organization team members through five practical modules on safe HRBA learning, foundations, project design, implementation, and MEAL.
            </p>
          </div>
          
          {/* Subtle design accents */}
          <div className="platform-course-hero__accent" style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', zIndex: 1 }}></div>
        </div>

        <section className="course-progress-panel" aria-label="Course progress update">
          <div className="course-progress-panel__icon" aria-hidden="true">↗</div>
          <div className="course-progress-panel__copy">
            <h3>{progressTitle}</h3>
            <p>{progressDescription}</p>
          </div>
          <button
            type="button"
            className="course-progress-panel__cta"
            onClick={() => onLaunchModule(finalAssessmentCompleted ? 'final_assessment' : nextModule.moduleId, false)}
          >
            {progressCta}
            <span aria-hidden="true">›</span>
          </button>
        </section>

        {portalModeActive && (
          <p
            role="status"
            style={{
              margin: '-1rem 0 1.5rem',
              color: 'var(--color-secondary-text)',
              fontSize: '0.85rem',
              fontWeight: 700,
              lineHeight: 1.5,
            }}
          >
            Your progress saves automatically. Pass the final assessment with a score of 80% or higher to earn your certificate.
          </p>
        )}

        {/* Roadmap component */}
        <CourseRoadmap 
          completedModules={completedModules}
          screenProgress={screenProgress}
          currentModuleId={currentModuleId}
          currentScreenId={currentScreenId}
          onLaunchModule={onLaunchModule}
        />
      </main>

      {/* Footer */}
      <footer 
        style={{ 
          marginTop: '4rem', 
          paddingTop: '1.5rem', 
          borderTop: '1px solid var(--color-border)', 
          textAlign: 'center', 
          color: 'var(--color-secondary-text)', 
          fontSize: '0.8rem' 
        }}
      >
        <p>&copy; 2026 CSO Learning Hub &middot; Human Rights-Based Approach (HRBA) eLearning Course</p>
        {!portalModeActive && (
          <button
            type="button"
            onClick={onResetProgress}
            style={{
              marginTop: '0.85rem',
              border: '1px solid var(--color-border)',
              borderRadius: '999px',
              padding: '0.55rem 0.85rem',
              background: '#ffffff',
              color: 'var(--color-deep-navy)',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Reset Course Progress
          </button>
        )}
      </footer>
    </div>
  );
}
