import { Routes, Route, Navigate } from 'react-router-dom';
import GuidebookPage from './pages/GuidebookPage';
import DashboardPage from './pages/DashboardPage';
import AccountsPage from './pages/AccountsPage';
import PlaybooksPage from './pages/PlaybooksPage';
import ResearchPage from './pages/ResearchPage';
import AgentsPage from './pages/AgentsPage';
import AppShell from './components/AppShell';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/strategie" element={<GuidebookPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/playbooks" element={<PlaybooksPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppShell>
  );
}
