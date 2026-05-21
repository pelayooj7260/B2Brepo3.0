export interface AuditPricingPageSchema {
  version: string;
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  painPoints: string[];
  deliverables: {
    title: string;
    desc: string;
  }[];
  pricingTiers: {
    id: string;
    name: string;
    price: number;
    subtitle: string;
    range: string;
    features: string[];
  }[];
  outcomes: {
    metric: string;
    before: string;
    after: string;
  }[];
  process: {
    step: number;
    title: string;
    desc: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export const pageVersions: Record<string, AuditPricingPageSchema> = {
  "1.0": {
    version: "1.0",
    hero: {
      title: "Business Infrastructure Audit",
      subtitle: "Identify inefficiencies, bottlenecks, failure points, and automation opportunities across your workflows.",
      ctaText: "Configure Your Audit"
    },
    painPoints: [
      "Systems don’t talk to each other",
      "Manual tasks slowing down operations",
      "Lost leads or inconsistent follow‑ups",
      "No visibility into where time is wasted",
      "High risk of errors or compliance issues"
    ],
    deliverables: [
      { title: "Full Systems Map", desc: "A comprehensive visualization of all business applications and connection points." },
      { title: "API & Data Flow Analysis", desc: "Detailed mapping of API usage, endpoints, payloads, and sync frequencies." },
      { title: "Time‑loss Report", desc: "Data-driven calculation of manual effort, bottlenecks, and wasted hours." },
      { title: "Risk & Failure‑point Assessment", desc: "Identification of security leaks, single points of failure, and data mismatch risks." },
      { title: "Automation Roadmap", desc: "A phased strategy outlining which processes to automate first for maximum ROI." },
      { title: "Prioritized Recommendations", desc: "Actionable, step-by-step instructions to streamline your infrastructure." }
    ],
    pricingTiers: [
      {
        id: "starter",
        name: "Starter Audit",
        price: 249,
        subtitle: "For solopreneurs and micro‑teams (1–10 employees)",
        range: "1-10",
        features: [
          "Full systems map",
          "Time-loss report",
          "Automation roadmap",
          "3-7 business days turnaround"
        ]
      },
      {
        id: "full",
        name: "Full Infrastructure Audit",
        price: 499,
        subtitle: "For growing teams (11–50 employees)",
        range: "11-50",
        features: [
          "Full systems map",
          "API & data flow analysis",
          "Time-loss report",
          "Risk & failure-point assessment",
          "Automation roadmap",
          "3-7 business days turnaround"
        ]
      },
      {
        id: "enterprise",
        name: "Enterprise Audit",
        price: 1200,
        subtitle: "For complex operations (50+ employees)",
        range: "50+",
        features: [
          "Full systems map",
          "API & data flow analysis",
          "Time-loss report",
          "Risk & failure-point assessment",
          "Automation roadmap",
          "Prioritized recommendations",
          "Review & implementation consult call",
          "3-7 business days turnaround"
        ]
      }
    ],
    outcomes: [
      {
        metric: "Time Saved",
        before: "Hours lost to manual tasks daily",
        after: "Automated workflows and reduced administrative load"
      },
      {
        metric: "Revenue Increase",
        before: "Missed leads and slow response times",
        after: "Faster follow-ups and higher conversion rates"
      },
      {
        metric: "Risk Reduction",
        before: "Hidden system failure points",
        after: "Clear risk map and mitigation plan"
      },
      {
        metric: "Reputation Protection",
        before: "Inconsistent client experience",
        after: "Standardized processes and highly reliable delivery"
      }
    ],
    process: [
      { step: 1, title: "Intake & Discovery", desc: "Complete initial systems questionnaire." },
      { step: 2, title: "Systems Access & Mapping", "desc": "Provide read-only credentials to catalog current tools." },
      { step: 3, title: "Workflow Analysis", desc: "Detailed review of manual work paths and sync bottlenecks." },
      { step: 4, title: "Risk & Inefficiency Scoring", desc: "Calculating time waste indicators and failure factors." },
      { step: 5, title: "Recommendations & Roadmap", desc: "Compiling the action guide and integration prioritizations." },
      { step: 6, title: "Review Call", desc: "Interactive debriefing walkthrough of findings and implementation plan." }
    ],
    faqs: [
      {
        q: "What access do you need?",
        a: "We only require read-only access to relevant platforms or video walkthroughs of your current manual flows. We sign mutual NDAs before any sharing."
      },
      {
        q: "How long does it take?",
        a: "Turnaround is 3–7 business days depending on complexity and how quickly access is provided."
      },
      {
        q: "What tools do you support?",
        a: "We support a wide array of SaaS and self-hosted tools: Salesforce, HubSpot, Stripe, Slack, Notion, Jira, Make, Zapier, n8n, custom database environments, and standard REST APIs."
      },
      {
        q: "Do you help implement the fixes?",
        a: "Absolutely. While the audit functions as an independent blueprint, we provide customized automation build and support contracts to implement all recommendations."
      }
    ]
  },
  "1.1": {
    version: "1.1",
    hero: {
      title: "Automate Your Operations: Business Audit",
      subtitle: "Uncover structural inefficiencies, system gaps, and high-impact integration opportunities.",
      ctaText: "Start Audit Configuration"
    },
    painPoints: [
      "Incompatible tool stacks creating friction",
      "Manual data reentry draining employee hours",
      "Leaking customer inquiries and delayed responses",
      "Lack of reporting transparency",
      "Vulnerability to operational human-errors"
    ],
    deliverables: [
      { title: "Full Systems Map", desc: "A comprehensive visualization of all business applications and connection points." },
      { title: "API & Data Flow Analysis", desc: "Detailed mapping of API usage, endpoints, payloads, and sync frequencies." },
      { title: "Time‑loss Report", desc: "Data-driven calculation of manual effort, bottlenecks, and wasted hours." },
      { title: "Risk & Failure‑point Assessment", desc: "Identification of security leaks, single points of failure, and data mismatch risks." },
      { title: "Automation Roadmap", desc: "A phased strategy outlining which processes to automate first for maximum ROI." },
      { title: "Prioritized Recommendations", desc: "Actionable, step-by-step instructions to streamline your infrastructure." }
    ],
    pricingTiers: [
      {
        id: "starter",
        name: "Starter Audit",
        price: 249,
        subtitle: "For micro teams (1–10 employees)",
        range: "1-10",
        features: [
          "Full systems map",
          "Time-loss report",
          "Automation roadmap",
          "Express 3-7 day delivery"
        ]
      },
      {
        id: "full",
        name: "Full Infrastructure Audit",
        price: 499,
        subtitle: "For scaling organizations (11–50 employees)",
        range: "11-50",
        features: [
          "Full systems map",
          "API & data flow analysis",
          "Time-loss report",
          "Risk & failure-point assessment",
          "Automation roadmap",
          "Express 3-7 day delivery"
        ]
      },
      {
        id: "enterprise",
        name: "Enterprise Audit",
        price: 1200,
        subtitle: "For high-performance enterprises (50+ employees)",
        range: "50+",
        features: [
          "Full systems map",
          "API & data flow analysis",
          "Time-loss report",
          "Risk & failure-point assessment",
          "Automation roadmap",
          "Prioritized recommendations",
          "Strategy consultation call",
          "Express 3-7 day delivery"
        ]
      }
    ],
    outcomes: [
      {
        metric: "Time Saved",
        before: "Hours lost to manual tasks daily",
        after: "Automated workflows and reduced administrative load"
      },
      {
        metric: "Revenue Increase",
        before: "Missed leads and slow response times",
        after: "Faster follow-ups and higher conversion rates"
      },
      {
        metric: "Risk Reduction",
        before: "Hidden system failure points",
        after: "Clear risk map and mitigation plan"
      },
      {
        metric: "Reputation Protection",
        before: "Inconsistent client experience",
        after: "Standardized processes and highly reliable delivery"
      }
    ],
    process: [
      { step: 1, title: "Intake & Discovery", desc: "Complete initial systems questionnaire." },
      { step: 2, title: "Systems Access & Mapping", "desc": "Provide read-only credentials to catalog current tools." },
      { step: 3, title: "Workflow Analysis", desc: "Detailed review of manual work paths and sync bottlenecks." },
      { step: 4, title: "Risk & Inefficiency Scoring", desc: "Calculating time waste indicators and failure factors." },
      { step: 5, title: "Recommendations & Roadmap", desc: "Compiling the action guide and integration prioritizations." },
      { step: 6, title: "Review Call", desc: "Interactive debriefing walkthrough of findings and implementation plan." }
    ],
    faqs: [
      {
        q: "What access do you need?",
        a: "We only require read-only access to relevant platforms or video walkthroughs of your current manual flows. We sign mutual NDAs before any sharing."
      },
      {
        q: "How long does it take?",
        a: "Turnaround is 3–7 business days depending on complexity and how quickly access is provided."
      },
      {
        q: "What tools do you support?",
        a: "We support a wide array of SaaS and self-hosted tools: Salesforce, HubSpot, Stripe, Slack, Notion, Jira, Make, Zapier, n8n, custom database environments, and standard REST APIs."
      },
      {
        q: "Do you help implement the fixes?",
        a: "Absolutely. While the audit functions as an independent blueprint, we provide customized automation build and support contracts to implement all recommendations."
      }
    ]
  }
};

export function getPageVersion(version: string): AuditPricingPageSchema {
  return pageVersions[version] || pageVersions["1.0"];
}
