#!/usr/bin/env bash
# Bruce B. Sales Navigator — Start-Script
# Startet den lokalen Dev-Server der Web-App auf http://localhost:5173

set -e

cd "$(dirname "$0")"

# 1. Stelle sicher, dass die Daten aktuell sind
if [ ! -f "data/private/customers.json" ]; then
  echo "→ Erst-Import der Kundendaten…"
  python3 scripts/import_customers.py
  python3 scripts/score_priority.py
fi

# 2. Stelle sicher, dass node_modules installiert sind
cd app
if [ ! -d "node_modules" ]; then
  echo "→ Installiere npm-Abhängigkeiten…"
  npm install
fi

# 3. Starte Vite-Dev-Server
echo ""
echo "════════════════════════════════════════════════════"
echo "  Bruce B. Sales Navigator startet…"
echo "  → http://localhost:5173"
echo "════════════════════════════════════════════════════"
echo ""
npm run dev
