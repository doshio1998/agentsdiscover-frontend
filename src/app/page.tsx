'use client';

import Link from 'next/link';
import {
  Search,
  Code,
  PenLine,
  Image as ImageIcon,
  Mic,
  Workflow,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import AgentCard from '@/components/AgentCard';
import { AGENTS, CATEGORIES, STATS } from '@/data/mockAgents';

const ICONS = {
  Code,
  Search,
  PenLine,
  Image: ImageIcon,
  Mic,
  Workflow,
} as const;

const POPULAR_SEARCHES = ['coding agent', 'research', 'voice clone', 'browser automation', 'image gen'];

export default function HomePage() {
  const featured = [...AGENTS].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-background)] via-white to-[var(--color-muted)] border-b-2 border-[var(--color-border)]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--color-foreground) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white border-2 border-[var(--color-border)] text-[var(--color-foreground)] mb-8">
            <Sparkles size={14} className="text-[var(--color-accent)]" />
            {STATS.reviews.toLocaleString()} verified reviews
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-[var(--color-foreground)] mb-6">
            Find AI agents that{' '}
            <span className="relative inline-block">
              <span className="relative z-10">actually work</span>
              <span
                aria-hidden
                className="absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-4 bg-[var(--color-accent)]/30 -z-0"
              />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10">
            Real reviews from real users. Browse {STATS.agents}+ agents across coding, research,
            writing, voice, and automation.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="max-w-2xl mx-auto flex items-stretch gap-2 bg-white border-2 border-[var(--color-foreground)] rounded-2xl p-2 shadow-[0_8px_0_0_var(--color-foreground)]"
          >
            <div className="flex items-center pl-4 text-[var(--color-text-muted)]">
              <Search size={22} />
            </div>
            <input
              type="text"
              placeholder="Try: coding agent, research, browser automation..."
              className="flex-1 bg-transparent px-3 py-3 text-base outline-none placeholder:text-[var(--color-text-muted)]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-foreground)] transition-colors"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-[var(--color-text-muted)] mr-1">
              Popular:
            </span>
            {POPULAR_SEARCHES.map((q) => (
              <button
                key={q}
                type="button"
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-foreground)] mb-3">
              Browse by category
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg">
              Six categories. Hundreds of agents. Real opinions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.iconName];
            return (
              <Link
                key={cat.slug}
                href={`/#category-${cat.slug}`}
                className="group block bg-white rounded-2xl border-2 border-[var(--color-foreground)] p-6 md:p-8 hover:bg-[var(--color-foreground)] transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--color-background)] group-hover:bg-[var(--color-accent)] flex items-center justify-center mb-5 transition-colors">
                  <Icon
                    size={28}
                    className="text-[var(--color-foreground)] group-hover:text-white transition-colors"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-foreground)] group-hover:text-white mb-1 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] group-hover:text-white/80 mb-4 transition-colors">
                  {cat.blurb}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                  {cat.count} agents
                  <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED */}
      <section id="featured" className="bg-white border-y-2 border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-foreground)] mb-3">
                Top rated this week
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg">
                Highest-rated agents based on verified reviews.
              </p>
            </div>
            <Link
              href="/#featured"
              className="text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] inline-flex items-center gap-1.5 transition-colors"
            >
              See all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featured.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, value: STATS.reviewers.toLocaleString(), label: 'Reviewers' },
            { icon: Sparkles, value: STATS.agents.toString(), label: 'Agents listed' },
            { icon: ShieldCheck, value: STATS.reviews.toLocaleString(), label: 'Verified reviews' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-[var(--color-foreground)] text-white rounded-2xl p-8 flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)] flex items-center justify-center shrink-0">
                  <Icon size={26} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold leading-none">{stat.value}</div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden bg-[var(--color-accent)] rounded-3xl p-12 md:p-16 text-white">
          <div
            aria-hidden
            className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-white/10"
          />
          <div
            aria-hidden
            className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Built an AI agent? List it.
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Free to list. Reviews are public, unfiltered, and verified.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-[var(--color-foreground)] font-bold px-6 py-3.5 rounded-xl hover:bg-[var(--color-foreground)] hover:text-white transition-colors"
            >
              List your agent
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-[var(--color-border)] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-[var(--color-text-muted)] flex items-center justify-between flex-wrap gap-4">
          <span>© 2026 AgentsDiscover</span>
          <span>Reviews and ratings for every AI agent.</span>
        </div>
      </footer>
    </div>
  );
}
