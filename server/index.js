/**
 * server/index.js
 * Minimal self-hosted backend for the audit request form.
 *
 * Install deps:  npm install express cors
 * Run:           node server/index.js
 *
 * Submissions are written to server/submissions.jsonl (one JSON per line).
 * Swap the saveSubmission() function for any storage you prefer:
 *   - SQLite via `better-sqlite3`
 *   - MySQL / Postgres via `pg` or `mysql2`
 *   - Email via `nodemailer`
 *   - A Google Sheet via the Sheets API
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.jsonl');

const app = express();
app.use(cors());
app.use(express.json());

// ── POST /api/contact ────────────────────────────────────────
app.post('/api/contact', (req, res) => {
  const { name, email, company, message, submitted_at } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required.' });
  }

  const record = {
    id: Date.now().toString(36),
    name,
    email,
    company: company || null,
    message: message || null,
    submitted_at: submitted_at || new Date().toISOString(),
  };

  saveSubmission(record);

  console.log(`[contact] New submission from ${email}`);
  return res.status(200).json({ ok: true });
});

// ── Storage ──────────────────────────────────────────────────
function saveSubmission(record) {
  // Append a single JSON line to submissions.jsonl
  fs.appendFileSync(SUBMISSIONS_FILE, JSON.stringify(record) + '\n', 'utf8');
}

// ── Serve built frontend (optional) ─────────────────────────
const distDir = path.join(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

// ── Start ────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Submissions saved to: ${SUBMISSIONS_FILE}`);
});
