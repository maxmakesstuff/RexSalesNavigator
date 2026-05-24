# Bruce B. Sales Navigator

> **Ein lokales Sales-Operating-System für Bruce B. corporate communication GmbH.**
> Vertriebsstrategie-Guidebook + Daily-Workflow-Dashboard + KI-Agenten-Queue, alles unter einem Dach.

## Was ist das?

Bruce B. ist eine 30-Personen-Kommunikationsmanufaktur in Stuttgart, die nach 20 Jahren organischem Wachstum jetzt eine **systematische Vertriebs-Maschinerie** braucht. Dieses Repo ist die Antwort: ein lokal lauffähiges Cockpit, das die Strategie sichtbar macht, den Tag plant, Accounts priorisiert und KI-Agenten einbindet, die im Hintergrund recherchieren.

**Auftraggeber:** Max Schmierer (Managing Director Bruce B., einziger Vertriebler) · **Erstellt:** Mai 2026 · **Stack:** React 19 + Vite + Tailwind + framer-motion, Glassmorphic Dark Theme.

## Schnellstart

```bash
# Repo klonen und ins Verzeichnis wechseln
git clone https://github.com/maxmakesstuff/RexSalesNavigator.git
cd RexSalesNavigator/RexSalesNavigator

# Einmal-Setup: Kundendaten importieren (braucht die xlsx im äußeren Sources-Ordner)
python3 scripts/import_customers.py
python3 scripts/score_priority.py

# Web-App starten
./start.sh
# → http://localhost:5173
```

Wenn alles läuft, siehst du das Cockpit mit Daily-Plan, Top-Accounts, KPIs und Quicklinks zur Strategie.

## Struktur

```
RexSalesNavigator/
├── README.md                 ← Du bist hier
├── start.sh                  ← Lokaler Start-Helper
├── app/                      ← Vite + React Web-App
│   ├── src/
│   │   ├── pages/            ← Dashboard, Strategie, Accounts, Playbooks, Research, Agents
│   │   ├── components/       ← AppShell, MarkdownView
│   │   ├── lib/api.ts        ← Fetch-Wrapper
│   │   └── index.css         ← Glassmorphic Style (siehe Sources/DESIGN_BRIEFING.md)
│   └── vite.config.ts        ← inkl. lokaler API-Middleware
├── docs/
│   ├── MASTER_VERTRIEBSSTRATEGIE.md    ← Das Strategie-Guidebook (16 Teile)
│   ├── research/                       ← 3 Recherche-Berichte mit Quellen-URLs
│   │   ├── 01_big_agency_enterprise_sales.md
│   │   ├── 02_b2b_sales_methodik_dach.md
│   │   └── 03_ava_market_eu_aiact_tenders.md
│   └── playbooks/                      ← Operative Vorlagen
│       ├── 01_outbound_email_templates.md
│       ├── 02_discovery_call_skript.md
│       ├── 03_reaktivierungs_brief.md
│       └── 04_daily_weekly_cadence.md
├── scripts/
│   ├── import_customers.py   ← xlsx → JSON, klassifiziert 549 Firmen in 17 Branchen
│   └── score_priority.py     ← 100-Punkte-Scoring, Top-50 Priority-Liste
├── data/
│   ├── seed/                 ← Anonymisierte Demo-Daten (committet)
│   └── private/              ← Echte Kontaktdaten (GITIGNORED, nur lokal)
└── agents/
    ├── AGENT_INSTRUCTIONS.md ← Anleitung für Claude-Code-Agenten
    ├── inbox/                ← Aufgaben für Agenten (JSON, gitignored)
    └── outbox/               ← Ergebnisse von Agenten (Markdown, gitignored)
```

## Die 6 Hauptansichten der App

1. **Cockpit** (`/dashboard`) — heutiger Plan, KPI-Status, Top-15 Accounts, North-Star-Metric, Quicklinks
2. **Accounts** (`/accounts`) — alle 549 Firmen mit Score, Tier, Branche, Filter, ausklappbarer Detail-Sicht mit allen Kontakten
3. **Strategie** (`/strategie`) — die komplette Master-Vertriebsstrategie als gerenderte Web-Story (für Andi/Thomas zum Lesen)
4. **Playbooks** (`/playbooks`) — Cold-Email-Templates, Discovery-Skript, Reaktivierungs-Brief, Daily-Cadence
5. **Research** (`/research`) — die 3 Marktrecherche-Berichte mit allen Quellen-URLs
6. **KI-Agenten** (`/agents`) — Aufgaben-Queue, Outbox mit erledigten Ergebnissen, 5 vorgefertigte Aufgaben-Templates

## Wie die KI-Agenten arbeiten

Das Dashboard hat **keinen Anthropic-API-Key**. Stattdessen file-basierte Job-Queue:

1. Du klickst im Dashboard "Neue Aufgabe" → Vorlage wählen → "+ Aufgabe in Queue legen"
2. Dashboard schreibt `agents/inbox/<timestamp>_<slug>.json` mit Prompt + Kontext
3. In einem zweiten Terminal startest du Claude Code mit der Anleitung:
   ```bash
   claude code "Bearbeite alle offenen Aufgaben in agents/inbox/ entsprechend agents/AGENT_INSTRUCTIONS.md"
   ```
4. Claude Code holt die Aufgabe, recherchiert (Web-Suche), schreibt Ergebnis nach `agents/outbox/`, löscht Inbox-Datei
5. Dashboard pollt alle 5s die Outbox und zeigt das Ergebnis an

**Vorteil:** Nutzt deine Claude-Code-Lizenz, kein zusätzlicher API-Key, beliebig viele Tasks parallelisierbar.

## Die strategischen Entscheidungen (Mai 2026)

Alle dokumentiert in [`docs/MASTER_VERTRIEBSSTRATEGIE.md`](./docs/MASTER_VERTRIEBSSTRATEGIE.md):

- **Branchenfokus:** Industrie/Maschinenbau + Public Sector zuerst (77 + 41 Firmen in der Datenbank)
- **Big-Ticket-Strategie:** 80% Land-and-Expand auf ~150 Top-Bestandskunden, 20% New Logos
- **Produktisierung:** Hybrid — 5 Lead-Magnet-Pakete + custom Manufaktur-Projekte
- **Sales-Framework:** GAP Selling (Discovery) + MEDDPICC (Qualifizierung) + ABS (Tagesgeschäft)
- **Tool-Stack:** 498 €/Monat — Sales Navigator + Lemlist + Waalaxy + Dropcontact + Apollo + DTVP
- **Pflicht-Listings:** cherrypicker (Goldstandard DACH), Observatory, advise — der einzige Weg in Konzern-Pitches
- **Konsortial-Partner:** Atelier Markgraph, Liganova, Milla & Partner — als Türöffner statt Wettbewerber

## Forecast 12 Monate

| Phase | Pipeline (qualifiziert) | Closed Won |
|---|---|---|
| Q3 2026 (Foundation) | 1,8 M € | 240–500 k € |
| Q4 2026 (Validation) | 3,5 M € | 400–900 k € |
| Q1 2027 (Erste Big-Tickets) | 5,0 M € | 600–1,2 M € |
| Q2 2027 (Skalierung) | — | 800–1,5 M € |
| **Summe 12 Monate** | | **2,1–4,1 M €** |

Punkt-Landung bei **3,74 M € Jahresumsatz** realistisch.

## Datenschutz / Sensible Daten

- `data/private/` und alle `*.priv.json` sind **gitignored** — die echten Kontaktdaten von 1254 Personen liegen nur lokal.
- Im Repo committet sind nur anonymisierte Demo-Daten (`data/seed/customers.demo.json`).
- Die App liest beim Start automatisch die `data/private/`-Daten, wenn vorhanden, sonst die Demo-Daten.
- `.env`-Files sind gitignored.

## Lizenz & Eigentum

Internes Werkzeug der Bruce B. corporate communication GmbH (vormals B.REX). Nicht zur externen Weitergabe.

---

**Kontakt:** Maximilian Schmierer · Managing Director Bruce B. · max@bruce-b.com · Augustenstr. 87 · 70197 Stuttgart
