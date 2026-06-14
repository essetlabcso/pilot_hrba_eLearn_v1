interface PlayerSidebarProps {
  onToggleModal: (modal: 'help' | 'accessibility' | 'glossary' | 'resources' | 'menu' | null) => void;
  activeModal: string | null;
  transcriptVisible: boolean;
  onToggleTranscript: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  playEnabled: boolean;
  onTogglePlay: () => void;
  onReplay: () => void;
  onExit: () => void;
}

type ToolModal = 'menu' | 'glossary' | 'resources' | 'help' | 'accessibility';

type SidebarTool = {
  label: string;
  icon: string;
  modal: ToolModal;
  ariaLabel: string;
  closeAriaLabel?: string;
  modalRootId?: string;
};

const learningTools: SidebarTool[] = [
  { label: 'Menu', icon: 'M', modal: 'menu', ariaLabel: 'Toggle module menu' },
  {
    label: 'Glossary',
    icon: 'G',
    modal: 'glossary',
    ariaLabel: 'Open course glossary',
    closeAriaLabel: 'Close course glossary',
    modalRootId: 'player-glossary-modal'
  },
  {
    label: 'Resources',
    icon: 'R',
    modal: 'resources',
    ariaLabel: 'Open resources list',
    closeAriaLabel: 'Close resources list',
    modalRootId: 'player-resources-modal'
  },
  { label: 'Help Guide', icon: '?', modal: 'help', ariaLabel: 'Open player help guide' },
  {
    label: 'Accessibility',
    icon: 'A',
    modal: 'accessibility',
    ariaLabel: 'Open accessibility options',
    closeAriaLabel: 'Close accessibility options',
    modalRootId: 'player-accessibility-modal'
  },
];

export default function PlayerSidebar({
  onToggleModal,
  activeModal,
  transcriptVisible,
  onToggleTranscript,
  soundEnabled,
  onToggleSound,
  playEnabled,
  onTogglePlay,
  onReplay,
  onExit
}: PlayerSidebarProps) {
  return (
    <aside className="player-sidebar-aside" aria-label="Course tools and media controls">
      <div className="player-sidebar-section">
        <span className="player-sidebar-section-label">Learning Tools</span>

        {learningTools.map((tool) => {
          const isActive = activeModal === tool.modal;
          const modalLauncherAttributes = tool.modalRootId
            ? {
                'aria-expanded': isActive,
                'aria-controls': isActive ? tool.modalRootId : undefined,
                'aria-haspopup': 'dialog' as const
              }
            : {};

          return (
            <button
              key={tool.modal}
              type="button"
              onClick={() => onToggleModal(isActive ? null : tool.modal)}
              aria-label={isActive && tool.closeAriaLabel ? tool.closeAriaLabel : tool.ariaLabel}
              className={`player-sidebar-button ${isActive ? 'is-active' : ''}`}
              {...modalLauncherAttributes}
            >
              <span className="player-sidebar-icon" aria-hidden="true">{tool.icon}</span>
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      <div className="player-sidebar-bottom">
        <div className="player-sidebar-section">
          <span className="player-sidebar-section-label">Media Controls</span>

          <button
            type="button"
            onClick={onToggleTranscript}
            aria-label={transcriptVisible ? 'Hide transcript panel' : 'Show transcript panel'}
            aria-expanded={transcriptVisible}
            aria-controls={transcriptVisible ? 'player-transcript-panel' : undefined}
            className={`player-sidebar-button player-sidebar-button--media ${transcriptVisible ? 'is-active' : ''}`}
          >
            <span className="player-sidebar-icon" aria-hidden="true">CC</span>
            <span>Captions: {transcriptVisible ? 'ON' : 'OFF'}</span>
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={playEnabled ? 'Pause screen' : 'Play screen'}
            className="player-sidebar-button player-sidebar-button--media"
          >
            <span className="player-sidebar-icon" aria-hidden="true">{playEnabled ? 'II' : '>'}</span>
            <span>{playEnabled ? 'Playing' : 'Paused'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute audio' : 'Unmute audio'}
            className="player-sidebar-button player-sidebar-button--media"
          >
            <span className="player-sidebar-icon" aria-hidden="true">{soundEnabled ? 'ON' : 'OFF'}</span>
            <span>Audio: {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            type="button"
            onClick={onReplay}
            aria-label="Reload current screen"
            className="player-sidebar-button player-sidebar-button--media"
          >
            <span className="player-sidebar-icon" aria-hidden="true">R</span>
            <span>Reload State</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onExit}
          aria-label="Return to LMS"
          className="player-sidebar-return"
        >
          Return to LMS
        </button>
      </div>
    </aside>
  );
}
