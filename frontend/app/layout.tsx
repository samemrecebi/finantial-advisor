import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ThemeModeScript } from 'flowbite-react';

const poppins = Poppins({ weight: ['300', '400', '400'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fintech',
  description: 'Senin yatırım asistanın',
  icons: 'favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
