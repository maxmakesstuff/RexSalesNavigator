import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';
import type { Company } from '../types';

const tierColor: Record<string, { border: string; text: string; bg: string }> = {
  'Tier 1 — Hot': { border: 'rgba(52,211,153,.5)', text: '#34d399', bg: 'rgba(52,211,153,.10)' },
  'Tier 2 — Warm': { border: 'rgba(250,204,21,.5)', text: '#facc15', bg: 'rgba(250,204,21,.10)' },
  'Tier 3 — Track': { border: 'rgba(34,211,238,.5)', text: '#22d3ee', bg: 'rgba(34,211,238,.10)' },
  'Tier 4 — Cold': { border: 'rgba(148,163,184,.5)', text: '#94a3b8', bg: 'rgba(148,163,184,.10)' },
};

export default function AccountsPage() {
  const [data, setData] = useState<Company[]>([]);
  const [q, setQ] = useState('');
  const [tier, setTier] = useState<string>('all');
  const [industry, setIndustry] = useState<string>('all');
  const [open, setOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.customers().then(c => {
      setData(c);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return data.filter(c => {
      if (tier !== 'all' && c.tier !== tier) return false;
      if (industry !== 'all' && c.industry !== industry) return false;
      if (q) {
        const needle = q.toLowerCase();
        const hay = (c.company + ' ' + c.industry + ' ' + (c.suggested_hook || '')).toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [data, q, tier, industry]);

  const industries = useMemo(() => {
    const set = new Set<string>();
    data.forEach(c => set.add(c.industry));
    return Array.from(set).sort();
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Header / filters */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card no-hover-effect"
      >
        <h2 className="text-2xl font-bold mb-3">
          <span className="gradient-text">Accounts</span>{' '}
          <span className="text-white/85">— Priorisierte Pipeline-Basis</span>
        </h2>
        <p className="text-white/55 text-sm mb-5">
          Alle {data.length} Firmen, sortiert nach Score (100-Punkte-Modell: Branche · Brand-Recognition · Beziehungsstärke · Kontakt-Bereitschaft · Geografie).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            className="glass-input md:col-span-2"
            placeholder="🔍  Suche Firma, Branche, Hook…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <select className="glass-input" value={tier} onChange={e => setTier(e.target.value)}>
            <option value="all">Alle Tiers</option>
            {Object.keys(tierColor).map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select className="glass-input" value={industry} onChange={e => setIndustry(e.target.value)}>
            <option value="all">Alle Branchen</option>
            {industries.map(i => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="mt-3 text-white/45 text-xs">
          Zeige {filtered.length} von {data.length} Firmen. Klick öffnet Details + Kontakte.
        </div>
      </motion.section>

      {/* Account list */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-2"
      >
        {loading && (
          <div className="glass-card no-hover-effect text-center text-white/55 py-12">
            Lade Accounts…
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="glass-card no-hover-effect text-center text-white/55 py-12">
            Keine Treffer. Filter zurücksetzen?
          </div>
        )}
        {!loading && filtered.slice(0, 200).map((c, i) => {
          const t = tierColor[c.tier || 'Tier 4 — Cold'];
          const isOpen = open === `${c.company}-${i}`;
          return (
            <motion.div
              key={`${c.company}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: Math.min(0.4, 0.01 * i) }}
              className="glass bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : `${c.company}-${i}`)}
                className="w-full text-left flex items-stretch hover:bg-white/8 transition-colors"
              >
                <div className="w-1 flex-shrink-0" style={{ background: t.text }} />
                <div className="flex-1 p-4 grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-12 md:col-span-1 text-cyan-400 font-mono font-bold text-lg text-center md:text-left">
                    {c.score}
                  </div>
                  <div className="col-span-12 md:col-span-4 text-white text-sm font-medium">
                    {c.company}
                  </div>
                  <div className="col-span-6 md:col-span-2 text-white/55 text-xs">{c.industry}</div>
                  <div className="col-span-6 md:col-span-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: t.bg, color: t.text, border: `1px solid ${t.border}` }}
                    >
                      {c.tier}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-3 text-white/55 text-xs">
                    {c.contacts.length} Kontakt{c.contacts.length === 1 ? '' : 'e'} · {isOpen ? '▴' : '▾'}
                  </div>
                </div>
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
                    <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* Score breakdown */}
                      <div>
                        <h4 className="text-cyan-400 text-xs uppercase tracking-wider mb-2">Score-Aufschlüsselung</h4>
                        {c.score_breakdown && (
                          <ul className="space-y-1 text-xs">
                            <li className="text-white/65">Branche: <span className="text-white font-mono">{c.score_breakdown.industry}</span></li>
                            <li className="text-white/65">Brand-Recognition: <span className="text-white font-mono">{c.score_breakdown.brand}</span></li>
                            <li className="text-white/65">Beziehung: <span className="text-white font-mono">{c.score_breakdown.relationship}</span></li>
                            <li className="text-white/65">Kontakt-Bereitschaft: <span className="text-white font-mono">{c.score_breakdown.readiness}</span></li>
                            <li className="text-white/65">Geo (BW): <span className="text-white font-mono">{c.score_breakdown.geo}</span></li>
                          </ul>
                        )}
                      </div>

                      {/* Suggested hook */}
                      <div className="md:col-span-2">
                        <h4 className="text-cyan-400 text-xs uppercase tracking-wider mb-2">Vorgeschlagener Hook</h4>
                        <p className="text-white/85 text-sm leading-relaxed">{c.suggested_hook || '(noch nicht generiert)'}</p>
                      </div>

                      {/* Contacts */}
                      <div className="md:col-span-3">
                        <h4 className="text-cyan-400 text-xs uppercase tracking-wider mb-2">
                          Kontakte ({c.contacts.length})
                        </h4>
                        {c.contacts.length === 0 ? (
                          <p className="text-white/45 text-sm italic">Keine Kontakte hinterlegt.</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {c.contacts.map((ct, j) => (
                              <div
                                key={j}
                                className="glass bg-white/4 border border-white/8 rounded-lg p-3 text-xs"
                              >
                                <div className="text-white font-medium">
                                  {ct.first_name} {ct.last_name}
                                  {!ct.first_name && !ct.last_name && <span className="text-white/45 italic">(unbenannt)</span>}
                                </div>
                                {ct.position && (
                                  <div className="text-white/55 mt-0.5">{ct.position}</div>
                                )}
                                <div className="mt-2 space-y-0.5 text-white/65">
                                  {ct.email && <div>✉ {ct.email}</div>}
                                  {ct.mobile && <div>📱 {ct.mobile}</div>}
                                  {ct.phone && <div>📞 {ct.phone}</div>}
                                </div>
                                {ct.notes && (
                                  <div className="mt-2 pt-2 border-t border-white/8 text-white/55 italic">
                                    {ct.notes}
                                  </div>
                                )}
                                <div className="mt-2 flex gap-1.5 text-[10px]">
                                  {ct.mail_consent && (
                                    <span className="px-1.5 py-0.5 rounded bg-green-500/15 text-green-300 border border-green-400/30">Mail-Consent</span>
                                  )}
                                  {ct.phone_consent && (
                                    <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-200 border border-cyan-400/30">Phone-Consent</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        {!loading && filtered.length > 200 && (
          <div className="glass-card no-hover-effect text-center text-white/55 text-sm">
            Weitere {filtered.length - 200} Firmen verfügbar — verfeinere den Filter, um sie zu sehen.
          </div>
        )}
      </motion.section>
    </div>
  );
}
