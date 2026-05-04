'use client';

import { usePathname } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const needsAuth = pathname.startsWith('/dashboard');

  if (!needsAuth) return <>{children}</>;
  return <DashboardLayout>{children}</DashboardLayout>;
}
