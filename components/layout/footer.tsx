import FooterMenu from 'components/layout/footer-menu';
import { getMenu } from 'lib/shopify';
import {
  FacebookIcon,
  InstagramIcon,
  LocateIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  ShareIcon
} from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function Footer() {
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('footer');

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-5 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <Image
                src={
                  'https://cdn.shopify.com/s/files/1/0736/0882/3069/files/footer-logo.png?v=1681830146'
                }
                className="mb-5 ml-[-20px]"
                alt="Dubai Jewellers logo"
                width={150}
                height={53}
              />
              <p className="text-md mb-4 text-gray-600">
                At Dubai Jewellers, we are here to help you find the best jewelry and deals for you!
                We are here to create golden memories
              </p>
              <p className="mb-2 text-xl font-semibold uppercase text-gray-600">Follow Us</p>
              <div className="flex space-x-2">
                <FacebookIcon className="h-6 w-6 text-blue-600" />
                <InstagramIcon className="h-6 w-6 text-pink-500" />
                <PlusIcon className="h-6 w-6 text-red-600" />
                <ShareIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div>
              <p className="mb-4 text-xl font-semibold uppercase text-gray-600">Contact Us</p>
              <div className="mb-2 text-sm text-gray-600">
                <LocateIcon className="mr-1 inline h-4 w-4" />
                2700 N Park Dr, Brampton, ON L6S 0E9
              </div>
              <div className="mb-2 text-sm text-gray-600">
                <MailIcon className="mr-1 inline h-4 w-4" />
                dubai_jewellers@yahoo.com
              </div>
              <div className="text-sm text-gray-600">
                <PhoneIcon className="mr-1 inline h-4 w-4" />
                +14164651200
              </div>
            </div>
            <div>
              <p className="mb-4 text-xl font-semibold uppercase text-gray-600">Information</p>
              <Suspense
                fallback={
                  <div className="flex h-[188px] w-[200px] flex-col gap-2">
                    <div className={skeleton} />
                    <div className={skeleton} />
                    <div className={skeleton} />
                    <div className={skeleton} />
                    <div className={skeleton} />
                    <div className={skeleton} />
                  </div>
                }
              >
                <FooterMenu menu={menu} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
