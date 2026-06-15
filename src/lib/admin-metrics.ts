import { createServerSupabaseClient } from '@/lib/supabase/server';

type SupabaseTable = 'users' | 'questions' | 'exams' | 'user_progress' | 'study_plans';

export interface SupabaseMetrics {
  configured: boolean;
  counts: Record<SupabaseTable, number>;
  totalRows: number;
  uniqueMaterias: number;
  uniqueUniversidades: number;
  attemptsToday: number;
  lastActivityAt: string | null;
}

export interface GitHubMetrics {
  repo: string;
  sizeKb: number | null;
  stars: number | null;
  forks: number | null;
  openIssues: number | null;
  watchers: number | null;
  commitCount: number | null;
  pushedAt: string | null;
}

export interface VercelMetrics {
  deployed: boolean;
  env: string;
  url: string | null;
  commitSha: string | null;
  branch: string | null;
  region: string | null;
}

export interface AdminMetrics {
  supabase: SupabaseMetrics;
  github: GitHubMetrics;
  vercel: VercelMetrics;
}

const GITHUB_OWNER = 'angelalbortapia-ctrl';
const GITHUB_REPO = 'prep-mx';

function parseCommitCountFromLinkHeader(linkHeader: string | null): number | null {
  if (!linkHeader) return null;
  const lastMatch = linkHeader.match(/&page=(\d+)>;\s*rel="last"/);
  if (!lastMatch) return 1;
  const page = Number.parseInt(lastMatch[1], 10);
  return Number.isFinite(page) ? page : null;
}

async function getSupabaseMetrics(): Promise<SupabaseMetrics> {
  const empty: SupabaseMetrics = {
    configured: false,
    counts: {
      users: 0,
      questions: 0,
      exams: 0,
      user_progress: 0,
      study_plans: 0,
    },
    totalRows: 0,
    uniqueMaterias: 0,
    uniqueUniversidades: 0,
    attemptsToday: 0,
    lastActivityAt: null,
  };

  try {
    const supabase = createServerSupabaseClient();
    const tables: SupabaseTable[] = ['users', 'questions', 'exams', 'user_progress', 'study_plans'];

    const todayIso = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

    const [counts, questionsMetaRes, attemptsTodayRes, lastActivityRes] = await Promise.all([
      Promise.all(
      tables.map(async (table) => {
        const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
        return [table, count ?? 0] as const;
      })
      ),
      supabase.from('questions').select('materia,universidad').eq('active', true).limit(2000),
      supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .gte('answered_at', todayIso),
      supabase
        .from('user_progress')
        .select('answered_at')
        .order('answered_at', { ascending: false })
        .limit(1),
    ]);

    const mapped = Object.fromEntries(counts) as Record<SupabaseTable, number>;
    const totalRows = Object.values(mapped).reduce((acc, val) => acc + val, 0);
    const questionsMeta = questionsMetaRes.data ?? [];
    const uniqueMaterias = new Set(
      questionsMeta.map((q) => (typeof q.materia === 'string' ? q.materia.trim().toLowerCase() : ''))
    ).size;
    const uniqueUniversidades = new Set(
      questionsMeta.map((q) =>
        typeof q.universidad === 'string' ? q.universidad.trim().toLowerCase() : ''
      )
    ).size;
    const attemptsToday = attemptsTodayRes.count ?? 0;
    const lastActivityAt = lastActivityRes.data?.[0]?.answered_at ?? null;

    return {
      configured: true,
      counts: mapped,
      totalRows,
      uniqueMaterias,
      uniqueUniversidades,
      attemptsToday,
      lastActivityAt,
    };
  } catch {
    return empty;
  }
}

async function getGitHubMetrics(): Promise<GitHubMetrics> {
  const repo = `${GITHUB_OWNER}/${GITHUB_REPO}`;
  const fallback: GitHubMetrics = {
    repo,
    sizeKb: null,
    stars: null,
    forks: null,
    openIssues: null,
    watchers: null,
    commitCount: null,
    pushedAt: null,
  };

  try {
    const headers = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'prep-mx-admin-metrics',
    };

    const [repoRes, commitsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}`, { headers, cache: 'no-store' }),
      fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, {
        headers,
        cache: 'no-store',
      }),
    ]);

    if (!repoRes.ok) return fallback;

    const repoData = (await repoRes.json()) as {
      size?: number;
      stargazers_count?: number;
      forks_count?: number;
      open_issues_count?: number;
      subscribers_count?: number;
      pushed_at?: string;
    };

    const commitCount = commitsRes.ok
      ? parseCommitCountFromLinkHeader(commitsRes.headers.get('link'))
      : null;

    return {
      repo,
      sizeKb: repoData.size ?? null,
      stars: repoData.stargazers_count ?? null,
      forks: repoData.forks_count ?? null,
      openIssues: repoData.open_issues_count ?? null,
      watchers: repoData.subscribers_count ?? null,
      commitCount,
      pushedAt: repoData.pushed_at ?? null,
    };
  } catch {
    return fallback;
  }
}

function getVercelMetrics(): VercelMetrics {
  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL ?? null;

  return {
    deployed: Boolean(process.env.VERCEL),
    env: process.env.VERCEL_ENV ?? 'local',
    url,
    commitSha: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    branch: process.env.VERCEL_GIT_COMMIT_REF ?? null,
    region: process.env.VERCEL_REGION ?? null,
  };
}

export async function getAdminMetrics(): Promise<AdminMetrics> {
  const [supabase, github] = await Promise.all([getSupabaseMetrics(), getGitHubMetrics()]);
  return {
    supabase,
    github,
    vercel: getVercelMetrics(),
  };
}
