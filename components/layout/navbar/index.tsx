import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import ThemeSwitcher from 'components/layout/navbar/theme-switcher';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import Account from './account';
import MobileMenu from './mobile-menu';
import Search from './search';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('main-menu');
  return (
    <nav className="relative flex items-center justify-between p-4 lg:justify-between lg:px-6">
      <div className="block flex-none lg:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full lg:w-1/2">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center lg:mr-6 lg:max-w-[200px]"
          >
            <div className="ml-2 flex-none text-sm font-medium uppercase lg:block">{SITE_NAME}</div>
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
    </nav>
  );
}
