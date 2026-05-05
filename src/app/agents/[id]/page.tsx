import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  ExternalLink,
  Bookmark,
  Share2,
  Check,
  ThumbsUp,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Stars from '@/components/Stars';
import { createClient } from '@/utils/supabase/server';
import { mapAgent, mapReview } from '@/lib/agents';

const AGENT_SELECT =
  'id, slug, name, vendor, tagline, description, websiteUrl, agentType, pricingNotes, capabilities, ratingAvg, ratingCount';

const REVIEW_SELECT =
  'id, agentId, ratingOverall, verdict, upvoteCount, createdAt, user:users(name)';

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: agentRow } = await supabase
    .from('agents')
    .select(AGENT_SELECT)
    .eq('slug', id)
    .eq('isPublished', true)
    .maybeSingle();

  if (!agentRow) notFound();
  const agent = mapAgent(agentRow);

  const { data: reviewRows } = await supabase
    .from('reviews')
    .select(REVIEW_SELECT)
    .eq('agentId', agentRow.id)
    .neq('status', 'removed')
    .order('upvoteCount', { ascending: false });

  const reviews = (reviewRows ?? []).map((r) => mapReview(r as unknown as Parameters<typeof mapReview>[0]));

  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const totalReviews = reviews.length || 1;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
          <ChevronRight size={14} />
          <Link href={`/#categories`} className="hover:text-[var(--color-primary)]">
            {agent.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-[var(--color-foreground)] font-semibold">{agent.name}</span>
        </nav>

        {/* HERO */}
        <section className="bg-white border-2 border-[var(--color-foreground)] rounded-3xl p-8 md:p-12 mb-12 shadow-[0_8px_0_0_var(--color-foreground)]">
          <div className="flex items-start gap-6 flex-wrap">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[var(--color-background)] border-2 border-[var(--color-border)] flex items-center justify-center font-bold text-3xl md:text-4xl text-[var(--color-foreground)] shrink-0">
              {agent.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[var(--color-background)] text-[var(--color-foreground)] border border-[var(--color-border)]">
                  {agent.category}
                </span>
                <span className="text-xs font-medium text-[var(--color-text-muted)]">
                  by {agent.vendor}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-foreground)] mb-3">
                {agent.name}
              </h1>
              <div className="flex items-center gap-4 flex-wrap mb-4">
                <Stars rating={agent.rating} size={20} showValue />
                <span className="text-sm text-[var(--color-text-muted)]">
                  Based on {agent.reviewCount.toLocaleString()} reviews
                </span>
              </div>
              <p className="text-lg text-[var(--color-text-muted)] max-w-3xl">{agent.blurb}</p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a
                href={agent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-foreground)] transition-colors whitespace-nowrap"
              >
                Visit site
                <ExternalLink size={16} />
              </a>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-[var(--color-border)] text-[var(--color-foreground)] font-semibold text-sm hover:border-[var(--color-foreground)] transition-colors"
                >
                  <Bookmark size={15} />
                  Save
                </button>
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-[var(--color-border)] text-[var(--color-foreground)] font-semibold text-sm hover:border-[var(--color-foreground)] transition-colors"
                >
                  <Share2 size={15} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-foreground)] mb-4">
                About {agent.name}
              </h2>
              <p className="text-[17px] leading-relaxed text-[var(--color-text-muted)]">
                {agent.description}
              </p>
            </section>

            {agent.capabilities.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-foreground)] mb-4">
                  Capabilities
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {agent.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-center gap-3 bg-white rounded-xl border-2 border-[var(--color-border)] px-4 py-3"
                    >
                      <span className="w-7 h-7 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0">
                        <Check size={16} strokeWidth={3} />
                      </span>
                      <span className="font-semibold text-[var(--color-foreground)]">{cap}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-foreground)]">
                  Reviews
                </h2>
                <button
                  type="button"
                  className="text-sm font-bold px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
                >
                  Write a review
                </button>
              </div>

              {reviews.length === 0 ? (
                <div className="bg-white rounded-2xl border-2 border-dashed border-[var(--color-border)] p-12 text-center">
                  <p className="text-[var(--color-text-muted)]">
                    No reviews yet. Be the first to review {agent.name}.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((r) => (
                    <article
                      key={r.id}
                      className="bg-white rounded-2xl border-2 border-[var(--color-border)] p-6 hover:border-[var(--color-foreground)] transition-colors"
                    >
                      <header className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white font-bold flex items-center justify-center text-sm">
                            {r.user.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-[var(--color-foreground)]">{r.user}</div>
                            <div className="text-xs text-[var(--color-text-muted)]">{r.date}</div>
                          </div>
                        </div>
                        <Stars rating={r.rating} />
                      </header>
                      <h3 className="font-bold text-lg text-[var(--color-foreground)] mb-2">
                        {r.title}
                      </h3>
                      <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                        {r.body}
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        <ThumbsUp size={14} />
                        Helpful ({r.helpful})
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div className="bg-[var(--color-foreground)] text-white rounded-2xl p-6 sticky top-24">
              <h3 className="font-bold text-xl mb-4">Rating breakdown</h3>
              <div className="space-y-2">
                {breakdown.map(({ star, count }) => {
                  const pct = (count / totalReviews) * 100;
                  return (
                    <div key={star} className="flex items-center gap-3 text-sm">
                      <span className="w-3 font-semibold">{star}</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-accent)] rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-white/70">{count}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm">
                {agent.pricing && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Pricing</span>
                    <span className="font-semibold">{agent.pricing}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/70">Vendor</span>
                  <span className="font-semibold">{agent.vendor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Category</span>
                  <span className="font-semibold">{agent.category}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
