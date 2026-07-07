export type ArticleKind = "intro" | "click" | "game" | "write" | "speak" | "outro";

export type ArticleBlock =
  | { kind: "p"; text: string }
  | { kind: "tip"; text: string }
  | { kind: "callout"; tone?: "success" | "neutral"; title: string; text: string }
  | { kind: "signoff"; text: string }
  | { kind: "steps"; items: string[] };

export type Article = {
  id: string;
  title: string;
  kind: ArticleKind;
  graded: boolean | null;
  lede: string;
  body: ArticleBlock[];
  tags: string[];
  embedUrl?: string;
};

export type Section = {
  id: string;
  label: string;
  kicker: string;
  summary: string;
  articles: Article[];
};

export type KbData = {
  brand: { name: string; subtitle: string };
  sections: Section[];
};

export const KB_DATA: KbData = {
  brand: {
    name: "Selbstlernkurs",
    subtitle: "Wissensdatenbank — Aufgabentypen",
  },
  sections: [
    {
      id: "einstieg",
      label: "Erste Schritte",
      kicker: "01",
      summary: "Willkommen und Grundlagen für die Bearbeitung Ihrer Aufgaben.",
      articles: [
        {
          id: "übersicht",
          title: "Übersicht",
          kind: "intro",
          graded: null,
          lede:
            "In diesem Tutorial lernen Sie alle Aufgabentypen kennen und bekommen Tipps für die Bearbeitung der Aufgaben. Viel Spaß!",
          body: [],
          tags: ["Onboarding", "Einführung"],
        },
        {
          id: "willkommen",
          title: "Willkommen im Tutorial",
          kind: "intro",
          graded: null,
          lede: "",
          body: [
            {
              kind: "p",
              text:
                "Der Selbstlernkurs umfasst 30 Module zu Themen wie Arbeit, Lebensstil, Beziehungen, Technologie, Gesundheit und Kunst.",
            },
            {
              kind: "p",
              text:
                "Jedes Modul beginnt mit einer Einführung, die beispielsweise ein Spiel, eine Vokabelübung oder ein Gedankenexperiment sein kann. Weitere Lektionsinhalte sind Vokabel- und Grammatikübungen, Lese- und Hörverständnisübungen sowie Szenarien zum Üben von Sprechen und Schreiben.",
            },
            {
              kind: "p",
              text:
                "Viele Übungen werden automatisch bewertet, sobald Sie auf „Antworten prüfen“ klicken. Schreib- und Sprechübungen werden jedoch nicht automatisch ausgewertet. Sie können Ihre Schreibproben und Audioaufnahmen herunterladen, um sie später noch einmal anzusehen und zu reflektieren.",
            },
            {
              kind: "steps",
              items: [
                "Lesen Sie vor der Bearbeitung einer Aufgabe gründlich die Instruktion durch. Oft finden Sie dort wichtige Hinweise zur Aufgabe. Achten Sie auch auf Tipps, die Ihnen helfen können.",
                "Sind Sie sich sicher, dass Sie die richtige Lösung kennen? Dann klicken Sie auf „Antworten prüfen“. Sie haben insgesamt zwei Versuche für jede bewertete Aufgabe.",
                "Laden Sie die Wortschatzliste jedes Moduls herunter und nutzen Sie sie, um die neuen Wörter und Ausdrücke zu wiederholen.",
                "Am Ende jedes Moduls können Sie Ihre Ergebnisse einsehen. Klicken Sie dafür auf „Einreichen“.",
                "Sollten Sie mit Ihren Ergebnissen nicht zufrieden sein, können Sie die Lektion zurücksetzen, indem Sie auf der Ergebnisseite auf das Papierkorbsymbol klicken.",
              ],
            },
            {
              kind: "callout",
              tone: "success",
              title: "Super!",
              text: "Sie sind nun bereit für die Aufgabentypen.",
            },
          ],
          tags: ["Onboarding", "Einführung"],
        },
        {
          id: "führung",
          title: "Interaktive Führung",
          kind: "intro",
          graded: null,
          embedUrl: "https://elearning-tutorial.onrender.com",
          lede:
            "Eine geführte Tour durch die Plattform. Klicken Sie sich Schritt für Schritt durch die wichtigsten Bedienelemente.",
          body: [
            {
              kind: "p",
              text:
                "Diese interaktive Tour zeigt Ihnen die grundlegenden Funktionen des Kurses — vom Navigieren zwischen Lektionen bis zum Bearbeiten Ihrer ersten Aufgabe.",
            },
            {
              kind: "tip",
              text:
                "Sie können die Tour jederzeit pausieren und später fortsetzen. Folgen Sie einfach den Hinweisen im eingebetteten Fenster.",
            },
          ],
          tags: ["Tutorial", "Onboarding"],
        },
      ],
    },
    {
      id: "klickbar",
      label: "Interaktive Übungen",
      kicker: "02",
      summary: "Aufgabentypen, die Sie per Klick lösen — von Lernkarten bis Markieren.",
      articles: [
        {
          id: "lernkarten",
          title: "Lernkarten",
          kind: "click",
          graded: false,
          lede:
            "Bei diesem Aufgabentyp lernen Sie Wörter, die für das Modul besonders wichtig sind. Klicken Sie dafür auf die Kärtchen.",
          body: [
            {
              kind: "tip",
              text:
                "Lesen Sie immer erst die Vorder- und Rückseite eines Kärtchens. Drehen Sie das Kärtchen anschließend wieder um und versuchen Sie, sich an die Bedeutung zu erinnern. Überprüfen Sie dann Ihre Vermutung.",
            },
          ],
          tags: ["Wortschatz", "Klicken"],
        },
        {
          id: "auswahl",
          title: "Einzelauswahl / Mehrfachauswahl",
          kind: "click",
          graded: true,
          lede: "Bei diesem Aufgabentyp sollen Sie die richtige Option wählen.",
          body: [
            {
              kind: "tip",
              text:
                "Manchmal können auch mehrere Antworten richtig sein. Sie finden dann einen entsprechenden Hinweis in der Instruktion.",
            },
          ],
          tags: ["Klicken", "Bewertet"],
        },
        {
          id: "verbinden",
          title: "Verbinden",
          kind: "click",
          graded: true,
          lede:
            "Verbinden Sie die passenden Informationen miteinander, um Aufgaben dieses Typs zu lösen.",
          body: [
            {
              kind: "tip",
              text:
                "Sie können den Radierer benutzen, wenn Sie Informationen falsch verbunden haben.",
            },
          ],
          tags: ["Klicken", "Bewertet"],
        },
        {
          id: "luecken",
          title: "Informationen in Lücken ziehen",
          kind: "click",
          graded: true,
          lede:
            "Hier ist es Ihre Aufgabe, die Informationen in die passenden Lücken zu ziehen.",
          body: [
            {
              kind: "tip",
              text:
                "Haben Sie eine Information in die falsche Lücke gezogen? Ziehen Sie die Information einfach wieder zurück in den Stapel.",
            },
          ],
          tags: ["Drag & Drop", "Bewertet"],
        },
        {
          id: "sortieren",
          title: "Sortieren",
          kind: "click",
          graded: true,
          lede:
            "In dieser Aufgabe sollen Sie Informationen der passenden Kategorie zuordnen.",
          body: [],
          tags: ["Klicken", "Bewertet"],
        },
        {
          id: "reihenfolge",
          title: "In die richtige Reihenfolge bringen",
          kind: "click",
          graded: true,
          lede:
            "Bei diesem Aufgabentyp sollen Sie Informationen in die richtige Reihenfolge bringen.",
          body: [],
          tags: ["Klicken", "Bewertet"],
        },
        {
          id: "fehler-finden",
          title: "Fehler finden",
          kind: "click",
          graded: true,
          lede:
            "Hier suchen Sie Fehler in einem Text finde. Klicken Sie darauf, wenn Sie sie gefunden haben.",
          body: [
            {
              kind: "tip",
              text:
                "Achten Sie bei diesem Aufgabentyp auf den Fehler-Zähler. Dort können Sie sehen, wie viele Fehler Sie bereits gefunden haben.",
            },
          ],
          tags: ["Klicken", "Bewertet"],
        },
        {
          id: "fehler-korrigieren",
          title: "Fehler finden und korrigieren",
          kind: "click",
          graded: true,
          lede:
            "Um eine Aufgabe dieses Typs zu lösen, müssen Sie Fehler in einem Text finden und diese korrigieren.",
          body: [],
          tags: ["Klicken", "Schreiben", "Bewertet"],
        },
        {
          id: "markieren",
          title: "Markieren",
          kind: "click",
          graded: true,
          lede:
            "Markieren Sie bei diesem Aufgabentyp die gesuchten Wörter oder Satzteile.",
          body: [
            {
              kind: "tip",
              text: "Sie können den Radierer benutzen, wenn Sie Wörter falsch markiert haben.",
            },
          ],
          tags: ["Klicken", "Bewertet"],
        },
      ],
    },
    {
      id: "spiele",
      label: "Spiele",
      kicker: "03",
      summary: "Spielerische Aufgabentypen, die Übung mit Spaß verbinden.",
      articles: [
        {
          id: "memory",
          title: "Memory-Spiel",
          kind: "game",
          graded: false,
          lede:
            "Bei diesem Aufgabentyp sollen Sie Paare finden. Klicken Sie dafür immer auf zwei Kärtchen.",
          body: [],
          tags: ["Spiel", "Klicken"],
        },
        {
          id: "seifenblasen",
          title: "Seifenblasen-Spiel",
          kind: "game",
          graded: false,
          lede:
            "Klicken Sie auf die passenden Seifenblasen, um Aufgaben dieses Typs zu lösen.",
          body: [
            {
              kind: "tip",
              text:
                "Lesen Sie die Instruktion genau. Dort steht, auf welche Wörter Sie achten sollen. Außerdem zeigt Ihnen der Wort-Zähler, wie viele Wörter Sie bereits gefunden haben und die Stoppuhr, wie viel Zeit Ihnen noch bleibt.",
            },
          ],
          tags: ["Spiel", "Zeit"],
        },
        {
          id: "kreuzwortraetsel",
          title: "Kreuzworträtsel",
          kind: "game",
          graded: false,
          lede:
            "Ein Kreuzworträtsel lösen Sie, indem Sie die gesuchten Wörter an die richtige Stelle schreiben.",
          body: [
            {
              kind: "tip",
              text:
                "Achten Sie bei diesem Aufgabentyp immer auf die Wortliste am Rand. Sie hilft Ihnen dabei, die gesuchten Wörter zu finden. Schreiben Sie Umlaute als „ä“, „ö“ und „ü“.",
            },
          ],
          tags: ["Spiel", "Schreiben"],
        },
      ],
    },
    {
      id: "schreiben",
      label: "Schreiben",
      kicker: "04",
      summary: "Aufgaben, in denen Sie selbst formulieren oder Lücken ergänzen.",
      articles: [
        {
          id: "ergaenzen",
          title: "Wörter oder Buchstaben ergänzen",
          kind: "write",
          graded: true,
          lede:
            "Diesen Aufgabentyp lösen Sie, indem Sie die fehlenden Wörter oder Buchstaben ergänzen.",
          body: [{ kind: "tip", text: "Schreiben Sie Umlaute als „ä“, „ö“ und „ü“." }],
          tags: ["Schreiben", "Bewertet"],
        },
        {
          id: "freies-schreiben",
          title: "Freies Schreiben",
          kind: "write",
          graded: false,
          lede: "Bei diesem Aufgabentyp schreiben Sie kleinere Texte.",
          body: [
            {
              kind: "tip",
              text:
                "Für Schreiben-Aufgaben erhalten Sie immer einen Schreiben-Tipp und eine Beispiellösung. Nutzen Sie die Redemittel aus dem Schreiben-Tipp und vergleichen Sie Ihren Text mit der Beispiellösung.",
            },
          ],
          tags: ["Schreiben", "Frei"],
        },
      ],
    },
    {
      id: "sprechen",
      label: "Sprechen",
      kicker: "05",
      summary: "Sprech-Aufgaben — Dialoge nachsprechen und sich frei äußern.",
      articles: [
        {
          id: "dialog",
          title: "Einen Dialog nachsprechen",
          kind: "speak",
          graded: false,
          lede:
            "Bei diesem Aufgabentyp sprechen Sie einen Dialog in der Rolle eines der beiden Gesprächspartner nach.",
          body: [
            {
              kind: "steps",
              items: [
                "Lesen Sie zunächst den Dialog.",
                "Wählen Sie eine Rolle aus, indem Sie auf das Bild eines Gesprächspartners klicken.",
                "Sprechen Sie nun die Sequenzen Ihrer Rolle nach und nehmen Sie sich dabei auf.",
                "Klicken Sie am Ende auf Alles Wiedergeben und hören Sie sich den Dialog an.",
              ],
            },
          ],
          tags: ["Sprechen", "Aufnahme"],
        },
        {
          id: "freies-sprechen",
          title: "Freies Sprechen",
          kind: "speak",
          graded: false,
          lede: "Bei diesem Aufgabentyp sprechen Sie und nehmen sich dabei auf.",
          body: [
            {
              kind: "tip",
              text:
                "Für Sprech-Aufgaben erhalten Sie immer einen Sprechen-Tipp und eine Beispiellösung. Nutzen Sie die Redemittel aus dem Sprechen-Tipp und vergleichen Sie Ihr Produkt mit der Beispiellösung.",
            },
          ],
          tags: ["Sprechen", "Frei"],
        },
      ],
    },
    {
      id: "abschluss",
      label: "Abschluss",
      kicker: "06",
      summary: "Sie sind bereit, mit dem Kurs zu starten.",
      articles: [
        {
          id: "viel-erfolg",
          title: "Viel Erfolg im Kurs!",
          kind: "outro",
          graded: null,
          lede:
            "Sie kennen nun alle Aufgabentypen im Selbstlernkurs und sind bereit, loszulegen.",
          body: [
            {
              kind: "p",
              text:
                "Wir wünschen Ihnen viel Spaß bei der Bearbeitung der Module und viele schöne, spannende und interessante Momente im Kurs!",
            },
            { kind: "signoff", text: "— Das Selbstlernkurs-Team" },
          ],
          tags: ["Abschluss"],
        },
      ],
    },
  ],
};

export type FlatArticle = Article & { sectionId: string; sectionLabel: string };

export const KB_FLAT: FlatArticle[] = KB_DATA.sections.flatMap((s) =>
  s.articles.map((a) => ({ ...a, sectionId: s.id, sectionLabel: s.label }))
);
