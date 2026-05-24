import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';
import type { AgentTask, AgentResult } from '../types';
import MarkdownView from '../components/MarkdownView';

const TASK_TEMPLATES: { id: string; title: string; prompt: string; type: AgentTask['type'] }[] = [
  {
    id: 'account-research',
    title: 'Account-Recherche',
    type: 'research',
    prompt:
      'Recherchiere folgendes Unternehmen für eine Bruce-B-Vertriebsansprache: {{ACCOUNT}}.\n\nGib mir zurück:\n1. Aktuelle Markenstrategie (was haben sie gerade in der Kommunikation in den letzten 12 Monaten gemacht?)\n2. Mögliche Buying-Signale (CEO-Wechsel, Markenrelaunch, M&A, Pressemeldung Strategiewechsel)\n3. Relevante Stakeholder (Marketing-Leitung, CMO, Brand Manager, Head of Communications) — Name, LinkedIn-URL wenn möglich\n4. 3 konkrete Hooks für die Erstansprache, je 1 Satz\n5. Welche Bruce-B-Cases am ehesten passen würden (aus den Referenzen)\n\nQuellen mit URLs angeben. Bericht max. 500 Wörter.',
  },
  {
    id: 'reactivation-letter',
    title: 'Reaktivierungs-Brief drafte',
    type: 'draft_email',
    prompt:
      'Drafte mir einen Reaktivierungs-Brief für den Bestandskunden {{ACCOUNT}}.\n\nVergangenes Projekt: {{PROJECT}}\nAnsprechpartner: {{CONTACT}}\nNeues Angebot, das vorher nicht möglich war: {{NEW_OFFER}}\n\nHalte dich an die Vorlage in docs/playbooks/03_reaktivierungs_brief.md (Variante A).\nMaximal 200 Wörter. Bruce-B-Tonalität (Sie-Form, selbstbewusst, mit Augenzwinkern).',
  },
  {
    id: 'industry-pitch-deck',
    title: 'Branchen-Pitch-Outline',
    type: 'draft_email',
    prompt:
      'Erstelle ein Pitch-Deck-Outline (Variante B aus dem Master-Briefing) für die Branche {{BRANCHE}}, konkret für Account {{ACCOUNT}}.\n\nStruktur:\n1. Aufmacher mit branchenrelevantem "Bruce meint…"\n2. Kunden-Logo-Wand: kuratiere die 8 für {{BRANCHE}} relevantesten Bruce-B-Bestandskunden\n3. 2–3 Avatar-/Tech-Cases mit Begründung "Warum dieser Case für {{ACCOUNT}}"\n4. 1 klassische 360°-Case zur Brücke (Voith, HIMA, Dieffenbacher)\n5. "Wo wir uns vielleicht treffen": 3–5 offene Hypothesen statt Pitch-Forderungen\n\nGib mir Folientitel + 2-Sätze-Inhalt pro Folie.',
  },
  {
    id: 'tender-watch',
    title: 'Tender-Recherche',
    type: 'research',
    prompt:
      'Recherchiere auf deutschen Vergabeplattformen (TED, evergabe-online.de, DTVP, vergabe24, vergabe.NRW, vergabe.bayern) aktuelle Ausschreibungen, die zu Bruce B. passen würden. Suchbegriffe: KI-Avatar, digitaler Bürgermeister, virtueller Assistent, Streaming Avatar, Chatbot Verwaltung, Conversational AI, generative KI Pilot, Wissensassistent.\n\nFilter:\n- Stichtag liegt mindestens 14 Tage in der Zukunft\n- Auftragswert > 50.000 EUR (oder ohne Angabe)\n- Nicht offensichtlich vorgeprägt für Bundesdruckerei / Materna / Capgemini / T-Systems\n\nMax. 10 Treffer, pro Treffer: Auftraggeber, Titel, Auftragsvolumen (wenn bekannt), Stichtag, Link, kurze Bewertung der Wettbewerbswahrscheinlichkeit für Bruce B.',
  },
  {
    id: 'competitor-watch',
    title: 'Wettbewerber-Monitoring',
    type: 'research',
    prompt:
      'Update mich zum Status der folgenden direkten Wettbewerber im AVA-Markt — was hat sich in den letzten 30 Tagen verändert?\n\nWettbewerber:\n- HeyGen, Synthesia, Tavus, Anam, Hedra, BeyondPresence (München), UneeQ, NVIDIA ACE, evocenta EMMA®AI, AIdentical, Soul Machines (in Receivership)\n\nPro Wettbewerber:\n- Neue Pricing-Änderungen?\n- Neue Funktionen oder Versionen?\n- Neue Enterprise-Cases / Behörden-Pilots in DACH?\n- Neue Compliance-Aussagen (EU AI Act)?\n\nQuellen mit URLs angeben.',
  },
];

export default function AgentsPage() {
  const [inbox, setInbox] = useState<AgentTask[]>([]);
  const [outbox, setOutbox] = useState<AgentResult[]>([]);
  const [template, setTemplate] = useState(TASK_TEMPLATES[0]);
  const [title, setTitle] = useState(TASK_TEMPLATES[0].title);
  const [prompt, setPrompt] = useState(TASK_TEMPLATES[0].prompt);
  const [open, setOpen] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const refresh = async () => {
    const [i, o] = await Promise.all([api.agentInbox(), api.agentOutbox()]);
    setInbox(i);
    setOutbox(o);
  };

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 5000);
    return () => clearInterval(t);
  }, []);

  const pickTemplate = (id: string) => {
    const tpl = TASK_TEMPLATES.find(t => t.id === id);
    if (!tpl) return;
    setTemplate(tpl);
    setTitle(tpl.title);
    setPrompt(tpl.prompt);
  };

  const submit = async () => {
    if (!title.trim() || !prompt.trim()) return;
    const r = await api.createAgentTask({ title, prompt, type: template.type });
    if (r.ok) {
      setSavedMsg(`Aufgabe gespeichert: ${r.filename}`);
      setTimeout(() => setSavedMsg(null), 4000);
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card no-hover-effect"
      >
        <h2 className="text-2xl font-bold mb-3">
          <span className="gradient-text">KI-Agenten</span>{' '}
          <span className="text-white/85">— Job-Queue für Claude Code</span>
        </h2>
        <p className="text-white/65 text-sm mb-3">
          File-basierte Queue. Du erstellst hier eine Aufgabe → das Dashboard schreibt sie nach <code>agents/inbox/</code>.
          Eine Claude-Code-Instanz mit <code>/loop</code> oder im autonomen Modus holt sich Aufgaben ab, recherchiert und
          schreibt Ergebnisse nach <code>agents/outbox/</code> — die hier rechts erscheinen, sobald sie fertig sind.
        </p>
        <details className="text-white/55 text-xs">
          <summary className="cursor-pointer text-cyan-400 hover:underline">So startest du den Claude-Code-Agenten…</summary>
          <pre className="mt-2 p-3 bg-black/40 rounded text-xs overflow-x-auto whitespace-pre-wrap">
{`# In einem zweiten Terminal-Tab:
cd /Users/maximilianschmierer/Git_Projects/RexSalesNavigator/RexSalesNavigator

# Claude Code im Polling-Loop starten:
claude code "Hole dir die nächste offene Aufgabe aus agents/inbox/, bearbeite sie und schreibe die Antwort als Markdown nach agents/outbox/. Lösche die Inbox-Datei nach erfolgreichem Abschluss. Wenn keine Aufgabe da ist, warte 60 Sekunden."`}
          </pre>
        </details>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create task */}
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card no-hover-effect"
        >
          <h3 className="text-xl font-bold mb-3">
            <span className="gradient-text">Neue Aufgabe</span>
          </h3>
          <label className="block text-white/75 text-sm font-medium mb-1">Vorlage</label>
          <select
            value={template.id}
            onChange={e => pickTemplate(e.target.value)}
            className="glass-input mb-3"
          >
            {TASK_TEMPLATES.map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>

          <label className="block text-white/75 text-sm font-medium mb-1">Titel</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="glass-input mb-3"
          />

          <label className="block text-white/75 text-sm font-medium mb-1">Prompt (Platzhalter wie &#123;&#123;ACCOUNT&#125;&#125; ersetzen)</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={10}
            className="glass-input font-mono text-xs leading-relaxed sleek-scrollbar"
          />

          <div className="mt-4 flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={submit}
              className="glass-button bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-100"
            >
              + Aufgabe in Queue legen
            </motion.button>
            <AnimatePresence>
              {savedMsg && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-300 text-sm"
                >
                  ✓ {savedMsg}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Inbox */}
        <motion.section
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-card no-hover-effect"
        >
          <h3 className="text-xl font-bold mb-3">
            <span className="gradient-text">Inbox</span>{' '}
            <span className="text-white/85">— offene Aufgaben ({inbox.length})</span>
          </h3>
          {inbox.length === 0 ? (
            <div className="text-white/55 text-sm py-6 text-center italic">
              Aktuell keine offenen Aufgaben. Lege links eine an.
            </div>
          ) : (
            <ul className="space-y-2">
              {inbox.map((t, i) => (
                <li key={i} className="glass bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-white text-sm font-medium">{t.title}</div>
                    <div className="text-white/45 text-[10px]">{(t as any).name}</div>
                  </div>
                  <div className="text-white/55 text-xs mt-1 line-clamp-2">{t.prompt.slice(0, 150)}…</div>
                </li>
              ))}
            </ul>
          )}
        </motion.section>
      </div>

      {/* Outbox */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card no-hover-effect"
      >
        <h3 className="text-xl font-bold mb-3">
          <span className="gradient-text">Outbox</span>{' '}
          <span className="text-white/85">— erledigte Ergebnisse ({outbox.length})</span>
        </h3>
        {outbox.length === 0 ? (
          <div className="text-white/55 text-sm py-6 text-center italic">
            Noch keine Ergebnisse. Sobald der Claude-Code-Agent eine Aufgabe abgeschlossen hat, erscheint sie hier.
          </div>
        ) : (
          <ul className="space-y-2">
            {outbox.map((r, i) => {
              const isOpen = open === r.name;
              return (
                <li key={r.name} className="glass bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : r.name)}
                    className="w-full text-left p-3 flex items-center justify-between hover:bg-white/8 transition-colors"
                  >
                    <div>
                      <div className="text-white text-sm font-medium">{r.name}</div>
                      <div className="text-white/45 text-xs mt-0.5">{new Date(r.mtime).toLocaleString('de-DE')}</div>
                    </div>
                    <span className="text-cyan-400">{isOpen ? '▴' : '▾'}</span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-white/10"
                      >
                        <div className="p-5">
                          <MarkdownView markdown={r.content} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        )}
      </motion.section>
    </div>
  );
}
