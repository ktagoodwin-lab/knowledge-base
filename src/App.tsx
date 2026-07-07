import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { KB_DATA, KB_FLAT, type Article, type FlatArticle, type Section } from "./data";
import { Icon, KIND_ICONS, SECTION_ICONS, type IconName } from "./Icons";

// ---------- welcome / home page ----------
function WillkommenPage({
  onOpenSearch,
  onPick,
}: {
  onOpenSearch: () => void;
  onPick: (id: string) => void;
}) {
  return (
    <div className="kb-home">
      {/* Cover placeholder */}
      <div className="kb-home__cover">
        <div className="kb-home__cover-inner">
          <Icon name="sparkle" size={28} strokeWidth={1.5} />
          <span className="kb-home__cover-label">Cover wird noch hinzugefügt</span>
        </div>
      </div>

      {/* Search */}
      <div className="kb-home__search-wrap">
        <button className="kb-home__search-btn" onClick={onOpenSearch}>
          <Icon name="search" size={16} />
          <span className="kb-home__search-placeholder">
            Artikel, Aufgabentyp oder Tipp suchen…
          </span>
          <span className="kb-home__search-hint">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>
      </div>

      {/* Section grid */}
      <div className="kb-home__sections">
        <h2 className="kb-home__sections-heading">Aufgabentypen</h2>
        <div className="kb-home__grid">
          {KB_DATA.sections.map((s) => (
            <button
              key={s.id}
              className="kb-home__card"
              onClick={() => onPick(s.articles[0].id)}
            >
              <div className="kb-home__card-top">
                <span className="kb-home__card-icon">
                  <Icon name={SECTION_ICONS[s.id]} size={20} strokeWidth={1.7} />
                </span>
                <span className="kb-home__card-kicker">{s.kicker}</span>
              </div>
              <div className="kb-home__card-label">{s.label}</div>
              <div className="kb-home__card-summary">{s.summary}</div>
              <div className="kb-home__card-count">
                {s.articles.length} {s.articles.length === 1 ? "Artikel" : "Artikel"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- helpers ----------
function highlight(text: string, q: string): ReactNode {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
  const parts = text.split(re);
  return parts.map((p, i) =>
    re.test(p) ? <mark key={i}>{p}</mark> : <Fragment key={i}>{p}</Fragment>
  );
}

function useHash(defaultId: string): [string, (next: string) => void] {
  const [hash, setHash] = useState<string>(
    () => window.location.hash.slice(1) || defaultId
  );
  useEffect(() => {
    const fn = () => setHash(window.location.hash.slice(1) || defaultId);
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, [defaultId]);
  const set = useCallback((next: string) => {
    window.location.hash = next;
  }, []);
  return [hash, set];
}

// ---------- small UI atoms ----------
type BadgeTone = "neutral" | "graded" | "free";
function Badge({
  tone = "neutral",
  icon,
  soft,
  children,
}: {
  tone?: BadgeTone;
  icon?: IconName;
  soft?: boolean;
  children: ReactNode;
}) {
  return (
    <span className={`kb-badge kb-badge--${tone} ${soft ? "is-soft" : ""}`}>
      {icon && <Icon name={icon} size={12} strokeWidth={2} />}
      {children}
    </span>
  );
}

const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className="kb-kbd">{children}</kbd>
);

function GradedBadge({ graded }: { graded: boolean | null }) {
  if (graded === null || graded === undefined) return null;
  return (
    <Badge tone="neutral" soft>
      {graded ? "Bewertet" : "Nicht bewertet"}
    </Badge>
  );
}

// ---------- sidebar ----------
function Sidebar({
  sections,
  currentArticleId,
  currentSectionId,
  onPick,
  query,
}: {
  sections: Section[];
  currentArticleId: string;
  currentSectionId: string;
  onPick: (id: string) => void;
  query?: string;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((s) => [s.id, true]))
  );
  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  useEffect(() => {
    if (currentSectionId) setOpen((o) => ({ ...o, [currentSectionId]: true }));
  }, [currentSectionId]);

  return (
    <nav id="knowledge-base-navigation" className="kb-side" aria-label="Knowledge base navigation">
      <div className="kb-side__list">
        {sections.map((s) => {
          const isOpen = open[s.id];
          const isCurrent = s.id === currentSectionId;
          return (
            <div
              key={s.id}
              className={`kb-side__group ${isCurrent ? "is-current" : ""}`}
              data-section={s.id}
            >
              <button
                className="kb-side__group-head"
                onClick={() => toggle(s.id)}
                aria-expanded={isOpen}
              >
                <span className="kb-side__group-icon" aria-hidden="true">
                  <Icon name={SECTION_ICONS[s.id]} size={16} />
                </span>
                <span className="kb-side__group-label">
                  <span className="kb-side__kicker">{s.kicker}</span>
                  {s.label}
                </span>
                <span className="kb-side__group-caret">
                  <Icon name={isOpen ? "chevron-down" : "chevron-right"} size={14} />
                </span>
              </button>
              {isOpen && (
                <ul className="kb-side__items">
                  {s.articles.map((a) => {
                    const matches =
                      !query ||
                      (a.title + " " + a.lede).toLowerCase().includes(query.toLowerCase());
                    if (!matches) return null;
                    const active = a.id === currentArticleId;
                    return (
                      <li key={a.id}>
                        <a
                          href={`#${a.id}`}
                          className={`kb-side__item ${active ? "is-active" : ""}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onPick(a.id);
                          }}
                        >
                          <Icon name={KIND_ICONS[a.id] || "book"} size={14} />
                          <span>{a.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      <div className="kb-side__foot">
        <div className="kb-side__hint">
          Tipp: Drücken Sie <Kbd>⌘</Kbd>
          <Kbd>K</Kbd> für die Suche.
        </div>
      </div>
    </nav>
  );
}

// ---------- video shell ----------
function VideoShell({ article }: { article: Article }) {
  const labels: Record<string, string> = {
    intro: "Einführung",
    click: "Interaktive Übung",
    game: "Spiel",
    write: "Schreibübung",
    speak: "Sprechübung",
    outro: "Abschluss",
  };
  const chipLabel = labels[article.kind] || "Video";
  return (
    <div className="demo demo--video">
      <div className="demo__header">
        <span className="demo__chip">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            style={{ marginRight: 6 }}
          >
            <path d="M8 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 8 5.5z" />
          </svg>
          Video · {chipLabel}
        </span>
        <span className="demo__counter">04:32</span>
      </div>
      <div className="vshell">
        <div
          className="vshell__stage"
          role="img"
          aria-label={`Videovorschau: ${article.title}`}
        >
          <div className="vshell__poster" />
          <button className="vshell__play" type="button" aria-label="Video abspielen">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 8 5.5z" />
            </svg>
          </button>
          <div className="vshell__caption">{article.title}</div>
        </div>
        <div className="vshell__bar">
          <button className="vshell__ctrl" type="button" aria-label="Abspielen">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 8 5.5z" />
            </svg>
          </button>
          <div className="vshell__time">00:00</div>
          <div className="vshell__progress">
            <div className="vshell__progress-fill" />
          </div>
          <div className="vshell__time">04:32</div>
          <button className="vshell__ctrl" type="button" aria-label="Ton">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 9v6h4l5 4V5L8 9z" />
              <path d="M16.5 8.5a5 5 0 0 1 0 7" />
              <path d="M19 6a8 8 0 0 1 0 12" />
            </svg>
          </button>
          <button className="vshell__ctrl" type="button" aria-label="Vollbild">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- embed-only article (Click-Through Tutorial) ----------
function EmbedOnly({ article }: { article: FlatArticle }) {
  const ref = useRef<HTMLDivElement>(null);
  const goFs = () => {
    const el = ref.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el.requestFullscreen?.();
    }
  };
  return (
    <article className="kb-article kb-article--embed" key={article.id}>
      <div className="embed-only" ref={ref}>
        <iframe
          src={article.embedUrl}
          title={article.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          allow="fullscreen"
        />
        <button
          type="button"
          className="embed-only__fs"
          onClick={goFs}
          aria-label="Vollbild"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
          </svg>
        </button>
      </div>
    </article>
  );
}

const GIF_DEMOS: Record<string, string> = {
  "fehler-korrigieren": "/Fehler_finden_und_korrigieren_GIF.gif",
  seifenblasen: "/Seifenblasen_Spiel_GIF.gif",
};

const VIMEO_IDS: Record<string, string> = {
  lernkarten: "1196550791",
  seifenblasen: "1196552973",
  luecken: "1196558759",
  sortieren: "1196564461",
  markieren: "1196566087",
  reihenfolge: "1196567825",
  ergaenzen: "1196570035",
  auswahl: "1196572577",
  verbinden: "1196574271",
  dialog: "1196609517",
  "freies-schreiben": "1196618584",
  "freies-sprechen": "1196623888",
  "fehler-finden": "1197982858",
  kreuzwortraetsel: "1197986536",
  "fehler-korrigieren": "1197991150",
  memory: "1197992785",
};

function GifShell({ article, src }: { article: Article; src: string }) {
  return (
    <div className="demo demo--gif">
      <div className="demo__header">
        <span className="demo__chip">Demo · Beispiel</span>
      </div>
      <div className="gshell">
        <img src={src} alt={`Demo: ${article.title}`} className="gshell__img" />
      </div>
    </div>
  );
}

function VimeoShell({ article, id }: { article: Article; id: string }) {
  return (
    <div className="demo demo--vimeo">
      <div className="demo__header">
        <span className="demo__chip">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: 6 }}>
            <path d="M8 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 8 5.5z" />
          </svg>
          Video · Demo
        </span>
      </div>
      <div className="vimeo-wrap">
        <iframe
          src={`https://player.vimeo.com/video/${id}?autoplay=1&muted=1&controls=0`}
          title={article.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}

// ---------- article body ----------
function ArticleDemo({ article }: { article: FlatArticle }) {
  if (article.id === "übersicht" || article.id === "willkommen" || article.id === "viel-erfolg") return null;
  const vimeoId = VIMEO_IDS[article.id];
  if (vimeoId) return <VimeoShell article={article} id={vimeoId} />;
  const gif = GIF_DEMOS[article.id];
  if (gif) return <GifShell article={article} src={gif} />;
  return <VideoShell article={article} />;
}

function ArticleBody({ article, query }: { article: FlatArticle; query?: string }) {
  if (article.embedUrl) return <EmbedOnly article={article} />;
  return (
    <>
    <article className="kb-article">
      <header className="kb-article__head">
        <div className="kb-article__crumbs">
          <span>Wissensdatenbank</span>
          <Icon name="chevron-right" size={12} />
          <span className="kb-article__crumbs-section">{article.sectionLabel}</span>
        </div>
        <h1 className="kb-article__title">{highlight(article.title, query ?? "")}</h1>
        <div className="kb-article__meta">
          <GradedBadge graded={article.graded} />
        </div>
      </header>

      <p className="kb-article__lede">{highlight(article.lede, query ?? "")}</p>

      {article.body.length > 0 && (
        <div className="kb-article__body">
          {article.body.map((b, i) => {
            if (b.kind === "p")
              return (
                <p key={i} className="kb-article__p">
                  {highlight(b.text, query ?? "")}
                </p>
              );
            if (b.kind === "tip")
              return (
                <div key={i} className="kb-tip">
                  <div className="kb-tip__label">
                    <Icon name="sparkle" size={14} />
                    Tipp
                  </div>
                  <div className="kb-tip__text">{highlight(b.text, query ?? "")}</div>
                </div>
              );
            if (b.kind === "callout")
              return (
                <div key={i} className={`kb-callout kb-callout--${b.tone || "neutral"}`}>
                  <div className="kb-callout__title">
                    <Icon name="check" size={14} />
                    {b.title}
                  </div>
                  <div className="kb-callout__text">{highlight(b.text, query ?? "")}</div>
                </div>
              );
            if (b.kind === "steps")
              return (
                <ol key={i} className="kb-article__steps">
                  {b.items.map((item, j) => (
                    <li key={j} className="kb-article__step">{item}</li>
                  ))}
                </ol>
              );
            if (b.kind === "signoff")
              return (
                <p key={i} className="kb-article__signoff">
                  {b.text}
                </p>
              );
            return null;
          })}
        </div>
      )}

      <ArticleDemo article={article} />

      <ArticleFooter article={article} />
    </article>
    <VoteWidget />
    </>
  );
}

function VoteWidget() {
  const [vote, setVote] = useState<null | "up" | "down">(null);
  return (
    <div className="kb-vote-outer">
      <div className="kb-vote">
        <span className="kb-vote__q">War dieser Artikel hilfreich?</span>
        <button
          className={`kb-vote__btn ${vote === "up" ? "is-active" : ""}`}
          onClick={() => setVote("up")}
          aria-label="Hilfreich"
        >
          <Icon name="thumbs-up" size={14} /> Ja
        </button>
        <button
          className={`kb-vote__btn ${vote === "down" ? "is-active" : ""}`}
          onClick={() => setVote("down")}
          aria-label="Nicht hilfreich"
        >
          <Icon name="thumbs-down" size={14} /> Nein
        </button>
        {vote === "up" && <span className="kb-vote__thanks">Danke für Ihr Feedback!</span>}
        {vote === "down" && (
          <span className="kb-vote__thanks">Schade — wir verbessern den Artikel.</span>
        )}
      </div>
    </div>
  );
}

function ArticleFooter({ article }: { article: FlatArticle }) {
  return (
    <footer className="kb-article__foot">
      <PrevNext article={article} />
    </footer>
  );
}

function PrevNext({ article }: { article: FlatArticle }) {
  const idx = KB_FLAT.findIndex((a) => a.id === article.id);
  const prev = KB_FLAT[idx - 1];
  const next = KB_FLAT[idx + 1];
  return (
    <div className="kb-prevnext">
      {prev ? (
        <a className="kb-prevnext__link kb-prevnext__link--prev" href={`#${prev.id}`}>
          <Icon
            name="chevron-right"
            size={14}
            style={{ transform: "rotate(180deg)" }}
          />
          <span>
            <span className="kb-prevnext__hint">Zurück</span>
            <span className="kb-prevnext__title">{prev.title}</span>
          </span>
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a className="kb-prevnext__link kb-prevnext__link--next" href={`#${next.id}`}>
          <span>
            <span className="kb-prevnext__hint">Weiter</span>
            <span className="kb-prevnext__title">{next.title}</span>
          </span>
          <Icon name="chevron-right" size={14} />
        </a>
      ) : (
        <span />
      )}
    </div>
  );
}

// ---------- search overlay ----------
function SearchOverlay({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!q.trim()) return KB_FLAT.slice(0, 8);
    const lc = q.toLowerCase();
    return KB_FLAT.filter(
      (a) =>
        a.title.toLowerCase().includes(lc) ||
        a.lede.toLowerCase().includes(lc) ||
        a.tags.join(" ").toLowerCase().includes(lc) ||
        a.sectionLabel.toLowerCase().includes(lc)
    );
  }, [q]);

  if (!open) return null;
  return (
    <div className="kb-search" onClick={onClose}>
      <div className="kb-search__panel" onClick={(e) => e.stopPropagation()}>
        <div className="kb-search__bar">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Artikel, Aufgabentyp oder Tipp suchen…"
            className="kb-search__input"
          />
          <button className="kb-search__close" onClick={onClose} aria-label="Schließen">
            <Icon name="close" size={16} />
          </button>
        </div>
        <div className="kb-search__results">
          {results.length === 0 ? (
            <div className="kb-search__empty">Keine Ergebnisse für „{q}".</div>
          ) : (
            <ul>
              {results.map((a) => (
                <li key={a.id}>
                  <button
                    className="kb-search__result"
                    onClick={() => {
                      onPick(a.id);
                      onClose();
                    }}
                  >
                    <span className="kb-search__result-icon">
                      <Icon name={KIND_ICONS[a.id] || "book"} size={14} />
                    </span>
                    <span className="kb-search__result-text">
                      <span className="kb-search__result-title">
                        {highlight(a.title, q)}
                      </span>
                      <span className="kb-search__result-meta">
                        {a.sectionLabel} ·{" "}
                        {highlight(
                          a.lede.slice(0, 90) + (a.lede.length > 90 ? "…" : ""),
                          q
                        )}
                      </span>
                    </span>
                    <Icon name="arrow-right" size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="kb-search__foot">
          <span>
            <Kbd>↵</Kbd> öffnen
          </span>
          <span>
            <Kbd>esc</Kbd> schließen
          </span>
          <span style={{ marginLeft: "auto" }}>{results.length} Ergebnisse</span>
        </div>
      </div>
    </div>
  );
}

// ---------- header ----------
function Header() {
  return (
    <header className="kb-header">
      <div className="kb-header__inner">
        <div className="kb-header__brand-stack">
          <a className="kb-header__brand" href="#übersicht">
            <img
              className="kb-header__brand-logo"
              src="/logo-dark-e1706538837575.png"
              alt="Deutsch Akademie"
            />
          </a>
        </div>
        <div className="kb-header__brand-text">
          <span className="kb-header__brand-name">Wissensdatenbank</span>
        </div>
      </div>
    </header>
  );
}

// ---------- root ----------
export default function App() {
  const defaultId = "übersicht";
  const [articleId, setArticleId] = useHash(defaultId);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const article = useMemo(
    () => KB_FLAT.find((a) => a.id === articleId) || KB_FLAT[0],
    [articleId]
  );

  const readerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (readerRef.current) readerRef.current.scrollTop = 0;
  }, [articleId]);

  const isHome = article.id === "übersicht";

  return (
    <div className="kb-root">
      <Header />
      <div className="kb-shell">
        <div className="kb-shell__sidebar">
          <Sidebar
            sections={KB_DATA.sections}
            currentArticleId={article.id}
            currentSectionId={article.sectionId}
            onPick={setArticleId}
          />
        </div>
        <main className="kb-shell__main" ref={readerRef}>
          {isHome ? (
            <WillkommenPage
              onOpenSearch={() => setSearchOpen(true)}
              onPick={setArticleId}
            />
          ) : (
            <ArticleBody key={article.id} article={article} />
          )}
        </main>
      </div>
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onPick={setArticleId}
      />
    </div>
  );
}
