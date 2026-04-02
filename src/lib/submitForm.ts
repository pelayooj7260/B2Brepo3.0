// Self-hosted form submission — no Supabase required.
// Supports three modes controlled by VITE_FORM_MODE in your .env file:
//
//   VITE_FORM_MODE=api        → POST JSON to VITE_API_URL (default: /api/contact)
//   VITE_FORM_MODE=webhook    → POST JSON to any webhook (Zapier, Make, n8n, etc.)
//                               Set VITE_WEBHOOK_URL to your endpoint
//   VITE_FORM_MODE=mailto     → Opens the user's mail client (no backend needed)
//
// If VITE_FORM_MODE is unset, defaults to "api".

export interface AuditRequest {
  name: string;
  email: string;
  company?: string;
  message?: string;
}

const MODE = (import.meta.env.VITE_FORM_MODE || 'api') as 'api' | 'webhook' | 'mailto';
const API_URL = import.meta.env.VITE_API_URL || '/api/contact';
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || '';
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hello@yourcompany.com';

export async function submitAuditRequest(data: AuditRequest): Promise<void> {
  if (MODE === 'mailto') {
    // Fallback: no backend at all — open mail client
    const subject = encodeURIComponent(`Audit Request from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'N/A'}\n\n${data.message || ''}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    return;
  }

  const url = MODE === 'webhook' ? WEBHOOK_URL : API_URL;

  if (!url) {
    throw new Error(
      `VITE_${MODE === 'webhook' ? 'WEBHOOK_URL' : 'API_URL'} is not set. ` +
      `Add it to your .env file.`
    );
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      submitted_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`Submission failed (${res.status}): ${text}`);
  }
}
