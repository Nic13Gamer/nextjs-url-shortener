import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';

import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'QuickLink',
  description: 'QuickLink is a URL Shortener to transform your long URLs into short ones!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen overflow-y-auto overflow-x-hidden bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Toaster richColors expand={true} duration={3000} closeButton />

        <main className="mb-5">{children}</main>
      </body>
    </html>
  );
}
