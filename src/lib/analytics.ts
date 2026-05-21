import { useEffect, useRef } from 'react';

// Centralized analytics dispatch
export function trackEvent(eventName: string, data?: Record<string, any>) {
  console.log(`📊 [Analytics Event] "${eventName}"`, {
    timestamp: new Date().toISOString(),
    ...data,
  });

  // Future integration point:
  // if (window.gtag) window.gtag('event', eventName, data);
  // if (window.mixpanel) window.mixpanel.track(eventName, data);
}

// Track CTA Clicks
export function trackCTAClick(buttonId: string, metadata?: Record<string, any>) {
  trackEvent('cta_click', {
    buttonId,
    path: window.location.pathname + window.location.search,
    ...metadata,
  });
}

// Track Form Submissions
export function trackFormSubmission(status: 'success' | 'error', durationMs: number, details?: Record<string, any>) {
  trackEvent('form_submission', {
    status,
    durationMs,
    productType: 'Business Infrastructure Audit',
    path: window.location.pathname + window.location.search,
    ...details,
  });
}

// Hook to track scroll depth
export function useScrollDepthTracker(pageName: string) {
  const triggeredDepths = useRef<Record<number, boolean>>({
    25: false,
    50: false,
    75: false,
    100: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollHeight <= 0) return;

      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);

      // Check milestones
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercentage >= milestone && !triggeredDepths.current[milestone]) {
          triggeredDepths.current[milestone] = true;
          trackEvent('scroll_depth', {
            page: pageName,
            depth: `${milestone}%`,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check in case page starts scrolled down
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageName]);
}
