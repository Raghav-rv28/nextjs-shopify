import Collections from 'components/Home/collections';
import HeroSection from 'components/Home/hero-section';
import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';
import { ImSpinner2 } from 'react-icons/im';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Add a designer Separator */}
      <Collections />
      <ThreeItemGrid />
      {/* Add a designer Separator */}
      <Suspense fallback={<Loading />}>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ImSpinner2 className="h-16 w-16" />
    </div>
  );
}
