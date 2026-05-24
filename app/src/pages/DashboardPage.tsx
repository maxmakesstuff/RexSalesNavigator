import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import type { Company } from '../types';

const tierColor: Record<string, { border: string; text: string; bg: string }> = {
  'Tier 1 — Hot': { border: 'rgba(52,211,153,.5)', text: '#34d399', bg: 'rgba(52,211,153,.10)' },
  'Tier 2 — Warm': { border: 'rgba(250,204,21,.5)', text: '#facc15', bg: 'rgba(250,204,21,.10)' },
  'Tier 3 — Track': { border: 'rgba(34,211,238,.5)', text: '#22d3ee', bg: 'rgba(34,211,238,.10)' },
  'Tier 4 — Cold': { border: 'rgba(148,163,184,.5)', text: '#94a3b8', bg: 'rgba(148,163,184,.10)' },
};

export default function DashboardPage() {
  const [customers, setCustomers] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.customers().then(c => {
      setCustomers(c);
      setLoading(false);
    });
  }, []);

  const stats = useMemo(() => {
    const tiers: Record<string, number> = {};
    const industries: Record<string, number> = {};
    let withMobile = 0;
    let withEmail = 0;
    customers.forEach(c => {
      const t = c.tier || 'Tier 4 — Cold';
      tiers[t] = (tiers[t] || 0) + 1;
      industries[c.industry] = (industries[c.industry] || 0) + 1;
      c.contacts.forEach(ct => {
        if (ct.mobile || ct.phone) withMobile++;
        if (ct.email) withEmail++;
      });
    });
    return { tiers, industries, totalCompanies: customers.length, totalContacts: customers.reduce((a, c) => a + c.contacts.length, 0), withMobile, withEmail };
  }, [customers]);

  const todayPlan = [
    { time: '08:30', task: '5 ABS-Sequenzen starten (Tier-1)', detail: 'Outbound-Block: Trumpf, Bosch, Voith, EnBW, Stadt Stuttgart' },
    { time: '09:30', task: '3 LinkedIn-Touches', detail: 'View Profile + Kommentar auf neuestem Post bei Tier-1-Champions' },
    { time: '11:00', task: 'Discovery Call: [Vorbereitung]', detail: 'GAP-Discovery-Skript laden, MEDDPICC-Scorecard offen halten' },
    { time: '14:00', task: 'Reaktivierungs-Briefe Druck-Freigabe', detail: '30 Tier-1-Briefe diese Woche, Sonja koordiniert' },
    { time: '16:00', task: '1 LinkedIn-Insight-Post', detail: 'Thema diese Woche: "EU-AI-Act 60-Tage-Countdown"' },
    { time: '16:30', task: 'Pipeline-Health-Check', detail: 'Deals ohne Bewegung in letzten 14 Tagen → Rote Flagge setzen' },
  ];

  const weeklyTargets = [
    { label: 'ABS-Sequenzen gestartet', target: 25, current: 0, unit: '' },
    { label: 'Discovery-Calls geführt', target: 8, current: 0, unit: '' },
    { label: 'Reaktivierungs-Briefe versendet', target: 30, current: 0, unit: '' },
    { label: 'Qualifizierte Opp generiert', target: 3, current: 0, unit: '' },
    { label: 'Qualifizierte Pipeline (EUR)', target: 290000, current: 0, unit: '€' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card no-hover-effect"
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              <span className="gradient-text">Cockpit</span> <span className="text-white/85">für Max</span>
            </h2>
            <p className="text-white/60 text-sm">Bruce B. Vertriebs-Operating-System — Stand {new Date().toLocaleDateString('de-DE')}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge label="Pipeline-Ziel Q3" value="290k €/Woche" />
            <Badge label="Jahresziel 2027" value="3,74 M €" />
            <Badge label="Team" value="Solo + KI" />
          </div>
        </div>
      </motion.section>

      {/* Stat tiles */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <StatTile color="#34d399" border="rgba(52,211,153,.5)" label="Tier 1 — Hot" value={`${stats.tiers['Tier 1 — Hot'] || 0}`} sub="Accounts" />
        <StatTile color="#facc15" border="rgba(250,204,21,.5)" label="Tier 2 — Warm" value={`${stats.tiers['Tier 2 — Warm'] || 0}`} sub="Accounts" />
        <StatTile color="#22d3ee" border="rgba(34,211,238,.5)" label="Tier 3 — Track" value={`${stats.tiers['Tier 3 — Track'] || 0}`} sub="Accounts" />
        <StatTile color="#94a3b8" border="rgba(148,163,184,.5)" label="Gesamt-Datenbank" value={`${stats.totalCompanies}`} sub={`${stats.totalContacts} Kontakte`} />
      </motion.section>

      {/* Daily Plan + Weekly Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily plan */}
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-card no-hover-effect lg:col-span-2"
        >
          <h3 className="text-xl font-bold mb-4">
            <span className="gradient-text">Heute</span> <span className="text-white/85">— Bruce B. Sales Hour</span>
          </h3>
          <p className="text-white/55 text-sm mb-5">Eine Stunde am Tag, jeden Tag, schlägt drei Stunden am Freitag. Konsistenz vor Intensität.</p>
          <ul className="space-y-3">
            {todayPlan.map((t, i) => (
              <motion.li
                key={t.time}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className="glass bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-4"
              >
                <div className="text-cyan-400 font-mono text-sm font-semibold w-14 flex-shrink-0 pt-0.5">{t.time}</div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{t.task}</div>
                  <div className="text-white/55 text-xs mt-0.5">{t.detail}</div>
                </div>
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-cyan-400 cursor-pointer"
                  aria-label={`Erledigt: ${t.task}`}
                />
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Weekly targets */}
        <motion.section
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card no-hover-effect"
        >
          <h3 className="text-xl font-bold mb-4">
            <span className="gradient-text">Diese Woche</span>
          </h3>
          <ul className="space-y-3">
            {weeklyTargets.map(w => (
              <li key={w.label}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-white/75 text-xs">{w.label}</span>
                  <span className="text-white font-mono text-xs">
                    {w.unit === '€' ? new Intl.NumberFormat('de-DE').format(w.current) : w.current}{' '}
                    <span className="text-white/40">/ {w.unit === '€' ? new Intl.NumberFormat('de-DE').format(w.target) : w.target}</span>
                  </span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                    style={{ width: `${Math.min(100, (w.current / w.target) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-white/10 text-xs text-white/45">
            KPIs werden manuell/aus HubSpot synchronisiert. MVP: leer starten, weekly im Friday-Review aktualisieren.
          </div>
        </motion.section>
      </div>

      {/* Top-15 priority accounts */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="glass-card no-hover-effect"
      >
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-5">
          <h3 className="text-xl font-bold">
            <span className="gradient-text">Top-15 Priority-Accounts</span>{' '}
            <span className="text-white/60 text-sm font-medium">aus {stats.totalCompanies} Firmen</span>
          </h3>
          <a href="/accounts" className="text-cyan-400 text-sm hover:underline">Alle Accounts →</a>
        </div>
        {loading && <div className="text-white/55 text-sm py-6 text-center">Lade Accounts…</div>}
        {!loading && (
          <ul className="space-y-2">
            {customers.slice(0, 15).map((c, i) => {
              const t = tierColor[c.tier || 'Tier 4 — Cold'];
              return (
                <motion.li
                  key={`${c.company}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.02 * i }}
                  className="glass bg-white/5 border border-white/10 rounded-lg flex items-stretch"
                >
                  <div className="w-1 flex-shrink-0 rounded-l-lg" style={{ background: t.text }} />
                  <div className="flex-1 p-3 grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-12 md:col-span-1 text-cyan-400 font-mono font-bold text-sm text-center md:text-left">
                      {c.score}
                    </div>
                    <div className="col-span-12 md:col-span-5 text-white text-sm font-medium truncate">{c.company}</div>
                    <div className="col-span-6 md:col-span-2 text-white/55 text-xs">{c.industry}</div>
                    <div className="col-span-6 md:col-span-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: t.bg, color: t.text, border: `1px solid ${t.border}` }}
                      >
                        {c.tier}
                      </span>
                    </div>
                    <div className="col-span-12 md:col-span-2 text-white/55 text-xs">
                      {c.contacts.length} Kontakt{c.contacts.length === 1 ? '' : 'e'}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </motion.section>

      {/* North Star + Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card no-hover-effect"
        >
          <h3 className="text-xl font-bold mb-3">
            <span className="gradient-text">North-Star-Metric</span>
          </h3>
          <p className="text-white/75 text-sm leading-relaxed">
            <strong className="text-white">Qualifiziertes Pipeline-Volumen (EUR) erstellt pro Woche.</strong>
            <br />
            <span className="text-white/60">Definition: Summe neuer Opportunities in MEDDPICC-Stage 2+ (Pain + Champion identifiziert, Score ≥ 16/32).</span>
          </p>
          <div className="mt-4 p-4 rounded-xl bg-cyan-500/8 border border-cyan-400/20">
            <div className="text-white/65 text-xs uppercase tracking-wider mb-1">Wochen-Ziel</div>
            <div className="text-3xl font-bold gradient-text">290.000 €</div>
            <div className="text-white/45 text-xs mt-1">Pipeline (qualifiziert), 15 M € Jahres-Pipeline für 3,74 M € Umsatz bei 25 % Win-Rate</div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="glass-card no-hover-effect"
        >
          <h3 className="text-xl font-bold mb-3">
            <span className="gradient-text">Kurzlinks</span>
          </h3>
          <ul className="space-y-2.5 text-sm">
            <QuickLink href="/strategie" label="Master-Vertriebsstrategie" desc="Die 16-Teile-Story für Andi/Thomas" />
            <QuickLink href="/playbooks" label="Sales-Playbooks" desc="Cold-Mail-Templates, Discovery-Skript, Brief-Vorlagen" />
            <QuickLink href="/research" label="Markt-Recherche" desc="Big-Agentur-Sales · Tool-Stack · AVA-Markt + EU AI Act" />
            <QuickLink href="/agents" label="KI-Agenten-Queue" desc="Aufgaben für Claude Code, Ergebnisse einsehen" />
          </ul>
        </motion.section>
      </div>
    </div>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass bg-white/5 border border-cyan-400/20 rounded-xl px-3 py-2">
      <div className="text-white/55 text-[10px] uppercase tracking-wider">{label}</div>
      <div className="text-white font-semibold text-sm">{value}</div>
    </div>
  );
}

function StatTile({ color, border, label, value, sub }: { color: string; border: string; label: string; value: string; sub: string }) {
  return (
    <motion.div
      className="glass-card"
      style={{ borderTopColor: border, borderTopWidth: 2, padding: '10px 16px' }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color }}>
          {label}
        </p>
        <p className="text-white/35 text-xs">{sub}</p>
      </div>
      <p className="text-2xl font-bold mt-0.5" style={{ color }}>
        {value}
      </p>
    </motion.div>
  );
}

function QuickLink({ href, label, desc }: { href: string; label: string; desc: string }) {
  return (
    <li>
      <a
        href={href}
        className="block glass bg-white/4 border border-white/10 hover:border-cyan-400/40 rounded-lg p-3 transition-all"
      >
        <div className="text-cyan-400 text-sm font-semibold">{label} →</div>
        <div className="text-white/55 text-xs mt-0.5">{desc}</div>
      </a>
    </li>
  );
}
