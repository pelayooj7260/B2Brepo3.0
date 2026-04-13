# Sentry Setup Guide

**Objective:** Standardize error tracking, crash reporting, and user feedback loops across the application using Sentry.

## 1. Account Creation & Project Setup
1. **Sign Up / Log In:** Go to [sentry.io](https://sentry.io) and create an organization account or log in.
2. **Create a Project:** In the Sentry dashboard, navigate to **Projects** > **Create Project**.
3. **Select Platform:** Choose your framework (e.g., React, Node.js, Next.js).
4. **Name Project:** Give it a clear name (e.g., `b2brepo-frontend`) and assign it to the correct team.
5. **Get DSN:** Once created, you will be given a DSN (Data Source Name) key. Keep this handy; you will need it to initialize Sentry in your code.

## 2. Installation & Initialization

1. **Install SDK:** Run the appropriate install command in your project root:
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

2. **Initialize Sentry in Code:** At the primary entry point of your application (like `main.jsx` or `index.js`), add:
   ```javascript
   import * as Sentry from "@sentry/react";

   Sentry.init({
     dsn: "YOUR_SENTRY_DSN_HERE",
     integrations: [
       Sentry.browserTracingIntegration(),
       Sentry.replayIntegration({
         maskAllText: true,
         blockAllMedia: true,
       }),
     ],
     // Performance Monitoring
     tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production
     // Session Replay
     replaysSessionSampleRate: 0.1, 
     replaysOnErrorSampleRate: 1.0, 
   });
   ```

## 3. Environment Variables
Instead of hardcoding the DSN, define it in your `.env` file:
```env
VITE_SENTRY_DSN=your-dsn-url-here
```
And reference it in your code:
```javascript
dsn: import.meta.env.VITE_SENTRY_DSN,
```

## 4. User Feedback Loops
To allow users to submit feedback directly when errors occur, use Sentry’s built-in Error Dialog:
```javascript
try {
  // your risky code
} catch (error) {
  Sentry.captureException(error);
  Sentry.showReportDialog({ eventId: Sentry.lastEventId() });
}
```

## Next Steps
- Verify the integration by throwing a test error and checking the Sentry dashboard.
- Create source maps for better error tracking in production.
