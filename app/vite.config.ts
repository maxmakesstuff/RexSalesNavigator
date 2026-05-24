import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

// Lightweight plugin to expose the markdown docs as JSON-readable files
// served from the dev server. Lets the React app fetch /api/strategy
// without a real backend.
function docsApiPlugin() {
  const docsRoot = path.resolve(__dirname, '../docs');
  const dataRoot = path.resolve(__dirname, '../data');

  function read(file: string): string | null {
    try {
      return fs.readFileSync(file, 'utf-8');
    } catch {
      return null;
    }
  }

  return {
    name: 'bruce-b-docs-api',
    configureServer(server: any) {
      server.middlewares.use('/api/strategy', (_req: any, res: any) => {
        const md = read(path.join(docsRoot, 'MASTER_VERTRIEBSSTRATEGIE.md'));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ markdown: md ?? '# Datei nicht gefunden' }));
      });
      server.middlewares.use('/api/research', (req: any, res: any) => {
        const url = new URL(req.url ?? '', 'http://x');
        const which = url.searchParams.get('which') ?? '01';
        const map: Record<string, string> = {
          '01': '01_big_agency_enterprise_sales.md',
          '02': '02_b2b_sales_methodik_dach.md',
          '03': '03_ava_market_eu_aiact_tenders.md',
        };
        const file = map[which];
        const md = file ? read(path.join(docsRoot, 'research', file)) : null;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ markdown: md ?? '# Datei nicht gefunden', which }));
      });
      server.middlewares.use('/api/playbook', (req: any, res: any) => {
        const url = new URL(req.url ?? '', 'http://x');
        const which = url.searchParams.get('which') ?? '01';
        const map: Record<string, string> = {
          '01': '01_outbound_email_templates.md',
          '02': '02_discovery_call_skript.md',
          '03': '03_reaktivierungs_brief.md',
          '04': '04_daily_weekly_cadence.md',
        };
        const file = map[which];
        const md = file ? read(path.join(docsRoot, 'playbooks', file)) : null;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ markdown: md ?? '# Datei nicht gefunden', which }));
      });
      server.middlewares.use('/api/customers', (_req: any, res: any) => {
        // Prefer private (real) data; fall back to public demo
        const priv = path.join(dataRoot, 'private/customers_scored.json');
        const demo = path.join(dataRoot, 'seed/customers.demo.json');
        const file = fs.existsSync(priv) ? priv : demo;
        const json = read(file);
        res.setHeader('Content-Type', 'application/json');
        res.end(json ?? '[]');
      });
      server.middlewares.use('/api/top50', (_req: any, res: any) => {
        const priv = path.join(dataRoot, 'private/top50_priority.json');
        const json = read(priv);
        res.setHeader('Content-Type', 'application/json');
        res.end(json ?? '[]');
      });
      server.middlewares.use('/api/agents/inbox', (req: any, res: any) => {
        const dir = path.join(__dirname, '../agents/inbox');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        if (req.method === 'GET') {
          const items = fs.readdirSync(dir)
            .filter((f: string) => f.endsWith('.json'))
            .map((f: string) => {
              const full = path.join(dir, f);
              return { name: f, ...JSON.parse(fs.readFileSync(full, 'utf-8')) };
            });
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(items));
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => (body += chunk));
          req.on('end', () => {
            try {
              const payload = JSON.parse(body);
              const ts = new Date().toISOString().replace(/[:.]/g, '-');
              const slug = (payload.title || 'task').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
              const filename = `${ts}_${slug}.json`;
              fs.writeFileSync(path.join(dir, filename), JSON.stringify({ ...payload, createdAt: ts }, null, 2));
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, filename }));
            } catch (e: any) {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, error: e.message }));
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end();
      });
      server.middlewares.use('/api/agents/outbox', (_req: any, res: any) => {
        const dir = path.join(__dirname, '../agents/outbox');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const items = fs.readdirSync(dir)
          .filter((f: string) => f.endsWith('.md') || f.endsWith('.json'))
          .map((f: string) => ({
            name: f,
            mtime: fs.statSync(path.join(dir, f)).mtime,
            content: fs.readFileSync(path.join(dir, f), 'utf-8'),
          }));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(items));
      });
      server.middlewares.use('/api/notes', (req: any, res: any) => {
        // Simple notes storage in data/private/notes.json
        const file = path.join(dataRoot, 'private/notes.json');
        if (!fs.existsSync(path.dirname(file))) fs.mkdirSync(path.dirname(file), { recursive: true });

        if (req.method === 'GET') {
          const json = read(file) ?? '[]';
          res.setHeader('Content-Type', 'application/json');
          res.end(json);
          return;
        }
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => (body += chunk));
          req.on('end', () => {
            try {
              const list = JSON.parse(read(file) ?? '[]');
              const item = JSON.parse(body);
              item.id = `n-${Date.now()}`;
              item.createdAt = new Date().toISOString();
              list.unshift(item);
              fs.writeFileSync(file, JSON.stringify(list, null, 2));
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, id: item.id }));
            } catch (e: any) {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, error: e.message }));
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), docsApiPlugin()],
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
});
