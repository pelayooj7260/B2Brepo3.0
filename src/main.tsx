import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/react";
import App from './App.tsx';
import './index.css';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});


createRoot(document.getElementById('root')!).render(
  <Sentry.ErrorBoundary fallback={({ resetError }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
      <p className="text-slate-400 mb-8">An error occurred and has been reported to our team.</p>
      <button 
        onClick={() => resetError()}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        Try again
      </button>
      <button
        onClick={() => Sentry.showReportDialog()}
        className="mt-4 text-sm text-slate-500 underline hover:text-slate-400"
      >
        Click here to provide more details
      </button>
    </div>
  )}>
    <StrictMode>
      <App />
    </StrictMode>
  </Sentry.ErrorBoundary>
);
