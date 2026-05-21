# Implementation Plan: Business Infrastructure Audit Pricing Page

This document outlines the step-by-step list plan to implement the **Business Infrastructure Audit** pricing page on the website.

---

## 📋 Progress & Checklist

### 1. Data Schema & CMS (Versioning) Setup
- [x] **Create CMS File**: Create `src/data/auditPricingPage.ts` to host page template versions.
- [x] **Define Schema Interface**: Define interfaces for `Hero`, `WhatsIncluded`, `PricingTier`, `Outcomes`, `ProcessSteps`, and `FAQs`.
- [x] **Version 1.0 Content Setup**: Populate `v1.0` with the user-defined copy (Pain Points, Deliverables, Pricing Tiers, Outcomes, Process steps, FAQs).
- [x] **Create Version Rollback Logic**: Implement a helper function `getPageVersion(version: string)` to fetch specific versions of the template, enabling dynamic rendering.
- [x] **CMS Admin Previewer**: Create a floating debug console/admin bar (activated by `?admin=true`) allowing simulated rolls/rollbacks between versions (e.g. `v1.0` and `v1.1`) to verify rollback functionality.

### 2. Analytics Hooks Setup
- [x] **Create Analytics Utility**: Create `src/lib/analytics.ts` to capture events and log them.
- [x] **Scroll Depth Tracker Hook**: Implement a React hook `useScrollDepthTracker` that triggers analytics events when a user reaches `25%`, `50%`, `75%`, and `100%` scroll milestones on the pricing page.
- [x] **CTA Click Handler**: Write a global tracker wrapper `trackCTAClick(buttonId: string, metadata: object)` for all buttons.
- [x] **Form Submission Tracker**: Define helper `trackFormSubmission(status: 'success' | 'failure', duration: number, details: object)` to capture conversion rates.

### 3. Page Routing & Entry Point
- [x] **Dynamic View State**: In `src/App.tsx`, introduce a view state that detects if `window.location.search` contains `?page=audit-pricing` or if a navbar item is clicked.
- [x] **App component integration**: Render the new `AuditPricingPage` component conditionally when active, keeping the app a seamless SPA.
- [x] **SEO Optimization**: Use `react-helmet-async` on the new page to set appropriate page titles ("Business Infrastructure Audit | Thorne") and descriptive meta tags.
- [x] **Navbar Updates**: Update `src/components/Navbar.tsx` to include a link to the pricing page.

### 4. Component Layouts (Pricing Page UI)
- [x] **Hero Section Component**:
  - Title: "Business Infrastructure Audit"
  - Subtitle: "Identify inefficiencies, bottlenecks, failure points, and automation opportunities across your workflows."
  - CTA button: "Check Pricing & Get Started" (smooth scrolls to Pricing Table).
  - Elegant mesh styling conforming to the current dark/glassmorphic look.
- [x] **What's Included Component**:
  - Grid presentation showing deliverables: Systems Map, API Analysis, Time-loss Report, Risk Assessment, Automation Roadmap, Prioritized Recommendations.
- [x] **Pricing Table & Logic Component**:
  - State hook for `businessSize`: Segmented controls or sliding toggle matching ranges `1–10`, `11–50`, `50+`.
  - **Pricing Logic**:
    - If `1–10`: Render `Starter ($249)` and `Full ($499)` cards.
    - If `11–50`: Render `Full ($499)` and `Enterprise ($1,200)` cards.
    - If `50+`: Render `Enterprise ($1,200)` card only.
  - Cards should transition dynamically and animate smoothly with Framer Motion.
  - Tier CTAs: Button "Select Starter / Full / Enterprise" that scrolls to the CTA Form and pre-selects/pre-fills the tier & business size.
- [x] **Before/After Outcomes Component**:
  - Visual layout showcasing metrics: Time Saved, Revenue Increase, Risk Reduction, Reputation Protection.
  - Interactive hover state highlighting the high-friction "Before" versus optimized "After" state.
- [x] **Process Overview Component**:
  - Chronological path listing the steps: Intake & discovery ➡️ Systems access & mapping ➡️ Workflow analysis ➡️ Risk & inefficiency scoring ➡️ Recommendations & roadmap ➡️ Review call.
- [x] **FAQ Component**:
  - Accordion dropdown style containing the FAQs (Access, Duration, Tools, Implementations).
- [x] **CTA Footer Form Component**:
  - The final audit request form, containing inputs:
    - **Name**
    - **Email**
    - **Business size** (Dropdown: 1-10, 11-50, 50+, synced with pricing selections)
    - **Current tools** (Textarea)
    - **Pain points** (Textarea or check grid)
    - **Product type** (Hidden or Read-only: "Business Infrastructure Audit")
  - Action button: "Request Audit".

### 5. API & n8n Form Integration
- [x] **Payload Structure**: Configure the form to collect and construct the exact schema payload requested by the user.
- [x] **Contact Hooking**: Adapt the submission callback to send the payload to the existing `/api/contact` proxy (proxies automatically to the n8n webhook via `N8N_WEBHOOK_URL`).
- [x] **Submission State Handling**: Add loading spinners, success message protocols, and error retry handlers.

---

## 🎨 Visual Identity & Styling
- **Backgrounds**: Deep Obsidian (`#0A0A0A`) with animated gradients.
- **Accents**: Electric Cyan (`#00F2FF`) and Soft Violet (`#8B5CF6`).
- **Typography**: Outfit for clean, high-impact titles; Inter for legible, informative body copy.
- **Glassmorphism**: Utilize existing `.glass-card` styling for tables, cards, and forms.

---

## 🧪 Verification Plan

### Automated Checks
- Run typecheck and lint tools: `npm run typecheck` and `npm run lint`.
- Build application: `npm run build` to verify there are no compilation or bundle errors.

### Manual & Interactive Testing
- **Pricing Logic**: Click through "1-10", "11-50", and "50+" toggles to verify only the designated cards display.
- **CTA Scroll & Prefill**: Click "Select Starter" and check if it scrolls to the form, setting Business Size and Product Type fields correctly.
- **Analytics Logs**: Open the browser inspector to verify that Scroll Depth logs trigger at correct intervals, and CTA/Form submissions register immediately.
- **API Integration**: Test submitting the audit request to confirm it initiates successfully and calls the backend `/api/contact` proxy.
