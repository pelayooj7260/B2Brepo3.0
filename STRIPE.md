# Stripe & Hybrid Audit Flow Implementation Plan

This document outlines the strategy for implementing the **hybrid audit flow** (redirecting to `/apply` page for high-intent diagnostics and payment checkout), configuring Stripe products/prices, and handling post-payment routing (Success & Cancel states).

---

## 1. Stripe Setup Guide: Where to Find Credentials

To run this checkout integration, you need four key values from your Stripe Dashboard:

### A. Stripe Secret Key (`STRIPE_SECRET_KEY`)
1. Log in to the [Stripe Dashboard](https://dashboard.stripe.com).
2. Toggle to **Test Mode** (highly recommended for development) or use Live Mode.
3. Navigate to **Developers > API keys** (or search "API keys" in the top bar).
4. Reveal and copy the **Secret key** (begins with `sk_test_` or `sk_live_`).
5. Save this to your `.env` file under `STRIPE_SECRET_KEY`.

### B. Product & Price IDs
You will create three separate products in Stripe corresponding to the audit tiers:

1. Navigate to **Product Catalog** (or click **Product Catalog** in the search).
2. Click **Add Product** in the top-right corner.
3. Create the **Starter Tier**:
   - **Name**: `Starter Infrastructure Audit`
   - **Description**: `1-10 employees. System bottlenecks, tool audit roadmap.`
   - **Price**: `$249.00`
   - **Billing**: `One-time`
   - Save the product. Under **Pricing**, locate the **API ID** (Price ID, begins with `price_`).
   - Save this to `.env` as `STRIPE_PRICE_STARTER`.
4. Create the **Full/Transformation Tier**:
   - **Name**: `Full Infrastructure Audit`
   - **Description**: `11-50 employees. In-depth flowcharts, API sync blueprints, CRM audit.`
   - **Price**: `$499.00`
   - **Billing**: `One-time`
   - Locate the **API ID** (Price ID).
   - Save this to `.env` as `STRIPE_PRICE_FULL`.
5. Create the **Enterprise Tier**:
   - **Name**: `Enterprise Infrastructure Audit`
   - **Description**: `50+ employees. Custom systems orchestration, direct support, bespoke integrations.`
   - **Price**: `$1,200.00`
   - **Billing**: `One-time`
   - Locate the **API ID** (Price ID).
   - Save this to `.env` as `STRIPE_PRICE_ENTERPRISE`.

### C. Webhook Setup (Direct to n8n)
Stripe needs to push payment events directly to n8n to log CRM leads.
1. Navigate to **Developers > Webhooks**.
2. Click **Add endpoint**.
3. **Endpoint URL**: Enter your n8n webhook URL:
   `https://n8n.trw-aaa.site/webhook/1f8cce2b-da3f-4023-9714-212e54c40dd5` (or the production equivalent).
4. **Select events**: Search for and select `checkout.session.completed`.
5. Click **Add endpoint**.
6. (Optional) Copy the **Signing secret** (`whsec_...`) if verifying request authenticity inside n8n.

---

## 2. Hybrid Flow Routing Strategy

Currently, Thorne behaves as an SPA toggled by search parameters (e.g. `page=audit-pricing` or `page=unsubscribed`). We will implement clean routing fallback and page states to support `/apply` and `/success` sub-pages seamlessly.

```
[Main CTA / Modal Apply Button]
       │
       ▼ (Redirect)
[Page: /apply] (AuditPricingPage with Multi-step diagnostic form)
       │
       ▼ (Submit Payload to API)
[Stripe Checkout Page] (hosted securely by Stripe)
       │
 ┌─────┴────────────────────────┐
 │ (Success)                    │ (Cancel)
 ▼                              ▼
[Page: /success]               [Page: /apply (with toast notification)]
```

### Components to Update/Create:

1. **`src/App.tsx` (SPA Router Update)**:
   - Add routes/conditional rendering for:
     - `apply` page (aliases `audit-pricing` for backwards compatibility).
     - `success` page (dedicated transaction confirmation screen).
   - Make route matching work on both pathnames (e.g. `/apply` or `/success`) and search parameters (e.g. `?page=apply` or `?page=success`) for Vercel routing support.

2. **Navbar & Modals**:
   - Update navigation items.
   - Any CTA button (in Hero, Business Diagnostic, or any "Apply/Join" modal) will trigger navigation to `?page=apply` (or `/apply`) instead of inline modal completion, matching the hybrid layout approach.

3. **Success Page (`src/components/SuccessPage.tsx`) [NEW]**:
   - A high-aesthetic, premium confirmation screen displaying transaction details parsed from Stripe query parameters.
   - Clear details on estimated turnaround (3–7 business days).
   - Easy action items: booking link to Calendly, returning to the portal.

4. **API Endpoint (`api/create-checkout-session.ts`)**:
   - Update webhook metadata structure so all custom fields are mapped correctly for n8n processing.
   - Set the `success_url` to redirect to `/success?session_id={CHECKOUT_SESSION_ID}`.

---

## 3. Environment Variables Configuration

Ensure the following variables are specified in `.env` (local) and Vercel Dashboard (production):

```env
# Stripe Keys
STRIPE_SECRET_KEY="sk_test_..."

# Price IDs
STRIPE_PRICE_STARTER="price_..."
STRIPE_PRICE_FULL="price_..."
STRIPE_PRICE_ENTERPRISE="price_..."
```

---

## 4. Verification Plan

- **Local Verification**:
  - Run the local server.
  - Trigger checkout from the `/apply` page.
  - Confirm redirection to Stripe Checkout with all metadata items listed under the Stripe dashboard logs.
  - Complete a test payment (using `4242 4242 4242 4242`) and verify direct redirection to `/success`.

- **Webhook Verification**:
  - Verify Stripe sends `checkout.session.completed` event to n8n webhook test queue, populating the automated lead board.
