import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
};

type TrackerResponse = VisitState & {
  configured: boolean;
};

type BeaconPayload = {
  count: boolean;
  path: string;
  referer: string;
  timeOnPage: number;
  maxScrollDepth: number;
};

const REPOSITORY = 'portfolio';
const ISSUE_TITLE = 'Portfolio Visit Tracker';
const MAX_RECENT_VISITS = 100;
const FINGERPRINT_WINDOW_MS = 12 * 60 * 60 * 1000;

// Server-side fingerprint dedup (survives across browsers/incognito)
const recentFingerprints = new Map<string, number>();

function createDefaultState(): VisitState {
  return {
    totalVisits: 0,
    lastVisitedAt: null,
    avgTimeOnPage: 0,
    avgScrollDepth: 0,
    recentVisits: [],
  };
}

function cleanExpiredFingerprints() {
  const now = Date.now();
  for (const [fp, timestamp] of recentFingerprints) {
    if (now - timestamp > FINGERPRINT_WINDOW_MS) {
      recentFingerprints.delete(fp);
    }
  }
}

function computeFingerprint(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
  const ua = request.headers.get('user-agent') || '';
  // Simple base64 fingerprint — no PII stored, just dedup
  return Buffer.from(`${ip}-${ua}`).toString('base64');
}

function recalculateAverages(visits: VisitEntry[]): { avgTimeOnPage: number; avgScrollDepth: number } {
  if (visits.length === 0) {
    return { avgTimeOnPage: 0, avgScrollDepth: 0 };
  }
  const avgTimeOnPage = Math.round(
    visits.reduce((sum, v) => sum + (v.timeOnPage || 0), 0) / visits.length
  );
  const avgScrollDepth = Math.round(
    visits.reduce((sum, v) => sum + (v.maxScrollDepth || 0), 0) / visits.length
  );
  return { avgTimeOnPage, avgScrollDepth };
}

function getRepoOwner() {
  return process.env.NEXT_PUBLIC_GITHUB_USERNAME;
}

function getAuthHeaders() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return null;
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

function renderIssueBody(state: VisitState) {
  return [
    '## Portfolio Visit Tracker',
    '',
    'Anonymous visit data for the portfolio site.',
    '',
    '```json',
    JSON.stringify(state, null, 2),
    '```',
  ].join('\n');
}

function parseIssueBody(body: string | null | undefined): VisitState {
  if (!body) {
    return createDefaultState();
  }

  const match = body.match(/```json\s*([\s\S]*?)\s*```/i);

  if (!match?.[1]) {
    return createDefaultState();
  }

  try {
    const parsed = JSON.parse(match[1]) as Partial<VisitState>;

    return {
      totalVisits: typeof parsed.totalVisits === 'number' ? parsed.totalVisits : 0,
      lastVisitedAt: typeof parsed.lastVisitedAt === 'string' ? parsed.lastVisitedAt : null,
      avgTimeOnPage: typeof parsed.avgTimeOnPage === 'number' ? parsed.avgTimeOnPage : 0,
      avgScrollDepth: typeof parsed.avgScrollDepth === 'number' ? parsed.avgScrollDepth : 0,
      recentVisits: Array.isArray(parsed.recentVisits) ? parsed.recentVisits.slice(0, MAX_RECENT_VISITS) : [],
    };
  } catch {
    return createDefaultState();
  }
}

async function fetchIssueNumber(headers: Record<string, string>) {
  const owner = getRepoOwner();

  if (!owner) {
    return null;
  }

  const query = encodeURIComponent(`repo:${owner}/${REPOSITORY} in:title "${ISSUE_TITLE}" is:issue state:open`);
  const response = await fetch(`https://api.github.com/search/issues?q=${query}`, {
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const issue = Array.isArray(data.items) ? data.items[0] : null;

  return typeof issue?.number === 'number' ? issue.number : null;
}

async function createIssue(headers: Record<string, string>) {
  const owner = getRepoOwner();

  if (!owner) {
    throw new Error('Missing NEXT_PUBLIC_GITHUB_USERNAME');
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${REPOSITORY}/issues`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: ISSUE_TITLE,
      body: renderIssueBody(createDefaultState()),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create portfolio visit tracker issue');
  }

  const issue = await response.json();
  return typeof issue?.number === 'number' ? issue.number : null;
}

async function loadState(headers: Record<string, string>) {
  const owner = getRepoOwner();

  if (!owner) {
    return createDefaultState();
  }

  const issueNumber = await fetchIssueNumber(headers);

  if (!issueNumber) {
    return createDefaultState();
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${REPOSITORY}/issues/${issueNumber}`, {
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    return createDefaultState();
  }

  const issue = await response.json();
  return parseIssueBody(issue.body);
}

async function saveState(headers: Record<string, string>, state: VisitState) {
  const owner = getRepoOwner();

  if (!owner) {
    throw new Error('Missing NEXT_PUBLIC_GITHUB_USERNAME');
  }

  let issueNumber = await fetchIssueNumber(headers);

  if (!issueNumber) {
    issueNumber = await createIssue(headers);
  }

  if (!issueNumber) {
    throw new Error('Failed to create or locate portfolio visit tracker issue');
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${REPOSITORY}/issues/${issueNumber}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      body: renderIssueBody(state),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update portfolio visit tracker issue');
  }
}

function buildVisitEntry(payload: BeaconPayload): VisitEntry {
  return {
    at: new Date().toISOString(),
    path: payload.path || '/',
    referrer: payload.referer || null,
    timeOnPage: payload.timeOnPage || 0,
    maxScrollDepth: payload.maxScrollDepth || 0,
  };
}

export async function GET() {
  const headers = getAuthHeaders();

  if (!headers) {
    return NextResponse.json({
      ...createDefaultState(),
      configured: false,
    } satisfies TrackerResponse);
  }

  try {
    const state = await loadState(headers);

    return NextResponse.json({
      ...state,
      configured: true,
    } satisfies TrackerResponse, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({
      ...createDefaultState(),
      configured: false,
    } satisfies TrackerResponse, {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  const headers = getAuthHeaders();

  if (!headers) {
    return NextResponse.json({
      ...createDefaultState(),
      configured: false,
    } satisfies TrackerResponse, {
      status: 500,
    });
  }

  try {
    // Parse sendBeacon JSON payload
    const payload: BeaconPayload = await request.json();
    const currentState = await loadState(headers);

    // Server-side fingerprint dedup for visit counting
    cleanExpiredFingerprints();
    const fingerprint = computeFingerprint(request);
    const alreadySeen = recentFingerprints.has(fingerprint);

    // Only increment visit count if client says to AND fingerprint is fresh
    const shouldCount = payload.count && !alreadySeen;

    if (shouldCount) {
      currentState.totalVisits += 1;
      currentState.lastVisitedAt = new Date().toISOString();
      recentFingerprints.set(fingerprint, Date.now());
    }

    // ALWAYS record engagement (every session, not just new visits)
    const entry = buildVisitEntry(payload);
    currentState.recentVisits = [entry, ...currentState.recentVisits].slice(0, MAX_RECENT_VISITS);

    // Recalculate rolling averages from last 100 sessions
    const averages = recalculateAverages(currentState.recentVisits);
    currentState.avgTimeOnPage = averages.avgTimeOnPage;
    currentState.avgScrollDepth = averages.avgScrollDepth;

    await saveState(headers, currentState);

    return NextResponse.json({
      ...currentState,
      configured: true,
    } satisfies TrackerResponse, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({
      ...createDefaultState(),
      configured: false,
    } satisfies TrackerResponse, {
      status: 500,
    });
  }
}