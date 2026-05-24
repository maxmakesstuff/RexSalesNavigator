# KI-Agenten-Anleitung für Bruce B. Sales Navigator

Diese Datei ist die Anweisung für eine Claude-Code-Instanz, die in einem zweiten Terminal-Fenster läuft und die Inbox abarbeitet.

## So startest du den Agenten

```bash
# In einem zweiten Terminal-Tab, im Projekt-Root:
cd /Users/maximilianschmierer/Git_Projects/RexSalesNavigator/RexSalesNavigator

# Variante A — Einmal-Lauf, alle offenen Aufgaben abarbeiten:
claude code "Bearbeite alle offenen Aufgaben in agents/inbox/ entsprechend agents/AGENT_INSTRUCTIONS.md"

# Variante B — Dauer-Polling im /loop-Modus (5 Minuten Intervall):
claude code /loop 5m "Bearbeite alle offenen Aufgaben in agents/inbox/ entsprechend agents/AGENT_INSTRUCTIONS.md. Wenn keine Aufgaben offen sind, gib 'Inbox leer' aus und beende."
```

## Was der Agent tut

Für **jede** Datei in `agents/inbox/*.json`:

1. **Aufgabe einlesen** — JSON enthält `title`, `prompt`, `type`, `createdAt`
2. **Aufgabe bearbeiten** — gemäß `prompt`. Bei `type=research` Web-Suche/Web-Fetch nutzen, bei `type=draft_email` direkt schreiben, bei `type=analysis` strukturierte Antwort. Kontext zum Bruce-B-Geschäft aus `docs/MASTER_VERTRIEBSSTRATEGIE.md`, `docs/research/*`, `docs/playbooks/*` ziehen.
3. **Ergebnis schreiben** als Markdown nach `agents/outbox/<basename-ohne-json>.result.md`. Mit Frontmatter:
   ```markdown
   ---
   source_task: <original-filename>
   title: <task-title>
   completed_at: <ISO-Datum>
   model: <Claude-Modell-Name>
   ---

   # <task title>

   <markdown body…>
   ```
4. **Inbox-Datei löschen** nach erfolgreichem Schreiben in Outbox.
5. **Niemals Kontaktdaten direkt verschicken** — Bruce B. Policy: keine Mails an echte Kontakte ohne Maxs Freigabe.

## Verfügbare Quellen für den Agenten

Lokal im Repo:
- `docs/MASTER_VERTRIEBSSTRATEGIE.md` — Master-Strategie (lesen für Bruce-B-Kontext)
- `docs/research/01_big_agency_enterprise_sales.md` — DACH-Konzern-Sales
- `docs/research/02_b2b_sales_methodik_dach.md` — Sales-Framework + Tool-Stack
- `docs/research/03_ava_market_eu_aiact_tenders.md` — AVA-Markt + EU AI Act + Tenders
- `docs/playbooks/*.md` — Templates und Skripte
- `data/private/customers_scored.json` — alle 549 Firmen mit Score (gitignored, nur lokal)
- `data/private/top50_priority.json` — Top-50 priorisierte Accounts (gitignored, nur lokal)

Im Sources-Ordner des äusseren Repos:
- `../../../Sources/BRUCE_B_GESAMTBRIEFING_VERTRIEB.md` — vollständige Bruce-B-Wissensbasis

Tools für den Agenten:
- WebSearch / WebFetch für externe Recherche
- Read auf alle Dokumente
- Edit / Write auf `agents/outbox/`
- Bash für Datenanalyse-Skripte
- **Niemals:** echte E-Mails versenden, Telefon-Aktionen auslösen, oder Daten an Dritte schicken

## Aufgabe-Typen

### `type: research`
Web-basierte Recherche mit Quellenangabe (URLs). Bericht in deutsch, max. 2000 Wörter, strukturiert mit H2/H3-Überschriften, am Ende eine Liste der Quellen-URLs als Markdown-Links.

### `type: draft_email`
Entwurf von E-Mail oder Brief, in Bruce-B-Tonalität (Sie-Form, selbstbewusst-mit-Augenzwinkern). Halte dich an die Templates in `docs/playbooks/01_outbound_email_templates.md` und `03_reaktivierungs_brief.md`. Markiere alle Platzhalter, die Max selbst füllen muss, mit `{{…}}`.

### `type: analysis`
Strukturierte Analyse vorhandener Daten (z.B. Score-Verteilung, Branchen-Cluster, Pipeline-Bewegung). Output ist Markdown mit Tabellen, Bullet-Points, ggf. ASCII-Grafiken. Klare Empfehlungen am Ende ("Was Max diese Woche tun sollte:").

### `type: other`
Folge dem `prompt` so wie er steht. Bei Unklarheit: lieber konservativ entscheiden und Frage als Notiz an Max im Output hinterlassen.

## Beispiel-Workflow

Eingang `agents/inbox/2026-05-25T08-00-00_trumpf-research.json`:
```json
{
  "title": "Account-Recherche Trumpf",
  "prompt": "Recherchiere Trumpf GmbH …",
  "type": "research",
  "createdAt": "2026-05-25T08-00-00"
}
```

Ausgang `agents/outbox/2026-05-25T08-00-00_trumpf-research.result.md`:
```markdown
---
source_task: 2026-05-25T08-00-00_trumpf-research.json
title: Account-Recherche Trumpf
completed_at: 2026-05-25T08-14-32
model: claude-opus-4-7
---

# Account-Recherche Trumpf GmbH

## 1. Aktuelle Markenstrategie
…

## 2. Buying-Signale
…

## 3. Stakeholder
…

## 4. 3 Hooks für Erstansprache
…

## 5. Passende Bruce-B-Cases
…

## Quellen
- [Trumpf Investor Relations](https://…)
- …
```

Inbox-Datei wird dann gelöscht.

## Wichtige Bruce-B-Regeln (für jeden Agenten-Lauf)

- **Tonalität in allen E-Mail-Drafts:** Sie-Form, selbstbewusst aber nicht prahlend, mit ironischem Augenzwinkern, max. 200 Wörter pro Mail.
- **Bruce-B-Phrasen erlaubt:** "Lassen Sie uns reden", "Bei einer Tasse Kaffee erzählen wir Ihnen gerne mehr", "Willkommen bei Bruce".
- **UWG/DSGVO-Pflicht** in jeder Cold-Mail: Trigger-Bezug, Opt-out-Hinweis, voller Footer.
- **Geographic Bias:** Stuttgart/BW-Nähe wo immer möglich nutzen.
- **Industrie-Fokus:** Industrie + Public Sector zuerst (Strategie-Entscheidung Max vom 24.05.2026).
- **Quellen IMMER mit URL angeben** bei Research-Aufgaben.
