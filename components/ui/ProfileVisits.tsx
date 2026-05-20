'use client';

import { useEffect, useRef, useState } from 'react';
import { Eye, Clock3, Timer, ArrowDownToLine } from 'lucide-react';

type VisitEntry = {
  at: string;
  path: string;
  referrer: string | null;
  timeOnPage: number;
  maxScrollDepth: number;
};

type VisitState = {
  totalVisits: number;
  lastVisitedAt: string | null;
  avgTimeOnPage: number;
  avgScrollDepth: number;
  recentVisits: VisitEntry[];
  configured: boolean;
};

const TRACKING_KEY = 'portfolio-visit-tracked-at';
const TRACKING_WINDOW_MS = 12 * 60 * 60 * 1000;

function formatRelativeTime(value: string | null) {
  if (!value) {
    return 'waiting for first visit';
  }

  const elapsed = Date.now() - new Date(value).getTime();

  if (Number.isNaN(elapsed)) {
    return 'recently';
  }

  const minutes = Math.floor(elapsed / 60000);
  const hours = Math.floor(elapsed / 3600000);
  const days = Math.floor(elapsed / 86400000);

  if (minutes < 1) {
    return 'just now';
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  return `${days}d ago`;
}

export default function ProfileVisits() {
  const [state, setState] = useState<VisitState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Engagement tracking refs
  const startTimeRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const hasSentRef = useRef<boolean>(false);

  // --- Fetch current stats on mount (GET only — no counting) ---
  useEffect(() => {
    let isMounted = true;

    const loadVisits = async () => {
      try {
        const response = await fetch('/api/profile-visits', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to load visit stats');
        }

        const data = (await response.json()) as VisitState;

        if (isMounted) {
          setState(data);
        }
      } catch {
        if (isMounted) {
          setState({
            totalVisits: 0,
            lastVisitedAt: null,
            avgTimeOnPage: 0,
            avgScrollDepth: 0,
            recentVisits: [],
            configured: false,
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadVisits();

    return () => {
      isMounted = false;
    };
  }, []);

  // --- Scroll depth tracker ---
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const depth = Math.round((scrolled / total) * 100);
      maxScrollRef.current = Math.max(maxScrollRef.current, depth);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Capture initial scroll position (page might already be partially scrolled)
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Send engagement data on leave via sendBeacon ---
  useEffect(() => {
    const sendData = () => {
      if (hasSentRef.current) return;
      hasSentRef.current = true;

      const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
      const maxScrollDepth = maxScrollRef.current;

      const lastTracked = localStorage.getItem(TRACKING_KEY);
      const now = Date.now();
      const shouldCount = !lastTracked ||
        now - Number(lastTracked) > TRACKING_WINDOW_MS;

      if (shouldCount) {
        localStorage.setItem(TRACKING_KEY, String(now));
      }

      // sendBeacon survives tab close — unlike fetch()
      // Must use Blob to set Content-Type: application/json; plain string sends text/plain
      const blob = new Blob(
        [JSON.stringify({
          count: shouldCount,
          path: window.location.pathname,
          referer: document.referrer,
          timeOnPage,
          maxScrollDepth,
        })],
        { type: 'application/json' }
      );
      navigator.sendBeacon('/api/profile-visits', blob);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') sendData();
    };

    window.addEventListener('beforeunload', sendData);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', sendData);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const totalVisits = state?.totalVisits ?? 0;
  const lastVisitLabel = formatRelativeTime(state?.lastVisitedAt ?? null);
  const avgTimeOnPage = state?.avgTimeOnPage ?? 0;
  const avgScrollDepth = state?.avgScrollDepth ?? 0;
  const configured = state?.configured ?? true;

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/75 dark:bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/60 dark:text-white/70 backdrop-blur-md shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] dark:shadow-none">
      <span className="inline-flex items-center gap-1.5">
        <Eye size={12} className="text-purple-500" />
        {isLoading ? 'Loading visits' : `${totalVisits} visits`}
      </span>
      <span className="text-black/20 dark:text-white/20">•</span>
      <span className="inline-flex items-center gap-1.5 normal-case tracking-[0.15em]">
        <Timer size={12} className="text-emerald-500" />
        {isLoading ? '...' : `avg ${avgTimeOnPage}s`}
      </span>
      <span className="text-black/20 dark:text-white/20">•</span>
      <span className="inline-flex items-center gap-1.5 normal-case tracking-[0.15em]">
        <ArrowDownToLine size={12} className="text-amber-500" />
        {isLoading ? '...' : `${avgScrollDepth}% scrolled`}
      </span>
      <span className="text-black/20 dark:text-white/20">•</span>
      <span className="inline-flex items-center gap-1.5 normal-case tracking-[0.15em]">
        <Clock3 size={12} className="text-cyan-500" />
        {isLoading ? 'Checking latest visit' : `Last ${lastVisitLabel}`}
      </span>
      {!configured ? (
        <span className="text-[9px] tracking-[0.18em] text-amber-600 dark:text-amber-300 normal-case">
          tracker unavailable
        </span>
      ) : null}
    </div>
  );
}