import { HRBA_COURSE_MODULES } from '../../data/hrbaCourseModules';
import { canAccessCourseModule } from '../../state/coursePrerequisites';
import ModuleLaunchCard, { type ModuleLaunchStatus } from './ModuleLaunchCard';

interface CourseRoadmapProps {
  completedModules: string[];
  screenProgress: Record<string, string[]>;
  currentModuleId: string | null;
  currentScreenId: string | null;
  onLaunchModule: (moduleId: string, reviewMode: boolean) => void;
}

export default function CourseRoadmap({
  completedModules,
  screenProgress,
  currentModuleId,
  onLaunchModule,
}: CourseRoadmapProps) {
  const statusByModuleId = new Map<string, ModuleLaunchStatus>();

  HRBA_COURSE_MODULES.forEach((module) => {
    const moduleAccessible = canAccessCourseModule(module.moduleId, completedModules);
    const isCompleted = moduleAccessible && completedModules.includes(module.moduleId);
    const hasProgress = (screenProgress[module.moduleId] || []).length > 0 || currentModuleId === module.moduleId;

    if (isCompleted) {
      statusByModuleId.set(module.moduleId, 'completed');
    } else if (moduleAccessible) {
      statusByModuleId.set(module.moduleId, hasProgress ? 'in-progress' : 'not-started');
    } else {
      statusByModuleId.set(module.moduleId, 'locked');
    }
  });

  return (
    <section className="course-roadmap" aria-labelledby="course-roadmap-title">
      <div className="course-roadmap__header">
        <div>
          <p className="course-roadmap__eyebrow">Course structure</p>
          <h3 id="course-roadmap-title" className="sr-only">Course modules and final assessment</h3>
        </div>
        <span className="course-roadmap__count" aria-label="Five course modules plus final assessment">
          5 modules + final assessment
        </span>
      </div>

      <div className="course-roadmap__pathway">
        {HRBA_COURSE_MODULES.map((module) => {
          const status = statusByModuleId.get(module.moduleId) || 'locked';
          const lockedMessage = status === 'locked'
            ? module.moduleId === 'final_assessment'
              ? 'Complete Module 5 to unlock'
              : 'Complete to unlock'
            : undefined;

          return (
            <ModuleLaunchCard
              key={module.moduleId}
              module={module}
              status={status}
              lockedMessage={lockedMessage}
              onLaunch={onLaunchModule}
            />
          );
        })}
      </div>
    </section>
  );
}
