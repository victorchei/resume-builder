import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Viktor Zhelizko — Senior Software Engineer',
  description: 'Senior Software Engineer with 5+ years of full-stack expertise in React, TypeScript, and Node.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
