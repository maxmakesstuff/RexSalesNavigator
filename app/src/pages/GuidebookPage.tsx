import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import MarkdownView from '../components/MarkdownView';

export default function GuidebookPage() {
  const [md, setMd] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.strategy().then(m => {
      setMd(m);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card no-hover-effect"
      >
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-2">
          <h2 className="text-2xl font-bold">
            <span className="gradient-text">Master-Vertriebsstrategie</span>{' '}
            <span className="text-white/85">2026/27</span>
          </h2>
          <span className="text-white/45 text-xs">Lesezeit ~20 Min</span>
        </div>
        <p className="text-white/65 text-sm">
          Das Strategie-Guidebook für Bruce B. — geschrieben für Andi, Thomas, Johannes und Max. Adressiert alle relevanten Fragen: Zielbranchen, Big-Ticket-Pfade, Produktisierung, Sales-Framework, Tooling, Konsortial-Partner, Award-Strategie und 18-Monats-Forecast.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card no-hover-effect"
      >
        {loading ? (
          <div className="text-white/55 text-sm py-12 text-center">Lade Strategie-Dokument…</div>
        ) : (
          <MarkdownView markdown={md} />
        )}
      </motion.section>
    </div>
  );
}
