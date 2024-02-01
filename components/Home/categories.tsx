'use client';
import clsx from 'clsx';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from 'components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const categories = [
  {
    title: 'Diamond',
    url: 'https://cdn.shopify.com/s/files/1/0736/0882/3069/files/diamond.jpg?v=1685296231'
  },
  {
    title: 'Gold',
    url: 'https://cdn.shopify.com/s/files/1/0736/0882/3069/files/IMG_8060.jpg?v=1705788160'
  },
  {
    title: "Men's",
    url: 'https://cdn.shopify.com/s/files/1/0736/0882/3069/files/men_rings.jpg?v=1685305185'
  },
  {
    title: "Men's",
    url: 'https://cdn.shopify.com/s/files/1/0736/0882/3069/files/men_rings.jpg?v=1685305185'
  }
];
export default function Categories() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full md:w-10/12">
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem
              key={category.url}
              className="flex items-center justify-center pl-2 md:basis-1/2 lg:basis-1/3"
            >
              <Link href="/">
                <div className="group relative flex items-center justify-center">
                  <div className="absolute inset-x-0 bottom-10 z-50 flex items-end justify-center text-3xl font-semibold text-orange-300 opacity-0 duration-300 group-hover:opacity-100">
                    {category.title}
                  </div>
                  <Image
                    src={category.url}
                    className="overflow-hidden group-hover:blur-sm"
                    width={600}
                    height={800}
                    alt="Avatar"
                    title="DIAMOND"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="my-2 flex w-full flex-row items-center justify-center md:hidden">
        {Array.from({ length: count }).map((_, index) => {
          return (
            <button
              className={clsx(
                'mx-3 rounded-full bg-slate-100 p-1',
                current === index + 1 ? 'p-2' : 'bg-slate-300'
              )}
              onClick={() => api?.scrollTo(index)}
              key={index + 1}
            />
          );
        })}
      </div>
    </div>
  );
}
