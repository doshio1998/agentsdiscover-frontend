// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  if (process.env.NEXT_PUBLIC_MOCK_AUTH === 'true') {
    redirect('/dashboard');
  }
  redirect('/login');
}
