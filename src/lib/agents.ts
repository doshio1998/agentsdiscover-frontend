// View-model types and mappers for Supabase rows. The DB shape uses the
// fuller backend schema; the view models keep the existing component
// props untouched, so AgentCard etc. don't need to change.

export type Agent = {
  id: string;
  name: string;
  vendor: string;
  category: string;
  rating: number;
  reviewCount: number;
  blurb: string;
  description: string;
  capabilities: string[];
  pricing: string;
  url: string;
};

export type Review = {
  id: string;
  agentId: string;
  user: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  helpful: number;
};

export type CategoryRow = {
  slug: string;
  name: string;
  description: string;
};

const AGENT_TYPE_TO_DISPLAY: Record<string, string> = {
  coding: 'Coding',
  research: 'Research',
  writing: 'Writing',
  general: 'Automation',
  other: 'Other',
};

type AgentRow = {
  id: string;
  slug: string;
  name: string;
  vendor: string | null;
  tagline: string;
  description: string;
  websiteUrl: string;
  agentType: string;
  pricingNotes: string | null;
  capabilities: string[] | null;
  ratingAvg: string | number;
  ratingCount: number;
};

type ReviewRow = {
  id: string;
  agentId: string;
  ratingOverall: number;
  verdict: string;
  upvoteCount: number;
  createdAt: string;
  user: { name: string } | null;
};

export function mapAgent(row: AgentRow): Agent {
  return {
    id: row.slug,
    name: row.name,
    vendor: row.vendor ?? 'Unknown',
    category: AGENT_TYPE_TO_DISPLAY[row.agentType] ?? row.agentType,
    rating: typeof row.ratingAvg === 'string' ? parseFloat(row.ratingAvg) : row.ratingAvg,
    reviewCount: row.ratingCount,
    blurb: row.tagline,
    description: row.description,
    capabilities: row.capabilities ?? [],
    pricing: row.pricingNotes ?? '',
    url: row.websiteUrl,
  };
}

export function mapReview(row: ReviewRow): Review {
  // Seeder combined "title: body" into verdict; split it back for display.
  const sep = row.verdict.indexOf(': ');
  const title = sep > 0 ? row.verdict.slice(0, sep) : row.verdict;
  const body = sep > 0 ? row.verdict.slice(sep + 2) : '';
  return {
    id: row.id,
    agentId: row.agentId,
    user: row.user?.name ?? 'Anonymous',
    rating: row.ratingOverall,
    title,
    body,
    date: row.createdAt.slice(0, 10),
    helpful: row.upvoteCount,
  };
}
