import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import AntdRegistry from '@/lib/AntdRegistry';
import LayoutWrapper from '@/components/LayoutWrapper';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'AgentsDiscover — Reviews and ratings for every AI agent',
    template: '%s · AgentsDiscover',
  },
  description:
    'Find the AI agent that actually works for your use case. Real reviews from real users.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
      <body className="font-sans" suppressHydrationWarning>
        <AuthProvider>
          <AntdRegistry>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
