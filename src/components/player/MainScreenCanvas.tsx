import { forwardRef } from 'react';
import type { ReactNode } from 'react';

type MainScreenCanvasProps = {
  children: ReactNode;
  className?: string;
};

const MainScreenCanvas = forwardRef<HTMLElement, MainScreenCanvasProps>(function MainScreenCanvas({
  children,
  className = '',
}, ref) {
  return (
    <main
      ref={ref}
      className={`player-main-content ${className}`.trim()}
      aria-label="Course screen content"
      tabIndex={-1}
    >
      <div className="main-screen-canvas">
        <div className="main-screen-canvas__content">
          {children}
        </div>
      </div>
    </main>
  );
});

export default MainScreenCanvas;
