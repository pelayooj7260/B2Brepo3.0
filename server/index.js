/**
 * server/index.js
 * Local bridge for the audit request form.
 * Mirrors the behavior of the Vercel Serverless Function for local development.
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load local environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.jsonl');

const app = express();
app.use(cors());
app.use(express.json());

// ── POST /api/contact ────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { firstName, email, lastName, diagnosticData } = req.body;

  // Basic validation
  if (!firstName || !email) {
    return res.status(400).json({ error: 'First Name and email are required.' });
  }

  const record = {
    ...req.body,
    id: Date.now().toString(36),
    submitted_at: new Date().toISOString(),
  };

  // 1. Save local backup
  saveSubmission(record);

  // 2. Forward to n8n if URL is provided
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  if (n8nUrl) {
    try {
      console.log(`[contact] Forwarding submission from ${email} to n8n...`);
      const n8nResponse = await fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });

      if (!n8nResponse.ok) {
        const err = await n8nResponse.text();
        console.error(`[contact] n8n responded with error: ${err}`);
      } else {
        console.log(`[contact] Successfully forwarded to n8n.`);
      }
    } catch (error) {
      console.error(`[contact] Failed to forward to n8n:`, error);
    }
  } else {
    console.warn(`[contact] N8N_WEBHOOK_URL not set in .env. Skipping forward.`);
  }

  console.log(`[contact] Local submission recorded for ${email}`);
  return res.status(200).json({ ok: true });
});

// ── Storage ──────────────────────────────────────────────────
function saveSubmission(record) {
  try {
    fs.appendFileSync(SUBMISSIONS_FILE, JSON.stringify(record) + '\n', 'utf8');
  } catch (err) {
    console.error('Failed to save local submission:', err);
  }
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
  console.log(`\x1b[36m%s\x1b[0m`, `🚀 Local Backend Bridge running at http://localhost:${PORT}`);
  console.log(`\x1b[33m%s\x1b[0m`, `📂 Submissions backed up to: ${SUBMISSIONS_FILE}`);
  if (process.env.N8N_WEBHOOK_URL) {
    console.log(`\x1b[32m%s\x1b[0m`, `🔗 Webhook Active: ${process.env.N8N_WEBHOOK_URL}`);
  } else {
    console.log(`\x1b[31m%s\x1b[0m`, `⚠️  N8N_WEBHOOK_URL is missing from .env`);
  }
});
