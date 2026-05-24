import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

interface AppShellProps {
  children: ReactNode;
}

const navItems = [
  { to: '/dashboard', label: 'Cockpit' },
  { to: '/accounts', label: 'Accounts' },
  { to: '/strategie', label: 'Strategie' },
  { to: '/playbooks', label: 'Playbooks' },
  { to: '/research', label: 'Research' },
  { to: '/agents', label: 'KI-Agenten' },
];

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="sticky top-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between flex-wrap gap-3">
              {/* Logo + Brand */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-white text-lg">
                  B
                </div>
                <div>
                  <h1 className="text-lg font-bold">
                    <span className="gradient-text">Sales</span>{' '}
                    <span className="text-white/85">Navigator</span>
                  </h1>
                  <p className="text-white/50 text-xs">Bruce B. · Stuttgart</p>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex items-center gap-1 flex-wrap">
                {navItems.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    style={({ isActive }) => ({
                      height: 36,
                      padding: '0 14px',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 500,
                      color: isActive ? '#00ffff' : 'rgba(255,255,255,0.7)',
                      background: isActive ? 'rgba(0,255,255,0.10)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isActive ? 'rgba(0,255,255,0.4)' : 'rgba(255,255,255,0.10)'}`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      transition: 'all 200ms',
                      textDecoration: 'none',
                    })}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </motion.header>

        <main className="max-w-7xl mx-auto px-6 py-8 pb-24">
          {children}
        </main>

        <footer className="max-w-7xl mx-auto px-6 pb-8 text-center text-white/35 text-xs">
          Bruce B. Sales Navigator · Lokal auf Max' MacBook · Bruce B. corporate communication GmbH · Stuttgart
        </footer>
      </div>
    </div>
  );
}
