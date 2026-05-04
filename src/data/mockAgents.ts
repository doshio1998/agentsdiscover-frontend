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

export type Category = {
  slug: string;
  name: string;
  iconName: 'Code' | 'Search' | 'PenLine' | 'Image' | 'Mic' | 'Workflow';
  count: number;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  { slug: 'coding', name: 'Coding', iconName: 'Code', count: 84, blurb: 'IDEs, code review, autonomous SWE' },
  { slug: 'research', name: 'Research', iconName: 'Search', count: 42, blurb: 'Citations, summarization, deep dives' },
  { slug: 'writing', name: 'Writing', iconName: 'PenLine', count: 67, blurb: 'Drafting, editing, marketing copy' },
  { slug: 'image', name: 'Image', iconName: 'Image', count: 35, blurb: 'Generation, editing, vision' },
  { slug: 'voice', name: 'Voice', iconName: 'Mic', count: 21, blurb: 'TTS, transcription, agents' },
  { slug: 'automation', name: 'Automation', iconName: 'Workflow', count: 58, blurb: 'Workflows, browser, scheduling' },
];

export const AGENTS: Agent[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    vendor: 'Anthropic',
    category: 'Coding',
    rating: 4.8,
    reviewCount: 1243,
    blurb: 'Terminal-native coding agent with strong reasoning and tool use.',
    description:
      'Claude Code is a coding-focused agent from Anthropic that runs in your terminal. It can read your codebase, run tests, edit files, and use external tools. Strong at multi-file refactors and reasoning over large diffs.',
    capabilities: ['Multi-file edits', 'Tool use', 'Terminal integration', 'Long context'],
    pricing: 'Subscription + API',
    url: 'https://claude.ai/code',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    vendor: 'Anysphere',
    category: 'Coding',
    rating: 4.6,
    reviewCount: 987,
    blurb: 'AI-first code editor built on top of VS Code.',
    description:
      'Cursor is a fork of VS Code that bakes AI completions, chat, and agentic edits into the IDE. Strong inline completions and codebase-aware chat.',
    capabilities: ['Inline completion', 'Codebase chat', 'Agent mode', 'VS Code extensions'],
    pricing: 'Free tier + Pro',
    url: 'https://cursor.com',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    vendor: 'Perplexity AI',
    category: 'Research',
    rating: 4.4,
    reviewCount: 2105,
    blurb: 'Answer engine with cited sources for research queries.',
    description:
      'Perplexity is a search-grounded answer engine. Every answer comes with cited sources. Pro tier adds longer context, file uploads, and access to multiple frontier models.',
    capabilities: ['Web search', 'Source citations', 'File upload', 'Focus modes'],
    pricing: 'Free + Pro',
    url: 'https://perplexity.ai',
  },
  {
    id: 'devin',
    name: 'Devin',
    vendor: 'Cognition',
    category: 'Coding',
    rating: 3.9,
    reviewCount: 412,
    blurb: 'Autonomous software engineer that runs end-to-end tasks.',
    description:
      'Devin is an autonomous agent that takes a ticket and tries to finish it: plan, code, test, and open a PR. Best on small well-scoped tasks; struggles on large refactors.',
    capabilities: ['Sandboxed VM', 'GitHub PRs', 'Browser', 'Task planning'],
    pricing: 'Enterprise',
    url: 'https://devin.ai',
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    vendor: 'GitHub',
    category: 'Coding',
    rating: 4.3,
    reviewCount: 5621,
    blurb: 'Inline code suggestions inside your editor.',
    description:
      'GitHub Copilot offers inline AI suggestions, chat, and PR review summaries. Integrates with the major IDEs and JetBrains.',
    capabilities: ['Inline completions', 'Chat', 'PR summaries', 'IDE integrations'],
    pricing: 'Subscription',
    url: 'https://github.com/features/copilot',
  },
  {
    id: 'chatgpt-agent',
    name: 'ChatGPT Agent',
    vendor: 'OpenAI',
    category: 'Automation',
    rating: 4.5,
    reviewCount: 8730,
    blurb: 'General-purpose assistant with browsing and code execution.',
    description:
      'ChatGPT with agentic capabilities — browsing, code execution, file analysis, and connectors. The mainstream choice for general productivity.',
    capabilities: ['Browsing', 'Code interpreter', 'File analysis', 'Connectors'],
    pricing: 'Free + Plus + Team',
    url: 'https://chat.openai.com',
  },
  {
    id: 'manus',
    name: 'Manus',
    vendor: 'Butterfly Effect',
    category: 'Automation',
    rating: 4.1,
    reviewCount: 318,
    blurb: 'General-purpose agent that runs long-horizon tasks in a sandbox.',
    description:
      'Manus is a vertical agent platform that handles multi-step tasks across browsing, coding, and document work. Long-running session support.',
    capabilities: ['Long-running tasks', 'Sandbox', 'Browser', 'Document work'],
    pricing: 'Subscription',
    url: 'https://manus.im',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    vendor: 'ElevenLabs',
    category: 'Voice',
    rating: 4.7,
    reviewCount: 1455,
    blurb: 'High-fidelity TTS and voice cloning with conversational agents.',
    description:
      'ElevenLabs offers state-of-the-art TTS, multilingual voice cloning, and a conversational agent platform. Strong API and low-latency streaming.',
    capabilities: ['TTS', 'Voice cloning', 'Conversational AI', 'Streaming API'],
    pricing: 'Free + Subscription + Enterprise',
    url: 'https://elevenlabs.io',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    agentId: 'claude-code',
    user: 'Alex R.',
    rating: 5,
    title: 'Genuinely changed how I ship',
    body: 'Replaced half my workflow. Tool use is genuinely good, and it actually reads the code before editing instead of guessing.',
    date: '2026-04-21',
    helpful: 42,
  },
  {
    id: 'r2',
    agentId: 'claude-code',
    user: 'Priya K.',
    rating: 4,
    title: 'Strong, but watch the bill',
    body: 'Reasoning is excellent on hard tasks. Costs add up fast on large repos. Worth it for production debugging.',
    date: '2026-04-19',
    helpful: 28,
  },
  {
    id: 'r3',
    agentId: 'claude-code',
    user: 'Marcus T.',
    rating: 5,
    title: 'Best terminal coding agent I have used',
    body: 'I tried Devin, Cursor agent mode, and Aider. Claude Code is the only one I keep coming back to.',
    date: '2026-04-15',
    helpful: 19,
  },
  {
    id: 'r4',
    agentId: 'devin',
    user: 'Sam L.',
    rating: 3,
    title: 'Great demo, mediocre on real work',
    body: 'Promising on small isolated tickets. Gets lost the moment a task touches more than ~5 files.',
    date: '2026-04-18',
    helpful: 67,
  },
  {
    id: 'r5',
    agentId: 'perplexity',
    user: 'Jordan W.',
    rating: 5,
    title: 'My default for any research question',
    body: 'Citations are the killer feature. I cross-check claims in seconds instead of trusting a hallucinated answer.',
    date: '2026-04-15',
    helpful: 88,
  },
  {
    id: 'r6',
    agentId: 'cursor',
    user: 'Ravi M.',
    rating: 4,
    title: 'Best inline completions, agent mode is fine',
    body: 'Tab completions are still the most useful AI feature in any IDE. Agent mode is OK; I prefer Claude Code for that.',
    date: '2026-04-10',
    helpful: 33,
  },
];

export function getAgent(id: string): Agent | undefined {
  return AGENTS.find((a) => a.id === id);
}

export function getReviewsForAgent(id: string): Review[] {
  return REVIEWS.filter((r) => r.agentId === id);
}

export const STATS = {
  agents: AGENTS.length,
  reviews: AGENTS.reduce((s, a) => s + a.reviewCount, 0),
  reviewers: 12_438,
};
