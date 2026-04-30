'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { StarRating, Tag, Badge, Input } from '@/components/ui';
import { Search, CheckCircle2, DollarSign, Zap } from 'lucide-react';

type Agent = {
  id: string;
  name: string;
  vendor: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  useCases: string[];
  pricePerRun: string;
  model: string;
  verified: boolean;
};

const MOCK_AGENTS: Agent[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    vendor: 'Anysphere',
    tagline: 'AI-first code editor with multi-file edits and agent mode.',
    rating: 4.6,
    reviewCount: 1284,
    useCases: ['Coding', 'Refactoring', 'Debugging'],
    pricePerRun: '$0.04',
    model: 'Claude 4.7 / GPT-5',
    verified: true,
  },
  {
    id: 'devin',
    name: 'Devin',
    vendor: 'Cognition',
    tagline: 'Autonomous software engineer that ships PRs end-to-end.',
    rating: 3.9,
    reviewCount: 412,
    useCases: ['Coding', 'Long-horizon tasks'],
    pricePerRun: '$2.30',
    model: 'Proprietary',
    verified: true,
  },
  {
    id: 'manus',
    name: 'Manus',
    vendor: 'Manus AI',
    tagline: 'General-purpose agent for research, ops, and analysis.',
    rating: 4.1,
    reviewCount: 678,
    useCases: ['Research', 'Ops', 'Data analysis'],
    pricePerRun: '$0.18',
    model: 'Claude 4.6',
    verified: true,
  },
  {
    id: 'lindy',
    name: 'Lindy',
    vendor: 'Lindy AI',
    tagline: 'No-code automation agents for sales, support, and recruiting.',
    rating: 4.3,
    reviewCount: 524,
    useCases: ['Sales outreach', 'Support', 'Scheduling'],
    pricePerRun: '$0.06',
    model: 'GPT-5',
    verified: false,
  },
  {
    id: 'replit-agent',
    name: 'Replit Agent',
    vendor: 'Replit',
    tagline: 'Build and deploy full-stack apps from a prompt.',
    rating: 4.0,
    reviewCount: 891,
    useCases: ['Coding', 'Prototyping', 'Deployment'],
    pricePerRun: '$0.12',
    model: 'Claude 4.7',
    verified: true,
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    vendor: 'CrewAI Inc.',
    tagline: 'Open-source framework for orchestrating role-based agents.',
    rating: 3.7,
    reviewCount: 203,
    useCases: ['Research', 'Multi-agent', 'Self-host'],
    pricePerRun: 'Self-host',
    model: 'BYO',
    verified: false,
  },
];

const USE_CASES = ['All', 'Coding', 'Research', 'Sales outreach', 'Ops', 'Support'];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState('');
  const [activeUseCase, setActiveUseCase] = useState('All');

  const filtered = MOCK_AGENTS.filter((a) => {
    const matchesQuery =
      query === '' ||
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.tagline.toLowerCase().includes(query.toLowerCase()) ||
      a.vendor.toLowerCase().includes(query.toLowerCase());
    const matchesUseCase = activeUseCase === 'All' || a.useCases.includes(activeUseCase);
    return matchesQuery && matchesUseCase;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <header className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            Discover AI agents
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Real reviews from real users. Welcome, {user?.name}.
          </p>
        </div>
        <button
          onClick={logout}
          className="text-sm text-[var(--color-text-muted)] hover:underline"
        >
          Logout
        </button>
      </header>

      <div className="mb-6">
        <Input
          placeholder="Search agents, vendors, use cases..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftAdornment={<Search className="w-4 h-4" />}
        />
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {USE_CASES.map((uc) => (
          <button
            key={uc}
            onClick={() => setActiveUseCase(uc)}
            className={`px-3 py-1.5 text-sm rounded-full border transition ${
              activeUseCase === uc
                ? 'bg-[var(--color-text)] text-white border-[var(--color-text)]'
                : 'bg-white text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
            }`}
          >
            {uc}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((agent) => (
          <article
            key={agent.id}
            className="bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 hover:border-[var(--color-border-strong)] transition"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-text)]">
                  {agent.name}
                </h2>
                <p className="text-xs text-[var(--color-text-muted)]">
                  by {agent.vendor}
                </p>
              </div>
              {agent.verified && (
                <Badge variant="verified" icon={<CheckCircle2 className="w-3 h-3" />}>
                  Verified
                </Badge>
              )}
            </div>

            <p className="text-sm text-[var(--color-text)] mb-3">{agent.tagline}</p>

            <div className="mb-3">
              <StarRating value={agent.rating} count={agent.reviewCount} size="sm" />
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {agent.useCases.map((uc) => (
                <Tag key={uc}>{uc}</Tag>
              ))}
            </div>

            <div className="flex gap-4 text-xs text-[var(--color-text-muted)] pt-3 border-t border-[var(--color-border)]">
              <span className="inline-flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {agent.pricePerRun} / run
              </span>
              <span className="inline-flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {agent.model}
              </span>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-muted)]">
          No agents match your filters.
        </div>
      )}
    </div>
  );
}
