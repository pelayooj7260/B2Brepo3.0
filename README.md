# B2B Landing Page — Self-Hosted (No Supabase)

Supabase has been fully removed. Form submissions work via a plain HTTP POST
that you control. Three modes are available.

## Quick Start

### 1. Install dependencies
```bash
npm install
npm install express cors   # only needed for "api" mode
```

### 2. Configure your environment
```bash
cp .env.example .env
```
Edit `.env` and choose a VITE_FORM_MODE (see options below).

### 3. Run in development
```bash
# Terminal 1 — API server (skip if using webhook or mailto mode)
node server/index.js

# Terminal 2 — Vite dev server
npm run dev
```

### 4. Build for production
```bash
npm run build
node server/index.js
# The server auto-serves dist/ as static files
```

## Form Submission Modes

| Mode     | How it works                                      | Backend? |
|----------|---------------------------------------------------|----------|
| api      | POSTs JSON to /api/contact → server/index.js      | Yes      |
| webhook  | POSTs JSON to Zapier, Make, n8n, etc.             | No       |
| mailto   | Opens visitor's email client                      | No       |

Set VITE_FORM_MODE in your .env file. See .env.example for all options.

## Files Changed

| File                          | Change                                      |
|-------------------------------|---------------------------------------------|
| src/lib/supabase.ts           | DELETED                                     |
| src/lib/submitForm.ts         | ADDED — replaces Supabase with fetch        |
| src/components/AuditForm.tsx  | Import updated to use submitForm            |
| vite.config.ts                | Added dev proxy /api → localhost:3001       |
| package.json                  | Removed @supabase/supabase-js               |
| server/index.js               | ADDED — optional Express API server         |
| .env.example                  | ADDED — configuration template              |
