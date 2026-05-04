'use client';

import Link from 'next/link';
import { Compass, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b-2 border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <span className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center">
            <Compass size={18} strokeWidth={2.5} />
          </span>
          <span className="text-[var(--color-foreground)]">AgentsDiscover</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-text-muted)]">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Browse</Link>
          <Link href="/#categories" className="hover:text-[var(--color-primary)] transition-colors">Categories</Link>
          <Link href="/#featured" className="hover:text-[var(--color-primary)] transition-colors">Top rated</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
          >
            List your agent
          </Link>
        </div>
      </div>
    </header>
  );
}
