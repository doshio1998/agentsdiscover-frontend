import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Stars from './Stars';
import type { Agent } from '@/data/mockAgents';

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.id}`}
      className="group block bg-white rounded-2xl border-2 border-[var(--color-border)] p-6 hover:border-[var(--color-primary)] hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center font-bold text-lg text-[var(--color-foreground)]">
          {agent.name.charAt(0)}
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-background)] text-[var(--color-foreground)] border border-[var(--color-border)]">
          {agent.category}
        </span>
      </div>

      <div className="mb-2">
        <h3 className="text-xl font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors">
          {agent.name}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">{agent.vendor}</p>
      </div>

      <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed mb-4 line-clamp-2">
        {agent.blurb}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <Stars rating={agent.rating} showValue />
          <span className="text-xs text-[var(--color-text-muted)]">
            ({agent.reviewCount.toLocaleString()})
          </span>
        </div>
        <ArrowUpRight
          size={20}
          className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      </div>
    </Link>
  );
}
