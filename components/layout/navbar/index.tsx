import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import ThemeSwitcher from 'components/layout/navbar/theme-switcher';
import { Separator } from 'components/ui/separator';
import { getCollections, getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Account from './account';
import { CategoryMenu } from './category-menu';
import MobileMenu from './mobile-menu';
import Search from './search';

export default async function Navbar() {
  const menu = await getMenu('main-menu');
  const collections = await getMenu('collections-menu');
  const goldCollections = await getCollections('title:Gold');
  console.log(collections);
  return (
    <nav className="relative flex flex-col items-center justify-between p-4 lg:justify-between lg:px-6">
      <div className="flex w-full items-center">
        <div className="block flex-none lg:hidden">
          <MobileMenu menu={collections} />
        </div>
        <div className="flex w-full lg:w-1/2">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center lg:mr-6 lg:max-w-[200px]"
          >
            <div className="ml-2 flex-none lg:block">
              <Image
                src={
                  'https://cdn.shopify.com/s/files/1/0736/0882/3069/files/footer-logo.png?v=1681830146'
                }
                className="hidden md:block"
                alt="logo"
                width={150}
                height={53}
              />
              <Image
                src={
                  'https://cdn.shopify.com/s/files/1/0736/0882/3069/files/cropped-dubai-jewellers-logo.png?v=1682698333'
                }
                className="block md:hidden"
                alt="logo"
                width={50}
                height={50}
              />
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm lg:flex lg:items-center">
              {menu
                .filter((item: Menu) => item.title !== 'Our Products')
                .map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.url}
                      className="whitespace-nowrap text-lg text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center lg:flex lg:w-3/12">
          <Search />
        </div>
        <div className="flex justify-end space-x-7 lg:mr-[5rem] lg:w-3/12">
          <Suspense fallback={<OpenCart />}>
            <span className="hidden lg:flex">
              <ThemeSwitcher />
            </span>
            <Account />
            <Cart />
          </Suspense>
        </div>
      </div>
      <Separator />
      <div className="my-2 hidden w-full items-center justify-center md:flex md:basis-full">
        <CategoryMenu categories={goldCollections} />
      </div>
    </nav>
  );
}
