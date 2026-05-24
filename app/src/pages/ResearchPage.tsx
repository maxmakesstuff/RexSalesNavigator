import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import MarkdownView from '../components/MarkdownView';

const TABS = [
  { id: '01', label: 'Big-Agentur Enterprise Sales', desc: 'cherrypicker, Konsortialmodell, wie Jangled Nerves Mercedes gewinnt' },
  { id: '02', label: 'B2B-Sales-Methodik DACH', desc: 'GAP + MEDDPICC, 500€ Tool-Stack, 21-Tage-Cadence' },
  { id: '03', label: 'AVA-Markt & EU AI Act', desc: 'Wettbewerbsanalyse, Compliance-Hebel, 10 Hot-Accounts Q3 2026' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function ResearchPage() {
  const [active, setActive] = useState<TabId>('01');
  const [md, setMd] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.research(active).then(m => {
      setMd(m);
      setLoading(false);
    });
  }, [active]);

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card no-hover-effect"
      >
        <h2 className="text-2xl font-bold mb-3">
          <span className="gradient-text">Markt-Recherche</span>{' '}
          <span className="text-white/85">— Mai 2026</span>
        </h2>
        <p className="text-white/55 text-sm mb-5">
          Drei verifizierte Recherche-Berichte mit verlinkten Originalquellen. Erstellt durch parallele Multi-Agent-Recherche im Mai 2026.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className="text-left rounded-lg p-4 transition-all"
              style={{
                background: active === t.id ? 'rgba(0,255,255,0.10)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active === t.id ? 'rgba(0,255,255,0.4)' : 'rgba(255,255,255,0.10)'}`,
                color: active === t.id ? '#00ffff' : 'rgba(255,255,255,0.85)',
              }}
            >
              <div className="font-semibold text-sm mb-1">{t.id} · {t.label}</div>
              <div className="text-xs opacity-65">{t.desc}</div>
            </button>
          ))}
        </div>
      </motion.section>

      <motion.section
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card no-hover-effect"
      >
        {loading ? (
          <div className="text-white/55 text-sm py-12 text-center">Lade Recherche…</div>
        ) : (
          <MarkdownView markdown={md} />
        )}
      </motion.section>
    </div>
  );
}
