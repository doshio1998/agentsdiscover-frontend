'use client';

import { useAuth } from '@/contexts/AuthContext';

const MOCK_AGENTS = [
  {
    id: '1',
    name: 'Claude Code',
    vendor: 'Anthropic',
    category: 'Coding',
    rating: 4.8,
    reviews: 1243,
    blurb: 'Terminal-native coding agent with strong reasoning and tool use.',
  },
  {
    id: '2',
    name: 'Cursor',
    vendor: 'Anysphere',
    category: 'Coding / IDE',
    rating: 4.6,
    reviews: 987,
    blurb: 'AI-first code editor built on top of VS Code.',
  },
  {
    id: '3',
    name: 'Perplexity',
    vendor: 'Perplexity AI',
    category: 'Research',
    rating: 4.4,
    reviews: 2105,
    blurb: 'Answer engine with cited sources for research queries.',
  },
  {
    id: '4',
    name: 'Devin',
    vendor: 'Cognition',
    category: 'Autonomous SWE',
    rating: 3.9,
    reviews: 412,
    blurb: 'Autonomous software engineer that runs end-to-end tasks.',
  },
  {
    id: '5',
    name: 'GitHub Copilot',
    vendor: 'GitHub',
    category: 'Coding',
    rating: 4.3,
    reviews: 5621,
    blurb: 'Inline code suggestions inside your editor.',
  },
  {
    id: '6',
    name: 'ChatGPT Agent',
    vendor: 'OpenAI',
    category: 'General',
    rating: 4.5,
    reviews: 8730,
    blurb: 'General-purpose assistant with browsing and code execution.',
  },
];

const MOCK_REVIEWS = [
  {
    id: 'r1',
    agent: 'Claude Code',
    user: 'Alex R.',
    rating: 5,
    body: 'Replaced half my workflow. Tool use is genuinely good.',
    date: '2026-04-21',
  },
  {
    id: 'r2',
    agent: 'Devin',
    user: 'Priya K.',
    rating: 3,
    body: 'Promising on small tasks, gets lost on large refactors.',
    date: '2026-04-18',
  },
  {
    id: 'r3',
    agent: 'Perplexity',
    user: 'Marcus T.',
    rating: 5,
    body: 'My default for research. Citations are the killer feature.',
    date: '2026-04-15',
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="text-yellow-500">
      {'★'.repeat(full)}
      <span className="text-gray-300">{'★'.repeat(5 - full)}</span>
    </span>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AgentsDiscover</h1>
          <p className="text-gray-600 text-sm mt-1">
            Reviews and ratings for every AI agent
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            {user?.name || 'Guest'}{' '}
            <span className="text-gray-400">({user?.email})</span>
          </span>
          <button
            onClick={logout}
            className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="text-xs uppercase text-gray-500">Listed agents</div>
          <div className="text-2xl font-bold mt-1">{MOCK_AGENTS.length}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <div className="text-xs uppercase text-gray-500">Total reviews</div>
          <div className="text-2xl font-bold mt-1">
            {MOCK_AGENTS.reduce((s, a) => s + a.reviews, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <div className="text-xs uppercase text-gray-500">Avg rating</div>
          <div className="text-2xl font-bold mt-1">
            {(
              MOCK_AGENTS.reduce((s, a) => s + a.rating, 0) / MOCK_AGENTS.length
            ).toFixed(2)}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_AGENTS.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{a.name}</div>
                  <div className="text-xs text-gray-500">{a.vendor}</div>
                </div>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                  {a.category}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-3">{a.blurb}</p>
              <div className="flex items-center gap-2 mt-3 text-sm">
                <Stars rating={a.rating} />
                <span className="text-gray-600">
                  {a.rating} ({a.reviews.toLocaleString()})
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recent reviews</h2>
        <div className="bg-white rounded-xl shadow divide-y">
          {MOCK_REVIEWS.map((r) => (
            <div key={r.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {r.user} on{' '}
                  <span className="text-red-600">{r.agent}</span>
                </div>
                <div className="text-xs text-gray-500">{r.date}</div>
              </div>
              <div className="mt-1">
                <Stars rating={r.rating} />
              </div>
              <p className="text-sm text-gray-700 mt-2">{r.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
