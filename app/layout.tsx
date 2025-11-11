import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { auth } from '@/auth';

import localFont from 'next/font/local';

const ibmPlexSans = localFont({
  src: [
    { path: './fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/IBMPlexSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal' },
  ],

  variable: '--font-ibm-plex-sans',
});

const bebasNeue = localFont({
  src: [{ path: './fonts/BebasNeue-Regular.ttf', weight: '400', style: 'normal' }],

  variable: '--font-bebas-neue',
});
export const metadata: Metadata = {
  title: 'BookWise',
  description: 'BookWise is a platform where you can find and borrow books.',
  icons: {
    icon: '/favicon.ico',
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {

  const session = await auth()
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} ${bebasNeue.variable} antialiased`}>
        <SessionProvider session = {session}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
