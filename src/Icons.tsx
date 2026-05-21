import type { SVGProps } from "react";

export type IconName =
  | "search" | "chevron-right" | "chevron-left" | "chevron-down" | "arrow-right" | "check"
  | "click" | "cards" | "choice" | "connect" | "drag" | "sort" | "order"
  | "bug" | "edit" | "marker" | "puzzle" | "bubble" | "grid" | "pen"
  | "speech" | "mic" | "sparkle" | "graded" | "ungraded" | "book"
  | "compass" | "flag" | "close" | "copy" | "thumbs-up" | "thumbs-down" | "menu" | "sidebar";

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName | string;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
};

export function Icon({
  name,
  size = 18,
  stroke = "currentColor",
  strokeWidth = 1.7,
  ...rest
}: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };
  switch (name) {
    case "search":
      return (<svg {...common}><circle cx="11" cy="11" r="6.5"/><path d="m20 20-3.5-3.5"/></svg>);
    case "chevron-right":
      return (<svg {...common}><path d="m9 6 6 6-6 6"/></svg>);
    case "chevron-left":
      return (<svg {...common}><path d="m15 6-6 6 6 6"/></svg>);
    case "chevron-down":
      return (<svg {...common}><path d="m6 9 6 6 6-6"/></svg>);
    case "arrow-right":
      return (<svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
    case "check":
      return (<svg {...common}><path d="m5 12 4.5 4.5L19 7"/></svg>);
    case "click":
      return (<svg {...common}><path d="M9 4v6"/><path d="M5 8h6"/><path d="M13 12.5 11 11l8 4-3.4 1.3-1.3 3.4-3.3-7.2"/></svg>);
    case "cards":
      return (<svg {...common}><rect x="3" y="6" width="12" height="14" rx="1.6"/><path d="M7 4h12a1 1 0 0 1 1 1v13"/></svg>);
    case "choice":
      return (<svg {...common}><circle cx="6" cy="8" r="2"/><circle cx="6" cy="16" r="2"/><path d="M11 8h9M11 16h9"/></svg>);
    case "connect":
      return (<svg {...common}><circle cx="5" cy="6" r="1.6"/><circle cx="5" cy="18" r="1.6"/><circle cx="19" cy="6" r="1.6"/><circle cx="19" cy="18" r="1.6"/><path d="M6.5 6h11M6.5 18h11M6 7v10M18 7v10"/></svg>);
    case "drag":
      return (<svg {...common}><rect x="3" y="6" width="8" height="5" rx="1"/><rect x="13" y="13" width="8" height="5" rx="1" strokeDasharray="2 2"/><path d="M11 8.5h6M14 7l3 1.5L14 10"/></svg>);
    case "sort":
      return (<svg {...common}><path d="M4 7h10M4 12h7M4 17h4"/><path d="m17 6 3 3-3 3M17 18l3-3-3-3"/></svg>);
    case "order":
      return (<svg {...common}><path d="M5 6h14M5 12h14M5 18h14"/><circle cx="3.5" cy="6" r=".6" fill="currentColor"/><circle cx="3.5" cy="12" r=".6" fill="currentColor"/><circle cx="3.5" cy="18" r=".6" fill="currentColor"/></svg>);
    case "bug":
      return (<svg {...common}><path d="M9 4.5 8 3M15 4.5 16 3"/><path d="M7 9a5 5 0 0 1 10 0v4a5 5 0 0 1-10 0Z"/><path d="M4 11h3M17 11h3M4 16l3-1M17 15l3 1M12 9v9"/></svg>);
    case "edit":
      return (<svg {...common}><path d="M4 20h4l10-10-4-4L4 16Z"/><path d="m14 6 4 4"/></svg>);
    case "marker":
      return (<svg {...common}><path d="M4 20h16"/><path d="m6 17 3-9 5 5-9 3"/><path d="m11 8 4-5 5 5-5 5"/></svg>);
    case "puzzle":
      return (<svg {...common}><path d="M5 9V6h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4h-4a2 2 0 1 0-4 0H5v-4a2 2 0 1 1 0-4Z"/></svg>);
    case "bubble":
      return (<svg {...common}><circle cx="9" cy="10" r="4"/><circle cx="17" cy="14" r="2.5"/><circle cx="6" cy="18" r="1.5"/></svg>);
    case "grid":
      return (<svg {...common}><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>);
    case "pen":
      return (<svg {...common}><path d="M4 20h4l11-11-4-4L4 16Z"/><path d="M14 5l4 4"/></svg>);
    case "speech":
      return (<svg {...common}><path d="M4 5h16v10H8l-4 4Z"/></svg>);
    case "mic":
      return (<svg {...common}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 12a7 7 0 0 0 14 0M12 19v3M8 22h8"/></svg>);
    case "sparkle":
      return (<svg {...common}><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/><path d="m6 6 3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/></svg>);
    case "graded":
      return (<svg {...common}><path d="M12 3.5 14.4 8.6l5.6.8-4 4 1 5.6L12 16.4l-5 2.6 1-5.6-4-4 5.6-.8Z"/></svg>);
    case "ungraded":
      return (<svg {...common}><circle cx="12" cy="12" r="8"/><path d="m8 12 3 3 5-6"/></svg>);
    case "book":
      return (<svg {...common}><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2Z"/><path d="M4 19a2 2 0 0 1 2-2h12"/></svg>);
    case "compass":
      return (<svg {...common}><circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>);
    case "flag":
      return (<svg {...common}><path d="M5 4v17"/><path d="M5 4h12l-2 4 2 4H5"/></svg>);
    case "close":
      return (<svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>);
    case "copy":
      return (<svg {...common}><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>);
    case "thumbs-up":
      return (<svg {...common}><path d="M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 3 2l-1 5h5a2 2 0 0 1 2 2.4l-1.4 6A2 2 0 0 1 16.6 20H7"/></svg>);
    case "thumbs-down":
      return (<svg {...common}><path d="M7 13V4H4v9zM7 13l4 7a2 2 0 0 0 3-2l-1-5h5a2 2 0 0 0 2-2.4l-1.4-6A2 2 0 0 0 16.6 4H7"/></svg>);
    case "menu":
      return (<svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>);
    case "sidebar":
      return (<svg {...common}><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M9 5v14"/><path d="M6.5 8h.01M6.5 11h.01M6.5 14h.01"/></svg>);
    default:
      return (<svg {...common}><circle cx="12" cy="12" r="6"/></svg>);
  }
}

export const KIND_ICONS: Record<string, IconName> = {
  "lernkarten": "cards",
  "auswahl": "choice",
  "verbinden": "connect",
  "luecken": "drag",
  "sortieren": "sort",
  "reihenfolge": "order",
  "fehler-finden": "bug",
  "fehler-korrigieren": "edit",
  "markieren": "marker",
  "memory": "grid",
  "seifenblasen": "bubble",
  "kreuzwortraetsel": "puzzle",
  "ergaenzen": "pen",
  "freies-schreiben": "pen",
  "dialog": "speech",
  "freies-sprechen": "mic",
  "willkommen": "compass",
  "click-tutorial": "click",
  "viel-erfolg": "flag",
};

export const SECTION_ICONS: Record<string, IconName> = {
  einstieg: "compass",
  klickbar: "click",
  spiele: "puzzle",
  schreiben: "pen",
  sprechen: "mic",
  abschluss: "flag",
};
