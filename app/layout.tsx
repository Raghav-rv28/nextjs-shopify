import { ClerkProvider } from '@clerk/nextjs';
import Navbar from 'components/layout/navbar';
import LoadingDots from 'components/loading-dots';
import { ThemeProvider } from 'components/theme-provider';
import { Toaster } from 'components/ui/toaster';
import { GeistSans } from 'geist/font';
import { cn, ensureStartsWith } from 'lib/utils';
import { Inter as FontSans } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;
export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};
export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});
export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider signInUrl={'http://localhost:3000/sign-in'}>
      <html lang="en" className={GeistSans.variable}>
        <body
          className={cn(
            'bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white',
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar />
            <Suspense fallback={<LoadingDots className="text-lg text-orange-300" />}>
              <main>
                {children}
                <Toaster />
              </main>
            </Suspense>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
