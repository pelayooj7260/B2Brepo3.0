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
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message?: string;
  gdprConsent: boolean;
  diagnosticData?: {
    scale: string;
    sector: string;
    score: number;
  };
}

const MODE = (import.meta.env.VITE_FORM_MODE || 'api') as 'api' | 'webhook' | 'mailto';
const API_URL = import.meta.env.VITE_API_URL || '/api/contact';
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || '';
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hello@yourcompany.com';

export async function submitAuditRequest(data: AuditRequest): Promise<void> {
  if (MODE === 'mailto') {
    const fullName = `${data.firstName} ${data.lastName}`;
    const subject = encodeURIComponent(`Audit Request from ${fullName}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${data.email}\nCompany: ${data.company || 'N/A'}\nGDPR Consent: ${data.gdprConsent ? 'Yes' : 'No'}\n\n${data.message || ''}`
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

export interface PricingAuditRequest {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message?: string;
  businessSize: string;
  currentTools: string;
  painPoints: string;
  productType: string;
  source: string;
}

export async function submitPricingAuditRequest(data: PricingAuditRequest): Promise<void> {
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
