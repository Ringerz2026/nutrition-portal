import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nutrition Subscriber Platform',
  description: 'Secure bilingual nutrition subscriber portal',
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
