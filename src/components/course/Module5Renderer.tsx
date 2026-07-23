import { useEffect } from 'react';
import type { LearningState } from '../../state/learningState';
import { canonicalizeModule5ScreenId } from '../../data/module5/module5EnhancedModel';
import Module5EnhancedJourney from './Module5EnhancedJourney';

type Module5RendererProps = {
  screenId: string;
  state: LearningState;
  onChangeState: (updater: (previous: LearningState) => LearningState) => void;
};

export default function Module5Renderer(props: Module5RendererProps) {
  const screenId = canonicalizeModule5ScreenId(props.screenId);

  useEffect(() => {
    if (!screenId.startsWith('M5-R')) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document
      .querySelectorAll<HTMLElement>('.main-screen-canvas__content, .course-player-shell__content, .course-player__content')
      .forEach((element) => {
        element.scrollTop = 0;
        element.scrollLeft = 0;
      });
  }, [screenId]);

  return <Module5EnhancedJourney {...props} screenId={screenId} />;
}
