// CSO Learning Hub foundation tokens: source-of-truth values for later implementation.
export const csoLearningHubTokens = {
  color: {
    background: {
      page: "#F9FAFB",
      stage: "#F9FAFB",
    },
    surface: {
      primary: "#FFFFFF",
      softInfo: "#EEF7FC",
      softSuccess: "#F4FAEC",
      softWarning: "#FFF4E8",
      softDanger: "#FEF2F2",
      inverse: "#0F172A",
      inverseRaised: "#1E293B",
      inverseBorder: "#334155",
      contentSafe: "rgba(255, 255, 255, 0.96)",
      contentSafeInverse: "rgba(15, 23, 42, 0.92)",
      readableLabel: "rgba(255, 255, 255, 0.94)",
    },
    text: {
      primary: "#111827",
      strong: "#0F172A",
      secondary: "#4B5563",
      muted: "#6B7280",
      inverse: "#F9FAFB",
      inverseMuted: "#CBD5E1",
      danger: "#7F1D1D",
    },
    action: {
      primary: "#0E6F9F",
      primaryText: "#FFFFFF",
      primaryHover: "#075985",
      secondaryText: "#0E6F9F",
    },
    accent: {
      success: "#91C852",
      warning: "#F97316",
      danger: "#B91C1C",
      info: "#0E6F9F",
      warm: "#F59E0B",
    },
    focus: {
      lightSurface: "#2563EB",
      darkSurface: "#FBBF24",
      imageSurface: "#FBBF24",
      halo: "#0F172A",
    },
    state: {
      hoverOnInverse: {
        surface: "#253449",
        border: "#64748B",
      },
      currentOnInverse: {
        surface: "#064E5F",
        border: "#38BDF8",
        icon: {
          surface: "#38BDF8",
          foreground: "#0F172A",
        },
      },
    },
    overlay: {
      scrimDark: "rgba(15, 23, 42, 0.72)",
      scrimSoft: "rgba(15, 23, 42, 0.48)",
      modal: "rgba(15, 23, 42, 0.72)",
    },
    highContrast: {
      background: "#000000",
      surface: "#111111",
      text: "#FFFFFF",
      focus: "#FFD60A",
      link: "#7DD3FC",
      hover: {
        surface: "#1A1A1A",
        border: "#7DD3FC",
      },
      currentOnInverse: {
        surface: "#002B36",
        border: "#A7F3D0",
        icon: {
          surface: "#A7F3D0",
          foreground: "#000000",
        },
      },
    },
  },
  typography: {
    fontFamily: {
      ui: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: "Outfit, Inter, system-ui, sans-serif",
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    lineHeight: {
      tight: "1.15",
      heading: "1.2",
      body: "1.6",
      relaxed: "1.75",
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "800",
    },
  },
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  border: {
    width: {
      hairline: "1px",
      strong: "2px",
    },
    color: {
      default: "#E5E7EB",
      soft: "#DDE2E9",
      inverse: "#334155",
      contentSafe: "rgba(148, 163, 184, 0.36)",
    },
  },
  shadow: {
    card: "0 10px 24px rgba(15, 23, 42, 0.08)",
    panel: "0 16px 40px rgba(15, 23, 42, 0.12)",
    modal: "0 24px 70px rgba(15, 23, 42, 0.22)",
    focus: "0 0 0 4px rgba(37, 99, 235, 0.22)",
    contentSafe: "0 14px 32px rgba(15, 23, 42, 0.12)",
  },
  motion: {
    duration: {
      fast: "120ms",
      normal: "180ms",
      slow: "240ms",
    },
    easing: {
      standard: "ease-out",
    },
    reduce: "prefers-reduced-motion",
  },
  breakpoint: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  layout: {
    content: {
      maxWidth: "72rem",
    },
    reading: {
      maxWidth: "46rem",
    },
    hero: {
      maxWidth: "80rem",
    },
    sidebar: {
      width: "18rem",
    },
    mobile: {
      safePadding: "1rem",
    },
  },
} as const;

export type CsoLearningHubTokens = typeof csoLearningHubTokens;

export default csoLearningHubTokens;
