import type { LearningState } from '../../state/learningState';
import Module4EnhancedBatch1 from './module4/Module4EnhancedBatch1';
import Module4EnhancedBatch2 from './module4/Module4EnhancedBatch2';
import Module4EnhancedBatch3 from './module4/Module4EnhancedBatch3';
import Module4EnhancedBatch4 from './module4/Module4EnhancedBatch4';
import {
  Module4EnhancedCompletion,
  Module4EnhancedKnowledgeCheck,
} from './module4/Module4EnhancedFinalScreens';

type Module4RendererProps = {
  screenId: string;
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
};

export default function Module4Renderer(props: Module4RendererProps) {
  if (['M4-S1-01', 'M4-S1-02', 'M4-S1-03', 'M4-S1-04'].includes(props.screenId)) {
    return (
      <Module4EnhancedBatch1
        {...props}
        screenId={props.screenId as 'M4-S1-01' | 'M4-S1-02' | 'M4-S1-03' | 'M4-S1-04'}
      />
    );
  }
  if (['M4-S1-05', 'M4-S1-06', 'M4-S1-07'].includes(props.screenId)) {
    return (
      <Module4EnhancedBatch2
        {...props}
        screenId={props.screenId as 'M4-S1-05' | 'M4-S1-06' | 'M4-S1-07'}
      />
    );
  }
  if (['M4-S1-08', 'M4-S1-09', 'M4-S1-10', 'M4-S1-11'].includes(props.screenId)) {
    return (
      <Module4EnhancedBatch3
        {...props}
        screenId={props.screenId as 'M4-S1-08' | 'M4-S1-09' | 'M4-S1-10' | 'M4-S1-11'}
      />
    );
  }
  if (props.screenId === 'M4-S1-12') return <Module4EnhancedBatch4 {...props} />;
  if (props.screenId === 'M4-S1-13') return <Module4EnhancedKnowledgeCheck {...props} />;
  if (props.screenId === 'M4-S1-14') return <Module4EnhancedCompletion {...props} />;

  return (
    <main className="m4-screen m4-final-screen" aria-labelledby="m4-placeholder-title">
      <section className="m4-final-card">
        <p className="m4-context-label">Module 4</p>
        <h1 id="m4-placeholder-title">Module 4 screen unavailable</h1>
        <p>The requested Module 4 screen is not in the active sequence.</p>
      </section>
    </main>
  );
}
