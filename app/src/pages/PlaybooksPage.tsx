import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import MarkdownView from '../components/MarkdownView';

const TABS = [
  { id: '01', label: 'Outbound E-Mail-Templates', desc: '6 fertige Cold-Mail-Templates auf Deutsch, UWG-konform' },
  { id: '02', label: 'Discovery-Call-Skript', desc: 'GAP-Selling-Discovery + Einwand-Behandlung' },
  { id: '03', label: 'Reaktivierungs-Brief', desc: 'Bestandskunden-Briefkampagne mit Telefon-Follow-up' },
  { id: '04', label: 'Daily / Weekly Cadence', desc: 'Bruce B. Sales Hour, Friday Review, Monthly + Quarterly' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function PlaybooksPage() {
  const [active, setActive] = useState<TabId>('01');
  const [md, setMd] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.playbook(active).then(m => {
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
          <span className="gradient-text">Sales-Playbooks</span>
        </h2>
        <p className="text-white/55 text-sm mb-5">
          Operative Vorlagen für den Vertriebs-Alltag. Alles auf Deutsch, in Bruce-B-Voice, UWG/DSGVO-konform, sofort einsetzbar.
        </p>
        <div className="flex flex-wrap gap-2">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className="text-left rounded-lg px-4 py-2.5 transition-all"
              style={{
                background: active === t.id ? 'rgba(0,255,255,0.10)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active === t.id ? 'rgba(0,255,255,0.4)' : 'rgba(255,255,255,0.10)'}`,
                color: active === t.id ? '#00ffff' : 'rgba(255,255,255,0.85)',
              }}
            >
              <div className="font-semibold text-sm">{t.label}</div>
              <div className="text-xs opacity-65 mt-0.5">{t.desc}</div>
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
          <div className="text-white/55 text-sm py-12 text-center">Lade Playbook…</div>
        ) : (
          <MarkdownView markdown={md} />
        )}
      </motion.section>
    </div>
  );
}
