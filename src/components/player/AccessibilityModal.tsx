import { useRef } from 'react';
import { useModalFocusContainment } from './useModalFocusContainment';

export type AccessibilityTextSize = 'standard' | 'large' | 'extra-large';

export type AccessibilityPreferences = {
  highContrast: boolean;
  textSize: AccessibilityTextSize;
  reduceMotion: boolean;
};

interface AccessibilityModalProps {
  onClose: () => void;
  preferences: AccessibilityPreferences;
  onUpdatePreferences: (preferences: AccessibilityPreferences) => void;
}

export default function AccessibilityModal({
  onClose,
  preferences,
  onUpdatePreferences
}: AccessibilityModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalFocusContainment(modalRef, closeButtonRef, onClose);

  const updatePreference = <Key extends keyof AccessibilityPreferences>(
    key: Key,
    value: AccessibilityPreferences[Key],
  ) => {
    onUpdatePreferences({
      ...preferences,
      [key]: value,
    });
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
    >
      <div 
        className="modal-content"
        id="player-accessibility-modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-modal-title"
        style={{
          backgroundColor: 'var(--color-surface-player)',
          border: '1px solid var(--color-border-dark)',
          borderRadius: '12px',
          maxWidth: '560px',
          width: '100%',
          padding: '2rem',
          color: 'var(--color-text-player)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 id="a11y-modal-title" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-family-headings)', color: '#fff' }}>
            ♿ Accessibility & Safe Learning Options
          </h3>
          <button 
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close accessibility options"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-secondary-text)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              minWidth: '44px',
              minHeight: '44px',
              padding: '0.35rem'
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ fontSize: '0.95rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', maxHeight: '60vh' }}>
          <section aria-labelledby="a11y-display-title">
            <h4 id="a11y-display-title" style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem' }}>Display Preferences</h4>
            <div className="player-a11y-control-grid" role="group" aria-label="Accessibility display preferences">
              <button
                type="button"
                className={`player-a11y-toggle ${preferences.highContrast ? 'is-active' : ''}`}
                aria-pressed={preferences.highContrast}
                onClick={() => updatePreference('highContrast', !preferences.highContrast)}
              >
                <span>High contrast</span>
                <strong>{preferences.highContrast ? 'On' : 'Off'}</strong>
              </button>

              <label className="player-a11y-select-label">
                <span>Text size</span>
                <select
                  value={preferences.textSize}
                  onChange={(event) => updatePreference('textSize', event.target.value as AccessibilityTextSize)}
                >
                  <option value="standard">Standard</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra large</option>
                </select>
              </label>

              <button
                type="button"
                className={`player-a11y-toggle ${preferences.reduceMotion ? 'is-active' : ''}`}
                aria-pressed={preferences.reduceMotion}
                onClick={() => updatePreference('reduceMotion', !preferences.reduceMotion)}
              >
                <span>Reduce motion</span>
                <strong>{preferences.reduceMotion ? 'On' : 'Off'}</strong>
              </button>
            </div>
            <p>
              These display preferences apply to this player view while the course remains open. They do not change progress,
              scoring, captions, or storage behavior.
            </p>
          </section>

          <section>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem' }}>Keyboard Navigation</h4>
            <p>
              This course player is fully navigable using standard keyboard commands. Use <kbd style={{ background: '#334155', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>Tab</kbd> to traverse buttons, select boxes, and text input boxes. Hit <kbd style={{ background: '#334155', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>Space</kbd> or <kbd style={{ background: '#334155', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>Enter</kbd> to activate.
            </p>
          </section>

          <section>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem' }}>Captions & Transcripts</h4>
            <p>
              Media blocks do not auto-play. Full captions can be toggled using the <strong>Transcript / Captions</strong> panel. A text-alternative transcript box is available under all video blocks in the player.
            </p>
          </section>

          <section>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem' }}>Screen-Reader Support</h4>
            <p>
              Every visual block is configured with rich alt-text alternatives described inside the sequence files. Layouts are constructed semantically to support logical headings reading sequences.
            </p>
          </section>

          <section>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem' }}>Low-Bandwidth Modes</h4>
            <p>
              Heavy video files can be bypassed. We prioritize text-based learning streams, simple illustrations, and downloadable tools to reduce data usage.
            </p>
          </section>

          <section style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '1rem', marginTop: '0.5rem' }}>
            <h4 style={{ color: 'var(--color-accent-green)', fontWeight: 600, marginBottom: '0.5rem' }}>🔒 Safe & Private Learning Rules</h4>
            <p>
              Your learning portfolio is stored entirely locally on your device. Do not enter any real community names, staff details, complaints, safeguarding data, or politically sensitive matters in text areas. Keep your notes general and fictional.
            </p>
          </section>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              minHeight: '44px',
              padding: '0.6rem 1.5rem',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)'
            }}
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
}
